/**
 * 推荐引擎 —— 纯函数封装
 *
 * 将现有 scoring.ts 的 generateResult 封装为纯函数接口，
 * 供页面和模拟器/调参脚本统一复用。
 *
 * 核心接口：
 *   calculateRecommendation(answers, options) → RecommendationResult
 *
 * ⚠️ 纯函数：不依赖 DOM、不调用 API、不修改全局状态。
 */

import { questionBank } from '../data/questionBank';
import type { QuestionBank } from '../types/test';
import type { RecommendationResult } from '../types/result';
import { generateResult } from '../utils/scoring';
import {
  computeBucketScores,
  normalizeScores,
  determineUserType,
  checkHumanitiesProtection,
  collectRiskTags,
} from '../utils/adaptiveQuestioning';
import type { UserResponses, BucketScore } from '../utils/adaptiveQuestioning';
import type { AdaptiveConfig } from '../utils/adaptiveQuestioning';
import { DEFAULT_CONFIG } from '../utils/adaptiveQuestioning';

/** 推荐引擎选项 */
export interface RecommendationEngineOptions {
  /** 自适应抽题配置（可选，不传使用默认） */
  adaptiveConfig?: Partial<AdaptiveConfig>;
  /** 题库（可选，不传使用线上题库） */
  bank?: QuestionBank;
}

/**
 * 纯函数：根据用户答案和选项参数，生成完整推荐结果
 *
 * @param answers    用户所有回答 { questionId: selectedOptionId }
 * @param options    引擎选项（配置、题库等）
 * @returns          完整推荐结果
 */
export function calculateRecommendation(
  answers: UserResponses,
  options: RecommendationEngineOptions = {},
): RecommendationResult {
  const config = { ...DEFAULT_CONFIG, ...options.adaptiveConfig };
  const bank = options.bank ?? questionBank;

  // 1. 计算原始桶得分
  const rawBucketScores = computeBucketScores(bank, answers);

  // 2. 标准化
  const normalized: BucketScore = normalizeScores(rawBucketScores) as BucketScore;

  // 3. 用户类型
  const userType = determineUserType(normalized, config);

  // 4. 文科保护
  const humanitiesProtected = checkHumanitiesProtection(normalized, config);

  // 5. 收集风险标签
  const riskTags = collectRiskTags(bank, answers);

  // 6. 生成完整结果
  return generateResult(
    bank,
    answers,
    riskTags,
    userType,
    humanitiesProtected,
    rawBucketScores,
  );
}

/**
 * 便捷函数：仅计算桶得分（不生成完整结果）
 */
export function calculateBucketScores(
  answers: UserResponses,
  options: RecommendationEngineOptions = {},
): { raw: BucketScore; normalized: BucketScore } {
  const bank = options.bank ?? questionBank;
  const config = { ...DEFAULT_CONFIG, ...options.adaptiveConfig };
  const raw = computeBucketScores(bank, answers);
  const normalized: BucketScore = normalizeScores(raw) as BucketScore;
  return { raw, normalized };
}

export default calculateRecommendation;
