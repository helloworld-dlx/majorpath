/**
 * recommendationDiagnostics.ts — 推荐诊断工具
 * v0.5-candidate
 *
 * 分析专业类未进入推荐的原因，输出分类和建议。
 */

export type FailureReasonType =
  | 'design_no_strong_interest'   // highInterestOnly + 无强兴趣信号
  | 'gate_blocked'                 // 未过 topGates，无强 dim 绕过
  | 'dim_match_insufficient'      // DIM_MATCH 不足
  | 'risk_conflict'               // 强风险冲突
  | 'reasonable_low_frequency'    // 冷门合理低频
  | 'needs_review'               // 需人工复核

export interface CategoryFailureDiagnostic {
  categorySlug: string;
  categoryName: string;
  reasonType: FailureReasonType;
  baseWeight: number;
  highInterestOnly: boolean;
  topGateScore: number;
  bucketMatchScore: number;
  dimMatchScore: number;
  interestSignalScore: number;
  suggestedAction: string;
}

export function classifyFailure(
  slug: string,
  name: string,
  baseWeight: number,
  highInterestOnly: boolean,
  topGateScore: number,
  bucketMatchScore: number,
  dimMatchScore: number,
  interestSignalScore: number,
  hasStrongRiskConflict: boolean,
): CategoryFailureDiagnostic {
  let reasonType: FailureReasonType;
  let action: string;

  if (highInterestOnly && interestSignalScore < 72) {
    reasonType = 'design_no_strong_interest';
    action = '设计意图：该专业仅强兴趣用户可探索。真实用户中若有对应兴趣方向会自然出现。';
  } else if (topGateScore < 12 && dimMatchScore < 75 && interestSignalScore < 78) {
    reasonType = 'gate_blocked';
    action = '门类关卡阻挡且无强维度或兴趣信号绕过。建议补全 gateBypassDims 映射。';
  } else if (dimMatchScore < 40 && interestSignalScore < 50) {
    reasonType = 'dim_match_insufficient';
    action = '维度匹配不足。建议补全 DIM_MATCH 或 positiveDims 映射。';
  } else if (hasStrongRiskConflict) {
    reasonType = 'risk_conflict';
    action = '用户偏好与专业真实要求冲突（如排斥动手但命中机械类）。合理不推荐。';
  } else if (baseWeight <= 5) {
    reasonType = 'reasonable_low_frequency';
    action = '极冷门专业，低频出现是正常的。coverage-audit 模式中应能出现。';
  } else {
    reasonType = 'needs_review';
    action = '需人工复核：可能画像和权重都合理但分数刚好不够。建议检查 DIM_MATCH 映射或阈值。';
  }

  return {
    categorySlug: slug,
    categoryName: name,
    reasonType,
    baseWeight,
    highInterestOnly,
    topGateScore,
    bucketMatchScore,
    dimMatchScore,
    interestSignalScore,
    suggestedAction: action,
  };
}

export function generateDiagnosticsSummary(diagnostics: CategoryFailureDiagnostic[]): string {
  const grouped: Record<string, string[]> = {};
  diagnostics.forEach(d => {
    if (!grouped[d.reasonType]) grouped[d.reasonType] = [];
    grouped[d.reasonType].push(d.categoryName);
  });

  let out = '## 未出现原因分类\n\n';
  const labels: Record<string, string> = {
    design_no_strong_interest: '设计性不出现（highInterestOnly + 无强兴趣触发）',
    gate_blocked: '门类关卡阻挡',
    dim_match_insufficient: 'DIM_MATCH 不足',
    risk_conflict: '强风险冲突',
    reasonable_low_frequency: '合理低频（冷门专业）',
    needs_review: '需人工复核',
  };

  let total = 0;
  Object.entries(grouped).forEach(([type, names]) => {
    total += names.length;
    out += `### ${labels[type] || type}（${names.length} 类）\n\n`;
    out += names.join('、') + '\n\n';
  });

  out += `\n总计：${total} 类未出现\n`;
  return out;
}
