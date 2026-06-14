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
 * 在粗筛桶得分基础上，用维度矩阵加权修正，并应用选科约束
 * 公式：refined = rawBucket * 0.4 + dimensionWeightedBucket * 0.6
 * @param rawBucketScores 全部题目的桶得分
 * @param dimScores 全部题目的维度得分
 * @param userSubjects 用户选科（可选，用于推荐阶段过滤）
 */
export function computeRefinedBucketScores(
  rawBucketScores: BucketScore,
  dimScores: Record<Dimension, number>,
  userSubjects?: { mode: string; province: string; selected: string[] },
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

  // 数学保护：低数学用户降权 STEM（v0.16.1, v0.19.5 修复）
  const mathScore = dimScores['math_logic'] ?? 50;
  if (mathScore < 20) {
    const engBoost = (dimScores['engineering_practice'] ?? 0) >= 25 || (dimScores['info_systems'] ?? 0) >= 25;
    refined.stem = Math.round(refined.stem * (engBoost ? 0.75 : 0.5));
  } else if (mathScore < 35) {
    refined.stem = Math.round(refined.stem * 0.85);
  }

  // 生命健康保护：低 life_health 用户降权医学方向（v0.19.5 新增）
  const lifeScore = dimScores['life_health_interest'] ?? 0;
  if (lifeScore < 20) {
    refined.life_health = Math.round(refined.life_health * 0.3);
  }

  // v1.0 选科约束：根据用户真实选科降权不适配方向
  if (userSubjects && userSubjects.selected && userSubjects.selected.length > 0) {
    const subjects = new Set(userSubjects.selected);
    const hasPhysics = subjects.has('物理');
    const hasChemistry = subjects.has('化学');
    const hasBiology = subjects.has('生物');
    const hasHistory = subjects.has('历史');
    const hasPolitics = subjects.has('思想政治') || subjects.has('政治');

    // 未选物理 → STEM 桶降权 40%
    if (!hasPhysics) {
      refined.stem = Math.round(refined.stem * 0.6);
    }
    // 未选化学 → STEM 额外降权 15%
    if (!hasChemistry) {
      refined.stem = Math.round(refined.stem * 0.85);
    }
    // 未选生物 → 生命健康降权 30%
    if (!hasBiology) {
      refined.life_health = Math.round(refined.life_health * 0.7);
    }
    // 未选历史+未选政治 → 人文社科降权 25%
    if (!hasHistory && !hasPolitics) {
      refined.humanities = Math.round(refined.humanities * 0.75);
      refined.social_science = Math.round(refined.social_science * 0.85);
    }
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

  return sorted.filter((d) => d.score >= 8);
}

function buildGateReason(bucket: DirectionBucket, gateName: string): string {
  const bucketLabel = BUCKET_LABELS[bucket] ?? '综合';
  return `你的「${bucketLabel}」方向偏好较高，${gateName}是该方向的核心门类`;
}

// ───── 维度匹配表（v0.16.5 新增）─────

/**
 * 每个专业类关联的匹配维度。
 * 维度匹配得分 = user该维度得分 / 100 × 100 → 0-100
 * 用于在类别评分中加入维度亲和度，让同桶内不同专业类实现区分。
 */
const DIM_MATCH: Record<string, Dimension[]> = {
  // 理学
  mathematics: ['math_logic', 'abstract_theory'],
  physics: ['math_logic', 'abstract_theory', 'engineering_practice'],
  chemistry: ['math_logic', 'engineering_practice', 'life_health_interest'],
  astronomy: ['math_logic', 'abstract_theory'],
  geography: ['abstract_theory', 'engineering_practice'],
  biology: ['life_health_interest', 'engineering_practice'],
  statistics: ['math_logic', 'info_systems', 'business_sense'],
  psychology: ['interpersonal', 'reading_expression', 'abstract_theory'],

  // 工学
  mechanics: ['math_logic', 'abstract_theory', 'engineering_practice'],
  'computer-science': ['info_systems', 'math_logic'],
  'electronic-information': ['engineering_practice', 'info_systems', 'math_logic'],
  electrical: ['engineering_practice', 'math_logic'],
  automation: ['engineering_practice', 'info_systems', 'math_logic'],
  mechanical: ['engineering_practice'],
  aerospace: ['engineering_practice', 'abstract_theory'],
  'civil-engineering': ['engineering_practice'],
  architecture: ['aesthetic_creation', 'engineering_practice'],
  'biomedical-eng': ['engineering_practice', 'life_health_interest'],
  'energy-power': ['engineering_practice', 'math_logic'],
  instrumentation: ['engineering_practice', 'info_systems'],
  materials: ['engineering_practice', 'abstract_theory'],
  'chemical-pharma': ['engineering_practice', 'life_health_interest'],
  'food-science': ['engineering_practice', 'life_health_interest'],
  'safety-eng': ['rule_detail', 'engineering_practice'],
  transportation: ['engineering_practice', 'math_logic'],
  environmental: ['life_health_interest', 'engineering_practice'],
  bioengineering: ['life_health_interest', 'engineering_practice'],

  // 经济学
  'economics-class': ['business_sense', 'math_logic'],
  finance: ['business_sense', 'rule_detail', 'math_logic'],
  'international-trade': ['business_sense', 'interpersonal'],
  'public-finance': ['business_sense', 'rule_detail'],

  // 管理学
  'business-administration': ['business_sense', 'interpersonal'],
  'accounting': ['business_sense', 'rule_detail', 'math_logic'],
  'financial-management': ['business_sense', 'math_logic', 'rule_detail'],
  'auditing': ['rule_detail', 'business_sense', 'math_logic'],
  'public-administration': ['interpersonal', 'stable_path', 'rule_detail'],
  'management-science': ['business_sense', 'math_logic', 'info_systems'],
  'e-commerce': ['business_sense', 'info_systems', 'interpersonal'],
  'tourism-management': ['interpersonal', 'business_sense'],
  logistics: ['business_sense', 'info_systems'],
  'industrial-engineering': ['engineering_practice', 'business_sense'],
  'agri-economics': ['business_sense', 'life_health_interest'],
  'library-science': ['rule_detail', 'reading_expression'],

  // 法学/社科
  'law-class': ['reading_expression', 'rule_detail', 'abstract_theory'],
  sociology: ['interpersonal', 'reading_expression', 'abstract_theory'],
  'political-science': ['reading_expression', 'interpersonal', 'abstract_theory'],
  ethnology: ['reading_expression', 'interpersonal'],
  marxism: ['abstract_theory', 'reading_expression'],
  'public-security': ['interpersonal', 'rule_detail', 'stable_path'],

  // 教育学
  education: ['interpersonal', 'reading_expression', 'stable_path'],
  'physical-education': ['interpersonal', 'engineering_practice'],

  // 人文
  'chinese-literature': ['reading_expression', 'aesthetic_creation'],
  'foreign-languages': ['reading_expression', 'interpersonal'],
  journalism: ['reading_expression', 'interpersonal', 'aesthetic_creation'],
  'history-class': ['reading_expression', 'abstract_theory', 'rule_detail'],
  'philosophy-class': ['abstract_theory', 'reading_expression'],

  // 艺术
  design: ['aesthetic_creation', 'engineering_practice'],
  'fine-arts': ['aesthetic_creation'],
  'music-dance': ['aesthetic_creation'],
  'drama-film': ['aesthetic_creation', 'interpersonal'],
  'art-theory': ['aesthetic_creation', 'reading_expression'],

  // 医学
  'clinical-medicine': ['life_health_interest', 'interpersonal', 'rule_detail'],
  pharmacy: ['life_health_interest', 'engineering_practice', 'rule_detail'],
  nursing: ['interpersonal', 'life_health_interest', 'stable_path'],
  stomatology: ['life_health_interest', 'engineering_practice', 'interpersonal'],
  'public-health': ['life_health_interest', 'interpersonal', 'rule_detail'],
  'medical-technology': ['engineering_practice', 'life_health_interest', 'rule_detail'],
  'basic-medicine': ['life_health_interest', 'abstract_theory'],
  tcm: ['life_health_interest', 'reading_expression', 'interpersonal'],
  'integrated-medicine': ['life_health_interest', 'abstract_theory'],
  'chinese-pharmacy': ['life_health_interest', 'engineering_practice'],
  'forensic-medicine': ['life_health_interest', 'rule_detail', 'engineering_practice'],

  // 农学
  'plant-production': ['life_health_interest', 'engineering_practice'],
  'environmental-ecology': ['life_health_interest', 'abstract_theory'],
  veterinary: ['life_health_interest', 'interpersonal', 'engineering_practice'],
  'animal-production': ['life_health_interest', 'engineering_practice'],
  forestry: ['life_health_interest', 'engineering_practice'],
  aquaculture: ['life_health_interest', 'engineering_practice'],
  'grassland-science': ['life_health_interest', 'engineering_practice'],

  // 交叉学科
  'interdisciplinary-class': ['abstract_theory', 'engineering_practice', 'life_health_interest'],
};

/** 维度匹配在最终分数中的权重（0-1），0.6 = 60% */
const DIM_MATCH_WEIGHT = 0.6;

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
  lowPriority: CategoryRecommendation[];
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

      // v0.16.5 新增：维度匹配参与排名
      // 用户在关联维度上的得分越高，该类别获得额外加成
      const matchDims = DIM_MATCH[cat.categorySlug];
      if (matchDims && matchDims.length > 0) {
        const dimAvg = matchDims.reduce((s, d) => s + (dimScores[d] ?? 25), 0) / matchDims.length;
        // 将维度匹配得分标准化到 0-100，然后与桶得分融合
        const dimScore = Math.min(100, Math.max(0, dimAvg * 2));
        score = score * (1 - DIM_MATCH_WEIGHT) + dimScore * DIM_MATCH_WEIGHT;
      }

      // 临床医学/口腔医学乘法惩罚：不轻易进 recommended（v0.19.5 新增）
      if (cat.categorySlug === 'clinical-medicine') score *= 0.65;
      if (cat.categorySlug === 'stomatology') score *= 0.70;

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

  // v0.19.5: hotTrendRisk 后处理
  const hasHotTrend = riskTags.includes('trend_chasing');
  const hasProgramming = (dimScores['info_systems'] ?? 0) >= 40;
  const hasEngineering = (dimScores['engineering_practice'] ?? 0) >= 30;

  if (hasHotTrend) {
    // 若缺乏编程/工程信号，高强工科不得作为计算机降级后的替代
    if (!hasProgramming && !hasEngineering) {
      const substituteSlugs = ['mechanical', 'electrical', 'civil-engineering', 'automation', 'energy-power'];
      for (const slug of substituteSlugs) {
        const existing = penalized.get(slug);
        if (!existing) {
          penalized.set(slug, {
            penalty: 25,
            reason: '热门跟风降级——不要盲目换一个高强度专业',
          });
        }
      }
    }
    // 若具备编程兴趣/自学能力，计算机类降为 possible 而非 cautious
    if (hasProgramming) {
      const csPenalty = penalized.get('computer-science');
      if (csPenalty && csPenalty.penalty >= 25) {
        penalized.set('computer-science', {
          penalty: 15,
          reason: csPenalty.reason + '（但你有一定的编程兴趣，可以进一步了解）',
        });
      }
    }
  }

  // 分级
  const recommended: CategoryRecommendation[] = [];
  const optional: CategoryRecommendation[] = [];
  const cautious: CategoryRecommendation[] = [];
  const lowPriority: CategoryRecommendation[] = [];

  const sorted = [...scored].sort((a, b) => b.score - a.score);

  for (const cat of sorted) {
    const penalty = penalized.get(cat.slug);
    if (penalty) {
      const originalScore = cat.score;
      cat.score = Math.max(0, cat.score - penalty.penalty);
      cat.cautions.push(penalty.reason);
      const isSubstitute = penalty.reason.includes('热门跟风降级');
      // 匹配分高 + 有风险 → 需要重点确认（不是劝退）
      if (isSubstitute && cat.score >= 35) {
        optional.push(cat);
      } else if (originalScore >= 55) {
        cautious.push(cat);
      } else if (cat.score >= 35) {
        optional.push(cat);
      } else {
        lowPriority.push(cat);
      }
    } else if (cat.score >= 55) {
      recommended.push(cat);
    } else if (cat.score >= 35) {
      optional.push(cat);
    } else if (cat.score >= 20) {
      lowPriority.push(cat);
    }
  }

  // 去重后处理（v0.19.5）：同一专业类只能属于一个层级
  // 优先级：cautious > recommended > optional > lowPriority
  const seenSlugs = new Set<string>();
  const dedupedCautious = cautious.filter((c) => {
    if (seenSlugs.has(c.slug)) return false;
    seenSlugs.add(c.slug);
    return true;
  });
  const dedupedRecommended = recommended.filter((c) => {
    if (seenSlugs.has(c.slug)) return false;
    seenSlugs.add(c.slug);
    return true;
  });
  const dedupedOptional = optional.filter((c) => {
    if (seenSlugs.has(c.slug)) return false;
    seenSlugs.add(c.slug);
    return true;
  });
  const dedupedLowPriority = lowPriority.filter((c) => {
    if (seenSlugs.has(c.slug)) return false;
    seenSlugs.add(c.slug);
    return true;
  });

  // 限制数量：推荐 3-5，可选 2-4，谨慎 2-4，低优先 0-3
  return {
    recommended: dedupedRecommended.slice(0, 5),
    optional: dedupedOptional.slice(0, 4),
    cautious: dedupedCautious.slice(0, 4),
    lowPriority: dedupedLowPriority.slice(0, 3),
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

// ───── 主兴趣领域推断（v0.19.5）─────

/** 专业类 slug → 主兴趣领域 */
function getCategoryDomain(slug: string): string {
  const electronicsSlugs = ['computer-science', 'electronic-information', 'automation', 'mechanical', 'electrical', 'civil-engineering', 'energy-power', 'instrumentation', 'aerospace', 'materials', 'transportation', 'chemical-pharma', 'safety-eng', 'environmental', 'bioengineering', 'food-science', 'biomedical-eng', 'architecture'];
  const medicalSlugs = ['clinical-medicine', 'pharmacy', 'nursing', 'stomatology', 'public-health', 'medical-technology', 'basic-medicine', 'tcm', 'integrated-medicine', 'chinese-pharmacy', 'forensic-medicine', 'veterinary', 'biology', 'plant-production', 'animal-production', 'environmental-ecology', 'forestry', 'aquaculture', 'grassland-science'];
  const businessSlugs = ['economics-class', 'finance', 'international-trade', 'public-finance', 'business-administration', 'accounting', 'financial-management', 'auditing', 'public-administration', 'management-science', 'e-commerce', 'tourism-management', 'logistics', 'industrial-engineering', 'agri-economics', 'library-science'];
  const artSlugs = ['design', 'fine-arts', 'music-dance', 'drama-film', 'art-theory'];
  if (electronicsSlugs.includes(slug)) return 'stem';
  if (medicalSlugs.includes(slug)) return 'life_health';
  if (businessSlugs.includes(slug)) return 'business';
  if (artSlugs.includes(slug)) return 'art_creative';
  return 'humanities';
}

/** 从维度和桶得分推断用户主兴趣领域 */
function inferPrimaryInterestDomain(
  dimScores: Record<Dimension, number>,
  bucketScores: BucketScore,
): string {
  // 强信号检测（维度得分高于阈值）
  const strongElectronics = (dimScores['engineering_practice'] ?? 0) >= 30 ||
    (dimScores['info_systems'] ?? 0) >= 30;
  const strongMedical = (dimScores['life_health_interest'] ?? 0) >= 30;
  const strongBusiness = (dimScores['business_sense'] ?? 0) >= 50;
  const strongHumanities = (dimScores['reading_expression'] ?? 0) >= 40 ||
    (dimScores['abstract_theory'] ?? 0) >= 40;
  const strongArt = (dimScores['aesthetic_creation'] ?? 0) >= 40;

  // 桶得分辅助
  const topBucket = (Object.entries(bucketScores) as [DirectionBucket, number][])
    .sort(([, a], [, b]) => b - a)[0];

  if (strongElectronics) return 'stem';
  if (strongMedical) return 'life_health';
  if (strongBusiness) return 'business';
  if (strongHumanities && topBucket[0] === 'humanities') return 'humanities';
  if (strongArt) return 'art_creative';

  // 无强信号时，以最高桶为准
  if (topBucket[1] > 40) {
    if (topBucket[0] === 'business') return 'business';
    if (topBucket[0] === 'stem') return 'stem';
    if (topBucket[0] === 'life_health') return 'life_health';
  }
  return 'unknown';
}

// ───── v1.0 辅助：过滤仅通用题响应 ─────

/** 从全部响应中过滤出第一阶段通用题的响应 */
function filterGeneralResponses(
  bank: QuestionBank,
  responses: UserResponses,
): UserResponses {
  const filtered: UserResponses = {};
  for (const [qId, optId] of Object.entries(responses)) {
    const q = bank.questions.find((x) => x.id === qId);
    if (q && q.type === 'general') {
      filtered[qId] = optId;
    }
  }
  return filtered;
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
 * @param genOnlyBucketScores  第一阶段纯桶得分（v1.0 用于 70/30 加权）
 * @param userSubjects  用户选科（v1.0 用于推荐阶段过滤）
 */
export function generateResult(
  bank: QuestionBank,
  responses: UserResponses,
  riskTags: RiskTag[],
  userType: UserType,
  humanitiesProtected: boolean,
  rawBucketScores?: BucketScore,
  genOnlyBucketScores?: BucketScore,
  userSubjects?: { mode: string; province: string; selected: string[] },
): RecommendationResult {
  // 1. 维度分数
  const dimScores = computeDimensionScores(bank, responses);

  // 2. 桶得分
  const rawBuckets = rawBucketScores ?? computeBucketScores(bank, responses);
  const refinedBuckets = computeRefinedBucketScores(rawBuckets, dimScores, userSubjects);

  // 2.5 v1.0 第一阶段 70% + 第二阶段 30% 加权混合
  let finalBuckets: BucketScore;
  if (genOnlyBucketScores) {
    // 第一阶段纯桶得分归一化后 ×0.7，全量桶得分 ×0.3
    const genDimScores = computeDimensionScores(
      bank,
      filterGeneralResponses(bank, responses),
    );
    const genRefined = computeRefinedBucketScores(genOnlyBucketScores, genDimScores, userSubjects);
    const allRefined = computeRefinedBucketScores(rawBuckets, dimScores, userSubjects);
    const mixed: BucketScore = { ...allRefined };
    for (const key of Object.keys(mixed) as DirectionBucket[]) {
      mixed[key] = Math.round(genRefined[key] * 0.7 + allRefined[key] * 0.3);
    }
    finalBuckets = normalizeScores(mixed);
  } else {
    finalBuckets = refinedBuckets;
  }

  // 3. 门类推荐
  const topDisciplines = generateDisciplineRecommendations(finalBuckets, userType);

  // 4. 专业类推荐
  let { recommended, optional, cautious, lowPriority } = generateCategoryRecommendations(
    finalBuckets, dimScores, riskTags, humanitiesProtected, topDisciplines,
  );

  // 4.5 探索型兜底：若无推荐但从可选中提升一个
  // v0.19.5 修复：尊重主兴趣领域，不让经济学类成为通用兜底
  if (recommended.length === 0 && optional.length > 0) {
    // 推断主兴趣领域
    const primaryDomain = inferPrimaryInterestDomain(dimScores, finalBuckets);
    // 优先从同领域可选类别中提升
    const sameDomain = optional.filter((c) =>
      getCategoryDomain(c.slug) === primaryDomain
    );
    if (sameDomain.length > 0) {
      recommended = [sameDomain[0]];
      optional = optional.filter((c) => c.slug !== sameDomain[0].slug);
    } else {
      recommended = [optional.shift()!];
    }
  }

  // 5. 避坑
  const riskResults = generateRiskResults(riskTags, finalBuckets);

  // 6. 置信度
  const confidence = determineConfidenceLevel(finalBuckets, userType);

  // 7. 画像
  const profile = generateProfile(finalBuckets, userType);

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
    lowPriorityCategories: lowPriority,
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
    steps.push(`有 ${cautious.length} 个方向放入了「需要重点确认」区，不是说你不能选，而是这些方向有一些容易忽略的点，建议先看清楚再决定`);
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
  'accounting': '会计学',
  'financial-management': '财务管理',
  'auditing': '审计学',
  'public-administration': '公共管理类',
  'management-science': '管理科学与工程类',
  'e-commerce': '电子商务类',
  'tourism-management': '旅游管理类',
  'design': '设计学类',
  'fine-arts': '美术学类',
  'drama-film': '戏剧与影视学类',
  'music-dance': '音乐与舞蹈学类',
  'interdisciplinary-class': '交叉学科类',
  // v0.17.1 新增
  'public-finance': '财政学类', 'marxism': '马克思主义理论类', 'public-security': '公安学类',
  'ethnology': '民族学类', 'psychology': '心理学类', 'geography': '地理科学类',
  'astronomy': '天文学类', 'atmospheric-science': '大气科学类', 'ocean-science': '海洋科学类',
  'geophysics': '地球物理学类', 'geology': '地质学类', 'energy-power': '能源动力类',
  'instrumentation': '仪器类', 'chemical-pharma': '化工与制药类', 'transportation': '交通运输类',
  'environmental': '环境科学与工程类', 'bioengineering': '生物工程类', 'food-science': '食品科学与工程类',
  'water-resources': '水利类', 'mechanics': '力学类', 'surveying': '测绘类',
  'safety-eng': '安全科学与工程类', 'geological-eng': '地质类', 'nuclear': '核工程类',
  'ocean-engineering': '海洋工程类', 'agricultural-eng': '农业工程类', 'light-industry': '轻工类',
  'public-security-tech': '公安技术类', 'mining': '矿业类', 'textile': '纺织类',
  'ordnance': '兵器类', 'forestry-eng': '林业工程类', 'forestry': '林学类',
  'aquaculture': '水产类', 'grassland-science': '草学类', 'tcm': '中医学类',
  'integrated-medicine': '中西医结合类', 'chinese-pharmacy': '中药学类', 'basic-medicine': '基础医学类',
  'forensic-medicine': '法医学类', 'logistics': '物流管理与工程类', 'industrial-engineering': '工业工程类',
  'library-science': '图书情报与档案管理类', 'agri-economics': '农业经济管理类',
  'art-theory': '艺术学理论类',
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
