/**
 * 自动调参脚本 —— 参数进化 / 搜索
 *
 * 用法：
 *   npx tsx scripts/evolveRecommendationParams.ts --generations 20 --population 30 --runs-per-candidate 100
 *   npx tsx scripts/evolveRecommendationParams.ts --generations 20 --population 30 --runs-per-candidate 100 --use-api false
 *
 * ⚠️ 不修改线上参数文件，结果写入 simulation-results/
 * ⚠️ 默认不调用 API
 * ⚠️ 输出候选参数供人工审核后手动应用
 */

import * as fs from 'fs';
import * as path from 'path';
import { questionBank } from '../src/data/questionBank';
import type { QuestionBank, DirectionBucket, Dimension } from '../src/types/test';
import type { BucketScore, UserResponses, AdaptiveConfig } from '../src/utils/adaptiveQuestioning';
import { DEFAULT_CONFIG } from '../src/utils/adaptiveQuestioning';
import {
  computeBucketScores, normalizeScores, determineUserType,
  checkHumanitiesProtection, collectRiskTags,
} from '../src/utils/adaptiveQuestioning';
import { computeDimensionScores, generateResult } from '../src/utils/scoring';
import { MAJOR_PROFILES, type GoldenCondition } from '../src/data/majorProfiles';
import {
  DIMENSION_TO_BUCKET,
  BUCKET_TO_DISCIPLINES,
  PROFILE_TEMPLATES,
} from '../src/data/recommendationWeights';
import type { RecommendationResult } from '../src/types/result';

// ═══════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════

interface EvolveOptions {
  generations: number;
  population: number;
  runsPerCandidate: number;
  useApi: boolean;
  seed: number;
}

function parseArgs(): EvolveOptions {
  const args = process.argv.slice(2);
  const opts: EvolveOptions = {
    generations: 20, population: 30, runsPerCandidate: 100,
    useApi: false, seed: Math.floor(Math.random() * 10000),
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--generations' && args[i + 1]) opts.generations = parseInt(args[i + 1]);
    if (args[i] === '--population' && args[i + 1]) opts.population = parseInt(args[i + 1]);
    if (args[i] === '--runs-per-candidate' && args[i + 1]) opts.runsPerCandidate = parseInt(args[i + 1]);
    if (args[i] === '--use-api') opts.useApi = args[i + 1] === 'true';
    if (args[i] === '--seed' && args[i + 1]) opts.seed = parseInt(args[i + 1]);
  }
  return opts;
}

// ═══════════════════════════════════════════════
// 随机
// ═══════════════════════════════════════════════

class SeededRandom {
  private s: number;
  constructor(seed: number) { this.s = seed; }
  next(): number { this.s = (this.s * 1664525 + 1013904223) % 2 ** 32; return (this.s >>> 0) / 2 ** 32; }
  gaussian(mean: number, std: number): number {
    let u = 0, v = 0;
    while (u === 0) u = this.next();
    while (v === 0) v = this.next();
    return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  pick<T>(arr: T[]): T { return arr[Math.floor(this.next() * arr.length)]; }
}

// ═══════════════════════════════════════════════
// 虚拟用户（复用 simulateTests 中的定义）
// ═══════════════════════════════════════════════

interface VirtualProfile {
  name: string;
  desc: string;
  dimBiases: Partial<Record<Dimension, number>>;
  bucketBiases: Partial<Record<DirectionBucket, number>>;
  interestSlugs: string[];
}

const VIRTUAL_PROFILES: VirtualProfile[] = [
  { name: '数学好·喜欢电路', desc: '', dimBiases: { math_logic: 80, info_systems: 60, engineering_practice: 70, abstract_theory: 50 }, bucketBiases: { stem: 80 }, interestSlugs: ['electronic-information', 'computer-science', 'automation'] },
  { name: '不喜欢编程·偏稳定', desc: '', dimBiases: { info_systems: -60, stable_path: 70, rule_detail: 70, math_logic: -10 }, bucketBiases: { business: 50, social_science: 40 }, interestSlugs: ['law-class', 'finance', 'public-administration'] },
  { name: '喜欢动手实验', desc: '', dimBiases: { engineering_practice: 80, abstract_theory: -50, math_logic: -10 }, bucketBiases: { stem: 50, life_health: 40 }, interestSlugs: ['mechanical', 'automation', 'civil-engineering'] },
  { name: '喜欢沟通·不喜欢数学', desc: '', dimBiases: { interpersonal: 80, reading_expression: 70, math_logic: -80, info_systems: -50 }, bucketBiases: { humanities: 50, social_science: 50 }, interestSlugs: ['journalism', 'chinese-literature', 'education', 'law-class'] },
  { name: '热门跟风计算机', desc: '', dimBiases: { info_systems: 10, math_logic: 10 }, bucketBiases: { stem: 40 }, interestSlugs: ['computer-science'] },
  { name: '喜欢机械结构', desc: '', dimBiases: { engineering_practice: 90, math_logic: 50 }, bucketBiases: { stem: 80 }, interestSlugs: ['mechanical', 'automation', 'aerospace'] },
  { name: '医学/生命科学兴趣', desc: '', dimBiases: { life_health_interest: 90, interpersonal: 50 }, bucketBiases: { life_health: 90 }, interestSlugs: ['clinical-medicine', 'pharmacy', 'nursing', 'biology'] },
  { name: '商业管理兴趣', desc: '', dimBiases: { business_sense: 80, interpersonal: 50, math_logic: 40 }, bucketBiases: { business: 80 }, interestSlugs: ['business-administration', 'finance', 'economics-class'] },
  { name: '无明显兴趣重视就业', desc: '', dimBiases: { stable_path: 70, business_sense: 40, math_logic: 20 }, bucketBiases: { business: 40, stem: 40 }, interestSlugs: ['computer-science', 'business-administration'] },
  { name: '数学弱希望轻松', desc: '', dimBiases: { math_logic: -90, abstract_theory: -70, info_systems: -60, stable_path: 60, reading_expression: 40 }, bucketBiases: { humanities: 40, social_science: 40 }, interestSlugs: ['education', 'foreign-languages', 'journalism'] },
  { name: '数学强愿读研', desc: '', dimBiases: { math_logic: 90, abstract_theory: 80, info_systems: 60, engineering_practice: 40 }, bucketBiases: { stem: 90 }, interestSlugs: ['mathematics', 'physics', 'computer-science', 'electronic-information'] },
  { name: '喜欢写作阅读', desc: '', dimBiases: { reading_expression: 95, aesthetic_creation: 50, math_logic: -40 }, bucketBiases: { humanities: 80, art_creative: 40 }, interestSlugs: ['chinese-literature', 'journalism', 'foreign-languages', 'history-class'] },
  { name: '喜欢设计审美', desc: '', dimBiases: { aesthetic_creation: 95, engineering_practice: 40 }, bucketBiases: { art_creative: 80, stem: 30 }, interestSlugs: ['design', 'fine-arts', 'architecture'] },
  { name: '各方面都比较中立', desc: '', dimBiases: {}, bucketBiases: {}, interestSlugs: [] },
];

// ═══════════════════════════════════════════════
// 参数空间定义
// ═══════════════════════════════════════════════

/** 可调参数 */
interface TunableParams {
  // 自适应抽题
  generalCount: number;
  singleMainBranch: number;
  leadGap: number;
  highThreshold: number;
  midThreshold: number;

  // 桶得分融合
  rawWeight: number;         // raw bucket weight (vs dimension-weighted)
  dimWeight: number;         // dimension-weighted bucket weight

  // 推荐阈值
  recommendThreshold: number;
  optionalThreshold: number;

  // 避坑惩罚系数
  riskPenaltyMultiplier: number;

  // 多样性
  maxRecommended: number;
  diversityBonus: number;    // 0=无多样性奖励
}

const PARAM_SPACE = {
  generalCount: { min: 6, max: 12, step: 1, default: 8 },
  singleMainBranch: { min: 4, max: 10, step: 1, default: 6 },
  leadGap: { min: 5, max: 20, step: 1, default: 8 },
  highThreshold: { min: 50, max: 80, step: 2, default: 62 },
  midThreshold: { min: 40, max: 70, step: 2, default: 55 },
  rawWeight: { min: 0.2, max: 0.6, step: 0.05, default: 0.4 },
  dimWeight: { min: 0.4, max: 0.8, step: 0.05, default: 0.6 },
  recommendThreshold: { min: 45, max: 70, step: 5, default: 55 },
  optionalThreshold: { min: 25, max: 50, step: 5, default: 35 },
  riskPenaltyMultiplier: { min: 0.5, max: 2.5, step: 0.25, default: 1.0 },
  maxRecommended: { min: 3, max: 8, step: 1, default: 5 },
  diversityBonus: { min: 0, max: 15, step: 5, default: 0 },
};

function applyParams(config: AdaptiveConfig, params: TunableParams): AdaptiveConfig {
  return {
    ...config,
    generalCount: params.generalCount,
    singleMainBranch: params.singleMainBranch,
    leadGap: params.leadGap,
    highThreshold: params.highThreshold,
    midThreshold: params.midThreshold,
  };
}

function randomParams(rng: SeededRandom): TunableParams {
  const p: any = {};
  for (const [key, spec] of Object.entries(PARAM_SPACE)) {
    const range = (spec.max - spec.min) / spec.step;
    const steps = Math.floor(rng.next() * (range + 1));
    const value = spec.min + steps * spec.step;
    p[key] = Math.round(value * 100) / 100;
  }
  return p as TunableParams;
}

function mutateParams(parent: TunableParams, rng: SeededRandom, strength: number = 1): TunableParams {
  const child: any = { ...parent };
  for (const [key, spec] of Object.entries(PARAM_SPACE)) {
    if (rng.next() < 0.3) { // 30% chance to mutate each param
      const delta = (rng.next() - 0.5) * (spec.max - spec.min) * 0.2 * strength;
      let newVal = (parent as any)[key] + delta;
      newVal = Math.round(newVal / spec.step) * spec.step;
      newVal = Math.max(spec.min, Math.min(spec.max, newVal));
      child[key] = Math.round(newVal * 100) / 100;
    }
  }
  return child as TunableParams;
}

function crossover(a: TunableParams, b: TunableParams, rng: SeededRandom): TunableParams {
  const child: any = {};
  for (const key of Object.keys(PARAM_SPACE)) {
    child[key] = rng.next() < 0.5 ? (a as any)[key] : (b as any)[key];
  }
  return child as TunableParams;
}

// ═══════════════════════════════════════════════
// 模拟单用户
// ═══════════════════════════════════════════════

function simulateUser(profile: VirtualProfile, params: TunableParams, bank: QuestionBank, rng: SeededRandom): RecommendationResult {
  // 生成答案
  const answers: UserResponses = {};
  const qs = bank.questions.filter((q) => q.type !== 'subjective' && q.options.length > 0);
  const selected = [...qs].sort(() => rng.next() - 0.5).slice(0, 16);

  for (const q of selected) {
    if (!q.options || q.options.length === 0) continue;
    const scores = q.options.map((opt) => {
      let s = 0;
      for (const e of opt.scoreEffects) {
        const db = profile.dimBiases[e.target as Dimension];
        if (db !== undefined) s += db * e.points * 0.1;
        const bb = profile.bucketBiases[e.target as DirectionBucket];
        if (bb !== undefined) s += bb * e.points * 0.1;
      }
      return { opt, score: s + rng.gaussian(0, 20) };
    });
    scores.sort((a, b) => b.score - a.score);
    answers[q.id] = scores[0].opt.id;
  }

  const rawBuckets = computeBucketScores(bank, answers);
  const normalized = normalizeScores(rawBuckets);
  const config = applyParams(DEFAULT_CONFIG, params);

  // 使用自定义融合权重
  const dimScores = computeDimensionScores(bank, answers);
  const warmBuckets: BucketScore = { ...rawBuckets };
  const dimBuckets: BucketScore = { humanities: 0, social_science: 0, business: 0, stem: 0, life_health: 0, art_creative: 0 };

  for (const [dim, map] of Object.entries(DIMENSION_TO_BUCKET) as [Dimension, Partial<Record<DirectionBucket, number>>][]) {
    const ds = dimScores[dim] ?? 0;
    for (const [bucket, w] of Object.entries(map) as [DirectionBucket, number][]) {
      dimBuckets[bucket] += (ds * w) / 100;
    }
  }

  const refined: BucketScore = { ...rawBuckets };
  for (const key of Object.keys(refined) as DirectionBucket[]) {
    refined[key] = Math.round(warmBuckets[key] * params.rawWeight + dimBuckets[key] * params.dimWeight);
  }
  const finalBuckets = normalizeScores(refined);

  const userType = determineUserType(finalBuckets, config);
  const humanitiesProtected = checkHumanitiesProtection(finalBuckets, config);
  const riskTags = collectRiskTags(bank, answers);

  const result = generateResult(bank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

  // 用自定义阈值覆盖
  const allCats = [...result.recommendedCategories, ...result.optionalCategories, ...result.cautiousCategories];
  const newRec: typeof result.recommendedCategories = [];
  const newOpt: typeof result.optionalCategories = [];
  const newCau: typeof result.cautiousCategories = [];

  for (const cat of allCats) {
    // 多样性奖励
    const nameCount = allCats.filter((c) => c.slug === cat.slug).length;
    const adjustedScore = cat.score * (1 + params.diversityBonus / 100 / Math.max(1, nameCount));

    if (adjustedScore >= params.recommendThreshold) {
      newRec.push({ ...cat, score: Math.round(adjustedScore) });
    } else if (adjustedScore >= params.optionalThreshold) {
      newOpt.push({ ...cat, score: Math.round(adjustedScore) });
    } else {
      newCau.push({ ...cat, score: Math.round(adjustedScore) });
    }
  }

  return {
    ...result,
    recommendedCategories: newRec.slice(0, params.maxRecommended),
    optionalCategories: newOpt.slice(0, 4),
    cautiousCategories: newCau.slice(0, 4),
  };
}

// ═══════════════════════════════════════════════
// 评分函数
// ═══════════════════════════════════════════════

function scoreParams(params: TunableParams, results: RecommendationResult[], profiles: VirtualProfile[]): number {
  let score = 50; // baseline
  const n = results.length;

  // 1. Golden cases 命中率 (0-30)
  let goldenHits = 0;
  let goldenTotal = 0;
  for (const [slug, profile] of Object.entries(MAJOR_PROFILES)) {
    for (const cond of profile.goldenConditions) {
      goldenTotal++;
      const matching = results.filter((r, i) => {
        const dims = r.dimensions;
        if (cond.highDimensions) {
          for (const d of cond.highDimensions) {
            if ((dims.find((x) => x.dimension === d)?.score ?? 0) < 30) return false;
          }
        }
        if (cond.lowDimensions) {
          for (const d of cond.lowDimensions) {
            if ((dims.find((x) => x.dimension === d)?.score ?? 0) > 40) return false;
          }
        }
        return true;
      });
      if (matching.length === 0) continue;

      let hits = 0;
      for (const r of matching) {
        const expectedTier = cond.expectedTier ?? 'recommended';
        if (expectedTier === 'recommended' && r.recommendedCategories.some((c) => c.slug === slug)) hits++;
        if (expectedTier === 'cautious' && r.cautiousCategories.some((c) => c.slug === slug)) hits++;
      }
      if (hits / matching.length >= 0.5) goldenHits++;
    }
  }
  score += goldenTotal > 0 ? (goldenHits / goldenTotal) * 30 : 15;

  // 2. 分布多样性 (0-20)
  const allRecSlugs = new Set<string>();
  results.forEach((r) => r.recommendedCategories.forEach((c) => allRecSlugs.add(c.slug)));
  const coverage = allRecSlugs.size / Object.keys(MAJOR_PROFILES).length;
  score += coverage * 20;

  // 3. 逻辑一致性：低数学的用户不应被高推STEM (0-20)
  let contradictions = 0;
  for (const r of results) {
    const mathScore = r.dimensions.find((d) => d.dimension === 'math_logic')?.score ?? 50;
    const stemRec = r.recommendedCategories.filter((c) =>
      ['计算机类', '电子信息类', '自动化类', '机械类', '电气类', '土木类'].includes(c.name));
    if (stemRec.length >= 2 && mathScore < 20) contradictions++;
  }
  const contradictionPct = n > 0 ? contradictions / n : 0;
  score += (1 - contradictionPct) * 20;

  // 4. 异常数量惩罚 (-15~0)
  let anomalyPenalty = 0;
  for (const r of results) {
    // 重叠检查
    const recNames = new Set(r.recommendedCategories.map((c) => c.name));
    if (r.cautiousCategories.some((c) => recNames.has(c.name))) anomalyPenalty += 0.5;
    // 集中度
    if (r.recommendedCategories.length > 1 && recNames.size <= 1) anomalyPenalty += 1;
  }
  anomalyPenalty = Math.min(15, anomalyPenalty * (100 / Math.max(1, n)));
  score -= anomalyPenalty;

  // 5. 用户兴趣匹配 (0-15)
  let interestMatches = 0;
  for (let i = 0; i < results.length; i++) {
    const profile = profiles[i % profiles.length];
    const recSlugs = new Set(results[i].recommendedCategories.map((c) => c.slug));
    const hits = profile.interestSlugs.filter((s) => recSlugs.has(s));
    if (hits.length > 0) interestMatches++;
  }
  score += n > 0 ? (interestMatches / n) * 15 : 7;

  return Math.round(Math.max(0, Math.min(100, score)));
}

// ═══════════════════════════════════════════════
// 遗传算法
// ═══════════════════════════════════════════════

interface Candidate {
  params: TunableParams;
  score: number;
  generationBorn: number;
}

async function evolve(opts: EvolveOptions) {
  const rng = new SeededRandom(opts.seed);
  const bank = questionBank;
  const outDir = path.resolve('simulation-results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n🧬 参数进化器`);
  console.log(`   generations=${opts.generations}  population=${opts.population}  runs-per-candidate=${opts.runsPerCandidate}`);
  console.log(`   seed=${opts.seed}  useApi=${opts.useApi}\n`);

  // 初始化种群
  let population: Candidate[] = [];
  for (let i = 0; i < opts.population; i++) {
    const params = randomParams(rng);
    population.push({ params, score: 0, generationBorn: 0 });
  }

  const generationScores: number[] = [];
  let bestEver: Candidate = population[0];
  const initialScore = 0; // will be set after first evaluation

  for (let gen = 0; gen < opts.generations; gen++) {
    console.log(`  Generation ${gen + 1}/${opts.generations}...`);

    // 评估每代
    for (const candidate of population) {
      const results: RecommendationResult[] = [];
      for (let i = 0; i < opts.runsPerCandidate; i++) {
        const profile = VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length];
        const result = simulateUser(profile, candidate.params, bank, rng);
        results.push(result);
      }
      const profiles = Array.from({ length: opts.runsPerCandidate }, (_, i) => VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length]);
      candidate.score = scoreParams(candidate.params, results, profiles);
    }

    // 排序
    population.sort((a, b) => b.score - a.score);
    const genBest = population[0];
    generationScores.push(genBest.score);
    console.log(`    best=${genBest.score}  avg=${Math.round(population.reduce((s, c) => s + c.score, 0) / population.length)}`);

    if (genBest.score > bestEver.score) {
      bestEver = { ...genBest, generationBorn: gen };
    }

    // 精英保留
    const eliteCount = Math.max(2, Math.floor(opts.population * 0.1));
    const elites = population.slice(0, eliteCount);

    // 下一代
    const nextGen: Candidate[] = [...elites];
    while (nextGen.length < opts.population) {
      const parentA = population[Math.floor(rng.next() * Math.min(10, population.length))];
      const parentB = population[Math.floor(rng.next() * Math.min(10, population.length))];
      let child = crossover(parentA.params, parentB.params, rng);
      child = mutateParams(child, rng, 1 - gen / opts.generations);
      nextGen.push({ params: child, score: 0, generationBorn: gen + 1 });
    }

    population = nextGen.slice(0, opts.population);
  }

  // ── 最终评分 ──
  const finalResults: RecommendationResult[] = [];
  for (let i = 0; i < opts.runsPerCandidate; i++) {
    const profile = VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length];
    finalResults.push(simulateUser(profile, bestEver.params, bank, rng));
  }
  const finalProfiles = Array.from({ length: opts.runsPerCandidate }, (_, i) => VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length]);
  bestEver.score = scoreParams(bestEver.params, finalResults, finalProfiles);

  // 默认参数评分
  const defaultParams: TunableParams = {
    generalCount: 8, singleMainBranch: 6, leadGap: 8,
    highThreshold: 62, midThreshold: 55,
    rawWeight: 0.4, dimWeight: 0.6,
    recommendThreshold: 55, optionalThreshold: 35,
    riskPenaltyMultiplier: 1.0, maxRecommended: 5, diversityBonus: 0,
  };
  const defaultResults: RecommendationResult[] = [];
  for (let i = 0; i < opts.runsPerCandidate; i++) {
    const profile = VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length];
    defaultResults.push(simulateUser(profile, defaultParams, bank, rng));
  }
  const defaultScore = scoreParams(defaultParams, defaultResults, finalProfiles);

  // ── 输出文件 ──

  // best-params-candidate.json
  const paramDiff: Record<string, { before: number; after: number; delta: string }> = {};
  for (const [key] of Object.entries(PARAM_SPACE)) {
    const before = (defaultParams as any)[key];
    const after = (bestEver.params as any)[key];
    if (before !== after) {
      paramDiff[key] = {
        before,
        after,
        delta: after > before ? `+${(after - before).toFixed(2)}` : `${(after - before).toFixed(2)}`,
      };
    }
  }

  fs.writeFileSync(
    path.join(outDir, 'best-params-candidate.json'),
    JSON.stringify({
      score: bestEver.score,
      defaultScore,
      scoreImprovement: bestEver.score - defaultScore,
      params: bestEver.params,
      paramDiff,
      generationBorn: bestEver.generationBorn,
      generations: opts.generations,
      population: opts.population,
      runsPerCandidate: opts.runsPerCandidate,
      seed: opts.seed,
      note: '⚠️ 此文件为自动生成的候选参数，仅供人工审核，不直接覆盖线上参数。',
    }, null, 2),
  );
  console.log(`\n✅ simulation-results/best-params-candidate.json`);

  // evolution-report.md
  const report = buildEvolutionReport(
    opts, generationScores, bestEver, defaultScore, defaultParams, paramDiff,
    finalResults, VIRTUAL_PROFILES,
  );
  fs.writeFileSync(path.join(outDir, 'evolution-report.md'), report);
  console.log('✅ simulation-results/evolution-report.md');

  console.log(`\n✨ 进化完成！最佳分数: ${bestEver.score} (默认: ${defaultScore}, 改进: ${bestEver.score > defaultScore ? '+' : ''}${bestEver.score - defaultScore})\n`);
}

// ═══════════════════════════════════════════════
// 进化报告
// ═══════════════════════════════════════════════

function buildEvolutionReport(
  opts: EvolveOptions,
  genScores: number[],
  bestEver: Candidate,
  defaultScore: number,
  defaultParams: TunableParams,
  paramDiff: Record<string, { before: number; after: number; delta: string }>,
  finalResults: RecommendationResult[],
  profiles: VirtualProfile[],
): string {
  const lines = [
    `# 参数进化报告`,
    ``,
    `> 生成时间：${new Date().toISOString()}  |  代数：${opts.generations}  |  种群：${opts.population}  |  每候选模拟数：${opts.runsPerCandidate}`,
    `> 种子：${opts.seed}  |  API：${opts.useApi ? '开启' : '关闭'}`,
    ``,
    `## 📊 初始参数评分`,
    ``,
    `- 默认参数评分：**${defaultScore}** / 100`,
    ``,
    `## 📈 各代最高分`,
    ``,
  ];

  for (let i = 0; i < genScores.length; i++) {
    const bar = '█'.repeat(Math.round(genScores[i] / 2));
    lines.push(`- Gen ${i + 1}: **${genScores[i]}** ${bar}`);
  }

  lines.push(``, `## 🏆 最终最佳分数`, ``,
    `- 最佳分数：**${bestEver.score}** / 100`,
    `- 默认分数：${defaultScore}`,
    `- 改进：${bestEver.score > defaultScore ? '+' : ''}${bestEver.score - defaultScore}`,
    `- 诞生代数：第 ${bestEver.generationBorn + 1} 代`,
    ``,
    `## 🔧 参数变化摘要`,
    ``,
  );

  if (Object.keys(paramDiff).length === 0) {
    lines.push(`未发现明显参数变化。最佳候选参数与默认参数相同。`);
  } else {
    lines.push(`| 参数 | 默认值 | 候选值 | 变化 |`, `|------|:------:|:------:|:----:|`);
    for (const [key, diff] of Object.entries(paramDiff)) {
      lines.push(`| ${key} | ${diff.before} | ${diff.after} | ${diff.delta} |`);
    }
  }

  lines.push(``, `## ✅ 改善了哪些问题`, ``);
  const improvements: string[] = [];
  if (bestEver.score > defaultScore + 5) {
    improvements.push('整体评分显著提升，候选参数在综合指标上优于默认参数。');
  }
  if ((bestEver.params as any).diversityBonus > 0) {
    improvements.push('多样性奖励参数 > 0，有助于避免推荐结果过度集中。');
  }
  if ((bestEver.params as any).recommendThreshold > defaultParams.recommendThreshold) {
    improvements.push('推荐阈值提高，减少了质量不高的推荐进入"优先了解"列表。');
  }
  if ((bestEver.params as any).riskPenaltyMultiplier > defaultParams.riskPenaltyMultiplier) {
    improvements.push('避坑惩罚力度加大，谨慎列表更加准确。');
  }
  if (improvements.length === 0) improvements.push('与默认参数相比无显著改善。');
  improvements.forEach((imp) => lines.push(`- ${imp}`));

  lines.push(``, `## ⚠️ 仍然存在的问题`, ``);
  const issues: string[] = [];
  const allCatSlugs = Object.keys(MAJOR_PROFILES);
  const recSlugs = new Set<string>();
  finalResults.forEach((r) => r.recommendedCategories.forEach((c) => recSlugs.add(c.slug)));
  const neverRec = allCatSlugs.filter((s) => !recSlugs.has(s));
  if (neverRec.length > 0) {
    issues.push(`仍有 ${neverRec.length} 个专业类从未被推荐：${neverRec.map((s) => MAJOR_PROFILES[s]?.name ?? s).slice(0, 5).join('、')}`);
  }
  const concentrated = Object.entries(
    finalResults.reduce((acc: Record<string, number>, r) => {
      r.recommendedCategories.forEach((c) => { acc[c.slug] = (acc[c.slug] ?? 0) + 1; });
      return acc;
    }, {}),
  ).filter(([, c]) => c / finalResults.length > 0.5);
  if (concentrated.length > 0) {
    issues.push(`部分专业推荐过度集中：${concentrated.map(([s]) => MAJOR_PROFILES[s]?.name ?? s).join('、')}`);
  }
  if (issues.length === 0) issues.push('当前候选参数下未发现显著问题。');
  issues.forEach((iss) => lines.push(`- ${iss}`));

  lines.push(``, `## 🤔 是否建议人工采用`, ``);
  if (bestEver.score > defaultScore + 10) {
    lines.push(`✅ **建议采用。** 候选参数在多项指标上显著优于默认参数，建议人工复核后替换。`);
  } else if (bestEver.score > defaultScore) {
    lines.push(`🟡 **可考虑采用。** 候选参数略有改善，但提升不大。建议人工复核后决定是否替换。`);
  } else {
    lines.push(`❌ **不建议采用。** 候选参数未优于默认参数，建议继续调整算法或增加模拟次数。`);
  }

  lines.push(``, `## 🔍 人工复核重点`, ``,
    `1. 检查 \`best-params-candidate.json\` 中各参数变化幅度是否合理`,
    `2. 对候选参数运行 \`npm run simulate -- --runs 200\` 验证稳定性`,
    `3. 重点检查"从未被推荐的专业"列表——是否遗漏了重要方向`,
    `4. 验证推荐/谨慎列表重叠率是否在可接受范围`,
    `5. 对照 \`src/data/recommendationWeights.ts\` 确认候选参数不会破坏已有规则`,
    ``,
    `> ⚠️ 本报告和候选参数文件仅用于辅助调参决策，不直接修改线上配置。`,
  );

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════

evolve(parseArgs()).catch(console.error);
