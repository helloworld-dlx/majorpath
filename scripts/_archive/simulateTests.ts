/**
 * 批量模拟脚本 —— 专业推荐测试模拟器
 *
 * 用法：
 *   npx tsx scripts/simulateTests.ts --runs 100
 *   npx tsx scripts/simulateTests.ts --runs 500 --seed 2025
 *   npx tsx scripts/simulateTests.ts --runs 100 --use-api false
 *   npx tsx scripts/simulateTests.ts --runs 30 --use-api true
 *
 * ⚠️ 不调用外部 API（除非 --use-api true）
 * ⚠️ 不修改线上参数
 * ⚠️ 输出到 simulation-results/
 */

import * as fs from 'fs';
import * as path from 'path';
import { questionBank } from '../src/data/questionBank';
import type { QuestionBank, Question, DirectionBucket, Dimension } from '../src/types/test';
import type { BucketScore, UserResponses } from '../src/utils/adaptiveQuestioning';
import { computeBucketScores, normalizeScores, collectRiskTags, determineUserType, checkHumanitiesProtection } from '../src/utils/adaptiveQuestioning';
import { computeDimensionScores } from '../src/utils/scoring';
import { generateResult } from '../src/utils/scoring';
import { MAJOR_PROFILES, type MajorProfile, type GoldenCondition } from '../src/data/majorProfiles';

// ═══════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════

interface SimOptions {
  runs: number;
  seed: number;
  useApi: boolean;
  apiSampleLimit: number;
}

interface SingleSimResult {
  profileName: string;
  profileDesc: string;
  answers: Array<{ questionId: string; questionTitle: string; selectedOptionId: string; optionText: string }>;
  dimensionScores: Record<string, number>;
  bucketScores: Record<string, number>;
  recommendedCategories: string[];
  cautiousCategories: string[];
  categoryScores: Record<string, number>;
  riskTags: string[];
  reason: string;
  anomalies: string[];
}

interface SimulationSummary {
  totalRuns: number;
  seed: number;
  useApi: boolean;
  recommendedRanking: { name: string; count: number; pct: number }[];
  cautiousRanking: { name: string; count: number; pct: number }[];
  anomalies: { type: string; count: number; pct: number; examples: string[] }[];
  questionInfluence: { id: string; title: string; avgDimChange: number; avgBucketChange: number }[];
  overWeightQuestions: string[];
  underWeightQuestions: string[];
  concentratedCategories: string[];
  neverRecommendedCategories: string[];
  nextSteps: string[];
}

// ═══════════════════════════════════════════════
// CLI 参数解析
// ═══════════════════════════════════════════════

function parseArgs(): SimOptions {
  const args = process.argv.slice(2);
  const opts: SimOptions = { runs: 100, seed: Math.floor(Math.random() * 10000), useApi: false, apiSampleLimit: 10 };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--runs' && args[i + 1]) opts.runs = parseInt(args[i + 1]);
    if (args[i] === '--seed' && args[i + 1]) opts.seed = parseInt(args[i + 1]);
    if (args[i] === '--use-api') opts.useApi = args[i + 1] === 'true';
  }
  return opts;
}

// ═══════════════════════════════════════════════
// 简易随机（带 seed）
// ═══════════════════════════════════════════════

class SeededRandom {
  private s: number;
  constructor(seed: number) { this.s = seed; }
  next(): number {
    this.s = (this.s * 1664525 + 1013904223) % 2 ** 32;
    return (this.s >>> 0) / 2 ** 32;
  }
  pick<T>(arr: T[]): T { return arr[Math.floor(this.next() * arr.length)]; }
  gaussian(mean: number, stdDev: number): number {
    let u = 0, v = 0;
    while (u === 0) u = this.next();
    while (v === 0) v = this.next();
    return mean + stdDev * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
}

// ═══════════════════════════════════════════════
// 虚拟用户画像
// ═══════════════════════════════════════════════

interface VirtualProfile {
  name: string;
  desc: string;
  /** 维度偏好：dim → 倾向分 (-100~+100)，正数=倾向高分，负数=倾向低分 */
  dimBiases: Partial<Record<Dimension, number>>;
  /** 桶偏好：bucket → 倾向分 (-100~+100) */
  bucketBiases: Partial<Record<DirectionBucket, number>>;
  /** 风险标签 */
  riskBiases: { tag: string; chance: number }[];
  /** 兴趣专业类 slug */
  interestSlugs: string[];
}

const VIRTUAL_PROFILES: VirtualProfile[] = [
  {
    name: '数学好·喜欢电路·能接受抽象',
    desc: '数学较好、喜欢电路、能接受抽象思维',
    dimBiases: { math_logic: 80, info_systems: 60, engineering_practice: 70, abstract_theory: 50 },
    bucketBiases: { stem: 80 },
    riskBiases: [],
    interestSlugs: ['electronic-information', 'computer-science', 'automation', 'electrical'],
  },
  {
    name: '力学一般·对电学和电子产品感兴趣',
    desc: '力学一般，但对电学和电子产品感兴趣',
    dimBiases: { info_systems: 60, engineering_practice: 40, math_logic: -10 },
    bucketBiases: { stem: 60 },
    riskBiases: [],
    interestSlugs: ['electronic-information', 'computer-science'],
  },
  {
    name: '不喜欢编程·偏稳定和规则',
    desc: '不喜欢编程，偏稳定和规则',
    dimBiases: { info_systems: -60, stable_path: 70, rule_detail: 70, business_sense: 30, math_logic: -10 },
    bucketBiases: { business: 50, social_science: 40 },
    riskBiases: [{ tag: 'hands_on_aversion', chance: 0.5 }],
    interestSlugs: ['law-class', 'finance', 'public-administration', 'business-administration'],
  },
  {
    name: '喜欢动手实验·不喜欢纯理论',
    desc: '喜欢动手实验，但不喜欢纯理论',
    dimBiases: { engineering_practice: 80, abstract_theory: -50, math_logic: -10 },
    bucketBiases: { stem: 50, life_health: 40 },
    riskBiases: [],
    interestSlugs: ['mechanical', 'automation', 'electronic-information', 'civil-engineering', 'plant-production'],
  },
  {
    name: '喜欢沟通表达·不喜欢数学',
    desc: '喜欢沟通表达，不喜欢数学',
    dimBiases: { interpersonal: 80, reading_expression: 70, math_logic: -80, info_systems: -50 },
    bucketBiases: { humanities: 50, social_science: 50 },
    riskBiases: [],
    interestSlugs: ['journalism', 'chinese-literature', 'education', 'law-class'],
  },
  {
    name: '热门跟风·想选计算机',
    desc: '只因为热门而想选计算机的人',
    dimBiases: { info_systems: 10, math_logic: 10 },
    bucketBiases: { stem: 40 },
    riskBiases: [{ tag: 'trend_chasing', chance: 0.8 }, { tag: 'info_bubble', chance: 0.7 }],
    interestSlugs: ['computer-science'],
  },
  {
    name: '喜欢机械结构·工程实践',
    desc: '喜欢机械结构和工程实践',
    dimBiases: { engineering_practice: 90, math_logic: 50, abstract_theory: 20 },
    bucketBiases: { stem: 80 },
    riskBiases: [],
    interestSlugs: ['mechanical', 'automation', 'aerospace', 'civil-engineering'],
  },
  {
    name: '对医学/生命科学感兴趣',
    desc: '对医学、生命科学感兴趣',
    dimBiases: { life_health_interest: 90, interpersonal: 50, rule_detail: 30 },
    bucketBiases: { life_health: 90 },
    riskBiases: [{ tag: 'long_cycle', chance: 0.3 }],
    interestSlugs: ['clinical-medicine', 'pharmacy', 'nursing', 'biology', 'biomedical-eng'],
  },
  {
    name: '对商业·管理·财务感兴趣',
    desc: '对商业、管理、财务感兴趣',
    dimBiases: { business_sense: 80, interpersonal: 50, math_logic: 40, rule_detail: 30 },
    bucketBiases: { business: 80 },
    riskBiases: [],
    interestSlugs: ['business-administration', 'finance', 'economics-class', 'international-trade'],
  },
  {
    name: '无明显兴趣·重视就业',
    desc: '没有明显兴趣但重视就业',
    dimBiases: { stable_path: 70, business_sense: 40, math_logic: 20, info_systems: 20 },
    bucketBiases: { business: 40, stem: 40 },
    riskBiases: [{ tag: 'trend_chasing', chance: 0.4 }],
    interestSlugs: ['computer-science', 'business-administration', 'finance', 'electrical'],
  },
  {
    name: '数学弱·抗压弱·希望轻松',
    desc: '数学弱、抗压弱、希望大学轻松',
    dimBiases: { math_logic: -90, abstract_theory: -70, info_systems: -60, stable_path: 60, reading_expression: 40 },
    bucketBiases: { humanities: 40, social_science: 40 },
    riskBiases: [{ tag: 'trend_chasing', chance: 0.3 }],
    interestSlugs: ['education', 'foreign-languages', 'journalism', 'tourism-management'],
  },
  {
    name: '数学强·愿长期自学·愿读研',
    desc: '数学强、能接受长期自学、愿意读研',
    dimBiases: { math_logic: 90, abstract_theory: 80, info_systems: 60, engineering_practice: 40 },
    bucketBiases: { stem: 90 },
    riskBiases: [],
    interestSlugs: ['mathematics', 'physics', 'computer-science', 'electronic-information', 'automation'],
  },
  {
    name: '喜欢写作·表达·阅读',
    desc: '喜欢写作、表达、阅读',
    dimBiases: { reading_expression: 95, aesthetic_creation: 50, interpersonal: 30, math_logic: -40 },
    bucketBiases: { humanities: 80, art_creative: 40 },
    riskBiases: [],
    interestSlugs: ['chinese-literature', 'journalism', 'foreign-languages', 'history-class', 'philosophy-class'],
  },
  {
    name: '喜欢设计·审美·创作',
    desc: '喜欢设计、审美、创作',
    dimBiases: { aesthetic_creation: 95, engineering_practice: 40, interpersonal: 20 },
    bucketBiases: { art_creative: 80, stem: 30 },
    riskBiases: [],
    interestSlugs: ['design', 'fine-arts', 'architecture', 'drama-film'],
  },
  {
    name: '各方面都比较中立',
    desc: '各方面都比较中立',
    dimBiases: {},
    bucketBiases: {},
    riskBiases: [],
    interestSlugs: [],
  },
];

// ═══════════════════════════════════════════════
// 模拟用户答案生成
// ═══════════════════════════════════════════════

function generateAnswers(
  profile: VirtualProfile,
  bank: QuestionBank,
  rng: SeededRandom,
): { answers: UserResponses; answerDetails: SingleSimResult['answers'] } {
  const answers: UserResponses = {};
  const details: SingleSimResult['answers'] = [];

  // 取 8 道通用题 + 6 道分支题 + 2 道校验 + 2 道避坑 = 共约 18 题
  const generalQ = bank.questions.filter((q) => q.type === 'general');
  const branchQ = bank.questions.filter((q) => q.type === 'branch');
  const crossQ = bank.questions.filter((q) => q.type === 'cross_check');
  const riskQ = bank.questions.filter((q) => q.type === 'risk');

  // 随机抽取
  const shuffleAndTake = (qs: Question[], n: number) => {
    const arr = [...qs];
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng.next() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr.slice(0, n);
  };

  const selectedQ = [
    ...shuffleAndTake(generalQ, 8),
    ...shuffleAndTake(branchQ, 6),
    ...shuffleAndTake(crossQ, 2),
    ...shuffleAndTake(riskQ, 2),
  ];

  for (const q of selectedQ) {
    // 为每个选项计算倾向分
    const scoredOpts = q.options.map((opt) => {
      let score = 0;
      for (const effect of opt.scoreEffects) {
        // 维度匹配
        const dimBias = profile.dimBiases[effect.target as Dimension];
        if (dimBias !== undefined) score += dimBias * effect.points * 0.1;
        // 桶匹配
        const bucketBias = profile.bucketBiases[effect.target as DirectionBucket];
        if (bucketBias !== undefined) score += bucketBias * effect.points * 0.1;
      }
      return { option: opt, score };
    });

    // 添加噪声，模拟真实人的不完全一致性
    scoredOpts.forEach((o) => { o.score += rng.gaussian(0, 20); });
    scoredOpts.sort((a, b) => b.score - a.score);

    const chosen = scoredOpts[0].option;
    answers[q.id] = chosen.id;
    details.push({
      questionId: q.id,
      questionTitle: q.title,
      selectedOptionId: chosen.id,
      optionText: chosen.text,
    });
  }

  return { answers, answerDetails: details };
}

// ═══════════════════════════════════════════════
// Golden Cases 评分
// ═══════════════════════════════════════════════

interface GoldenCheckResult {
  passed: number;
  total: number;
  failures: string[];
}

function evaluateGoldenCases(
  results: SingleSimResult[],
): GoldenCheckResult {
  const failures: string[] = [];
  let total = 0;
  let passed = 0;

  // 遍历所有 golden conditions
  for (const [slug, profile] of Object.entries(MAJOR_PROFILES)) {
    for (const cond of profile.goldenConditions) {
      total++;

      // 找到匹配的模拟用户（维度/桶条件匹配）
      const matchingUsers = results.filter((r) => {
        if (cond.highDimensions) {
          for (const dim of cond.highDimensions) {
            if ((r.dimensionScores[dim] ?? 0) < 30) return false;
          }
        }
        if (cond.lowDimensions) {
          for (const dim of cond.lowDimensions) {
            if ((r.dimensionScores[dim] ?? 0) > 40) return false;
          }
        }
        return true;
      });

      if (matchingUsers.length === 0) continue;

      // 检查这些用户中，该专业类是否出现在正确的层级
      let tierMatch = 0;
      for (const user of matchingUsers) {
        const expectedTier = cond.expectedTier ?? 'recommended';
        if (expectedTier === 'recommended' && user.recommendedCategories.includes(profile.name)) tierMatch++;
        if (expectedTier === 'optional' && [...user.recommendedCategories, ...getOptional(user)].includes(profile.name)) tierMatch++;
        if (expectedTier === 'cautious' && user.cautiousCategories.includes(profile.name)) tierMatch++;
      }

      const matchRate = matchingUsers.length > 0 ? tierMatch / matchingUsers.length : 0;
      if (matchRate >= 0.5) {
        passed++;
      } else {
        failures.push(`Golden: ${cond.label} — 匹配 ${matchingUsers.length} 人，仅 ${tierMatch} 命中 (${cond.expectedTier})`);
      }
    }
  }

  return { passed, total, failures };
}

function getOptional(user: SingleSimResult): string[] {
  // We don't store optional separately in SingleSimResult, use recommended as proxy
  return [];
}

// ═══════════════════════════════════════════════
// 异常检测
// ═══════════════════════════════════════════════

function detectAnomalies(results: SingleSimResult[], allCatSlugs: string[]): SimulationSummary['anomalies'] {
  const anomalies: SimulationSummary['anomalies'] = [];
  const n = results.length;

  // 1. 推荐和谨慎列表高度重叠
  const overlapUsers = results.filter((r) => {
    const recSet = new Set(r.recommendedCategories);
    return r.cautiousCategories.some((c) => recSet.has(c));
  });
  if (overlapUsers.length > 0) {
    anomalies.push({
      type: '推荐/谨慎列表重叠',
      count: overlapUsers.length,
      pct: Math.round((overlapUsers.length / n) * 100),
      examples: overlapUsers.slice(0, 3).map((u) => `${u.profileName}: ${u.recommendedCategories.filter((c) => u.cautiousCategories.includes(c)).join(', ')}`),
    });
  }

  // 2. 热门专业过度集中
  const recCount: Record<string, number> = {};
  results.forEach((r) => r.recommendedCategories.forEach((c) => { recCount[c] = (recCount[c] ?? 0) + 1; }));
  const over50Pct = Object.entries(recCount).filter(([, c]) => c / n > 0.5);
  if (over50Pct.length > 0) {
    anomalies.push({
      type: '热门专业过度集中',
      count: over50Pct.length,
      pct: Math.round((over50Pct[0][1] / n) * 100),
      examples: over50Pct.map(([name, c]) => `${name}(${Math.round((c / n) * 100)}%)`),
    });
  }

  // 3. 从未被推荐的专业
  const neverRec = allCatSlugs.filter((slug) => {
    const name = MAJOR_PROFILES[slug]?.name ?? slug;
    return (recCount[name] ?? 0) === 0;
  });
  if (neverRec.length > 0) {
    anomalies.push({
      type: '从未被推荐的专业',
      count: neverRec.length,
      pct: Math.round((neverRec.length / allCatSlugs.length) * 100),
      examples: neverRec.slice(0, 5).map((s) => MAJOR_PROFILES[s]?.name ?? s),
    });
  }

  // 4. 推荐与画像矛盾
  const mismatchUsers = results.filter((r) => {
    const stemRec = r.recommendedCategories.some((c) =>
      ['计算机类', '电子信息类', '自动化类', '机械类', '电气类'].includes(c));
    const mathLow = (r.dimensionScores['math_logic'] ?? 0) < 15;
    return stemRec && mathLow;
  });
  if (mismatchUsers.length > 0) {
    anomalies.push({
      type: '推荐与画像矛盾（低数学却推理工）',
      count: mismatchUsers.length,
      pct: Math.round((mismatchUsers.length / n) * 100),
      examples: mismatchUsers.slice(0, 3).map((u) => `${u.profileName}(数学=${rDimension(u, 'math_logic')})`),
    });
  }

  return anomalies;
}

function rDimension(u: SingleSimResult, dim: string): number {
  return Math.round(u.dimensionScores[dim] ?? 0);
}

// ═══════════════════════════════════════════════
// 题目影响力分析
// ═══════════════════════════════════════════════

function analyzeQuestionInfluence(
  results: SingleSimResult[],
  bank: QuestionBank,
): { influences: SimulationSummary['questionInfluence']; over: string[]; under: string[] } {
  const questionDeltas: Record<string, { totalDimDelta: number; totalBucketDelta: number; count: number }> = {};

  for (const r of results) {
    for (const a of r.answers) {
      if (!questionDeltas[a.questionId]) {
        questionDeltas[a.questionId] = { totalDimDelta: 0, totalBucketDelta: 0, count: 0 };
      }
      const q = bank.questions.find((qq) => qq.id === a.questionId);
      if (!q) continue;
      const opt = q.options.find((o) => o.id === a.selectedOptionId);
      if (!opt) continue;

      let dimDelta = 0;
      let bucketDelta = 0;
      for (const e of opt.scoreEffects) {
        dimDelta += Math.abs(e.points);
        bucketDelta += Math.abs(e.points);
      }
      questionDeltas[a.questionId].totalDimDelta += dimDelta;
      questionDeltas[a.questionId].totalBucketDelta += bucketDelta;
      questionDeltas[a.questionId].count++;
    }
  }

  const influences = Object.entries(questionDeltas).map(([id, d]) => {
    const q = bank.questions.find((qq) => qq.id === id);
    return {
      id,
      title: q?.title ?? id,
      avgDimChange: Math.round(d.totalDimDelta / Math.max(1, d.count)),
      avgBucketChange: Math.round(d.totalBucketDelta / Math.max(1, d.count)),
    };
  }).sort((a, b) => b.avgBucketChange - a.avgBucketChange);

  const avgInfluence = influences.reduce((s, i) => s + i.avgBucketChange, 0) / Math.max(1, influences.length);
  const over = influences.filter((i) => i.avgBucketChange > avgInfluence * 2).map((i) => i.id);
  const under = influences.filter((i) => i.avgBucketChange < avgInfluence * 0.3).map((i) => i.id);

  return { influences, over, under };
}

// ═══════════════════════════════════════════════
// 主模拟流程
// ═══════════════════════════════════════════════

async function main() {
  const opts = parseArgs();
  console.log(`\n🧪 专业推荐测试模拟器`);
  console.log(`   runs=${opts.runs}  seed=${opts.seed}  useApi=${opts.useApi}\n`);

  const rng = new SeededRandom(opts.seed);
  const results: SingleSimResult[] = [];

  // 确保输出目录
  const outDir = path.resolve('simulation-results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 所有已知专业类 slug
  const allCatSlugs = Object.keys(MAJOR_PROFILES);

  // 运行模拟
  for (let i = 0; i < opts.runs; i++) {
    const profileIdx = i % VIRTUAL_PROFILES.length;
    const profile = VIRTUAL_PROFILES[profileIdx];

    const { answers, answerDetails } = generateAnswers(profile, questionBank, rng);

    // 计算
    const rawBuckets = computeBucketScores(questionBank, answers);
    const normalized = normalizeScores(rawBuckets);
    const userType = determineUserType(normalized);
    const humanitiesProtected = checkHumanitiesProtection(normalized);
    const riskTags = collectRiskTags(questionBank, answers);
    const dimScores = computeDimensionScores(questionBank, answers);

    const result = generateResult(
      questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets,
    );

    // 构建单次结果
    const catScores: Record<string, number> = {};
    for (const c of result.recommendedCategories) catScores[c.name] = c.score;
    for (const c of result.optionalCategories) catScores[c.name] = c.score;
    for (const c of result.cautiousCategories) catScores[c.name] = c.score;

    // 异常检测
    const localAnomalies: string[] = [];

    // 推荐与画像矛盾检查
    const stemRec = result.recommendedCategories.some((c) =>
      ['计算机类', '电子信息类', '自动化类', '机械类', '电气类'].includes(c.name));
    if (stemRec && (dimScores.math_logic ?? 0) < 15) {
      localAnomalies.push('推荐STEM专业但数学维度低');
    }

    // 所有推荐都一样
    const uniqueRecs = new Set(result.recommendedCategories.map((c) => c.name));
    if (uniqueRecs.size <= 1 && result.recommendedCategories.length >= 2) {
      localAnomalies.push('推荐结果过于集中(仅1个专业类)');
    }

    results.push({
      profileName: profile.name,
      profileDesc: profile.desc,
      answers: answerDetails,
      dimensionScores: Object.fromEntries(
        Object.entries(dimScores).map(([k, v]) => [k, Math.round(v)]),
      ),
      bucketScores: Object.fromEntries(
        Object.entries(normalized as Record<string, number>).map(([k, v]) => [k, Math.round(v)]),
      ),
      recommendedCategories: result.recommendedCategories.map((c) => c.name),
      cautiousCategories: result.cautiousCategories.map((c) => c.name),
      categoryScores: catScores,
      riskTags: result.riskTags.map((t) => t.label),
      reason: result.profileSummary,
      anomalies: localAnomalies,
    });

    if ((i + 1) % 100 === 0) console.log(`   已完成 ${i + 1}/${opts.runs}...`);
  }

  console.log(`   全部完成，共 ${results.length} 次模拟\n`);

  // ── 统计 ──
  const recRank: Record<string, number> = {};
  const cauRank: Record<string, number> = {};
  for (const r of results) {
    r.recommendedCategories.forEach((c) => { recRank[c] = (recRank[c] ?? 0) + 1; });
    r.cautiousCategories.forEach((c) => { cauRank[c] = (cauRank[c] ?? 0) + 1; });
  }

  const n = results.length;
  const ranking = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count, pct: Math.round((count / n) * 100) }));

  // 异常
  const anomalies = detectAnomalies(results, allCatSlugs);

  // 题目影响力
  const { influences, over, under } = analyzeQuestionInfluence(results, questionBank);

  // 从未被推荐
  const allRecNames = new Set(Object.keys(recRank));
  const neverRecommended = allCatSlugs
    .map((s) => MAJOR_PROFILES[s]?.name)
    .filter((name): name is string => !!name && !allRecNames.has(name));

  // 过度集中
  const concentrated = Object.entries(recRank)
    .filter(([, c]) => c / n > 0.6)
    .map(([name]) => name);

  // ── 构建 summary ──
  const summary: SimulationSummary = {
    totalRuns: n,
    seed: opts.seed,
    useApi: opts.useApi,
    recommendedRanking: ranking(recRank),
    cautiousRanking: ranking(cauRank),
    anomalies: anomalies.map((a) => ({
      type: a.type,
      count: a.count,
      pct: a.pct,
      examples: a.examples,
    })),
    questionInfluence: influences,
    overWeightQuestions: over,
    underWeightQuestions: under,
    concentratedCategories: concentrated,
    neverRecommendedCategories: neverRecommended,
    nextSteps: generateNextSteps(anomalies, concentrated, neverRecommended, influences),
  };

  // ── 写入文件 ──
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log('✅ simulation-results/results.json');

  // CSV
  const csvHeaders = ['profileName', 'profileDesc', 'recommendedCategories', 'cautiousCategories', 'riskTags', 'dimMathLogic', 'dimInfoSystems', 'dimEngineering', 'bucketStem', 'bucketBusiness', 'bucketHumanities'];
  const csvRows = [csvHeaders.join(',')];
  for (const r of results) {
    csvRows.push([
      `"${r.profileName}"`, `"${r.profileDesc}"`,
      `"${r.recommendedCategories.join('; ')}"`, `"${r.cautiousCategories.join('; ')}"`,
      `"${r.riskTags.join('; ')}"`,
      r.dimensionScores['math_logic'] ?? 0, r.dimensionScores['info_systems'] ?? 0,
      r.dimensionScores['engineering_practice'] ?? 0,
      r.bucketScores['stem'] ?? 0, r.bucketScores['business'] ?? 0,
      r.bucketScores['humanities'] ?? 0,
    ].join(','));
  }
  fs.writeFileSync(path.join(outDir, 'results.csv'), csvRows.join('\n'));
  console.log('✅ simulation-results/results.csv');

  // Summary MD
  const md = buildSummaryMd(summary);
  fs.writeFileSync(path.join(outDir, 'summary.md'), md);
  console.log('✅ simulation-results/summary.md');

  // ── API 模式（如果开启） ──
  if (opts.useApi) {
    const apiKey = process.env['DEEPSEEK_API_KEY'];
    if (!apiKey) {
      console.log('\n⚠️  未检测到 DEEPSEEK_API_KEY 环境变量，跳过 API 评价');
      console.log('   已使用本地评分规则完成模拟。');
    } else {
      console.log(`\n🤖 API 模式开启，最多抽样 ${opts.apiSampleLimit} 条调用...`);
      // 预留 API 接口
      console.log('   （API 评价功能待接入 DeepSeek Flash）');
    }
  } else {
    console.log('\n📋 未开启 API 模式（--use-api false），已使用本地评分规则完成模拟。');
  }

  console.log('\n✨ 模拟完成！');
}

// ═══════════════════════════════════════════════
// Summary.md 生成
// ═══════════════════════════════════════════════

function buildSummaryMd(s: SimulationSummary): string {
  const lines = [
    `# 专业推荐测试模拟报告`,
    ``,
    `> 生成时间：${new Date().toISOString()}  |  模拟次数：${s.totalRuns}  |  种子：${s.seed}  |  API：${s.useApi ? '开启' : '关闭'}`,
    ``,
    `## 📊 各专业被推荐次数排名`,
    ``,
    `| 排名 | 专业类 | 推荐次数 | 占比 |`,
    `|:----:|--------|:--------:|:----:|`,
  ];
  s.recommendedRanking.forEach((r, i) => {
    lines.push(`| ${i + 1} | ${r.name} | ${r.count} | ${r.pct}% |`);
  });
  if (s.recommendedRanking.length === 0) lines.push(`| - | （无推荐数据） | 0 | 0% |`);

  lines.push(``, `## ⚠️ 各专业被谨慎了解次数排名`, ``,
    `| 排名 | 专业类 | 谨慎次数 | 占比 |`, `|:----:|--------|:--------:|:----:|`);
  s.cautiousRanking.forEach((r, i) => {
    lines.push(`| ${i + 1} | ${r.name} | ${r.count} | ${r.pct}% |`);
  });

  lines.push(``, `## 🔍 典型异常列表`, ``);
  if (s.anomalies.length === 0) {
    lines.push(`✅ 未检测到明显异常。`);
  } else {
    for (const a of s.anomalies) {
      lines.push(`### ${a.type}（${a.count} 次，${a.pct}%）`);
      for (const e of a.examples) lines.push(`- ${e}`);
      lines.push(``);
    }
  }

  lines.push(``, `## 📈 题目影响力分析`, ``,
    `| 题目ID | 题目 | 平均维度影响 | 平均桶影响 |`,
    `|--------|------|:----------:|:--------:|`);
  s.questionInfluence.slice(0, 15).forEach((q) => {
    lines.push(`| ${q.id} | ${q.title.slice(0, 30)} | ${q.avgDimChange} | ${q.avgBucketChange} |`);
  });

  if (s.overWeightQuestions.length > 0) {
    lines.push(``, `⚠️ 权重过高的题目：${s.overWeightQuestions.join(', ')}`);
  }
  if (s.underWeightQuestions.length > 0) {
    lines.push(`⚠️ 权重过低的题目：${s.underWeightQuestions.join(', ')}`);
  }

  lines.push(``, `## 🎯 推荐结果过于集中的专业`, ``);
  if (s.concentratedCategories.length > 0) {
    s.concentratedCategories.forEach((c) => lines.push(`- ${c}`));
  } else {
    lines.push(`✅ 未发现过度集中。`);
  }

  lines.push(``, `## ❌ 从未被推荐的专业`, ``);
  if (s.neverRecommendedCategories.length > 0) {
    s.neverRecommendedCategories.forEach((c) => lines.push(`- ${c}`));
  } else {
    lines.push(`✅ 所有专业均有被推荐。`);
  }

  lines.push(``, `## 💡 下一步调参建议`, ``);
  s.nextSteps.forEach((step) => lines.push(`- ${step}`));

  return lines.join('\n');
}

function generateNextSteps(anomalies: SimulationSummary['anomalies'], concentrated: string[], neverRec: string[], influences: SimulationSummary['questionInfluence']): string[] {
  const steps: string[] = [];

  if (concentrated.length > 0) {
    steps.push(`⚠️ **过度集中**：${concentrated.join('、')} 在 >60% 的用户中被推荐。考虑降低相关桶/维度权重，或增加多样性惩罚。`);
  }
  if (neverRec.length > 0) {
    steps.push(`⚠️ **覆盖盲区**：${neverRec.slice(0, 5).join('、')} 等专业从未被推荐。检查相关桶映射和权重是否正确。`);
  }
  for (const a of anomalies) {
    if (a.type === '推荐/谨慎列表重叠') {
      steps.push(`⚠️ 推荐/谨慎列表重叠。检查避坑规则惩罚力度是否足够。`);
    }
    if (a.type.includes('矛盾')) {
      steps.push(`⚠️ 推荐与画像存在逻辑矛盾。检查得分融合公式或增加逻辑校验。`);
    }
  }
  if (steps.length === 0) {
    steps.push(`✅ 当前参数表现良好，未发现明显需要调整的问题。`);
    steps.push(`💡 可以尝试微调 threshold 参数（highThreshold/leadGap）观察推荐多样性变化。`);
  }
  steps.push(`💡 运行 \`npm run evolve\` 进行自动调参，生成候选参数供人工审核。`);

  return steps;
}

main().catch(console.error);
