/**
 * nicheExploration.ts — 小众探索方向评分引擎
 * v0.5-candidate
 *
 * 定位: 不在主推荐区、也不在谨慎了解区，但用户兴趣信号与专业有交集的方向。
 * 不表示"适合"，只表示"如果好奇可以顺手了解"。
 */
import { CATEGORY_DIM_PROFILES, type CategoryDimProfile } from '../data/categoryDimProfiles';

export interface NicheExplorationInput {
  categorySlug: string;
  baseWeight: number;
  bucketMatchScore: number;   // 0-100
  dimMatchScore: number;       // 0-100
  interestSignalScore: number; // 0-100
  strongMismatchPenalty: number; // 0-100
  recommendedOnlyIfHighInterest: boolean;
  requiresSpecialCondition: boolean;
  passTopGate: boolean;
  alreadyInMainRecommended: boolean;
  alreadyInCautious: boolean;
}

export interface NicheExplorationResult {
  eligible: boolean;
  score: number;
  reasons: string[];
  entrance: 'gate_bypass' | 'dim_signal' | 'interest_signal' | 'bucket_strength';
  caution: string;
  nextCheck: string[];
}

/**
 * 计算小众探索得分
 * 公式: bucket*0.30 + dim*0.45 + interest*0.20 + weight*0.05 - mismatch
 */
export function computeNicheExplorationScore(input: NicheExplorationInput): number {
  const { bucketMatchScore, dimMatchScore, interestSignalScore, baseWeight, strongMismatchPenalty } = input;
  const weightNorm = (baseWeight / 22) * 100;
  return bucketMatchScore * 0.30 + dimMatchScore * 0.45 + interestSignalScore * 0.20 + weightNorm * 0.05 - strongMismatchPenalty;
}

/**
 * 判断是否可以进入小众探索
 */
export function evaluateNicheExploration(input: NicheExplorationInput): NicheExplorationResult {
  const { dimMatchScore, interestSignalScore, bucketMatchScore, strongMismatchPenalty,
    alreadyInMainRecommended, alreadyInCautious, recommendedOnlyIfHighInterest,
    passTopGate, requiresSpecialCondition, categorySlug } = input;

  const result: NicheExplorationResult = {
    eligible: false,
    score: 0,
    reasons: [],
    entrance: 'dim_signal',
    caution: '',
    nextCheck: ['查看专业详情页', '了解真实学习内容和课程设置'],
  };

  // 已在主推荐或谨慎了解中，不重复进入小众探索
  if (alreadyInMainRecommended || alreadyInCautious) return result;

  // 必须是"设计上的小众/冷门"类别
  const isDesignatedNiche = recommendedOnlyIfHighInterest || input.baseWeight <= 3 || requiresSpecialCondition;
  if (!isDesignatedNiche) return result;

  // 必须满足至少一个强信号（含 category-specific gateBypassDims）
  const hasStrongSignal = dimMatchScore >= 68 || interestSignalScore >= 70 || bucketMatchScore >= 75;
  if (!hasStrongSignal) return result;

  // 不匹配惩罚不能太高
  if (strongMismatchPenalty >= 15) return result;

  // 计算 niche score
  const score = computeNicheExplorationScore(input);
  if (score < 52) return result; // 不低于52

  result.eligible = true;
  result.score = Math.round(score);

  // 判断入口方式
  if (!passTopGate) {
    result.entrance = 'gate_bypass';
    result.reasons.push('虽然不在你的主门类倾向中，但维度匹配显示有潜在交集');
  } else if (interestSignalScore >= 70) {
    result.entrance = 'interest_signal';
    result.reasons.push('你的兴趣信号和这个方向有一定交集');
  } else if (dimMatchScore >= 68) {
    result.entrance = 'dim_signal';
    result.reasons.push('你的学习风格和个人特质与这个方向有匹配');
  } else {
    result.entrance = 'bucket_strength';
    result.reasons.push('你的方向偏好和这个专业有微弱交集');
  }

  // 谨慎提醒
  const profile: CategoryDimProfile | undefined = CATEGORY_DIM_PROFILES[categorySlug];
  const cautions: string[] = [];
  if (recommendedOnlyIfHighInterest) cautions.push('这是一个比较专门的方向，适合有明确兴趣的人深入了解');
  if (requiresSpecialCondition) cautions.push('该方向可能有特殊招生条件（艺考/体测/政审等），需提前确认');
  if (input.baseWeight <= 3) cautions.push('这是非常小众的方向，院校布点少，建议先了解一下全国有哪些学校开设');
  if (profile?.negativeDims?.length) cautions.push('如果你在不匹配的维度上感受很强，可能需要再想想');
  result.caution = cautions.join('；') || '建议进一步了解再做判断';
  result.nextCheck.push('确认是否接受该方向的学习方式和就业场景');
  if (input.requiresSpecialCondition) result.nextCheck.push('核实特殊招生条件');

  return result;
}

/**
 * 筛选 eligible 的 niche candidates，按分排序，取最多 max 个
 */
export function selectNicheExplorations(
  inputs: NicheExplorationInput[],
  max: number = 2,
): Array<NicheExplorationResult & { categorySlug: string }> {
  const evaluated = inputs
    .map(input => ({ input, result: evaluateNicheExploration(input) }))
    .filter(({ result }) => result.eligible)
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, max);

  return evaluated.map(({ input, result }) => ({ ...result, categorySlug: input.categorySlug }));
}
