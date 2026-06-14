/**
 * 推荐结果类型定义
 *
 * 规则系统输出，AI 不参与计算。
 * 结果面向高中生，不包含分数/位次/院校/录取概率。
 */

import type { DirectionBucket, RiskTag, Dimension } from './test';

// ───── 置信度 ─────

export type ConfidenceLevel = 'high' | 'medium' | 'low';

// ───── 学科门类推荐 ─────

export interface DisciplineRecommendation {
  /** 门类代码，如 "08" */
  code: string;
  /** 门类名称，如 "工学" */
  name: string;
  /** URL slug */
  slug: string;
  /** 门类 emoji */
  icon: string;
  /** 推荐层级 */
  tier: 'primary' | 'secondary';
  /** 0-100 综合得分 */
  score: number;
  /** 一句话推荐理由 */
  reason: string;
}

// ───── 专业类推荐 ─────

export interface CategoryRecommendation {
  /** 专业类名称，如 "计算机类" */
  name: string;
  /** 所属门类名称 */
  gate: string;
  /** 所属门类 slug */
  gateSlug: string;
  /** 专业类 slug */
  slug: string;
  /** 专业类代码 */
  code: string;
  /** 0-100 综合得分 */
  score: number;
  /** 一句话推荐理由 */
  reason: string;
  /** 触发的主要维度 */
  topDimensions: string[];
  /** 是否触发了避坑规则 */
  cautions: string[];
}

// ───── 风险标签 ─────

export interface RiskResult {
  tag: RiskTag;
  label: string;
  description: string;
  /** 受影响的方向桶 */
  affectedBuckets: DirectionBucket[];
  /** 受影响的具体专业类 slug */
  affectedCategories: string[];
}

// ───── 维度画像 ─────

export interface DimensionProfile {
  dimension: Dimension;
  label: string;
  score: number;
  level: 'high' | 'mid' | 'low';
}

// ───── 完整推荐结果 ─────

export interface RecommendationResult {
  /** 版本 */
  version: string;

  // ── 方向画像 ──
  /** 简短的方向画像名称，如 "偏感性的人文表达型" */
  profileName: string;
  /** 1-2 句画像总结 */
  profileSummary: string;
  /** 桶得分排序 */
  topBuckets: { bucket: DirectionBucket; label: string; score: number }[];
  /** 维度画像 */
  dimensions: DimensionProfile[];

  // ── 三层推荐 ──
  /** 优先了解：2-3 个学科门类 */
  topDisciplines: DisciplineRecommendation[];
  /** 优先了解：3-5 个专业类 */
  recommendedCategories: CategoryRecommendation[];
  /** 可以了解：2-4 个专业类 */
  optionalCategories: CategoryRecommendation[];
  /** 需要重点确认：2-4 个专业类（含避坑标签） */
  cautiousCategories: CategoryRecommendation[];
  /** 暂不优先：匹配度偏低但仍有一定信号的类别（折叠展示） */
  lowPriorityCategories: CategoryRecommendation[];

  // ── 避坑 ──
  /** 触发的风险标签 */
  riskTags: RiskResult[];
  /** 用户类型 */
  userType: 'single' | 'dual' | 'exploratory';
  /** 文科保护是否触发 */
  humanitiesProtected: boolean;

  // ── 稳定性 ──
  /** 结果置信度 */
  confidenceLevel: ConfidenceLevel;
  /** 置信度说明（面向用户） */
  confidenceNote: string;

  // ── 引导 ──
  /** 下一步建议 */
  nextStepSuggestions: string[];
}
