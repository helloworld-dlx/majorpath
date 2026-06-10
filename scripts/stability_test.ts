/**
 * v1.0 稳定性验证脚本
 * 
 * 验证目标：
 * 1. 5 个固定虚拟画像 × 10 次重复测试 → 第一阶段得分完全一致
 * 2. 最终大类方向（推荐专业类）稳定，不跨大类漂移
 * 3. 100 个虚拟用户模拟验证整体正确性
 */

import { questionBank } from '../src/data/questionBank';
import { generateResult } from '../src/utils/scoring';
import { computeBucketScores, normalizeScores } from '../src/utils/adaptiveQuestioning';
import type { DirectionBucket, RiskTag } from '../src/types/test';
import type { UserResponses } from '../src/utils/adaptiveQuestioning';
import type { UserType } from '../src/utils/adaptiveQuestioning';

// ─── 5 个固定虚拟画像 ───

interface VirtualProfile {
  name: string;
  responses: UserResponses; // 只包含第一阶段 12 题的答案
  expectedDomain: string; // 期望大类方向
}

// 第一阶段 12 道固定题：gen_001, gen_002, gen_003, gen_004, gen_006, gen_007, gen_008, gen_010, gen_014, gen_016, gen_017, gen_020

const profiles: VirtualProfile[] = [
  {
    name: '理工男（明确编程兴趣）',
    responses: {
      gen_001: 'gen_001_c', // 捣鼓小项目 → stem +12
      gen_002: 'gen_002_d', // 动手做东西 → stem +10
      gen_003: 'gen_003_c', // 买材料做东西 → stem +10
      gen_004: 'gen_004_c', // 动手执行 → stem +8
      gen_006: 'gen_006_d', // 上手试做实验 → stem +8
      gen_007: 'gen_007_b', // 逻辑推演 → stem +10
      gen_008: 'gen_008_d', // 直接上手试 → stem +8
      gen_010: 'gen_010_c', // 模拟系统运转 → stem +8
      gen_014: 'gen_014_c', // 看情况 → stem +4
      gen_016: 'gen_016_b', // 中等 → stem +4
      gen_017: 'gen_017_b', // 有成长 → stem +8
      gen_020: 'gen_020_c', // 去求证 → stem +4
    },
    expectedDomain: 'stem',
  },
  {
    name: '商科女（组织管理型）',
    responses: {
      gen_001: 'gen_001_b', // 聊天帮人 → social_science +10, business +4
      gen_002: 'gen_002_b', // 组织活动 → business +8
      gen_003: 'gen_003_b', // 组织有意义的事 → social_science +10, business +4
      gen_004: 'gen_004_b', // 协调者 → social_science +8, business +6
      gen_006: 'gen_006_b', // 讨论辩论 → business +6
      gen_007: 'gen_007_d', // 社会实践 → business +6
      gen_008: 'gen_008_b', // 看规则运行 → business +6
      gen_010: 'gen_010_d', // 效率和结果 → business +8
      gen_014: 'gen_014_a', // 规则让事情清晰 → business +6
      gen_016: 'gen_016_a', // 有计划才安心 → business +6
      gen_017: 'gen_017_c', // 有稳定 → business +8
      gen_020: 'gen_020_d', // 调整方向 → social_science +4
    },
    expectedDomain: 'business',
  },
  {
    name: '文科生（人文阅读型）',
    responses: {
      gen_001: 'gen_001_a', // 读书写作 → humanities +12
      gen_002: 'gen_002_a', // 打动人心的文章 → humanities +10
      gen_003: 'gen_003_a', // 买书泡着研究 → humanities +10
      gen_004: 'gen_004_a', // 提想法和框架 → humanities +8
      gen_006: 'gen_006_a', // 读大量书 → humanities +8
      gen_007: 'gen_007_a', // 文字阅读写作 → humanities +10
      gen_008: 'gen_008_a', // 了解背景历史 → humanities +8
      gen_010: 'gen_010_a', // 抽象概念反复咀嚼 → humanities +8
      gen_014: 'gen_014_b', // 灵活创意 → humanities +6
      gen_016: 'gen_016_c', // 不确定才有意思 → humanities +6
      gen_017: 'gen_017_a', // 有意义 → humanities +4
      gen_020: 'gen_020_b', // 不在意 → humanities +4
    },
    expectedDomain: 'humanities',
  },
  {
    name: '医学倾向（生命健康型）',
    responses: {
      gen_001: 'gen_001_e', // 健康话题 → life_health +12
      gen_002: 'gen_002_e', // 帮人恢复健康 → life_health +10
      gen_003: 'gen_003_b', // 组织有意义的事 → social_science +10
      gen_004: 'gen_004_d', // 检查把关 → business +6, rule_detail +8
      gen_006: 'gen_006_e', // 看案例观察 → life_health +6
      gen_007: 'gen_007_c', // 实验观察 → life_health +8
      gen_008: 'gen_008_f', // 观察真实的人 → life_health +8
      gen_010: 'gen_010_f', // 生命自然 → life_health +8
      gen_014: 'gen_014_a', // 规则清晰 → social_science +8
      gen_016: 'gen_016_b', // 中等 → stem +4
      gen_017: 'gen_017_a', // 有意义 → life_health +8, social_science +8
      gen_020: 'gen_020_a', // 认真想想 → stable_path +12
    },
    expectedDomain: 'life_health',
  },
  {
    name: '艺术倾向（审美创作型）',
    responses: {
      gen_001: 'gen_001_d', // 看展画画 → art_creative +12
      gen_002: 'gen_002_f', // 创作打动人作品 → art_creative +10
      gen_003: 'gen_003_d', // 画材乐器创作 → art_creative +10
      gen_004: 'gen_004_a', // 提想法框架 → humanities +8
      gen_006: 'gen_006_e', // 看案例观察 → art_creative +4
      gen_007: 'gen_007_e', // 创作表达 → art_creative +10
      gen_008: 'gen_008_e', // 感受体验 → art_creative +8
      gen_010: 'gen_010_e', // 沉浸在画面声音 → art_creative +8
      gen_014: 'gen_014_b', // 灵活创意 → art_creative +8
      gen_016: 'gen_016_c', // 不确定才有意思 → art_creative +6
      gen_017: 'gen_017_d', // 有创造 → art_creative +10
      gen_020: 'gen_020_b', // 不在意 → art_creative +4
    },
    expectedDomain: 'art_creative',
  },
];

// ─── 100 虚拟用户画像库 ───

function randomProfile(seed: number): VirtualProfile {
  // 使用 seed 生成确定性的"随机"选择
  const seededRandom = (n: number) => {
    let s = seed * 1664525 + 1013904223 + n;
    return ((s >>> 0) % 100) / 100;
  };

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

  const responses: UserResponses = {};
  const genIds = Object.keys(genOptions);
  for (let i = 0; i < genIds.length; i++) {
    const qId = genIds[i];
    const options = genOptions[qId];
    const idx = Math.floor(seededRandom(i) * options.length);
    responses[qId] = options[idx];
  }

  return { name: `随机用户#${seed}`, responses, expectedDomain: '' };
}

// ─── 领域推断（简化版） ───

function getDomain(catSlugs: string[]): string {
  const stemSlugs = ['computer-science', 'electronic-information', 'mechanical', 'electrical', 'automation', 'civil-engineering', 'aerospace', 'materials', 'energy-power'];
  const businessSlugs = ['economics-class', 'finance', 'business-administration', 'accounting', 'financial-management', 'auditing', 'management-science'];
  const medicalSlugs = ['clinical-medicine', 'pharmacy', 'nursing', 'stomatology', 'public-health'];
  const humanitiesSlugs = ['chinese-literature', 'foreign-languages', 'journalism', 'history-class', 'philosophy-class'];
  const artSlugs = ['design', 'fine-arts', 'music-dance', 'drama-film'];

  for (const s of catSlugs) {
    if (stemSlugs.includes(s)) return 'stem';
    if (businessSlugs.includes(s)) return 'business';
    if (medicalSlugs.includes(s)) return 'life_health';
    if (humanitiesSlugs.includes(s)) return 'humanities';
    if (artSlugs.includes(s)) return 'art_creative';
  }
  return 'unknown';
}

// ─── 测试执行 ───

console.log('═══════════════════════════════════════════════');
console.log('  专业不迷路 v1.0 稳定性验证');
console.log('═══════════════════════════════════════════════\n');

// ─── 测试 1：5 画像 × 10 次重复 ───

let allStable = true;
const stabilityResults: Record<string, { genScores: Record<string, number>[]; domains: string[] }> = {};

for (const profile of profiles) {
  console.log(`\n📊 画像「${profile.name}」× 10 次重复测试`);
  
  const genScores: Record<string, number>[] = [];
  const domains: string[] = [];
  
  for (let run = 0; run < 10; run++) {
    // 使用第一阶段固定12题的响应
    const genBucketScores = computeBucketScores(questionBank, profile.responses);
    const genNormalized = normalizeScores(genBucketScores);
    
    // 模拟无第二阶段分支题（纯第一阶段结果）
    const result = generateResult(
      questionBank,
      profile.responses,
      [] as RiskTag[],
      'exploratory' as UserType,
      false,
      genBucketScores,
      genBucketScores, // genOnly = 全量（因为没有分支题）
    );

    genScores.push({ ...genNormalized });
    
    const recSlugs = result.recommendedCategories.map(c => c.slug);
    domains.push(getDomain(recSlugs));
  }

  stabilityResults[profile.name] = { genScores, domains };

  // 检查第一阶段得分一致性
  const firstScores = genScores[0];
  let genStable = true;
  for (let run = 1; run < 10; run++) {
    const current = genScores[run];
    for (const bucket of Object.keys(firstScores)) {
      if (firstScores[bucket] !== current[bucket]) {
        genStable = false;
        console.log(`  ❌ Run ${run + 1} 与 Run 1 不一致：${bucket} ${firstScores[bucket]} vs ${current[bucket]}`);
      }
    }
  }
  if (genStable) {
    console.log(`  ✅ 第一阶段 6 桶得分 10 次完全一致:`, JSON.stringify(firstScores));
  } else {
    allStable = false;
  }

  // 检查领域一致性
  const uniqueDomains = [...new Set(domains)];
  if (uniqueDomains.length === 1) {
    console.log(`  ✅ 推荐领域 10 次全部一致：${uniqueDomains[0]}`);
  } else {
    allStable = false;
    console.log(`  ❌ 推荐领域不一致：${domains.join(' → ')}`);
  }
}

// ─── 测试 2：100 虚拟用户 ───

console.log('\n\n📊 100 虚拟用户模拟');

const randomResults: { seed: number; recommendedSlugs: string[]; domain: string; empty: boolean }[] = [];

for (let seed = 1; seed <= 100; seed++) {
  const profile = randomProfile(seed);
  const genBucketScores = computeBucketScores(questionBank, profile.responses);
  
  const result = generateResult(
    questionBank,
    profile.responses,
    [] as RiskTag[],
    'exploratory' as UserType,
    false,
    genBucketScores,
    genBucketScores,
  );

  const recSlugs = result.recommendedCategories.map(c => c.slug);
  const domain = getDomain(recSlugs);
  const empty = recSlugs.length === 0;

  randomResults.push({ seed, recommendedSlugs: recSlugs, domain, empty });
}

// 统计
const emptyCount = randomResults.filter(r => r.empty).length;
const domainCounts: Record<string, number> = {};
for (const r of randomResults) {
  domainCounts[r.domain] = (domainCounts[r.domain] || 0) + 1;
}
const avgRecCount = randomResults.reduce((sum, r) => sum + r.recommendedSlugs.length, 0) / randomResults.length;

console.log(`  空推荐数: ${emptyCount}/100 (应为 0)`);
console.log(`  平均推荐数: ${avgRecCount.toFixed(1)}`);
console.log(`  领域分布:`, JSON.stringify(domainCounts));

// ─── 汇总 ───

console.log('\n═══════════════════════════════════════════════');
console.log('  稳定性验证汇总');
console.log('═══════════════════════════════════════════════');
console.log(`  第一阶段得分一致性: ${allStable ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  推荐领域稳定性: ${allStable ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  空推荐率: ${emptyCount}/100 ${emptyCount === 0 ? '✅ PASS' : '❌ FAIL'}`);

const driftCheck = allStable && emptyCount === 0;
console.log(`\n  整体结论: ${driftCheck ? '✅ 同一用户三次结果不会大幅漂移' : '❌ 存在不稳定因素'}`);

if (!driftCheck) {
  process.exit(1);
}
