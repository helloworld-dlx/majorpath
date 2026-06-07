/**
 * 专业风险画像 — categoryRiskProfiles.ts
 *
 * 从推荐权重中独立出来的风险数据层。
 * 每个专业类的非权重风险标签，供推荐引擎和风险提示模块使用。
 *
 * v0.4 — 与 CATEGORY_WEIGHTS_V0.4_ADJUSTMENT_SPEC.md 对齐
 */

export type ResourceDependency = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';
export type PressureLevel = 'low' | 'medium' | 'high';

export interface CategoryRiskProfile {
  slug: string;

  /** 对院校平台/实验室/行业资源的依赖程度 */
  resourceDependency: ResourceDependency;

  /** 高中生是否容易因名字/热度/薪资想象而误选 */
  blindChoiceRisk: RiskLevel;

  /** 是否需要艺考/体测/政审/体检等特殊招生条件 */
  requiresSpecialCondition: boolean;

  /** 是否仅在用户兴趣维度很高时才推荐 */
  recommendedOnlyIfHighInterest: boolean;

  /** 学习周期/考试周期/培养周期压力 */
  longCyclePressure: PressureLevel;

  /** 对学校平台和资源是否特别敏感 */
  schoolTierSensitive: boolean;

  /** 高中生是否容易误解该专业真实内容 */
  commonMisunderstandingRisk: RiskLevel;
}

/**
 * 全量 93 专业类风险画像
 */
export const CATEGORY_RISK_PROFILES: Record<string, CategoryRiskProfile> = {
  // === 01 哲学 ===
  'philosophy-class': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 02 经济学 ===
  'economics-class': { resourceDependency: 'low', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'finance': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'medium' },
  'international-trade': { resourceDependency: 'low', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'public-finance': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 03 法学 ===
  'law-class': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'political-science': { resourceDependency: 'low', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'sociology': { resourceDependency: 'low', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'marxism': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'public-security': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'ethnology': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 04 教育学 ===
  'education': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'physical-education': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 05 文学 ===
  'chinese-literature': { resourceDependency: 'low', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'foreign-languages': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'journalism': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'high' },

  // === 06 历史学 ===
  'history-class': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 07 理学 ===
  'mathematics': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'physics': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'chemistry': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'biology': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'statistics': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'psychology': { resourceDependency: 'high', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: true, commonMisunderstandingRisk: 'high' },
  'geography': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'astronomy': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'atmospheric-science': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'ocean-science': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'geophysics': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'geology': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 08 工学 (selected key categories) ===
  'computer-science': { resourceDependency: 'high', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'high' },
  'electronic-information': { resourceDependency: 'high', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'high' },
  'energy-power': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'automation': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'instrumentation': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'mechanical': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'chemical-pharma': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'transportation': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'environmental': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'bioengineering': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'food-science': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'electrical': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'water-resources': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'civil-engineering': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'materials': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'architecture': { resourceDependency: 'high', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: true, commonMisunderstandingRisk: 'medium' },
  'aerospace': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'biomedical-eng': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'mechanics': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'surveying': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'safety-eng': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'geological-eng': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'nuclear': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'ocean-engineering': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'agricultural-eng': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'light-industry': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'public-security-tech': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'mining': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'textile': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'ordnance': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'forestry-eng': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 09 农学 ===
  'plant-production': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'environmental-ecology': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'veterinary': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'animal-production': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'forestry': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'aquaculture': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'grassland-science': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 10 医学 ===
  'clinical-medicine': { resourceDependency: 'high', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: true, commonMisunderstandingRisk: 'medium' },
  'pharmacy': { resourceDependency: 'high', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'tcm': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'nursing': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'public-health': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'stomatology': { resourceDependency: 'high', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
  'integrated-medicine': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'chinese-pharmacy': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'medical-technology': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'basic-medicine': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'high', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'forensic-medicine': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'medium', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 12 管理学 ===
  'business-administration': { resourceDependency: 'medium', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'high' },
  'public-administration': { resourceDependency: 'low', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'management-science': { resourceDependency: 'low', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'e-commerce': { resourceDependency: 'low', blindChoiceRisk: 'high', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'high' },
  'tourism-management': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'logistics': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'industrial-engineering': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'library-science': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'agri-economics': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 13 艺术学 ===
  'design': { resourceDependency: 'medium', blindChoiceRisk: 'medium', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'medium' },
  'fine-arts': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'drama-film': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'music-dance': { resourceDependency: 'medium', blindChoiceRisk: 'low', requiresSpecialCondition: true, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },
  'art-theory': { resourceDependency: 'low', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: true, longCyclePressure: 'low', schoolTierSensitive: false, commonMisunderstandingRisk: 'low' },

  // === 14 交叉学科 ===
  'interdisciplinary-class': { resourceDependency: 'high', blindChoiceRisk: 'low', requiresSpecialCondition: false, recommendedOnlyIfHighInterest: false, longCyclePressure: 'low', schoolTierSensitive: true, commonMisunderstandingRisk: 'low' },
};
