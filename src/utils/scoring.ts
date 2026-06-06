/**
 * 规则推荐引擎
 *
 * 纯规则系统，AI 不参与任何评分计算。
 *
 * 流程：
 *   responses → dimensionScores → refinedBucketScores
 *   → disciplineRecommendations → categoryRecommendations
 *   → riskCorrections → Result
 */

import type { QuestionBank, DirectionBucket, Dimension, RiskTag } from '../types/test';
import type { UserResponses, BucketScore, UserType } from './adaptiveQuestioning';
import {
  computeBucketScores,
  normalizeScores,
} from './adaptiveQuestioning';
import type {
  ConfidenceLevel,
  DisciplineRecommendation,
  CategoryRecommendation,
  RiskResult,
  DimensionProfile,
  RecommendationResult,
} from '../types/result';
import {
  BUCKET_TO_DISCIPLINES,
  DIMENSION_TO_BUCKET,
  GATE_PRIORITY_CATEGORIES,
  RISK_CATEGORY_PENALTIES,
  PROFILE_TEMPLATES,
  MIXED_PROFILE,
} from '../data/recommendationWeights';

// ───── 维度中文标签 ─────

const DIMENSION_LABELS: Record<Dimension, string> = {
  math_logic: '数理逻辑',
  reading_expression: '阅读表达',
  interpersonal: '人际沟通',
  business_sense: '商业意识',
  engineering_practice: '动手实践',
  info_systems: '信息系统',
  life_health_interest: '生命健康',
  aesthetic_creation: '审美创作',
  abstract_theory: '抽象思维',
  stable_path: '稳定导向',
  rule_detail: '规则细节',
};

const BUCKET_LABELS: Record<DirectionBucket, string> = {
  humanities: '人文',
  social_science: '社科',
  business: '商科',
  stem: '理工',
  life_health: '生命健康',
  art_creative: '艺术创作',
};

const RISK_LABELS: Record<RiskTag, string> = {
  trend_chasing: '热门跟风',
  salary_misconception: '薪资预期偏差',
  info_bubble: '信息茧房',
  long_cycle: '长周期高投入',
  reading_writing_aversion: '排斥大量读写',
  rule_detail_aversion: '排斥规则细节',
  hands_on_aversion: '排斥动手操作',
  name_misconception: '名字误解',
  surface_interest: '表面兴趣',
  arts_science_mismatch: '文理不匹配',
};

// ───── 维度分数 ─────

/**
 * 从用户所有答案中统计 11 个维度的得分
 */
export function computeDimensionScores(
  bank: QuestionBank,
  responses: UserResponses,
): Record<Dimension, number> {
  const scores: Record<Dimension, number> = {
    math_logic: 0,
    reading_expression: 0,
    interpersonal: 0,
    business_sense: 0,
    engineering_practice: 0,
    info_systems: 0,
    life_health_interest: 0,
    aesthetic_creation: 0,
    abstract_theory: 0,
    stable_path: 0,
    rule_detail: 0,
  };

  for (const [qId, optId] of Object.entries(responses)) {
    const question = bank.questions.find((q) => q.id === qId);
    if (!question) continue;
    const option = question.options.find((o) => o.id === optId);
    if (!option) continue;

    for (const effect of option.scoreEffects) {
      // 仅累加维度得分
      const dim = effect.target as Dimension;
      if (scores.hasOwnProperty(dim)) {
        scores[dim] += effect.points;
      }
    }
  }

  return scores;
}

// ───── 细化桶得分（融合维度矩阵） ─────

/**
 * 在粗筛桶得分基础上，用维度矩阵加权修正
 * 公式：refined = rawBucket * 0.4 + dimensionWeightedBucket * 0.6
 */
export function computeRefinedBucketScores(
  rawBucketScores: BucketScore,
  dimScores: Record<Dimension, number>,
): BucketScore {
  const dimBucketScores: BucketScore = {
    humanities: 0, social_science: 0, business: 0,
    stem: 0, life_health: 0, art_creative: 0,
  };

  // 维度→桶加权累加
  for (const [dim, map] of Object.entries(DIMENSION_TO_BUCKET) as [Dimension, Partial<Record<DirectionBucket, number>>][]) {
    const dimScore = dimScores[dim] ?? 0;
    for (const [bucket, weight] of Object.entries(map) as [DirectionBucket, number][]) {
      dimBucketScores[bucket] += (dimScore * weight) / 100;
    }
  }

  // 融合：raw 0.4 + dim-weighted 0.6
  const refined: BucketScore = { ...rawBucketScores };
  for (const key of Object.keys(refined) as DirectionBucket[]) {
    refined[key] = Math.round(rawBucketScores[key] * 0.4 + dimBucketScores[key] * 0.6);
  }

  // 数学保护：低数学用户不应被强推 STEM（v0.16.1）
  const mathScore = dimScores['math_logic'] ?? 50;
  if (mathScore < 20) {
    refined.stem = Math.round(refined.stem * 0.4); // 减 60%
  } else if (mathScore < 35) {
    refined.stem = Math.round(refined.stem * 0.7); // 减 30%
  }

  return normalizeScores(refined);
}

// ───── 学科门类推荐 ─────

/**
 * 根据细化桶得分，生成学科门类推荐
 */
export function generateDisciplineRecommendations(
  bucketScores: BucketScore,
  userType: UserType,
): DisciplineRecommendation[] {
  const gateScores: Map<string, { score: number; primaryBucket: DirectionBucket }> = new Map();

  for (const [bucket, disciplines] of Object.entries(BUCKET_TO_DISCIPLINES) as [DirectionBucket, { gateCode: string; weight: number }[]][]) {
    const bucketScore = bucketScores[bucket] ?? 0;
    for (const { gateCode, weight } of disciplines) {
      const contrib = (bucketScore * weight) / 100;
      const existing = gateScores.get(gateCode);
      if (!existing || contrib > existing.score) {
        gateScores.set(gateCode, {
          score: contrib,
          primaryBucket: bucket,
        });
      } else {
        existing.score += contrib * 0.3; // secondary contribution decay
      }
    }
  }

  // 门类元数据
  const gateMeta: Record<string, { name: string; slug: string; icon: string }> = {
    '01': { name: '哲学', slug: 'philosophy', icon: '💡' },
    '02': { name: '经济学', slug: 'economics', icon: '📊' },
    '03': { name: '法学', slug: 'law', icon: '⚖️' },
    '04': { name: '教育学', slug: 'pedagogy', icon: '📚' },
    '05': { name: '文学', slug: 'literature', icon: '✍️' },
    '06': { name: '历史学', slug: 'history', icon: '🏛️' },
    '07': { name: '理学', slug: 'science', icon: '🔬' },
    '08': { name: '工学', slug: 'engineering', icon: '🔧' },
    '09': { name: '农学', slug: 'agronomy', icon: '🌾' },
    '10': { name: '医学', slug: 'medicine', icon: '💊' },
    '12': { name: '管理学', slug: 'management', icon: '📋' },
    '13': { name: '艺术学', slug: 'art', icon: '🎨' },
    '14': { name: '交叉学科', slug: 'interdisciplinary', icon: '🔗' },
  };

  const sorted = [...gateScores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .map(([code, info], i) => {
      const meta = gateMeta[code];
      return {
        code,
        name: meta?.name ?? code,
        slug: meta?.slug ?? '',
        icon: meta?.icon ?? '📚',
        tier: i < 2 ? 'primary' as const : 'secondary' as const,
        score: Math.round(info.score),
        reason: buildGateReason(info.primaryBucket, meta?.name ?? code),
      };
    });

  return sorted.filter((d) => d.score >= 20);
}

function buildGateReason(bucket: DirectionBucket, gateName: string): string {
  const bucketLabel = BUCKET_LABELS[bucket] ?? '综合';
  return `你的「${bucketLabel}」方向偏好较高，${gateName}是该方向的核心门类`;
}

// ───── 专业类推荐 ─────

/**
 * 生成专业类三层推荐
 */
export function generateCategoryRecommendations(
  bucketScores: BucketScore,
  dimScores: Record<Dimension, number>,
  riskTags: RiskTag[],
  humanitiesProtected: boolean,
  topDisciplines: DisciplineRecommendation[],
): {
  recommended: CategoryRecommendation[];
  optional: CategoryRecommendation[];
  cautious: CategoryRecommendation[];
} {
  const scored: CategoryRecommendation[] = [];

  // 只从优先门类中生成专业类
  const gateCodes = new Set(topDisciplines.map((d) => d.code));

  for (const [gateCode, categories] of Object.entries(GATE_PRIORITY_CATEGORIES)) {
    if (!gateCodes.has(gateCode)) continue;

    // 文科保护：STEM 桶触发的门类不推荐 STEM-heavy 专业类
    const gateBuckets = new Set<DirectionBucket>();
    for (const cat of categories) {
      for (const b of cat.buckets) gateBuckets.add(b);
    }

    for (const cat of categories) {
      // 计算得分：来自该分类关联的桶得分 × 权重
      let score = 0;
      let totalWeight = 0;
      for (const bucket of cat.buckets) {
        const bs = bucketScores[bucket] ?? 0;
        score += bs * cat.weight;
        totalWeight += cat.weight;
      }
      if (totalWeight > 0) score = score / totalWeight;

      // v0.16.3 修复：权重按门类最大权重归一化，使权重真正生效
      const gateMaxWeight = Math.max(...categories.map(c => c.weight), 1);
      score = score * (cat.weight / gateMaxWeight);

      // 维度修饰
      const topDims = getTopDimensions(dimScores, cat.buckets, 2);

      scored.push({
        name: resolveCatName(cat.categorySlug),
        gate: resolveGateName(gateCode),
        gateSlug: resolveGateSlug(gateCode),
        slug: cat.categorySlug,
        code: gateCode,
        score: Math.round(score),
        reason: buildCatReason(cat.buckets, topDims),
        topDimensions: topDims.map((d) => DIMENSION_LABELS[d]),
        cautions: [],
      });
    }
  }

  // 避坑处理
  const penalized = new Map<string, { penalty: number; reason: string }>();
  for (const tag of riskTags) {
    const rule = RISK_CATEGORY_PENALTIES[tag];
    if (!rule) continue;
    for (const slug of rule.slugs) {
      const existing = penalized.get(slug);
      penalized.set(slug, {
        penalty: Math.max(existing?.penalty ?? 0, rule.penalty),
        reason: existing?.reason ? `${existing.reason}；${rule.reason}` : rule.reason,
      });
    }
  }

  // 分级
  const recommended: CategoryRecommendation[] = [];
  const optional: CategoryRecommendation[] = [];
  const cautious: CategoryRecommendation[] = [];

  const sorted = [...scored].sort((a, b) => b.score - a.score);

  for (const cat of sorted) {
    const penalty = penalized.get(cat.slug);
    if (penalty) {
      cat.score = Math.max(0, cat.score - penalty.penalty);
      cat.cautions.push(penalty.reason);
      cautious.push(cat);
    } else if (cat.score >= 55) {
      recommended.push(cat);
    } else if (cat.score >= 35) {
      optional.push(cat);
    }
  }

  // 限制数量：推荐 3-5，可选 2-4，谨慎 2-4
  return {
    recommended: recommended.slice(0, 5),
    optional: optional.slice(0, 4),
    cautious: cautious.slice(0, 4),
  };
}

/** 取与给定桶最相关的 top N 个维度 */
function getTopDimensions(
  dimScores: Record<Dimension, number>,
  buckets: DirectionBucket[],
  n: number,
): Dimension[] {
  const bucketSet = new Set(buckets);
  return (Object.entries(dimScores) as [Dimension, number][])
    .filter(([dim]) => {
      const map = DIMENSION_TO_BUCKET[dim];
      return map && Object.keys(map).some((b) => bucketSet.has(b as DirectionBucket));
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([dim]) => dim);
}

function buildCatReason(buckets: DirectionBucket[], topDims: Dimension[]): string {
  const dimStr = topDims.map((d) => DIMENSION_LABELS[d]).join('、');
  return dimStr ? `你的「${dimStr}」维度得分较高` : '与你的方向偏好匹配';
}

// ───── 避坑 ─────

/**
 * 生成完整避坑结果
 */
export function generateRiskResults(
  riskTags: RiskTag[],
  bucketScores: BucketScore,
): RiskResult[] {
  return riskTags.map((tag) => {
    const rule = RISK_CATEGORY_PENALTIES[tag];
    // 找到受影响最大的桶
    const affectedBuckets: DirectionBucket[] = [];
    for (const slug of rule.slugs) {
      for (const [gateCode, categories] of Object.entries(GATE_PRIORITY_CATEGORIES)) {
        for (const cat of categories) {
          if (cat.categorySlug === slug) {
            for (const b of cat.buckets) {
              if (!affectedBuckets.includes(b)) affectedBuckets.push(b);
            }
          }
        }
      }
    }

    return {
      tag,
      label: RISK_LABELS[tag] ?? tag,
      description: rule.reason,
      affectedBuckets,
      affectedCategories: rule.slugs,
    };
  });
}

// ───── 置信度 ─────

/**
 * 判断结果置信度
 */
export function determineConfidenceLevel(
  bucketScores: BucketScore,
  userType: UserType,
): { level: ConfidenceLevel; note: string } {
  const sorted = (Object.entries(bucketScores) as [DirectionBucket, number][])
    .sort((a, b) => b[1] - a[1]);
  const gap = sorted[0][1] - sorted[1][1];

  if (userType === 'single' && gap >= 10) {
    return {
      level: 'high',
      note: '你的方向偏好比较明确，建议优先深入了解推荐的专业类',
    };
  }
  if (userType === 'dual') {
    return {
      level: 'medium',
      note: '你的兴趣在两个方向都有体现，可以都了解看看，不急着决定',
    };
  }
  return {
    level: 'low',
    note: '你目前的方向还比较开放，这很正常。建议从推荐的专业类中挑感兴趣的，慢慢了解',
  };
}

// ───── 画像生成 ─────

function generateProfile(
  bucketScores: BucketScore,
  userType: UserType,
): { name: string; summary: string; topBuckets: { bucket: DirectionBucket; label: string; score: number }[] } {
  const sorted = (Object.entries(bucketScores) as [DirectionBucket, number][])
    .sort((a, b) => b[1] - a[1]);

  const topBuckets = sorted.slice(0, 3).map(([bucket, score]) => ({
    bucket,
    label: BUCKET_LABELS[bucket] ?? bucket,
    score: Math.round(score),
  }));

  if (userType === 'exploratory') {
    return { ...MIXED_PROFILE, topBuckets };
  }

  if (userType === 'dual') {
    const b1 = BUCKET_LABELS[sorted[0][0]];
    const b2 = BUCKET_LABELS[sorted[1][0]];
    return {
      name: `${b1}×${b2} 双主线型`,
      summary: `你既有${b1}倾向也有${b2}倾向，在两者的交叉地带可能有意想不到的发现。`,
      topBuckets,
    };
  }

  const primary = sorted[0][0];
  const template = PROFILE_TEMPLATES[primary] ?? PROFILE_TEMPLATES.humanities;
  return { ...template, topBuckets };
}

// ───── 维度画像 ─────

function generateDimensionProfile(
  dimScores: Record<Dimension, number>,
): DimensionProfile[] {
  const sorted = (Object.entries(dimScores) as [Dimension, number][])
    .sort((a, b) => b[1] - a[1]);

  return sorted.map(([dim, score]) => ({
    dimension: dim,
    label: DIMENSION_LABELS[dim] ?? dim,
    score: Math.round(score),
    level: score >= 40 ? 'high' as const : score >= 15 ? 'mid' as const : 'low' as const,
  }));
}

// ───── 主流程 ─────

/**
 * 生成完整推荐结果
 *
 * @param bank         题库
 * @param responses    用户所有回答（general + adaptive）
 * @param rawBucketScores  粗筛桶得分（可选，不传则重新计算）
 * @param riskTags     风险标签列表
 * @param userType     用户类型
 * @param humanitiesProtected  文科保护是否触发
 */
export function generateResult(
  bank: QuestionBank,
  responses: UserResponses,
  riskTags: RiskTag[],
  userType: UserType,
  humanitiesProtected: boolean,
  rawBucketScores?: BucketScore,
): RecommendationResult {
  // 1. 维度分数
  const dimScores = computeDimensionScores(bank, responses);

  // 2. 桶得分
  const rawBuckets = rawBucketScores ?? computeBucketScores(bank, responses);
  const refinedBuckets = computeRefinedBucketScores(rawBuckets, dimScores);

  // 3. 门类推荐
  const topDisciplines = generateDisciplineRecommendations(refinedBuckets, userType);

  // 4. 专业类推荐
  const { recommended, optional, cautious } = generateCategoryRecommendations(
    refinedBuckets, dimScores, riskTags, humanitiesProtected, topDisciplines,
  );

  // 5. 避坑
  const riskResults = generateRiskResults(riskTags, refinedBuckets);

  // 6. 置信度
  const confidence = determineConfidenceLevel(refinedBuckets, userType);

  // 7. 画像
  const profile = generateProfile(refinedBuckets, userType);

  // 8. 维度画像
  const dimensions = generateDimensionProfile(dimScores);

  // 9. 下一步建议
  const nextSteps = buildNextSteps(profile.name, recommended, cautious, confidence.level);

  return {
    version: 'v0.9',
    profileName: profile.name,
    profileSummary: profile.summary,
    topBuckets: profile.topBuckets,
    dimensions,
    topDisciplines,
    recommendedCategories: recommended,
    optionalCategories: optional,
    cautiousCategories: cautious,
    riskTags: riskResults,
    userType,
    humanitiesProtected,
    confidenceLevel: confidence.level,
    confidenceNote: confidence.note,
    nextStepSuggestions: nextSteps,
  };
}

function buildNextSteps(
  profileName: string,
  recommended: CategoryRecommendation[],
  cautious: CategoryRecommendation[],
  confidence: ConfidenceLevel,
): string[] {
  const steps: string[] = [];

  if (confidence === 'low') {
    steps.push('你的方向还比较开放，不用急着定。从优先了解的专业类中挑 2-3 个感兴趣的，点进去看看实际学什么');
  } else {
    steps.push('优先了解推荐的专业类，点击进入详情页看看大学到底学什么');
  }

  if (recommended.length > 0) {
    const [first] = recommended;
    steps.push(`「${first.name}」是你得分最高的方向，可以去详情页深入了解学习内容、真实场景和避坑提醒`);
  }

  if (cautious.length > 0) {
    steps.push(`有 ${cautious.length} 个方向放入了谨慎了解区，不是说你不能选，而是建议先看清楚再决定`);
  }

  steps.push('本测试只是认知工具，最终选择还需结合你的分数、位次、学校和家庭情况');
  return steps;
}

// ───── 辅助 ─────

const CAT_NAME_MAP: Record<string, string> = {
  'philosophy-class': '哲学类',
  'economics-class': '经济学类',
  'finance': '金融学类',
  'international-trade': '经济与贸易类',
  'law-class': '法学类',
  'political-science': '政治学类',
  'sociology': '社会学类',
  'education': '教育学类',
  'physical-education': '体育学类',
  'chinese-literature': '中国语言文学类',
  'foreign-languages': '外国语言文学类',
  'journalism': '新闻传播学类',
  'history-class': '历史学类',
  'mathematics': '数学类',
  'physics': '物理学类',
  'chemistry': '化学类',
  'biology': '生物科学类',
  'statistics': '统计学类',
  'computer-science': '计算机类',
  'electronic-information': '电子信息类',
  'automation': '自动化类',
  'mechanical': '机械类',
  'electrical': '电气类',
  'civil-engineering': '土木类',
  'materials': '材料类',
  'architecture': '建筑类',
  'aerospace': '航空航天类',
  'biomedical-eng': '生物医学工程类',
  'plant-production': '植物生产类',
  'environmental-ecology': '自然保护与环境生态类',
  'veterinary': '动物医学类',
  'animal-production': '动物生产类',
  'clinical-medicine': '临床医学类',
  'pharmacy': '药学类',
  'nursing': '护理学类',
  'stomatology': '口腔医学类',
  'public-health': '公共卫生与预防医学类',
  'medical-technology': '医学技术类',
  'business-administration': '工商管理类',
  'public-administration': '公共管理类',
  'management-science': '管理科学与工程类',
  'e-commerce': '电子商务类',
  'tourism-management': '旅游管理类',
  'design': '设计学类',
  'fine-arts': '美术学类',
  'drama-film': '戏剧与影视学类',
  'music-dance': '音乐与舞蹈学类',
  'interdisciplinary-class': '交叉学科类',
};

const GATE_NAME_MAP: Record<string, string> = {
  '01': '哲学', '02': '经济学', '03': '法学', '04': '教育学',
  '05': '文学', '06': '历史学', '07': '理学', '08': '工学',
  '09': '农学', '10': '医学', '12': '管理学', '13': '艺术学',
  '14': '交叉学科',
};

const GATE_SLUG_MAP: Record<string, string> = {
  '01': 'philosophy', '02': 'economics', '03': 'law', '04': 'pedagogy',
  '05': 'literature', '06': 'history', '07': 'science', '08': 'engineering',
  '09': 'agronomy', '10': 'medicine', '12': 'management', '13': 'art',
  '14': 'interdisciplinary',
};

function resolveCatName(slug: string): string {
  return CAT_NAME_MAP[slug] ?? slug;
}
function resolveGateName(code: string): string {
  return GATE_NAME_MAP[code] ?? code;
}
function resolveGateSlug(code: string): string {
  return GATE_SLUG_MAP[code] ?? code;
}
