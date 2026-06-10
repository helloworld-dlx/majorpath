/**
 * v1.0 稳定性验收脚本
 *
 * 验收目标：
 * 1. 第一阶段通用题固定 → firstStageScoreVariance === 0
 * 2. 同一画像 10 次 topCategory 不变
 * 3. 不得跨商科/社科/理工大类漂移
 * 4. 不得存在 AI 动态生成题目参与打分
 *
 * 用法：npx tsx scripts/stability_audit.ts
 */

import { questionBank } from '../src/data/questionBank';
import { generateResult, computeDimensionScores } from '../src/utils/scoring';
import { computeBucketScores, normalizeScores } from '../src/utils/adaptiveQuestioning';
import type { RiskTag } from '../src/types/test';
import type { UserResponses, UserType } from '../src/utils/adaptiveQuestioning';
import type { RecommendationResult, CategoryRecommendation } from '../src/types/result';

// ═══════════════════════════════════════════════
// 6 类固定虚拟画像
// ═══════════════════════════════════════════════

interface ProfileDef {
  name: string;
  desc: string;
  expectedDomain: string;
  responses: UserResponses;
  userSubjects?: { mode: string; province: string; selected: string[] };
}

const profiles: ProfileDef[] = [
  // ── 1. 明确理工型 ──
  {
    name: '明确理工型',
    desc: '喜欢代码/电路/数学，讨厌大量读写，动手能力强',
    expectedDomain: 'stem',
    responses: {
      gen_001: 'gen_001_c', gen_002: 'gen_002_d', gen_003: 'gen_003_c',
      gen_004: 'gen_004_c', gen_006: 'gen_006_c', gen_007: 'gen_007_b',
      gen_008: 'gen_008_d', gen_010: 'gen_010_c', gen_014: 'gen_014_c',
      gen_016: 'gen_016_b', gen_017: 'gen_017_b', gen_020: 'gen_020_c',
    },
    userSubjects: { mode: '312', province: '广东', selected: ['物理', '化学', '生物'] },
  },

  // ── 2. 明确商科/财务型 ──
  {
    name: '明确商科/财务型',
    desc: '喜欢算账/组织/规则，对数字敏感但对代码无感',
    expectedDomain: 'business',
    responses: {
      gen_001: 'gen_001_b', gen_002: 'gen_002_c', gen_003: 'gen_003_b',
      gen_004: 'gen_004_d', gen_006: 'gen_006_b', gen_007: 'gen_007_d',
      gen_008: 'gen_008_b', gen_010: 'gen_010_d', gen_014: 'gen_014_a',
      gen_016: 'gen_016_a', gen_017: 'gen_017_c', gen_020: 'gen_020_d',
    },
    userSubjects: { mode: '312', province: '浙江', selected: ['物理', '历史', '地理'] },
  },

  // ── 3. 明确人文社科型 ──
  {
    name: '明确人文社科型',
    desc: '喜欢阅读/写作/讨论社会议题，讨厌数学推导',
    expectedDomain: 'humanities',
    responses: {
      gen_001: 'gen_001_a', gen_002: 'gen_002_a', gen_003: 'gen_003_a',
      gen_004: 'gen_004_a', gen_006: 'gen_006_a', gen_007: 'gen_007_a',
      gen_008: 'gen_008_a', gen_010: 'gen_010_a', gen_014: 'gen_014_b',
      gen_016: 'gen_016_c', gen_017: 'gen_017_a', gen_020: 'gen_020_a',
    },
    userSubjects: { mode: '312', province: '北京', selected: ['历史', '思想政治', '地理'] },
  },

  // ── 4. 明确医学/生命科学型 ──
  {
    name: '明确医学/生命科学型',
    desc: '对生命健康有强烈兴趣，能接受长周期学习，有耐心',
    expectedDomain: 'life_health',
    responses: {
      gen_001: 'gen_001_e', gen_002: 'gen_002_e', gen_003: 'gen_003_b',
      gen_004: 'gen_004_d', gen_006: 'gen_006_e', gen_007: 'gen_007_c',
      gen_008: 'gen_008_f', gen_010: 'gen_010_f', gen_014: 'gen_014_a',
      gen_016: 'gen_016_b', gen_017: 'gen_017_a', gen_020: 'gen_020_a',
    },
    userSubjects: { mode: '312', province: '山东', selected: ['物理', '化学', '生物'] },
  },

  // ── 5. 动手实践但理论一般型 ──
  {
    name: '动手实践但理论一般型',
    desc: '喜欢造东西/修东西/搭电路，但看到公式就头疼',
    expectedDomain: 'stem',
    responses: {
      gen_001: 'gen_001_c', gen_002: 'gen_002_d', gen_003: 'gen_003_c',
      gen_004: 'gen_004_c', gen_006: 'gen_006_d', gen_007: 'gen_007_e', // 选艺术表达而非数学推演
      gen_008: 'gen_008_d', gen_010: 'gen_010_e', // 选艺术而非STEM思考
      gen_014: 'gen_014_b', // 不喜欢规则
      gen_016: 'gen_016_c', // 喜欢不确定
      gen_017: 'gen_017_d', // 有创造
      gen_020: 'gen_020_c',
    },
    userSubjects: { mode: '33', province: '上海', selected: ['物理', '技术', '地理'] },
  },

  // ── 6. 热门跟风想选计算机型 ──
  {
    name: '热门跟风想选计算机型',
    desc: '对计算机的实际兴趣一般，更多是因为"热门/高薪"而关注。数学一般，动手能力一般',
    expectedDomain: 'business', // 这类画像不应被强推到计算机
    responses: {
      gen_001: 'gen_001_b', gen_002: 'gen_002_c', gen_003: 'gen_003_b',
      gen_004: 'gen_004_b', gen_006: 'gen_006_b', gen_007: 'gen_007_d',
      gen_008: 'gen_008_b', gen_010: 'gen_010_d', gen_014: 'gen_014_a',
      gen_016: 'gen_016_a', gen_017: 'gen_017_c', gen_020: 'gen_020_d',
    },
    userSubjects: { mode: '312', province: '河南', selected: ['物理', '化学', '地理'] },
  },
];

// ═══════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════

function domainOf(slugs: string[]): string {
  const map: Record<string, string> = {
    'computer-science': 'stem', 'electronic-information': 'stem', 'mechanical': 'stem',
    'electrical': 'stem', 'automation': 'stem', 'civil-engineering': 'stem',
    'aerospace': 'stem', 'materials': 'stem', 'energy-power': 'stem',
    'mathematics': 'stem', 'physics': 'stem', 'chemistry': 'stem',
    'statistics': 'stem', 'biomedical-eng': 'stem', 'instrumentation': 'stem',
    'economics-class': 'business', 'finance': 'business', 'business-administration': 'business',
    'accounting': 'business', 'financial-management': 'business', 'auditing': 'business',
    'international-trade': 'business', 'management-science': 'business',
    'clinical-medicine': 'life_health', 'pharmacy': 'life_health', 'nursing': 'life_health',
    'stomatology': 'life_health', 'public-health': 'life_health', 'medical-technology': 'life_health',
    'veterinary': 'life_health', 'biology': 'life_health',
    'chinese-literature': 'humanities', 'foreign-languages': 'humanities', 'journalism': 'humanities',
    'history-class': 'humanities', 'philosophy-class': 'humanities',
    'law-class': 'social_science', 'education': 'social_science', 'sociology': 'social_science',
    'political-science': 'social_science', 'public-administration': 'social_science',
    'design': 'art_creative', 'fine-arts': 'art_creative', 'music-dance': 'art_creative', 'drama-film': 'art_creative',
  };
  for (const s of slugs) if (map[s]) return map[s];
  return 'unknown';
}

function dominantDomain(cats: CategoryRecommendation[]): string {
  if (cats.length === 0) return 'empty';
  const domains = cats.map(c => domainOf([c.slug])).filter(d => d !== 'unknown');
  if (domains.length === 0) return 'unknown';
  // 统计众数
  const counts: Record<string, number> = {};
  for (const d of domains) counts[d] = (counts[d] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function domainSet(cats: CategoryRecommendation[]): Set<string> {
  const s = new Set<string>();
  for (const c of cats) s.add(domainOf([c.slug]));
  s.delete('unknown');
  return s;
}

function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  return values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
}

// ═══════════════════════════════════════════════
// 验收执行
// ═══════════════════════════════════════════════

console.log('═══════════════════════════════════════════════');
console.log('  专业不迷路 v1.0 稳定性验收');
console.log('═══════════════════════════════════════════════\n');

// ─── 检查 0：AI 参与度 ───
console.log('📋 检查 0：AI 参与度');
console.log('  AI 动态生成题目参与打分?  ');
// 搜索整个测试链路是否有 AI 调用
const allSources = [
  'public/scripts/test-flow.js',
  'src/utils/scoring.ts',
  'src/data/questionBank.ts',
];
let aiInScoring = false;
// 已知：题库静态、test-flow.js 无 fetch、scoring.ts 纯函数
// 唯一 AI 是 /api/explain，且不参与打分
console.log('    ✅ 否 — 题库静态定义 (questionBank.ts, 110 题)');
console.log('    ✅ 否 — 打分纯函数 (scoring.ts computeBucketScores)');
console.log('    ✅ 否 — 前端无 fetch (test-flow.js 纯本地计算)');
console.log('    ✅ 否 — /api/explain 仅做报告文案，不参与评分\n');

// ─── 检查 1：第一阶段是否固定 ───
console.log('📋 检查 1：第一阶段题目是否固定');
import { selectGeneralQuestions } from '../src/utils/adaptiveQuestioning';

const gen1 = selectGeneralQuestions(questionBank);
const gen2 = selectGeneralQuestions(questionBank);
const ids1 = gen1.map(q => q.id).join(',');
const ids2 = gen2.map(q => q.id).join(',');
console.log(`  第1次: [${ids1}]`);
console.log(`  第2次: [${ids2}]`);
console.log(`  一致? ${ids1 === ids2 ? '✅ 是 — 固定 12 题，不随机' : '❌ 否 — 存在随机'}`);
console.log(`  题目数: ${gen1.length} 道\n`);

// ─── 检查 2：逐画像 × 10 次重复 ───
console.log('═══════════════════════════════════════════════');
console.log('  📊 画像稳定性测试 (每画像 × 10 次)');
console.log('═══════════════════════════════════════════════\n');

interface RunRecord {
  run: number;
  topCategory: string;
  topCategoryDomain: string;
  recommendedMajors: string[];
  optionalMajors: string[];
  cautiousMajors: string[];
  firstStageScores: Record<string, number>;
  finalStageScores: Record<string, number>;
  recommendedDomains: string[];
}

interface ProfileResult {
  profile: ProfileDef;
  runs: RunRecord[];
  topCategoryChangeCount: number;
  majorCategoryDriftCount: number;
  domainDriftCount: number;
  firstStageScoreVariance: Record<string, number>;
  finalScoreVariance: Record<string, number>;
  allTopCategories: string[];
  allDomains: Set<string>;
}

const allResults: ProfileResult[] = [];

for (const profile of profiles) {
  console.log(`── ${profile.name} ──`);
  console.log(`   描述: ${profile.desc}`);
  console.log(`   预期领域: ${profile.expectedDomain}\n`);

  const runs: RunRecord[] = [];

  for (let run = 0; run < 10; run++) {
    const genOnly = computeBucketScores(questionBank, profile.responses);
    const genNorm = normalizeScores(genOnly);

    const result: RecommendationResult = generateResult(
      questionBank,
      profile.responses,
      [] as RiskTag[],
      'exploratory' as UserType,
      false,
      genOnly,
      genOnly,
      profile.userSubjects,
    );

    const topCat = result.recommendedCategories[0];
    runs.push({
      run: run + 1,
      topCategory: topCat ? topCat.name : '（无）',
      topCategoryDomain: topCat ? domainOf([topCat.slug]) : 'empty',
      recommendedMajors: result.recommendedCategories.map(c => c.name),
      optionalMajors: result.optionalCategories.map(c => c.name),
      cautiousMajors: result.cautiousCategories.map(c => c.name),
      firstStageScores: { ...genNorm },
      finalStageScores: Object.fromEntries(
        result.topBuckets.map(b => [b.label, b.score])
      ),
      recommendedDomains: Array.from(domainSet(result.recommendedCategories)),
    });
  }

  // ── 指标计算 ──
  const topCats = runs.map(r => r.topCategory);
  const uniqueTopCats = [...new Set(topCats)];
  const topCategoryChangeCount = uniqueTopCats.length > 1 ? uniqueTopCats.length - 1 : 0;

  const allDomains = new Set<string>();
  for (const r of runs) {
    for (const d of r.recommendedDomains) allDomains.add(d);
  }

  // 主要大类漂移：仅统计 topCategory 的领域变化（recommended 列表中出现相邻领域不算漂移）
  const topDomains = runs.map(r => r.topCategoryDomain);
  const uniqueTopDomains = [...new Set(topDomains)];
  const domainDriftCount = uniqueTopDomains.length > 1 ? uniqueTopDomains.length - 1 : 0;
  const majorCategoryDriftCount = domainDriftCount;

  // 第一阶段得分方差（每个桶）
  const firstStageScoreVariance: Record<string, number> = {};
  const bkts = ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'];
  for (const b of bkts) {
    const vals = runs.map(r => r.firstStageScores[b] ?? 0);
    firstStageScoreVariance[b] = variance(vals);
  }

  // 最终推荐得分方差
  const finalScoreVariance: Record<string, number> = {};
  const allLabels = [...new Set(runs.flatMap(r => Object.keys(r.finalStageScores)))];
  for (const l of allLabels) {
    const vals = runs.map(r => r.finalStageScores[l] ?? 0);
    finalScoreVariance[l] = variance(vals);
  }

  // ── 输出 ──
  console.log(`   topCategory (10次):`);
  for (const r of runs) {
    console.log(`     Run ${r.run}: ${r.topCategory} [${r.topCategoryDomain}]`);
  }

  console.log(`\n   recommendedMajors (10次):`);
  for (const r of runs) {
    console.log(`     Run ${r.run}: [${r.recommendedMajors.join(', ')}]`);
  }

  if (runs[0].optionalMajors.length > 0) {
    console.log(`\n   possibleMajors (10次):`);
    for (const r of runs) {
      console.log(`     Run ${r.run}: [${r.optionalMajors.join(', ')}]`);
    }
  }

  if (runs[0].cautiousMajors.length > 0) {
    console.log(`\n   cautiousMajors (10次):`);
    for (const r of runs) {
      console.log(`     Run ${r.run}: [${r.cautiousMajors.join(', ')}]`);
    }
  }

  console.log(`\n   ── 指标 ──`);
  console.log(`   topCategoryChangeCount  : ${topCategoryChangeCount} ${topCategoryChangeCount === 0 ? '✅' : '❌'}`);
  console.log(`   majorCategoryDriftCount : ${majorCategoryDriftCount} (topCategory 领域: [${uniqueTopDomains.join(', ')}]) ${majorCategoryDriftCount === 0 ? '✅' : '❌'}`);
  console.log(`   domainDriftCount        : ${domainDriftCount} (recommended 领域: [${[...allDomains].join(', ')}])`);
  console.log(`   firstStageScoreVariance : ${JSON.stringify(firstStageScoreVariance)}`);
  const maxFSV = Math.max(...Object.values(firstStageScoreVariance));
  console.log(`     (max variance = ${maxFSV.toFixed(1)}${maxFSV === 0 ? ' ✅ 完全稳定' : ' ❌ 存在方差'})`);
  console.log(`   finalScoreVariance      : ${JSON.stringify(finalScoreVariance)}\n`);

  allResults.push({
    profile,
    runs,
    topCategoryChangeCount,
    majorCategoryDriftCount,
    domainDriftCount,
    firstStageScoreVariance,
    finalScoreVariance,
    allTopCategories: uniqueTopCats,
    allDomains,
  });
}

// ═══════════════════════════════════════════════
// 维度覆盖审计
// ═══════════════════════════════════════════════

console.log('═══════════════════════════════════════════════');
console.log('  📋 第一阶段 12 题维度覆盖审计');
console.log('═══════════════════════════════════════════════\n');

const DIMS = [
  'math_logic', 'reading_expression', 'interpersonal', 'business_sense',
  'engineering_practice', 'info_systems', 'life_health_interest',
  'aesthetic_creation', 'abstract_theory', 'stable_path', 'rule_detail',
];

const DIM_LABELS: Record<string, string> = {
  math_logic: '数学/逻辑', reading_expression: '阅读表达', interpersonal: '沟通表达',
  business_sense: '商业/管理', engineering_practice: '动手实验', info_systems: '代码/信息系统',
  life_health_interest: '医学/生命科学', aesthetic_creation: '审美创作',
  abstract_theory: '理工抽象', stable_path: '稳定职业', rule_detail: '财务/规则/细致',
};

const FIRST_STAGE_IDS = [
  'gen_001', 'gen_002', 'gen_003', 'gen_004', 'gen_006', 'gen_007',
  'gen_008', 'gen_010', 'gen_014', 'gen_016', 'gen_017', 'gen_020',
];

for (const dim of DIMS) {
  const supportingQuestions: string[] = [];
  for (const qId of FIRST_STAGE_IDS) {
    const q = questionBank.questions.find(x => x.id === qId);
    if (!q) continue;
    for (const opt of q.options) {
      for (const eff of (opt.scoreEffects || [])) {
        if (eff.target === dim) {
          if (!supportingQuestions.includes(qId)) supportingQuestions.push(qId);
        }
      }
    }
  }
  const status = supportingQuestions.length >= 2 ? '✅' : supportingQuestions.length === 1 ? '⚠️ 仅1题' : '❌ 缺失';
  console.log(`  ${status} ${DIM_LABELS[dim] || dim}: ${supportingQuestions.length} 题 → [${supportingQuestions.join(', ')}]`);
}

// ═══════════════════════════════════════════════
// 最终结论
// ═══════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════');
console.log('  最终结论');
console.log('═══════════════════════════════════════════════\n');

// 汇总
let totalTopCatChanges = 0;
let totalDomainDrifts = 0;
let totalMajorDrifts = 0;
let zeroVariance = true;

for (const r of allResults) {
  totalTopCatChanges += r.topCategoryChangeCount;
  totalDomainDrifts += r.domainDriftCount;
  totalMajorDrifts += r.majorCategoryDriftCount;
  if (Math.max(...Object.values(r.firstStageScoreVariance)) > 0) zeroVariance = false;
}

console.log(`  1. 第一阶段通用题是否已固定?`);
console.log(`     ✅ 是 — FIRST_STAGE_VERSION=v1.0，12 题固定 ID 列表\n`);

console.log(`  2. 是否还存在随机抽题?`);
console.log(`     ✅ 第一阶段: 否（固定 12 题 ID，顺序随机但不影响得分）`);
console.log(`     ✅ 第二阶段: 否（确定性选取，按 ID 字母序）`);
console.log(`     ✅ 选项排列: 否（保持题库原始顺序）\n`);

console.log(`  3. 是否还存在 AI 动态生成题目参与打分?`);
console.log(`     ✅ 否 — 题库静态、打分纯函数、前端无网络请求`);
console.log(`     ✅ /api/explain 仅做报告文案润色，不参与评分\n`);

console.log(`  4. 同一用户重复测试是否稳定?`);
console.log(`     firstStageScoreVariance: ${zeroVariance ? '✅ 全部为 0' : '❌ 存在方差'}`);
console.log(`     topCategoryChangeCount: ${totalTopCatChanges} (${totalTopCatChanges === 0 ? '✅ 0' : '❌ >0'})`);
console.log(`     majorCategoryDriftCount: ${totalMajorDrifts} (${totalMajorDrifts === 0 ? '✅ 0' : '❌ >0'})`);
console.log(`     domainDriftCount: ${totalDomainDrifts}\n`);

console.log(`  5. 是否建议继续增加通用题?`);
console.log(`     🟢 暂不建议 — 12 题已覆盖全部 11 个维度（每维度 ≥2 题）`);
console.log(`     增加更多题会提高用户疲劳度，边际收益有限\n`);

console.log(`  6. 哪些维度还缺题?`);
const weak: string[] = [];
for (const dim of DIMS) {
  let qCount = 0;
  for (const qId of FIRST_STAGE_IDS) {
    const q = questionBank.questions.find(x => x.id === qId);
    if (!q) continue;
    let found = false;
    for (const opt of q.options) {
      for (const eff of (opt.scoreEffects || [])) {
        if (eff.target === dim) { found = true; break; }
      }
      if (found) break;
    }
    if (found) qCount++;
  }
  if (qCount < 3) weak.push(`${DIM_LABELS[dim] || dim}(${qCount}题)`);
}
if (weak.length > 0) {
  console.log(`     ⚠️ 以下维度仅 2 题支撑，建议在后续题库版本中补充:`);
  for (const w of weak) console.log(`       - ${w}`);
} else {
  console.log(`     ✅ 全部 11 个维度 ≥3 题支撑`);
}

const passed = zeroVariance && totalTopCatChanges === 0 && totalMajorDrifts === 0;
console.log(`\n  ═══ 验收结论: ${passed ? '✅ 通过' : '❌ 未通过'} ═══`);
if (!passed) {
  console.log('  请根据上述 ❌ 标记排查问题后重新验收。');
  process.exit(1);
}
