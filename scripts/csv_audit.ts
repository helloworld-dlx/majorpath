/**
 * 大规模虚拟用户CSV审计脚本
 * 用法: npx tsx scripts/csv_audit.ts [种子起始值] [用户数量]
 * 示例: npx tsx scripts/csv_audit.ts 7865 300
 */

import { questionBank } from '../src/data/questionBank';
import { generateResult } from '../src/utils/scoring';
import { computeBucketScores, normalizeScores } from '../src/utils/adaptiveQuestioning';
import type { RiskTag } from '../src/types/test';
import type { UserResponses, UserType } from '../src/utils/adaptiveQuestioning';
import type { RecommendationResult, CategoryRecommendation } from '../src/types/result';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const START_SEED = parseInt(process.argv[2] || '7865', 10);
const USER_COUNT = parseInt(process.argv[3] || '300', 10);
const RUNS_PER_USER = 10;

//═══════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════

function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  return values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
}

function domainOf(slug: string): string {
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
  return map[slug] || 'unknown';
}

function domainOfList(slugs: string[]): string {
  const domains = slugs.map(domainOf).filter(d => d !== 'unknown');
  if (domains.length === 0) return 'unknown';
  const counts: Record<string, number> = {};
  for (const d of domains) counts[d] = (counts[d] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ═══════════════════════════════════════════════════════════════
// 确定性虚拟用户生成
// ═══════════════════════════════════════════════════════════════

const genOptions: Record<string, string[]> = {
  gen_001: ['gen_001_a', 'gen_001_b', 'gen_001_c', 'gen_001_d', 'gen_001_e'],
  gen_002: ['gen_002_a', 'gen_002_b', 'gen_002_c', 'gen_002_d', 'gen_002_e', 'gen_002_f'],
  gen_003: ['gen_003_a', 'gen_003_b', 'gen_003_c', 'gen_003_d'],
  gen_004: ['gen_004_a', 'gen_004_b', 'gen_004_c', 'gen_004_d'],
  gen_006: ['gen_006_a', 'gen_006_b', 'gen_006_c', 'gen_006_d', 'gen_006_e'],
  gen_007: ['gen_007_a', 'gen_007_b', 'gen_007_c', 'gen_007_d', 'gen_007_e'],
  gen_008: ['gen_008_a', 'gen_008_b', 'gen_008_c', 'gen_008_d', 'gen_008_e', 'gen_008_f'],
  gen_010: ['gen_010_a', 'gen_010_b', 'gen_010_c', 'gen_010_d', 'gen_010_e', 'gen_010_f'],
  gen_014: ['gen_014_a', 'gen_014_b', 'gen_014_c'],
  gen_016: ['gen_016_a', 'gen_016_b', 'gen_016_c'],
  gen_017: ['gen_017_a', 'gen_017_b', 'gen_017_c', 'gen_017_d', 'gen_017_e'],
  gen_020: ['gen_020_a', 'gen_020_b', 'gen_020_c', 'gen_020_d'],
};

function buildProfile(seed: number): UserResponses {
  // 使用 mulberry32 PRNG — 高质量确定性子序列生成
  function mulberry32(a: number): () => number {
    return function() {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // 每道题使用独立子序列（避免同一 PRNG 流的序列相关性）
  const rng = mulberry32(seed);
  const responses: UserResponses = {};
  const genIds = Object.keys(genOptions);
  for (let i = 0; i < genIds.length; i++) {
    const qId = genIds[i];
    const options = genOptions[qId];
    // 每道题取一个独立随机数（避免选项选取的相关性）
    const r = rng();
    const idx = Math.floor(r * options.length);
    responses[qId] = options[idx];
  }
  return responses;
}

// ═══════════════════════════════════════════════════════════════
// 对一个用户运行 RUNS_PER_USER 次
// ═══════════════════════════════════════════════════════════════

interface UserRunResult {
  topCategory: string;
  topCategoryDomain: string;
  recommendedSlugs: string[];
  optionalSlugs: string[];
  cautiousSlugs: string[];
  firstStageNorm: Record<string, number>;
  topBuckets: { label: string; score: number }[];
}

interface UserAuditResult {
  userSeed: number;
  runs: UserRunResult[];
  topCategoryChangeCount: number;
  topCategoryDomainDrift: number;
  firstStageScoreVariance: Record<string, number>;
  firstStageBucketStddev: Record<string, number>;
  recommendedVariance: number; // recommendedMajors 的 Jaccard 变化次数
  emptyCount: number;
  topCategories: string[];
  topDomains: string[];
  recommendedMajorsStable: boolean;
  recommendedMajorsStableRank1: boolean;
}

function runUserNTimes(userSeed: number): UserAuditResult {
  const responses = buildProfile(userSeed);
  const runs: UserRunResult[] = [];

  for (let run = 0; run < RUNS_PER_USER; run++) {
    const genOnly = computeBucketScores(questionBank, responses);
    const genNorm = normalizeScores(genOnly);

    const result: RecommendationResult = generateResult(
      questionBank,
      responses,
      [] as RiskTag[],
      'exploratory' as UserType,
      false,
      genOnly,
      genOnly,
      undefined,
    );

    const topCat = result.recommendedCategories[0];
    runs.push({
      topCategory: topCat ? topCat.name : '(无)',
      topCategoryDomain: topCat ? domainOf(topCat.slug) : 'empty',
      recommendedSlugs: result.recommendedCategories.map(c => c.slug),
      optionalSlugs: result.optionalCategories.map(c => c.slug),
      cautiousSlugs: result.cautiousCategories.map(c => c.slug),
      firstStageNorm: { ...genNorm },
      topBuckets: result.topBuckets,
    });
  }

  // 指标计算
  const topCats = runs.map(r => r.topCategory);
  const uniqueTopCats = [...new Set(topCats)];
  const topCategoryChangeCount = Math.max(0, uniqueTopCats.length - 1);

  const topDomains = runs.map(r => r.topCategoryDomain);
  const uniqueTopDomains = [...new Set(topDomains)];
  const topCategoryDomainDrift = Math.max(0, uniqueTopDomains.length - 1);

  // 第一阶段方差
  const bkts = ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'];
  const firstStageScoreVariance: Record<string, number> = {};
  const firstStageBucketStddev: Record<string, number> = {};
  for (const b of bkts) {
    const vals = runs.map(r => r.firstStageNorm[b] ?? 0);
    const v = variance(vals);
    firstStageScoreVariance[b] = v;
    firstStageBucketStddev[b] = Math.sqrt(v);
  }

  // recommendedMajors 稳定性（完全一致）
  const allRecSlugSets = runs.map(r => new Set(r.recommendedSlugs));
  const allSameRec = allRecSlugSets.every(s => {
    const first = allRecSlugSets[0];
    if (s.size !== first.size) return false;
    for (const item of s) if (!first.has(item)) return false;
    return true;
  });

  // 第一推荐是否稳定
  const top1Stable = runs.every(r => r.topCategory === runs[0].topCategory);

  const emptyCount = runs.filter(r => r.recommendedSlugs.length === 0).length;

  return {
    userSeed,
    runs,
    topCategoryChangeCount,
    topCategoryDomainDrift,
    firstStageScoreVariance,
    firstStageBucketStddev,
    recommendedVariance: topCategoryChangeCount,
    emptyCount,
    topCategories: uniqueTopCats,
    topDomains: uniqueTopDomains,
    recommendedMajorsStable: allSameRec,
    recommendedMajorsStableRank1: top1Stable,
  };
}

// ═══════════════════════════════════════════════════════════════
// 主循环
// ═══════════════════════════════════════════════════════════════

console.error(`[csv_audit] 开始生成 ${USER_COUNT} 个虚拟用户 (种子 ${START_SEED}～${START_SEED + USER_COUNT - 1})，每人 ${RUNS_PER_USER} 次...\n`);

const results: UserAuditResult[] = [];
for (let i = 0; i < USER_COUNT; i++) {
  const userSeed = START_SEED + i;
  if (i % 50 === 0) console.error(`[csv_audit]进度 ${i}/${USER_COUNT}...`);
  results.push(runUserNTimes(userSeed));
}

console.error(`[csv_audit] 完成，开始生成 CSV...\n`);

// ═══════════════════════════════════════════════════════════════
// CSV 输出
// ═══════════════════════════════════════════════════════════════

const bkts = ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'];

// 汇总行
const totalTopCatChanges = results.reduce((s, r) => s + r.topCategoryChangeCount, 0);
const totalDomainDrifts = results.reduce((s, r) => s + r.topCategoryDomainDrift, 0);
const zeroVarianceUsers = results.filter(r =>
  Object.values(r.firstStageScoreVariance).every(v => v === 0)
).length;
const stableRank1Users = results.filter(r => r.recommendedMajorsStableRank1).length;
const emptyUsers = results.filter(r => r.emptyCount > 0).length;

console.error(`[csv_audit] 汇总统计:`);
console.error(`  总 topCategoryChangeCount: ${totalTopCatChanges}`);
console.error(`  总 topCategoryDomainDrift: ${totalDomainDrifts}`);
console.error(`  firstStageScoreVariance=0 的用户: ${zeroVarianceUsers}/${USER_COUNT}`);
console.error(`  topCategoryRank1 稳定用户: ${stableRank1Users}/${USER_COUNT}`);
console.error(`  有空推荐的用户: ${emptyUsers}/${USER_COUNT}`);

// CSV Header
const headers = [
  'user_seed',
  'topCategory',
  'topCategoryDomain',
  'topCategoryChangeCount',
  'topCategoryDomainDrift',
  'recommendedMajorsStable',
  'recommendedMajorsStableRank1',
  'emptyCount',
  //10 次的 topCategory
  ...Array.from({length: RUNS_PER_USER}, (_, i) => `run${i+1}_topCategory`),
  // 10 次的 recommended majors (join by |)
  ...Array.from({length: RUNS_PER_USER}, (_, i) => `run${i+1}_recommended`),
  // 10 次的 possible majors
  ...Array.from({length: RUNS_PER_USER}, (_, i) => `run${i+1}_possible`),
  // 10 次的 cautious majors
  ...Array.from({length: RUNS_PER_USER}, (_, i) => `run${i+1}_cautious`),
  // 6 个桶的方差
  ...bkts.map(b => `fsVariance_${b}`),
  // 6 个桶的标准差
  ...bkts.map(b => `fsStddev_${b}`),
  // 6 个桶第一阶段归一化得分（取第一次run的值，固定题所以全相同）
  ...bkts.map(b => `fsNorm_${b}`),
];

const csvLines: string[] = [headers.join(',')];

for (const r of results) {
  const first = r.runs[0];
  const row: string[] = [
    String(r.userSeed),
    first.topCategory,
    first.topCategoryDomain,
    String(r.topCategoryChangeCount),
    String(r.topCategoryDomainDrift),
    r.recommendedMajorsStable ? 'TRUE' : 'FALSE',
    r.recommendedMajorsStableRank1 ? 'TRUE' : 'FALSE',
    String(r.emptyCount),
    // topCategory for each run
    ...r.runs.map(run => `"${run.topCategory}"`),
    // recommended for each run
    ...r.runs.map(run => `"${run.recommendedSlugs.join('|')}"`),
    // possible for each run
    ...r.runs.map(run => `"${run.optionalSlugs.join('|')}"`),
    // cautious for each run
    ...r.runs.map(run => `"${run.cautiousSlugs.join('|')}"`),
    // variances
    ...bkts.map(b => String(r.firstStageScoreVariance[b] ?? 0)),
    // stddevs
    ...bkts.map(b => String(r.firstStageBucketStddev[b] ?? 0)),
    // first stage normalized scores (should be same across runs since fixed questions)
    ...bkts.map(b => String(first.firstStageNorm[b] ?? 0)),
  ];
  csvLines.push(row.join(','));
}

const csvContent = csvLines.join('\n');
const outPath = path.join(__dirname, '..', 'stability_audit_300u.csv');
fs.writeFileSync(outPath, '\ufeff' + csvContent, 'utf-8'); // BOM for Excel
console.error(`\n[csv_audit] CSV 已写入: ${outPath}`);
console.error(`  行数（含header）: ${csvLines.length}`);
console.error(`  列数: ${headers.length}`);

// 打印汇总 CSV
console.log(csvContent);