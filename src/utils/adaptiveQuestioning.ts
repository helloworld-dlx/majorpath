/**
 * 自适应抽题引擎
 * 对齐 ALGORITHM_SPEC.md v0.3 六桶两阶段体系
 *
 * 核心流程：
 *   第 1 步：从题库中抽取 8 道通用粗筛题
 *   第 1 步完成后：根据用户答案计算 6 桶得分
 *   判断用户类型（单桶/双桶/探索型）+ 文科保护检查
 *   第 2 步：从匹配桶中抽取方向题 + 相邻校验题 + 避坑题
 *   返回完整题目序列（14-18 题）
 *
 * ⚠️ 纯逻辑模块，无副作用，不接 AI API，可独立测试。
 */

import type {
  Question, QuestionBank, DirectionBucket, RiskTag,
} from '../types/test';

// ───── 类型定义 ─────

/** 用户答案：questionId → selectedOptionId */
export type UserResponses = Record<string, string>;

/** 6 桶得分 */
export type BucketScore = Record<DirectionBucket, number>;

/** 用户类型 */
export type UserType = 'single' | 'dual' | 'exploratory';

/** 测试阶段 */
export type TestPhase = 'info' | 'general' | 'branch' | 'complete';

/** 流程中的一道题 */
export interface TestQuestion {
  question: Question;
  phase: TestPhase;
  order: number;
}

/** 完整的测试会话 */
export interface TestSession {
  /** 第 0 步：基础信息收集（阶段 / 选科） */
  infoQuestions: TestQuestion[];
  /** 第 1 步：通用粗筛题 */
  generalQuestions: TestQuestion[];
  /** 第 2 步：方向分流 + 校验 + 避坑 */
  adaptiveQuestions: TestQuestion[];
  /** 全部题目（已排序） */
  allQuestions: TestQuestion[];
  /** 通用题完成后的桶得分 */
  bucketScores?: BucketScore;
  /** 用户类型 */
  userType?: UserType;
  /** 主方向桶 */
  primaryBucket?: DirectionBucket;
  /** 副方向桶 */
  secondaryBucket?: DirectionBucket;
  /** 文科保护是否触发 */
  humanitiesProtected?: boolean;
  /** 总题数 */
  totalCount: number;
}

/** 抽题配置（可调参数） */
export interface AdaptiveConfig {
  /** 通用题数量 */
  generalCount: number;
  /** 单桶型：主桶方向题数 */
  singleMainBranch: number;
  /** 单桶型：副桶方向题数 */
  singleSecondaryBranch: number;
  /** 双桶型：每桶方向题数 */
  dualPerBucket: number;
  /** 探索型：每桶方向题数 */
  explorePerBucket: number;
  /** 探索型：取前几名 */
  exploreTopN: number;
  /** 校验题数量 */
  crossCheckCount: number;
  /** 避坑题数量 */
  riskCount: number;
  /** 单桶明确阈值 */
  highThreshold: number;
  /** 有效信号阈值 */
  midThreshold: number;
  /** 微弱信号阈值 */
  lowThreshold: number;
  /** 领先差 */
  leadGap: number;
  /** 探索型上限 */
  exploreMax: number;
}

/** 默认配置（对齐 ALGORITHM_SPEC v0.3 §6.1） */
export const DEFAULT_CONFIG: AdaptiveConfig = {
  generalCount: 12,
  singleMainBranch: 4,
  singleSecondaryBranch: 2,
  dualPerBucket: 4,
  explorePerBucket: 3,
  exploreTopN: 3,
  crossCheckCount: 2,
  riskCount: 2,
  highThreshold: 68,
  midThreshold: 66,
  lowThreshold: 50,
  leadGap: 6,
  exploreMax: 58,
};

// ───── 相邻桶映射（ALGORITHM_SPEC v0.3 §2.3） ─────

/** 每个桶的相邻桶（仅这些桶之间互相抽取校验题） */
export const ADJACENT_BUCKETS: Record<DirectionBucket, DirectionBucket[]> = {
  humanities: ['social_science', 'art_creative'],
  social_science: ['humanities', 'business', 'life_health'],
  business: ['social_science', 'stem'],
  stem: ['business', 'life_health', 'art_creative'],
  life_health: ['stem', 'social_science', 'art_creative'],
  art_creative: ['humanities', 'stem', 'life_health'],
};

/** 禁止深入的桶（文科保护） */
const FORBIDDEN_FOR_HUMANITIES: DirectionBucket[] = ['stem'];
const PROTECTED_MAJOR_TAGS = ['cs_info', 'engineering_manufacturing', 'science_basic'];

// ───── 抽题辅助函数 ─────

/** 从 bank 中抽取 N 道指定类型的题，打乱顺序 */
function pickRandom(bank: QuestionBank, type: string, count: number, buckets?: DirectionBucket[], excludeIds?: Set<string>): Question[] {
  let pool = bank.questions.filter((q) => q.type === type);
  if (buckets && buckets.length > 0) {
    const bucketSet = new Set(buckets);
    pool = pool.filter((q) => q.targetBuckets.some((b) => bucketSet.has(b)));
  }
  if (excludeIds && excludeIds.size > 0) {
    pool = pool.filter((q) => !excludeIds.has(q.id));
  }
  // v1.0 确定性选取：按 ID 排序取前 N 道
  pool.sort((a, b) => a.id.localeCompare(b.id));
  return pool.slice(0, Math.min(count, pool.length));
}

/** 按 priority 排序 */
function byPriority(a: Question, b: Question): number {
  return (a.priority ?? 99) - (b.priority ?? 99);
}

// ───── 核心算法 ─────

/**
 * 第 1 步：抽取通用粗筛题
 * v1.0 固定选题——从 bank 中按固定 ID 列表顺序提取，不再随机
 */
export function selectGeneralQuestions(
  bank: QuestionBank,
  _config: AdaptiveConfig = DEFAULT_CONFIG,
): Question[] {
  // v1.0 固定第一阶段 12 题（对应 test-flow.js 的 FIRST_STAGE_QUESTION_IDS）
  const FIXED_IDS = [
    'gen_001', 'gen_002', 'gen_019', 'gen_004', 'gen_006', 'gen_007',
    'gen_008', 'gen_010', 'gen_014', 'gen_016', 'gen_017', 'gen_020',
  ];
  const qMap: Record<string, Question> = {};
  for (const q of bank.questions) qMap[q.id] = q;
  const selected: Question[] = [];
  for (const id of FIXED_IDS) {
    if (qMap[id]) selected.push(qMap[id]);
  }
  return selected;
}

/**
 * 根据通用题答案计算 6 桶得分
 * 遍历用户选中的每个 option 的 scoreEffects，累加 bucket 得分
 */
export function computeBucketScores(
  bank: QuestionBank,
  responses: UserResponses,
): BucketScore {
  const scores: BucketScore = {
    humanities: 0,
    social_science: 0,
    business: 0,
    stem: 0,
    life_health: 0,
    art_creative: 0,
  };

  for (const [qId, optId] of Object.entries(responses)) {
    const question = bank.questions.find((q) => q.id === qId);
    if (!question) continue;
    const option = question.options.find((o) => o.id === optId);
    if (!option) continue;

    for (const effect of option.scoreEffects) {
      // 仅累加方向桶级别的得分（忽略维度和专业类标签）
      const bucket = effect.target as DirectionBucket;
      if (scores.hasOwnProperty(bucket)) {
        scores[bucket] += effect.points;
      }
    }
  }

  return scores;
}

/**
 * 标准化得分到 0-100 区间
 */
export function normalizeScores(scores: BucketScore): BucketScore {
  const values = Object.values(scores);
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return { ...scores };

  const normalized: BucketScore = { ...scores };
  for (const key of Object.keys(normalized) as DirectionBucket[]) {
    normalized[key] = Math.round(((normalized[key] - min) / (max - min)) * 100);
  }
  return normalized;
}

/**
 * 判断用户类型：单桶明确 / 双桶均衡 / 探索型
 */
export function determineUserType(
  scores: BucketScore,
  config: AdaptiveConfig = DEFAULT_CONFIG,
): UserType {
  const entries = (Object.entries(scores) as [DirectionBucket, number][])
    .sort((a, b) => b[1] - a[1]);

  const topScore = entries[0][1];
  const secondScore = entries[1][1];

  if (topScore >= config.highThreshold && topScore - secondScore >= config.leadGap) {
    return 'single';
  }
  if (topScore < config.exploreMax) {
    return 'exploratory';
  }
  if (topScore >= config.midThreshold && secondScore >= config.midThreshold
      && topScore - secondScore < config.leadGap) {
    return 'dual';
  }
  return 'exploratory';
}

/**
 * 文科保护规则检查
 * 触发条件：humanities 或 social_science 进入前 2 且 stem < midThreshold
 */
export function checkHumanitiesProtection(
  scores: BucketScore,
  config: AdaptiveConfig = DEFAULT_CONFIG,
): boolean {
  const sorted = (Object.entries(scores) as [DirectionBucket, number][])
    .sort((a, b) => b[1] - a[1]);
  const top2 = new Set(sorted.slice(0, 2).map(([k]) => k));
  const humanitiesHit = top2.has('humanities') || top2.has('social_science');
  const stemLow = scores.stem < config.midThreshold;
  return humanitiesHit && stemLow;
}

/**
 * 获取主方向桶和副方向桶
 */
export function getPrimarySecondary(
  scores: BucketScore,
  userType: UserType,
): { primary: DirectionBucket; secondary?: DirectionBucket } {
  const sorted = (Object.entries(scores) as [DirectionBucket, number][])
    .sort((a, b) => b[1] - a[1]);
  return {
    primary: sorted[0][0],
    secondary: userType === 'dual' ? sorted[1][0] : undefined,
  };
}

/**
 * 第 2 步：从指定桶中抽取方向分流题
 */
export function selectBranchQuestions(
  bank: QuestionBank,
  buckets: DirectionBucket[],
  count: number,
  usedIds: Set<string>,
  humanitiesProtected: boolean,
): Question[] {
  const selected: Question[] = [];
  const perBucket = Math.ceil(count / buckets.length);

  for (const bucket of buckets) {
    // 文科保护：跳过 STEM 桶的方向题
    if (humanitiesProtected && FORBIDDEN_FOR_HUMANITIES.includes(bucket)) continue;

    const pool = bank.questions.filter(
      (q) => q.type === 'branch' && q.targetBuckets.includes(bucket) && !usedIds.has(q.id),
    );
    // 确定性选取：按 ID 字母序取前 perBucket 道（v1.0 不再随机）
    pool.sort((a, b) => a.id.localeCompare(b.id));
    const picks = pool.slice(0, perBucket);
    picks.forEach((q) => { usedIds.add(q.id); selected.push(q); });
  }

  return selected.slice(0, count);
}

/**
 * 第 2 步：从相邻桶中抽取校验题
 * 仅从主桶的相邻桶中抽取，且相邻桶得分 >= lowThreshold
 */
export function selectCrossCheckQuestions(
  bank: QuestionBank,
  primaryBucket: DirectionBucket,
  bucketScores: BucketScore,
  count: number,
  config: AdaptiveConfig = DEFAULT_CONFIG,
  usedIds: Set<string> = new Set(),
): Question[] {
  const adjacent = ADJACENT_BUCKETS[primaryBucket] ?? [];

  // 只选取得分 >= lowThreshold 的相邻桶
  const activeAdjacent = adjacent.filter((b) => bucketScores[b] >= config.lowThreshold);

  if (activeAdjacent.length === 0) return [];

  // 候选：type=cross_check，targetBuckets 包含主桶+任一活跃相邻桶
  const adjacentSet = new Set(activeAdjacent);
  const pool = bank.questions.filter((q) =>
    q.type === 'cross_check'
    && q.targetBuckets.includes(primaryBucket)
    && q.targetBuckets.some((b) => adjacentSet.has(b))
    && !usedIds.has(q.id),
  );
  // v1.0 确定性选取
  pool.sort((a, b) => a.id.localeCompare(b.id));
  const picks = pool.slice(0, count);
  picks.forEach((q) => usedIds.add(q));
  return picks;
}

/**
 * 第 2 步：抽取避坑题
 */
export function selectRiskQuestions(
  bank: QuestionBank,
  count: number,
  usedIds: Set<string> = new Set(),
): Question[] {
  const pool = bank.questions.filter((q) => q.type === 'risk' && !usedIds.has(q.id));
  // v1.0 确定性选取
  pool.sort((a, b) => a.id.localeCompare(b.id));
  const picks = pool.slice(0, count);
  picks.forEach((q) => usedIds.add(q));
  return picks;
}

/**
 * 从用户风险题答案中收集触发的所有风险标签
 */
export function collectRiskTags(
  bank: QuestionBank,
  responses: UserResponses,
): RiskTag[] {
  const tags = new Set<RiskTag>();
  for (const [qId, optId] of Object.entries(responses)) {
    const question = bank.questions.find((q) => q.id === qId);
    if (!question || question.type !== 'risk') continue;
    const option = question.options.find((o) => o.id === optId);
    if (!option?.riskTags) continue;
    for (const tag of option.riskTags) {
      tags.add(tag);
    }
  }
  return [...tags];
}

// ───── 主流程 ─────

/**
 * 构建完整的测试题目序列
 *
 * 流程：
 *   1. 抽取 8 道通用题
 *   2. （用户作答后）计算桶得分
 *   3. 判断用户类型 + 文科保护
 *   4. 从匹配桶中抽取方向题 + 校验题 + 避坑题
 *   5. 返回完整序列
 */
export function buildTestSequence(
  bank: QuestionBank,
  config: AdaptiveConfig = DEFAULT_CONFIG,
): TestSession {
  const usedIds = new Set<string>();

  // Phase 1: 通用题
  const generalQ = selectGeneralQuestions(bank, config);
  generalQ.forEach((q) => usedIds.add(q.id));

  const generalQuestions: TestQuestion[] = generalQ.map((q, i) => ({
    question: q,
    phase: 'general' as TestPhase,
    order: i + 1,
  }));

  // Phase 2 占位：需要用户先答完通用题
  const session: TestSession = {
    infoQuestions: [],
    generalQuestions,
    adaptiveQuestions: [],
    allQuestions: [...generalQuestions],
    totalCount: generalQuestions.length,
  };

  return session;
}

/**
 * 通用题完成后，构建第 2 步自适应题目
 * 调用此函数前需先 computeBucketScores
 */
export function buildAdaptivePhase(
  bank: QuestionBank,
  bucketScores: BucketScore,
  normalizedScores: BucketScore,
  config: AdaptiveConfig = DEFAULT_CONFIG,
  existingUsedIds?: Set<string>,
): {
  branchQuestions: TestQuestion[];
  crossCheckQuestions: TestQuestion[];
  riskQuestions: TestQuestion[];
  userType: UserType;
  primaryBucket: DirectionBucket;
  secondaryBucket?: DirectionBucket;
  humanitiesProtected: boolean;
  allAdaptive: TestQuestion[];
} {
  const usedIds = existingUsedIds ?? new Set<string>();

  const userType = determineUserType(normalizedScores, config);
  const { primary, secondary } = getPrimarySecondary(normalizedScores, userType);
  const humanitiesProtected = checkHumanitiesProtection(normalizedScores, config);

  // 计算各阶段题数
  let branchQ: Question[] = [];
  if (userType === 'single') {
    const buckets = secondary ? [primary, secondary] : [primary];
    const totalBranch = config.singleMainBranch + config.singleSecondaryBranch;
    branchQ = selectBranchQuestions(bank, buckets, totalBranch, usedIds, humanitiesProtected);
  } else if (userType === 'dual') {
    branchQ = selectBranchQuestions(bank, [primary, secondary!], config.dualPerBucket * 2, usedIds, humanitiesProtected);
  } else {
    const sorted = (Object.entries(normalizedScores) as [DirectionBucket, number][])
      .sort((a, b) => b[1] - a[1]);
    const topBuckets = sorted.slice(0, config.exploreTopN).map(([k]) => k);
    branchQ = selectBranchQuestions(bank, topBuckets, config.explorePerBucket * config.exploreTopN, usedIds, humanitiesProtected);
  }

  const crossQ = selectCrossCheckQuestions(bank, primary, bucketScores, config.crossCheckCount, config, usedIds);
  const riskQ = selectRiskQuestions(bank, config.riskCount, usedIds);

  const startOrder = 1; // caller should offset by general question count

  const branchQuestions: TestQuestion[] = branchQ.map((q, i) => ({
    question: q, phase: 'branch', order: startOrder + i,
  }));
  const crossCheckQuestions: TestQuestion[] = crossQ.map((q, i) => ({
    question: q, phase: 'branch', order: startOrder + branchQ.length + i,
  }));
  const riskQuestions: TestQuestion[] = riskQ.map((q, i) => ({
    question: q, phase: 'branch', order: startOrder + branchQ.length + crossQ.length + i,
  }));

  const allAdaptive = [...branchQuestions, ...crossCheckQuestions, ...riskQuestions];

  return {
    branchQuestions, crossCheckQuestions, riskQuestions,
    userType, primaryBucket: primary, secondaryBucket: secondary,
    humanitiesProtected, allAdaptive,
  };
}

/**
 * 一步构建完整测试会话（含第 1 步 + 第 2 步）
 * 用于测试和演示场景
 */
export function fullBuildTestSession(
  bank: QuestionBank,
  mockResponses?: UserResponses,
  config: AdaptiveConfig = DEFAULT_CONFIG,
): TestSession {
  const session = buildTestSequence(bank, config);

  if (mockResponses) {
    const raw = computeBucketScores(bank, mockResponses);
    const normalized = normalizeScores(raw);
    const adaptive = buildAdaptivePhase(bank, raw, normalized, config);

    session.bucketScores = raw;
    session.userType = adaptive.userType;
    session.primaryBucket = adaptive.primaryBucket;
    session.secondaryBucket = adaptive.secondaryBucket;
    session.humanitiesProtected = adaptive.humanitiesProtected;

    // Re-number adaptive questions starting after general
    const offset = session.generalQuestions.length;
    adaptive.allAdaptive.forEach((q, i) => { q.order = offset + i + 1; });

    session.adaptiveQuestions = adaptive.allAdaptive;
    session.allQuestions = [...session.generalQuestions, ...adaptive.allAdaptive];
    session.totalCount = session.allQuestions.length;
  }

  return session;
}
