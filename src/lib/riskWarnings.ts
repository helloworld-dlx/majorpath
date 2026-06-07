/**
 * 风险提示生成器 — riskWarnings.ts
 *
 * 根据专业风险画像 + 用户匹配度，生成温和的风险提示文案。
 * 文案原则：不恐吓、不劝退、不确定化，只提供"需要注意"信息。
 *
 * v0.4 — 与 CATEGORY_WEIGHTS_V0.4_ADJUSTMENT_SPEC.md §6.3 对齐
 */

import type { CategoryRiskProfile } from '../data/categoryRiskProfiles';

export interface RiskWarning {
  type: 'resource' | 'blind_choice' | 'special_condition' | 'high_interest' | 'long_cycle' | 'school_tier' | 'misunderstanding';
  level: 'info' | 'caution' | 'strong';
  message: string;
}

/**
 * 根据风险画像和用户匹配分数，生成风险提示列表
 */
export function generateRiskWarnings(
  profile: CategoryRiskProfile,
  userBucketMatch: number, // 0-100 桶匹配度
  userSpecialConditionMatched: boolean = false,
): RiskWarning[] {
  const warnings: RiskWarning[] = [];

  // 1. 资源依赖
  if (profile.resourceDependency === 'high') {
    warnings.push({
      type: 'resource',
      level: 'caution',
      message: '该方向对院校平台和培养资源要求较高，如果目标院校资源一般，需要谨慎。建议查看目标院校该专业的培养方案、实验室条件和师资情况。',
    });
  }

  // 2. 盲选风险
  if (profile.blindChoiceRisk === 'high') {
    warnings.push({
      type: 'blind_choice',
      level: 'strong',
      message: '该方向容易被专业名称、社会热度或收入预期误导。建议先去详情页了解这个专业大学到底学什么、未来实际做什么，再做判断。',
    });
  } else if (profile.blindChoiceRisk === 'medium') {
    warnings.push({
      type: 'blind_choice',
      level: 'info',
      message: '该专业可能存在一定的认知偏差，建议进一步了解真实学习内容。',
    });
  }

  // 3. 特殊条件
  if (profile.requiresSpecialCondition && !userSpecialConditionMatched) {
    warnings.push({
      type: 'special_condition',
      level: 'strong',
      message: '该专业有特殊招生条件（如艺考、体测、政审、体检等），需要提前确认自己是否符合条件。',
    });
  }

  // 4. 高兴趣门槛
  if (profile.recommendedOnlyIfHighInterest && userBucketMatch < 70) {
    warnings.push({
      type: 'high_interest',
      level: 'caution',
      message: '这个方向比较专门，建议先深入了解后再做决定。它不是不适合你，而是需要你有较强的兴趣和投入意愿。',
    });
  }

  // 5. 长周期压力
  if (profile.longCyclePressure === 'high') {
    warnings.push({
      type: 'long_cycle',
      level: 'strong',
      message: '这个方向学习周期通常较长（5-8年甚至更久），需要持续的考试和深造。如果对长期投入有顾虑，建议先想清楚自己是否能接受这种节奏。',
    });
  } else if (profile.longCyclePressure === 'medium') {
    warnings.push({
      type: 'long_cycle',
      level: 'info',
      message: '这个方向学习周期可能比大多数专业长一些，建议提前了解培养年限和深造要求。',
    });
  }

  // 6. 院校敏感
  if (profile.schoolTierSensitive) {
    warnings.push({
      type: 'school_tier',
      level: 'caution',
      message: '这个专业对学校的平台、行业资源和师资水平比较敏感。不同学校的同一专业，实际体验和出路可能有较大差异。建议对比目标院校该专业的培养方案和毕业生去向。',
    });
  }

  // 7. 误解风险
  if (profile.commonMisunderstandingRisk === 'high') {
    warnings.push({
      type: 'misunderstanding',
      level: 'strong',
      message: '高中生很容易误解这个专业是做什么的。建议一定要看详情页里的"常见误解"部分——有些你以为的东西，可能不是这个专业真正的内容。',
    });
  } else if (profile.commonMisunderstandingRisk === 'medium') {
    warnings.push({
      type: 'misunderstanding',
      level: 'info',
      message: '你的理解可能和这个专业的实际内容有些出入，建议查看详情页了解更多。',
    });
  }

  return warnings;
}

/**
 * 将风险提示列表渲染为报告中的 HTML 片段（供 report.js 使用）
 * 文案原则：温和、不确定化、不替用户做决定
 */
export function formatRiskWarningsForReport(warnings: RiskWarning[]): string {
  if (warnings.length === 0) return '';

  const lines = warnings.map(w => {
    const prefix = w.level === 'strong' ? '⚠️' : '💡';
    return `${prefix} ${w.message}`;
  });

  return lines.join('\n');
}

/**
 * 判断专业是否应进入"谨慎了解"区
 * 条件：用户期待与专业真实要求明显冲突
 */
export function shouldBeCautious(
  profile: CategoryRiskProfile,
  userBucketMatch: number,
  userSpecialConditionMatched: boolean,
): boolean {
  if (profile.requiresSpecialCondition && !userSpecialConditionMatched) return true;
  if (profile.recommendedOnlyIfHighInterest && userBucketMatch < 60) return true;
  if (profile.longCyclePressure === 'high' && userBucketMatch < 50) return true;
  if (profile.blindChoiceRisk === 'high' && userBucketMatch < 60) return true;
  return false;
}
