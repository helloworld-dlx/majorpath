/**
 * majorPersonaLibrary.ts
 * 「专业不迷路」专业推荐测试模拟器画像库
 *
 * 版本：v0.1-candidate
 * 生成日期：2026-06-07
 *
 * 重要说明：
 * 1. 本文件覆盖 93 个本科专业类，共 193 个虚拟学生画像。
 * 2. admissionScaleLevel / samplingWeight 是“模拟器抽样权重”，不是专业推荐权重。
 * 3. 这些规模档位是启发式估计：综合常见高校招生布点、大类招生频率、专业类常见程度和小众程度。
 * 4. 不要把本文件当作全国精确招生人数统计，也不要直接用于正式报考建议。
 * 5. 正式上线前，建议用真实问卷、模拟器结果和本专业同学审核继续校准。
 */

export type AdmissionScaleLevel = "very_large" | "large" | "medium" | "small" | "very_small";
export type Level = "low" | "medium" | "high";

export interface MajorPersona {
  id: string;
  categorySlug: string;
  categoryName: string;
  admissionScaleLevel: AdmissionScaleLevel;
  samplingWeight: number;
  personaVariantIndex: number;
  personaName: string;
  shortDescription: string;
  majorInterestSignals: string[];
  learningStyleTraits: string[];
  strengthSignals: string[];
  riskSignals: string[];
  commonMotivations: string[];
  commonMisunderstandings: string[];
  schoolTierSensitivity: Level;
  longCyclePressure: Level;
  requiresSpecialCondition: boolean;
  recommendedOnlyIfHighInterest: boolean;
  sixBucketAffinity: {
    stem: number;
    life_health: number;
    business: number;
    social_science: number;
    humanities: number;
    art_creative: number;
  };
  answerStyleHints: {
    likesMath?: Level;
    likesPhysics?: Level;
    likesChemistry?: Level;
    likesBiology?: Level;
    likesWriting?: Level;
    likesCommunication?: Level;
    likesHandsOn?: Level;
    likesProgramming?: Level;
    likesExperiment?: Level;
    likesMemorization?: Level;
    acceptsLongStudyCycle?: Level;
    valuesStability?: Level;
    valuesIncome?: Level;
    valuesInterest?: Level;
    acceptsGraduateStudy?: Level;
  };
  notes?: string;
}

export interface MajorCategorySamplingProfile {
  categorySlug: string;
  categoryName: string;
  disciplineDoor: string;
  admissionScaleLevel: AdmissionScaleLevel;
  samplingWeight: number;
  personaCountSuggestion: number;
  whyThisScale: string;
  requiresSpecialCondition: boolean;
  recommendedOnlyIfHighInterest: boolean;
  schoolTierSensitivity: Level;
  blindChoiceRisk: Level;
}

export const personaLibraryMeta = {
  version: "v0.1-candidate",
  generatedAt: "2026-06-07",
  categoryCount: 93,
  personaCount: 193,
  scaleMethod: "heuristic_relative_admission_scale",
  warning: "samplingWeight 是模拟抽样权重，不是推荐权重；本库不代表全国精确招生比例。"
} as const;

export const majorCategorySamplingTable: MajorCategorySamplingProfile[] = [
  {
    "categorySlug": "philosophy-class",
    "categoryName": "哲学类",
    "disciplineDoor": "哲学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "economics-class",
    "categoryName": "经济学类",
    "disciplineDoor": "经济学",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "finance",
    "categoryName": "金融学类",
    "disciplineDoor": "经济学",
    "admissionScaleLevel": "large",
    "samplingWeight": 58,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "international-trade",
    "categoryName": "经济与贸易类",
    "disciplineDoor": "经济学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 35,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "public-finance",
    "categoryName": "财政学类",
    "disciplineDoor": "经济学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "law-class",
    "categoryName": "法学类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "political-science",
    "categoryName": "政治学类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "sociology",
    "categoryName": "社会学类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "marxism",
    "categoryName": "马克思主义理论类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "small",
    "samplingWeight": 16,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "public-security",
    "categoryName": "公安学类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "ethnology",
    "categoryName": "民族学类",
    "disciplineDoor": "法学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "education",
    "categoryName": "教育学类",
    "disciplineDoor": "教育学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 75,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "physical-education",
    "categoryName": "体育学类",
    "disciplineDoor": "教育学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "chinese-literature",
    "categoryName": "中国语言文学类",
    "disciplineDoor": "文学",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "foreign-languages",
    "categoryName": "外国语言文学类",
    "disciplineDoor": "文学",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "journalism",
    "categoryName": "新闻传播学类",
    "disciplineDoor": "文学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "history-class",
    "categoryName": "历史学类",
    "disciplineDoor": "历史学",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "mathematics",
    "categoryName": "数学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "physics",
    "categoryName": "物理学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "chemistry",
    "categoryName": "化学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "biology",
    "categoryName": "生物科学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "statistics",
    "categoryName": "统计学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "psychology",
    "categoryName": "心理学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "geography",
    "categoryName": "地理科学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "astronomy",
    "categoryName": "天文学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "atmospheric-science",
    "categoryName": "大气科学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "ocean-science",
    "categoryName": "海洋科学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "small",
    "samplingWeight": 11,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "geophysics",
    "categoryName": "地球物理学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "geology",
    "categoryName": "地质学类",
    "disciplineDoor": "理学",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "computer-science",
    "categoryName": "计算机类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 92,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "electronic-information",
    "categoryName": "电子信息类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 86,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "energy-power",
    "categoryName": "能源动力类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 52,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "automation",
    "categoryName": "自动化类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "instrumentation",
    "categoryName": "仪器类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "mechanical",
    "categoryName": "机械类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "chemical-pharma",
    "categoryName": "化工与制药类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "transportation",
    "categoryName": "交通运输类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "environmental",
    "categoryName": "环境科学与工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 40,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "bioengineering",
    "categoryName": "生物工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "food-science",
    "categoryName": "食品科学与工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "electrical",
    "categoryName": "电气类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "civil-engineering",
    "categoryName": "土木类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "materials",
    "categoryName": "材料类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "architecture",
    "categoryName": "建筑类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "water-resources",
    "categoryName": "水利类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "aerospace",
    "categoryName": "航空航天类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 18,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "biomedical-eng",
    "categoryName": "生物医学工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "mechanics",
    "categoryName": "力学类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "surveying",
    "categoryName": "测绘类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "safety-eng",
    "categoryName": "安全科学与工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 20,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "geological-eng",
    "categoryName": "地质类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "nuclear",
    "categoryName": "核工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 7,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "ocean-engineering",
    "categoryName": "海洋工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "agricultural-eng",
    "categoryName": "农业工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "light-industry",
    "categoryName": "轻工类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 11,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "public-security-tech",
    "categoryName": "公安技术类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "mining",
    "categoryName": "矿业类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "textile",
    "categoryName": "纺织类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "ordnance",
    "categoryName": "兵器类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "forestry-eng",
    "categoryName": "林业工程类",
    "disciplineDoor": "工学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "plant-production",
    "categoryName": "植物生产类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "environmental-ecology",
    "categoryName": "自然保护与环境生态类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "veterinary",
    "categoryName": "动物医学类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "animal-production",
    "categoryName": "动物生产类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "forestry",
    "categoryName": "林学类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "aquaculture",
    "categoryName": "水产类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "grassland-science",
    "categoryName": "草学类",
    "disciplineDoor": "农学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "clinical-medicine",
    "categoryName": "临床医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 72,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "pharmacy",
    "categoryName": "药学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "tcm",
    "categoryName": "中医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "nursing",
    "categoryName": "护理学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 65,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "public-health",
    "categoryName": "公共卫生与预防医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "stomatology",
    "categoryName": "口腔医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "integrated-medicine",
    "categoryName": "中西医结合类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "chinese-pharmacy",
    "categoryName": "中药学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "medical-technology",
    "categoryName": "医学技术类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "basic-medicine",
    "categoryName": "基础医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "forensic-medicine",
    "categoryName": "法医学类",
    "disciplineDoor": "医学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "business-administration",
    "categoryName": "工商管理类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaCountSuggestion": 4,
    "whyThisScale": "通常属于招生面较广或大类入口明显的专业类，因此画像抽样权重较高。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "public-administration",
    "categoryName": "公共管理类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "management-science",
    "categoryName": "管理科学与工程类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "e-commerce",
    "categoryName": "电子商务类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "tourism-management",
    "categoryName": "旅游管理类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "logistics",
    "categoryName": "物流管理与工程类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "industrial-engineering",
    "categoryName": "工业工程类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "low",
    "blindChoiceRisk": "low"
  },
  {
    "categorySlug": "library-science",
    "categoryName": "图书情报与档案管理类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "agri-economics",
    "categoryName": "农业经济管理类",
    "disciplineDoor": "管理学",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaCountSuggestion": 1,
    "whyThisScale": "细分或稀少方向，保留覆盖但降低抽样频率。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "design",
    "categoryName": "设计学类",
    "disciplineDoor": "艺术学",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaCountSuggestion": 3,
    "whyThisScale": "在不少高校中较常见，招生规模相对较大，但不宜压过适配度。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "fine-arts",
    "categoryName": "美术学类",
    "disciplineDoor": "艺术学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "music-dance",
    "categoryName": "音乐与舞蹈学类",
    "disciplineDoor": "艺术学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "drama-film",
    "categoryName": "戏剧与影视学类",
    "disciplineDoor": "艺术学",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaCountSuggestion": 2,
    "whyThisScale": "有稳定布点和明确方向，但整体规模不如常见大类。",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "high"
  },
  {
    "categorySlug": "art-theory",
    "categoryName": "艺术学理论类",
    "disciplineDoor": "艺术学",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "medium",
    "blindChoiceRisk": "medium"
  },
  {
    "categorySlug": "interdisciplinary-class",
    "categoryName": "交叉学科类",
    "disciplineDoor": "交叉学科",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaCountSuggestion": 1,
    "whyThisScale": "相对专门，通常需要更明确的兴趣或院校资源匹配。",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "schoolTierSensitivity": "high",
    "blindChoiceRisk": "medium"
  }
];

export const majorPersonaLibrary: MajorPersona[] = [
  {
    "id": "philosophy-class-p01",
    "categorySlug": "philosophy-class",
    "categoryName": "哲学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "哲学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对哲学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解哲学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为哲学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "economics-class-p01",
    "categorySlug": "economics-class",
    "categoryName": "经济学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 1,
    "personaName": "经济学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对经济学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解经济学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为经济学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "economics-class-p02",
    "categorySlug": "economics-class",
    "categoryName": "经济学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 2,
    "personaName": "经济学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对经济学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解经济学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为经济学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "economics-class-p03",
    "categorySlug": "economics-class",
    "categoryName": "经济学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 3,
    "personaName": "经济学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对经济学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解经济学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为经济学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "finance-p01",
    "categorySlug": "finance",
    "categoryName": "金融学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 58,
    "personaVariantIndex": 1,
    "personaName": "金融学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对金融学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "对资金流动、风险和市场机制感兴趣",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要只被高薪想象吸引",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解金融学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为金融学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "finance-p02",
    "categorySlug": "finance",
    "categoryName": "金融学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 58,
    "personaVariantIndex": 2,
    "personaName": "金融学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对金融学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "对资金流动、风险和市场机制感兴趣",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要只被高薪想象吸引",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解金融学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为金融学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "finance-p03",
    "categorySlug": "finance",
    "categoryName": "金融学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 58,
    "personaVariantIndex": 3,
    "personaName": "金融学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对金融学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "对资金流动、风险和市场机制感兴趣",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要只被高薪想象吸引",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解金融学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为金融学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "international-trade-p01",
    "categorySlug": "international-trade",
    "categoryName": "经济与贸易类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 35,
    "personaVariantIndex": 1,
    "personaName": "经济与贸易·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对经济与贸易类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解经济与贸易类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为经济与贸易类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "international-trade-p02",
    "categorySlug": "international-trade",
    "categoryName": "经济与贸易类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 35,
    "personaVariantIndex": 2,
    "personaName": "经济与贸易·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对经济与贸易类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解经济与贸易类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为经济与贸易类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-finance-p01",
    "categorySlug": "public-finance",
    "categoryName": "财政学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 1,
    "personaName": "财政学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对财政学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解财政学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为财政学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-finance-p02",
    "categorySlug": "public-finance",
    "categoryName": "财政学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 2,
    "personaName": "财政学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对财政学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解财政学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为财政学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "law-class-p01",
    "categorySlug": "law-class",
    "categoryName": "法学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 1,
    "personaName": "法学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对法学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢规则、案例、辩论与公平议题",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要以为法学只靠背条文",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解法学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为法学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "law-class-p02",
    "categorySlug": "law-class",
    "categoryName": "法学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 2,
    "personaName": "法学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对法学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢规则、案例、辩论与公平议题",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要以为法学只靠背条文",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解法学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为法学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "law-class-p03",
    "categorySlug": "law-class",
    "categoryName": "法学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 3,
    "personaName": "法学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对法学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢规则、案例、辩论与公平议题",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要以为法学只靠背条文",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解法学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为法学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "political-science-p01",
    "categorySlug": "political-science",
    "categoryName": "政治学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 1,
    "personaName": "政治学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对政治学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解政治学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为政治学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "political-science-p02",
    "categorySlug": "political-science",
    "categoryName": "政治学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 2,
    "personaName": "政治学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对政治学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解政治学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为政治学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "sociology-p01",
    "categorySlug": "sociology",
    "categoryName": "社会学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaVariantIndex": 1,
    "personaName": "社会学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对社会学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解社会学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为社会学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "sociology-p02",
    "categorySlug": "sociology",
    "categoryName": "社会学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaVariantIndex": 2,
    "personaName": "社会学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对社会学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解社会学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为社会学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "marxism-p01",
    "categorySlug": "marxism",
    "categoryName": "马克思主义理论类",
    "admissionScaleLevel": "small",
    "samplingWeight": 16,
    "personaVariantIndex": 1,
    "personaName": "马克思主义理论·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对马克思主义理论类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解马克思主义理论类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为马克思主义理论类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-security-p01",
    "categorySlug": "public-security",
    "categoryName": "公安学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaVariantIndex": 1,
    "personaName": "公安学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对公安学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解公安学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公安学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "ethnology-p01",
    "categorySlug": "ethnology",
    "categoryName": "民族学类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaVariantIndex": 1,
    "personaName": "民族学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对民族学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解民族学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为民族学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "education-p01",
    "categorySlug": "education",
    "categoryName": "教育学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 75,
    "personaVariantIndex": 1,
    "personaName": "教育学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对教育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢陪伴、表达和帮助别人理解知识",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要把教育学简单等同于稳定",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解教育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为教育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "education-p02",
    "categorySlug": "education",
    "categoryName": "教育学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 75,
    "personaVariantIndex": 2,
    "personaName": "教育学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对教育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢陪伴、表达和帮助别人理解知识",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要把教育学简单等同于稳定",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解教育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为教育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "education-p03",
    "categorySlug": "education",
    "categoryName": "教育学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 75,
    "personaVariantIndex": 3,
    "personaName": "教育学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对教育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢陪伴、表达和帮助别人理解知识",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要把教育学简单等同于稳定",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解教育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为教育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "education-p04",
    "categorySlug": "education",
    "categoryName": "教育学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 75,
    "personaVariantIndex": 4,
    "personaName": "教育学·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对教育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢陪伴、表达和帮助别人理解知识",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要把教育学简单等同于稳定",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力"
    ],
    "commonMotivations": [
      "想进一步了解教育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为教育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 6,
      "life_health": 4,
      "business": 17,
      "social_science": 74,
      "humanities": 38,
      "art_creative": 6
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "physical-education-p01",
    "categorySlug": "physical-education",
    "categoryName": "体育学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "体育学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对体育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解体育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为体育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 30
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "physical-education-p02",
    "categorySlug": "physical-education",
    "categoryName": "体育学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "体育学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对体育学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解体育学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为体育学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 30
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chinese-literature-p01",
    "categorySlug": "chinese-literature",
    "categoryName": "中国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 1,
    "personaName": "中国语言文学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对中国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解中国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chinese-literature-p02",
    "categorySlug": "chinese-literature",
    "categoryName": "中国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 2,
    "personaName": "中国语言文学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对中国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解中国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chinese-literature-p03",
    "categorySlug": "chinese-literature",
    "categoryName": "中国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 3,
    "personaName": "中国语言文学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对中国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解中国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "foreign-languages-p01",
    "categorySlug": "foreign-languages",
    "categoryName": "外国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 1,
    "personaName": "外国语言文学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对外国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解外国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为外国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "foreign-languages-p02",
    "categorySlug": "foreign-languages",
    "categoryName": "外国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 2,
    "personaName": "外国语言文学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对外国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解外国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为外国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "foreign-languages-p03",
    "categorySlug": "foreign-languages",
    "categoryName": "外国语言文学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 3,
    "personaName": "外国语言文学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对外国语言文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解外国语言文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为外国语言文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "journalism-p01",
    "categorySlug": "journalism",
    "categoryName": "新闻传播学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "新闻传播学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对新闻传播学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解新闻传播学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为新闻传播学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 45
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "journalism-p02",
    "categorySlug": "journalism",
    "categoryName": "新闻传播学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "新闻传播学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对新闻传播学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解新闻传播学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为新闻传播学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 45
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "journalism-p03",
    "categorySlug": "journalism",
    "categoryName": "新闻传播学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "新闻传播学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对新闻传播学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解新闻传播学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为新闻传播学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 45
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "history-class-p01",
    "categorySlug": "history-class",
    "categoryName": "历史学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaVariantIndex": 1,
    "personaName": "历史学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对历史学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解历史学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为历史学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 8,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mathematics-p01",
    "categorySlug": "mathematics",
    "categoryName": "数学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 1,
    "personaName": "数学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对数学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解数学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为数学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mathematics-p02",
    "categorySlug": "mathematics",
    "categoryName": "数学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 2,
    "personaName": "数学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对数学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解数学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为数学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mathematics-p03",
    "categorySlug": "mathematics",
    "categoryName": "数学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 3,
    "personaName": "数学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对数学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解数学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为数学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "physics-p01",
    "categorySlug": "physics",
    "categoryName": "物理学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 1,
    "personaName": "物理学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对物理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解物理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为物理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "physics-p02",
    "categorySlug": "physics",
    "categoryName": "物理学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 2,
    "personaName": "物理学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对物理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解物理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为物理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chemistry-p01",
    "categorySlug": "chemistry",
    "categoryName": "化学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "化学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对化学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解化学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为化学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chemistry-p02",
    "categorySlug": "chemistry",
    "categoryName": "化学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "化学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对化学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解化学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为化学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "biology-p01",
    "categorySlug": "biology",
    "categoryName": "生物科学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 1,
    "personaName": "生物科学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对生物科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "biology-p02",
    "categorySlug": "biology",
    "categoryName": "生物科学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 2,
    "personaName": "生物科学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对生物科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "statistics-p01",
    "categorySlug": "statistics",
    "categoryName": "统计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "统计学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对统计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解统计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为统计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 55,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "statistics-p02",
    "categorySlug": "statistics",
    "categoryName": "统计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "统计学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对统计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解统计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为统计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 55,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "statistics-p03",
    "categorySlug": "statistics",
    "categoryName": "统计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "统计学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对统计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解统计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为统计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 55,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "medium",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "psychology-p01",
    "categorySlug": "psychology",
    "categoryName": "心理学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 1,
    "personaName": "心理学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对心理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "对人的行为、情绪和认知感兴趣",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要以为心理学就是聊天安慰人",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解心理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为心理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "psychology-p02",
    "categorySlug": "psychology",
    "categoryName": "心理学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 32,
    "personaVariantIndex": 2,
    "personaName": "心理学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对心理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "对人的行为、情绪和认知感兴趣",
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "不要以为心理学就是聊天安慰人",
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解心理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为心理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 20,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "geography-p01",
    "categorySlug": "geography",
    "categoryName": "地理科学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 1,
    "personaName": "地理科学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对地理科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解地理科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为地理科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "geography-p02",
    "categorySlug": "geography",
    "categoryName": "地理科学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 2,
    "personaName": "地理科学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对地理科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解地理科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为地理科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "astronomy-p01",
    "categorySlug": "astronomy",
    "categoryName": "天文学类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaVariantIndex": 1,
    "personaName": "天文学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对天文学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解天文学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为天文学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "atmospheric-science-p01",
    "categorySlug": "atmospheric-science",
    "categoryName": "大气科学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "大气科学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对大气科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解大气科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为大气科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "ocean-science-p01",
    "categorySlug": "ocean-science",
    "categoryName": "海洋科学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 11,
    "personaVariantIndex": 1,
    "personaName": "海洋科学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对海洋科学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解海洋科学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为海洋科学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "geophysics-p01",
    "categorySlug": "geophysics",
    "categoryName": "地球物理学类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaVariantIndex": 1,
    "personaName": "地球物理学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对地球物理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解地球物理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为地球物理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "geology-p01",
    "categorySlug": "geology",
    "categoryName": "地质学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaVariantIndex": 1,
    "personaName": "地质学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对地质学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解地质学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为地质学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "computer-science-p01",
    "categorySlug": "computer-science",
    "categoryName": "计算机类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 92,
    "personaVariantIndex": 1,
    "personaName": "计算机·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对计算机类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢编程、逻辑、自动化解决问题",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要只因为高薪或游戏兴趣选择",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解计算机类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为计算机类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "computer-science-p02",
    "categorySlug": "computer-science",
    "categoryName": "计算机类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 92,
    "personaVariantIndex": 2,
    "personaName": "计算机·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对计算机类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢编程、逻辑、自动化解决问题",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要只因为高薪或游戏兴趣选择",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解计算机类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为计算机类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "computer-science-p03",
    "categorySlug": "computer-science",
    "categoryName": "计算机类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 92,
    "personaVariantIndex": 3,
    "personaName": "计算机·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对计算机类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢编程、逻辑、自动化解决问题",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要只因为高薪或游戏兴趣选择",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解计算机类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为计算机类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "computer-science-p04",
    "categorySlug": "computer-science",
    "categoryName": "计算机类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 92,
    "personaVariantIndex": 4,
    "personaName": "计算机·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对计算机类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢编程、逻辑、自动化解决问题",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要只因为高薪或游戏兴趣选择",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同"
    ],
    "commonMotivations": [
      "想进一步了解计算机类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为计算机类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 74,
      "life_health": 6,
      "business": 6,
      "social_science": 3,
      "humanities": 1,
      "art_creative": 4
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electronic-information-p01",
    "categorySlug": "electronic-information",
    "categoryName": "电子信息类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 86,
    "personaVariantIndex": 1,
    "personaName": "电子信息·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对电子信息类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢电路、通信、芯片或嵌入式设备",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要把电子信息理解成修电器",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电子信息类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子信息类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electronic-information-p02",
    "categorySlug": "electronic-information",
    "categoryName": "电子信息类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 86,
    "personaVariantIndex": 2,
    "personaName": "电子信息·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对电子信息类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢电路、通信、芯片或嵌入式设备",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要把电子信息理解成修电器",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电子信息类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子信息类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electronic-information-p03",
    "categorySlug": "electronic-information",
    "categoryName": "电子信息类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 86,
    "personaVariantIndex": 3,
    "personaName": "电子信息·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对电子信息类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢电路、通信、芯片或嵌入式设备",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要把电子信息理解成修电器",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电子信息类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子信息类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electronic-information-p04",
    "categorySlug": "electronic-information",
    "categoryName": "电子信息类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 86,
    "personaVariantIndex": 4,
    "personaName": "电子信息·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对电子信息类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢电路、通信、芯片或嵌入式设备",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要把电子信息理解成修电器",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同"
    ],
    "commonMotivations": [
      "想进一步了解电子信息类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子信息类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 74,
      "life_health": 6,
      "business": 6,
      "social_science": 3,
      "humanities": 1,
      "art_creative": 4
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "energy-power-p01",
    "categorySlug": "energy-power",
    "categoryName": "能源动力类",
    "admissionScaleLevel": "large",
    "samplingWeight": 52,
    "personaVariantIndex": 1,
    "personaName": "能源动力·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对能源动力类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解能源动力类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为能源动力类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "energy-power-p02",
    "categorySlug": "energy-power",
    "categoryName": "能源动力类",
    "admissionScaleLevel": "large",
    "samplingWeight": 52,
    "personaVariantIndex": 2,
    "personaName": "能源动力·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对能源动力类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解能源动力类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为能源动力类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "energy-power-p03",
    "categorySlug": "energy-power",
    "categoryName": "能源动力类",
    "admissionScaleLevel": "large",
    "samplingWeight": 52,
    "personaVariantIndex": 3,
    "personaName": "能源动力·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对能源动力类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解能源动力类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为能源动力类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "automation-p01",
    "categorySlug": "automation",
    "categoryName": "自动化类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 1,
    "personaName": "自动化·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对自动化类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解自动化类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为自动化类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "automation-p02",
    "categorySlug": "automation",
    "categoryName": "自动化类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 2,
    "personaName": "自动化·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对自动化类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解自动化类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为自动化类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "automation-p03",
    "categorySlug": "automation",
    "categoryName": "自动化类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 3,
    "personaName": "自动化·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对自动化类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解自动化类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为自动化类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "high",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "instrumentation-p01",
    "categorySlug": "instrumentation",
    "categoryName": "仪器类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 1,
    "personaName": "仪器·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对仪器类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解仪器类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为仪器类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "instrumentation-p02",
    "categorySlug": "instrumentation",
    "categoryName": "仪器类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 2,
    "personaName": "仪器·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对仪器类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解仪器类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为仪器类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mechanical-p01",
    "categorySlug": "mechanical",
    "categoryName": "机械类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 1,
    "personaName": "机械·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对机械类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢结构、机器、工程装置",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要以为机械只是拧螺丝",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解机械类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为机械类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mechanical-p02",
    "categorySlug": "mechanical",
    "categoryName": "机械类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 2,
    "personaName": "机械·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对机械类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢结构、机器、工程装置",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要以为机械只是拧螺丝",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解机械类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为机械类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mechanical-p03",
    "categorySlug": "mechanical",
    "categoryName": "机械类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 3,
    "personaName": "机械·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对机械类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢结构、机器、工程装置",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "不要以为机械只是拧螺丝",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解机械类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为机械类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mechanical-p04",
    "categorySlug": "mechanical",
    "categoryName": "机械类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 4,
    "personaName": "机械·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对机械类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢结构、机器、工程装置",
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要以为机械只是拧螺丝",
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同"
    ],
    "commonMotivations": [
      "想进一步了解机械类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为机械类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 74,
      "life_health": 6,
      "business": 6,
      "social_science": 3,
      "humanities": 1,
      "art_creative": 4
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chemical-pharma-p01",
    "categorySlug": "chemical-pharma",
    "categoryName": "化工与制药类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 1,
    "personaName": "化工与制药·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对化工与制药类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解化工与制药类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为化工与制药类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chemical-pharma-p02",
    "categorySlug": "chemical-pharma",
    "categoryName": "化工与制药类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 2,
    "personaName": "化工与制药·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对化工与制药类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解化工与制药类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为化工与制药类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chemical-pharma-p03",
    "categorySlug": "chemical-pharma",
    "categoryName": "化工与制药类",
    "admissionScaleLevel": "large",
    "samplingWeight": 48,
    "personaVariantIndex": 3,
    "personaName": "化工与制药·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对化工与制药类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解化工与制药类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为化工与制药类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "transportation-p01",
    "categorySlug": "transportation",
    "categoryName": "交通运输类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "交通运输·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对交通运输类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解交通运输类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为交通运输类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "transportation-p02",
    "categorySlug": "transportation",
    "categoryName": "交通运输类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "交通运输·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对交通运输类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解交通运输类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为交通运输类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "transportation-p03",
    "categorySlug": "transportation",
    "categoryName": "交通运输类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "交通运输·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对交通运输类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解交通运输类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为交通运输类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "environmental-p01",
    "categorySlug": "environmental",
    "categoryName": "环境科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 40,
    "personaVariantIndex": 1,
    "personaName": "环境科学与工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对环境科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解环境科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为环境科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "environmental-p02",
    "categorySlug": "environmental",
    "categoryName": "环境科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 40,
    "personaVariantIndex": 2,
    "personaName": "环境科学与工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对环境科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解环境科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为环境科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "environmental-p03",
    "categorySlug": "environmental",
    "categoryName": "环境科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 40,
    "personaVariantIndex": 3,
    "personaName": "环境科学与工程·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对环境科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解环境科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为环境科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "bioengineering-p01",
    "categorySlug": "bioengineering",
    "categoryName": "生物工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "生物工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对生物工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "bioengineering-p02",
    "categorySlug": "bioengineering",
    "categoryName": "生物工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "生物工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对生物工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "food-science-p01",
    "categorySlug": "food-science",
    "categoryName": "食品科学与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "食品科学与工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对食品科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解食品科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为食品科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "food-science-p02",
    "categorySlug": "food-science",
    "categoryName": "食品科学与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "食品科学与工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对食品科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解食品科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为食品科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electrical-p01",
    "categorySlug": "electrical",
    "categoryName": "电气类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 1,
    "personaName": "电气·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对电气类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电气类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电气类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electrical-p02",
    "categorySlug": "electrical",
    "categoryName": "电气类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 2,
    "personaName": "电气·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对电气类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电气类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电气类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "electrical-p03",
    "categorySlug": "electrical",
    "categoryName": "电气类",
    "admissionScaleLevel": "large",
    "samplingWeight": 55,
    "personaVariantIndex": 3,
    "personaName": "电气·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对电气类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解电气类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电气类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "civil-engineering-p01",
    "categorySlug": "civil-engineering",
    "categoryName": "土木类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "土木·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对土木类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解土木类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为土木类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "civil-engineering-p02",
    "categorySlug": "civil-engineering",
    "categoryName": "土木类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "土木·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对土木类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解土木类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为土木类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "civil-engineering-p03",
    "categorySlug": "civil-engineering",
    "categoryName": "土木类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "土木·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对土木类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解土木类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为土木类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "materials-p01",
    "categorySlug": "materials",
    "categoryName": "材料类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "材料·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对材料类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解材料类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为材料类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "materials-p02",
    "categorySlug": "materials",
    "categoryName": "材料类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "材料·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对材料类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解材料类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为材料类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "materials-p03",
    "categorySlug": "materials",
    "categoryName": "材料类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "材料·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对材料类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解材料类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为材料类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "high",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "architecture-p01",
    "categorySlug": "architecture",
    "categoryName": "建筑类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 1,
    "personaName": "建筑·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对建筑类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解建筑类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为建筑类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 45,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "architecture-p02",
    "categorySlug": "architecture",
    "categoryName": "建筑类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 2,
    "personaName": "建筑·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对建筑类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解建筑类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为建筑类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 45,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "water-resources-p01",
    "categorySlug": "water-resources",
    "categoryName": "水利类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 1,
    "personaName": "水利·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对水利类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解水利类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为水利类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "water-resources-p02",
    "categorySlug": "water-resources",
    "categoryName": "水利类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 2,
    "personaName": "水利·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对水利类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解水利类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为水利类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "aerospace-p01",
    "categorySlug": "aerospace",
    "categoryName": "航空航天类",
    "admissionScaleLevel": "small",
    "samplingWeight": 18,
    "personaVariantIndex": 1,
    "personaName": "航空航天·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对航空航天类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解航空航天类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为航空航天类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "biomedical-eng-p01",
    "categorySlug": "biomedical-eng",
    "categoryName": "生物医学工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 1,
    "personaName": "生物医学工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对生物医学工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物医学工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物医学工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "biomedical-eng-p02",
    "categorySlug": "biomedical-eng",
    "categoryName": "生物医学工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 2,
    "personaName": "生物医学工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对生物医学工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解生物医学工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为生物医学工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mechanics-p01",
    "categorySlug": "mechanics",
    "categoryName": "力学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "力学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对力学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解力学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为力学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "surveying-p01",
    "categorySlug": "surveying",
    "categoryName": "测绘类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaVariantIndex": 1,
    "personaName": "测绘·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对测绘类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解测绘类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为测绘类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "surveying-p02",
    "categorySlug": "surveying",
    "categoryName": "测绘类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaVariantIndex": 2,
    "personaName": "测绘·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对测绘类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解测绘类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为测绘类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "safety-eng-p01",
    "categorySlug": "safety-eng",
    "categoryName": "安全科学与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 20,
    "personaVariantIndex": 1,
    "personaName": "安全科学与工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对安全科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解安全科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为安全科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "safety-eng-p02",
    "categorySlug": "safety-eng",
    "categoryName": "安全科学与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 20,
    "personaVariantIndex": 2,
    "personaName": "安全科学与工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对安全科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解安全科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为安全科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "geological-eng-p01",
    "categorySlug": "geological-eng",
    "categoryName": "地质类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "地质·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对地质类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解地质类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为地质类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "nuclear-p01",
    "categorySlug": "nuclear",
    "categoryName": "核工程类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 7,
    "personaVariantIndex": 1,
    "personaName": "核工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对核工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解核工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为核工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "high",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "ocean-engineering-p01",
    "categorySlug": "ocean-engineering",
    "categoryName": "海洋工程类",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaVariantIndex": 1,
    "personaName": "海洋工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对海洋工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解海洋工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为海洋工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "agricultural-eng-p01",
    "categorySlug": "agricultural-eng",
    "categoryName": "农业工程类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "农业工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对农业工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解农业工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为农业工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "light-industry-p01",
    "categorySlug": "light-industry",
    "categoryName": "轻工类",
    "admissionScaleLevel": "small",
    "samplingWeight": 11,
    "personaVariantIndex": 1,
    "personaName": "轻工·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对轻工类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解轻工类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为轻工类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-security-tech-p01",
    "categorySlug": "public-security-tech",
    "categoryName": "公安技术类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaVariantIndex": 1,
    "personaName": "公安技术·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对公安技术类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解公安技术类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公安技术类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "mining-p01",
    "categorySlug": "mining",
    "categoryName": "矿业类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaVariantIndex": 1,
    "personaName": "矿业·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对矿业类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解矿业类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为矿业类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "textile-p01",
    "categorySlug": "textile",
    "categoryName": "纺织类",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaVariantIndex": 1,
    "personaName": "纺织·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对纺织类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解纺织类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为纺织类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "ordnance-p01",
    "categorySlug": "ordnance",
    "categoryName": "兵器类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaVariantIndex": 1,
    "personaName": "兵器·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对兵器类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解兵器类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为兵器类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "medium",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "forestry-eng-p01",
    "categorySlug": "forestry-eng",
    "categoryName": "林业工程类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaVariantIndex": 1,
    "personaName": "林业工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对林业工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解林业工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为林业工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "plant-production-p01",
    "categorySlug": "plant-production",
    "categoryName": "植物生产类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "植物生产·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对植物生产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解植物生产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为植物生产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "plant-production-p02",
    "categorySlug": "plant-production",
    "categoryName": "植物生产类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "植物生产·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对植物生产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解植物生产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为植物生产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "plant-production-p03",
    "categorySlug": "plant-production",
    "categoryName": "植物生产类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "植物生产·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对植物生产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解植物生产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为植物生产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "environmental-ecology-p01",
    "categorySlug": "environmental-ecology",
    "categoryName": "自然保护与环境生态类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 1,
    "personaName": "自然保护与环境生态·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对自然保护与环境生态类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解自然保护与环境生态类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为自然保护与环境生态类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "environmental-ecology-p02",
    "categorySlug": "environmental-ecology",
    "categoryName": "自然保护与环境生态类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 2,
    "personaName": "自然保护与环境生态·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对自然保护与环境生态类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解自然保护与环境生态类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为自然保护与环境生态类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "veterinary-p01",
    "categorySlug": "veterinary",
    "categoryName": "动物医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "动物医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对动物医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解动物医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为动物医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "veterinary-p02",
    "categorySlug": "veterinary",
    "categoryName": "动物医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "动物医学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对动物医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解动物医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为动物医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "veterinary-p03",
    "categorySlug": "veterinary",
    "categoryName": "动物医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "动物医学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对动物医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解动物医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为动物医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "animal-production-p01",
    "categorySlug": "animal-production",
    "categoryName": "动物生产类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 1,
    "personaName": "动物生产·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对动物生产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解动物生产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为动物生产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "animal-production-p02",
    "categorySlug": "animal-production",
    "categoryName": "动物生产类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 24,
    "personaVariantIndex": 2,
    "personaName": "动物生产·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对动物生产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解动物生产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为动物生产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "forestry-p01",
    "categorySlug": "forestry",
    "categoryName": "林学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "林学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对林学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解林学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为林学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "aquaculture-p01",
    "categorySlug": "aquaculture",
    "categoryName": "水产类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaVariantIndex": 1,
    "personaName": "水产·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对水产类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解水产类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为水产类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "grassland-science-p01",
    "categorySlug": "grassland-science",
    "categoryName": "草学类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 4,
    "personaVariantIndex": 1,
    "personaName": "草学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对草学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解草学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为草学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 88,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "clinical-medicine-p01",
    "categorySlug": "clinical-medicine",
    "categoryName": "临床医学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 72,
    "personaVariantIndex": 1,
    "personaName": "临床医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对临床医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "愿意面对真实健康问题和职业责任",
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "不要低估学制、考试和职业责任",
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解临床医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为临床医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "clinical-medicine-p02",
    "categorySlug": "clinical-medicine",
    "categoryName": "临床医学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 72,
    "personaVariantIndex": 2,
    "personaName": "临床医学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对临床医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "愿意面对真实健康问题和职业责任",
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "不要低估学制、考试和职业责任",
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解临床医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为临床医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "clinical-medicine-p03",
    "categorySlug": "clinical-medicine",
    "categoryName": "临床医学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 72,
    "personaVariantIndex": 3,
    "personaName": "临床医学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对临床医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "愿意面对真实健康问题和职业责任",
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "不要低估学制、考试和职业责任",
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解临床医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为临床医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "clinical-medicine-p04",
    "categorySlug": "clinical-medicine",
    "categoryName": "临床医学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 72,
    "personaVariantIndex": 4,
    "personaName": "临床医学·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对临床医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "愿意面对真实健康问题和职业责任",
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要低估学制、考试和职业责任",
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛"
    ],
    "commonMotivations": [
      "想进一步了解临床医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为临床医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 32,
      "life_health": 78,
      "business": 4,
      "social_science": 12,
      "humanities": 4,
      "art_creative": 2
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "pharmacy-p01",
    "categorySlug": "pharmacy",
    "categoryName": "药学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "药学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对药学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解药学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为药学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "pharmacy-p02",
    "categorySlug": "pharmacy",
    "categoryName": "药学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "药学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对药学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解药学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为药学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "pharmacy-p03",
    "categorySlug": "pharmacy",
    "categoryName": "药学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "药学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对药学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解药学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为药学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "tcm-p01",
    "categorySlug": "tcm",
    "categoryName": "中医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "中医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对中医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "tcm-p02",
    "categorySlug": "tcm",
    "categoryName": "中医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "中医学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对中医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "tcm-p03",
    "categorySlug": "tcm",
    "categoryName": "中医学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "中医学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对中医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "nursing-p01",
    "categorySlug": "nursing",
    "categoryName": "护理学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 65,
    "personaVariantIndex": 1,
    "personaName": "护理学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对护理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解护理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为护理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "nursing-p02",
    "categorySlug": "nursing",
    "categoryName": "护理学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 65,
    "personaVariantIndex": 2,
    "personaName": "护理学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对护理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解护理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为护理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "nursing-p03",
    "categorySlug": "nursing",
    "categoryName": "护理学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 65,
    "personaVariantIndex": 3,
    "personaName": "护理学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对护理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解护理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为护理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "nursing-p04",
    "categorySlug": "nursing",
    "categoryName": "护理学类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 65,
    "personaVariantIndex": 4,
    "personaName": "护理学·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对护理学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异"
    ],
    "commonMotivations": [
      "想进一步了解护理学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为护理学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 32,
      "life_health": 78,
      "business": 4,
      "social_science": 12,
      "humanities": 4,
      "art_creative": 2
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-health-p01",
    "categorySlug": "public-health",
    "categoryName": "公共卫生与预防医学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 1,
    "personaName": "公共卫生与预防医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对公共卫生与预防医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解公共卫生与预防医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公共卫生与预防医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-health-p02",
    "categorySlug": "public-health",
    "categoryName": "公共卫生与预防医学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 2,
    "personaName": "公共卫生与预防医学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对公共卫生与预防医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解公共卫生与预防医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公共卫生与预防医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "stomatology-p01",
    "categorySlug": "stomatology",
    "categoryName": "口腔医学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "口腔医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对口腔医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解口腔医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为口腔医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "stomatology-p02",
    "categorySlug": "stomatology",
    "categoryName": "口腔医学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "口腔医学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对口腔医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解口腔医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为口腔医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "high",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "integrated-medicine-p01",
    "categorySlug": "integrated-medicine",
    "categoryName": "中西医结合类",
    "admissionScaleLevel": "small",
    "samplingWeight": 14,
    "personaVariantIndex": 1,
    "personaName": "中西医结合·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对中西医结合类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中西医结合类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中西医结合类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chinese-pharmacy-p01",
    "categorySlug": "chinese-pharmacy",
    "categoryName": "中药学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaVariantIndex": 1,
    "personaName": "中药学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对中药学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中药学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中药学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "chinese-pharmacy-p02",
    "categorySlug": "chinese-pharmacy",
    "categoryName": "中药学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 22,
    "personaVariantIndex": 2,
    "personaName": "中药学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对中药学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解中药学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为中药学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "high",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "medical-technology-p01",
    "categorySlug": "medical-technology",
    "categoryName": "医学技术类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "医学技术·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对医学技术类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解医学技术类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为医学技术类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "medical-technology-p02",
    "categorySlug": "medical-technology",
    "categoryName": "医学技术类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "医学技术·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对医学技术类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解医学技术类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为医学技术类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "medical-technology-p03",
    "categorySlug": "medical-technology",
    "categoryName": "医学技术类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "医学技术·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对医学技术类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解医学技术类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为医学技术类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "basic-medicine-p01",
    "categorySlug": "basic-medicine",
    "categoryName": "基础医学类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "基础医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对基础医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解基础医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为基础医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "high",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "forensic-medicine-p01",
    "categorySlug": "forensic-medicine",
    "categoryName": "法医学类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 5,
    "personaVariantIndex": 1,
    "personaName": "法医学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对法医学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注生命、健康、生态或自然系统",
      "愿意理解生物、医学或环境问题",
      "能接受实验和长期积累",
      "对真实世界的健康/生命议题有兴趣"
    ],
    "learningStyleTraits": [
      "能接受记忆与理解并重",
      "愿意阅读专业资料",
      "能接受实验或实践",
      "耐心细致"
    ],
    "strengthSignals": [
      "耐心和责任感",
      "观察记录能力",
      "理解复杂系统的能力",
      "长期学习能力"
    ],
    "riskSignals": [
      "可能低估学习周期",
      "可能低估实验、实习或资格门槛",
      "需要接受院校和方向差异",
      "不适合只想快速看到回报的人"
    ],
    "commonMotivations": [
      "想进一步了解法医学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为法医学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "high",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 38,
      "life_health": 92,
      "business": 5,
      "social_science": 15,
      "humanities": 5,
      "art_creative": 3
    },
    "answerStyleHints": {
      "likesMath": "medium",
      "likesPhysics": "low",
      "likesChemistry": "medium",
      "likesBiology": "high",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "high",
      "likesMemorization": "high",
      "acceptsLongStudyCycle": "high",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "business-administration-p01",
    "categorySlug": "business-administration",
    "categoryName": "工商管理类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 1,
    "personaName": "工商管理·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对工商管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注组织、商业模式和协作效率",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要以为工商管理毕业直接当管理层",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解工商管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工商管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "business-administration-p02",
    "categorySlug": "business-administration",
    "categoryName": "工商管理类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 2,
    "personaName": "工商管理·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对工商管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注组织、商业模式和协作效率",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要以为工商管理毕业直接当管理层",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解工商管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工商管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "business-administration-p03",
    "categorySlug": "business-administration",
    "categoryName": "工商管理类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 3,
    "personaName": "工商管理·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对工商管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注组织、商业模式和协作效率",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "不要以为工商管理毕业直接当管理层",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解工商管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工商管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "business-administration-p04",
    "categorySlug": "business-administration",
    "categoryName": "工商管理类",
    "admissionScaleLevel": "very_large",
    "samplingWeight": 78,
    "personaVariantIndex": 4,
    "personaName": "工商管理·误解待澄清型",
    "shortDescription": "被专业名字或社会热度吸引，但需要先核实真实内容，适合模拟对工商管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注组织、商业模式和协作效率",
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "可能只看专业名或热度做判断",
      "需要先阅读专业详情和报考前检查清单",
      "不要以为工商管理毕业直接当管理层",
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位"
    ],
    "commonMotivations": [
      "想进一步了解工商管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工商管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 18,
      "life_health": 0,
      "business": 74,
      "social_science": 29,
      "humanities": 8,
      "art_creative": 6
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-administration-p01",
    "categorySlug": "public-administration",
    "categoryName": "公共管理类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 1,
    "personaName": "公共管理·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对公共管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解公共管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公共管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 78,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-administration-p02",
    "categorySlug": "public-administration",
    "categoryName": "公共管理类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 2,
    "personaName": "公共管理·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对公共管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解公共管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公共管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 78,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "public-administration-p03",
    "categorySlug": "public-administration",
    "categoryName": "公共管理类",
    "admissionScaleLevel": "large",
    "samplingWeight": 42,
    "personaVariantIndex": 3,
    "personaName": "公共管理·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对公共管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注社会现象、规则制度或人与人的关系",
      "愿意阅读案例和讨论观点",
      "喜欢公共议题或组织治理",
      "愿意理解社会运行逻辑"
    ],
    "learningStyleTraits": [
      "喜欢讨论现实问题",
      "能接受阅读写作",
      "愿意和人沟通",
      "能接受案例分析和观点表达"
    ],
    "strengthSignals": [
      "表达与分析能力",
      "规则意识",
      "公共议题敏感度",
      "文字整理能力"
    ],
    "riskSignals": [
      "可能低估阅读量和写作量",
      "可能低估考证或升学压力",
      "就业路径常需要提前规划",
      "不适合只想少阅读少表达的人"
    ],
    "commonMotivations": [
      "想进一步了解公共管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为公共管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 5,
      "business": 78,
      "social_science": 88,
      "humanities": 45,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "high",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "management-science-p01",
    "categorySlug": "management-science",
    "categoryName": "管理科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "管理科学与工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对管理科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解管理科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为管理科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 78,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "management-science-p02",
    "categorySlug": "management-science",
    "categoryName": "管理科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "管理科学与工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对管理科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解管理科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为管理科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 78,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "management-science-p03",
    "categorySlug": "management-science",
    "categoryName": "管理科学与工程类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "管理科学与工程·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对管理科学与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解管理科学与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为管理科学与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 78,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "e-commerce-p01",
    "categorySlug": "e-commerce",
    "categoryName": "电子商务类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 1,
    "personaName": "电子商务·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对电子商务类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解电子商务类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子商务类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "e-commerce-p02",
    "categorySlug": "e-commerce",
    "categoryName": "电子商务类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 2,
    "personaName": "电子商务·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对电子商务类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解电子商务类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子商务类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "e-commerce-p03",
    "categorySlug": "e-commerce",
    "categoryName": "电子商务类",
    "admissionScaleLevel": "large",
    "samplingWeight": 45,
    "personaVariantIndex": 3,
    "personaName": "电子商务·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对电子商务类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解电子商务类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为电子商务类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "high",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "tourism-management-p01",
    "categorySlug": "tourism-management",
    "categoryName": "旅游管理类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 1,
    "personaName": "旅游管理·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对旅游管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解旅游管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为旅游管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "tourism-management-p02",
    "categorySlug": "tourism-management",
    "categoryName": "旅游管理类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 2,
    "personaName": "旅游管理·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对旅游管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解旅游管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为旅游管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "logistics-p01",
    "categorySlug": "logistics",
    "categoryName": "物流管理与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 1,
    "personaName": "物流管理与工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对物流管理与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解物流管理与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为物流管理与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "logistics-p02",
    "categorySlug": "logistics",
    "categoryName": "物流管理与工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 30,
    "personaVariantIndex": 2,
    "personaName": "物流管理与工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对物流管理与工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解物流管理与工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为物流管理与工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "industrial-engineering-p01",
    "categorySlug": "industrial-engineering",
    "categoryName": "工业工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 1,
    "personaName": "工业工程·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对工业工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解工业工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工业工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "industrial-engineering-p02",
    "categorySlug": "industrial-engineering",
    "categoryName": "工业工程类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 2,
    "personaName": "工业工程·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对工业工程类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解工业工程类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为工业工程类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "low",
    "longCyclePressure": "low",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "library-science-p01",
    "categorySlug": "library-science",
    "categoryName": "图书情报与档案管理类",
    "admissionScaleLevel": "small",
    "samplingWeight": 12,
    "personaVariantIndex": 1,
    "personaName": "图书情报与档案管理·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对图书情报与档案管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢阅读、语言、历史或文本表达",
      "愿意长期积累知识和表达能力",
      "对文化、文本、叙事或语言敏感",
      "喜欢理解人的经验和思想"
    ],
    "learningStyleTraits": [
      "能沉下心阅读",
      "喜欢表达观点",
      "愿意做长期积累",
      "能接受大量文本输入输出"
    ],
    "strengthSignals": [
      "阅读理解能力",
      "写作表达能力",
      "知识整合能力",
      "语言感受力"
    ],
    "riskSignals": [
      "可能低估就业路径需要主动规划",
      "不适合只想轻松背书的人",
      "需要持续输出作品或能力证明",
      "不要把兴趣阅读等同于专业学习"
    ],
    "commonMotivations": [
      "想进一步了解图书情报与档案管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为图书情报与档案管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 2,
      "life_health": 0,
      "business": 78,
      "social_science": 38,
      "humanities": 90,
      "art_creative": 28
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "high",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "agri-economics-p01",
    "categorySlug": "agri-economics",
    "categoryName": "农业经济管理类",
    "admissionScaleLevel": "very_small",
    "samplingWeight": 6,
    "personaVariantIndex": 1,
    "personaName": "农业经济管理·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对农业经济管理类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "关注商业运行、组织效率或资源配置",
      "愿意理解市场、财务、管理或供应链问题",
      "喜欢现实案例分析",
      "关注职业路径和资源流动"
    ],
    "learningStyleTraits": [
      "愿意分析现实案例",
      "能接受小组合作",
      "愿意提升表达和数据能力",
      "对规则和结果有意识"
    ],
    "strengthSignals": [
      "沟通协调能力",
      "数据敏感度",
      "结果意识",
      "案例分析能力"
    ],
    "riskSignals": [
      "容易把专业名字想得过于直接",
      "需要区分理论课程和真实岗位",
      "不应只按热门或收入想象选择",
      "需要主动积累实习和技能"
    ],
    "commonMotivations": [
      "想进一步了解农业经济管理类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为农业经济管理类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 22,
      "life_health": 0,
      "business": 88,
      "social_science": 35,
      "humanities": 10,
      "art_creative": 8
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "medium",
      "likesCommunication": "high",
      "likesHandsOn": "medium",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "design-p01",
    "categorySlug": "design",
    "categoryName": "设计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 1,
    "personaName": "设计学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对设计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢审美、产品、视觉或空间创作",
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "不要以为设计只是画得好看",
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解设计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为设计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "design-p02",
    "categorySlug": "design",
    "categoryName": "设计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 2,
    "personaName": "设计学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对设计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢审美、产品、视觉或空间创作",
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "不要以为设计只是画得好看",
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解设计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为设计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "design-p03",
    "categorySlug": "design",
    "categoryName": "设计学类",
    "admissionScaleLevel": "large",
    "samplingWeight": 50,
    "personaVariantIndex": 3,
    "personaName": "设计学·路径规划型",
    "shortDescription": "更看重升学、就业或长期发展路径是否清晰，适合模拟对设计学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢审美、产品、视觉或空间创作",
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "不要以为设计只是画得好看",
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解设计学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为设计学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "fine-arts-p01",
    "categorySlug": "fine-arts",
    "categoryName": "美术学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 1,
    "personaName": "美术学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对美术学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解美术学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为美术学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "fine-arts-p02",
    "categorySlug": "fine-arts",
    "categoryName": "美术学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 28,
    "personaVariantIndex": 2,
    "personaName": "美术学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对美术学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解美术学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为美术学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "music-dance-p01",
    "categorySlug": "music-dance",
    "categoryName": "音乐与舞蹈学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaVariantIndex": 1,
    "personaName": "音乐与舞蹈学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对音乐与舞蹈学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解音乐与舞蹈学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为音乐与舞蹈学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "music-dance-p02",
    "categorySlug": "music-dance",
    "categoryName": "音乐与舞蹈学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 26,
    "personaVariantIndex": 2,
    "personaName": "音乐与舞蹈学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对音乐与舞蹈学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解音乐与舞蹈学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为音乐与舞蹈学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "drama-film-p01",
    "categorySlug": "drama-film",
    "categoryName": "戏剧与影视学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 1,
    "personaName": "戏剧与影视学·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对戏剧与影视学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解戏剧与影视学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为戏剧与影视学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "drama-film-p02",
    "categorySlug": "drama-film",
    "categoryName": "戏剧与影视学类",
    "admissionScaleLevel": "medium",
    "samplingWeight": 25,
    "personaVariantIndex": 2,
    "personaName": "戏剧与影视学·能力匹配型",
    "shortDescription": "学习方式和这个方向的训练方式比较接近，适合模拟对戏剧与影视学类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解戏剧与影视学类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为戏剧与影视学类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "low",
    "requiresSpecialCondition": true,
    "recommendedOnlyIfHighInterest": false,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "low",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "medium"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "art-theory-p01",
    "categorySlug": "art-theory",
    "categoryName": "艺术学理论类",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaVariantIndex": 1,
    "personaName": "艺术学理论·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对艺术学理论类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢创作、审美表达或作品制作",
      "愿意把想法变成作品",
      "关注视觉、声音、影像、空间或表演",
      "愿意接受展示和评价"
    ],
    "learningStyleTraits": [
      "愿意反复修改作品",
      "能接受展示和评价",
      "有审美或创作兴趣",
      "能长期练习技法"
    ],
    "strengthSignals": [
      "审美感受力",
      "创意表达能力",
      "作品打磨意识",
      "把抽象想法具体化的能力"
    ],
    "riskSignals": [
      "需要作品、训练或艺考基础",
      "容易低估时间成本和审美训练",
      "就业常看作品集和实践经历",
      "不适合只想轻松玩创意的人"
    ],
    "commonMotivations": [
      "想进一步了解艺术学理论类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为艺术学理论类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "medium",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 8,
      "life_health": 0,
      "business": 12,
      "social_science": 22,
      "humanities": 30,
      "art_creative": 92
    },
    "answerStyleHints": {
      "likesMath": "low",
      "likesPhysics": "low",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "high",
      "likesProgramming": "low",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  },
  {
    "id": "interdisciplinary-class-p01",
    "categorySlug": "interdisciplinary-class",
    "categoryName": "交叉学科类",
    "admissionScaleLevel": "small",
    "samplingWeight": 10,
    "personaVariantIndex": 1,
    "personaName": "交叉学科·兴趣驱动型",
    "shortDescription": "主要因为真实兴趣而想了解这个方向，适合模拟对交叉学科类有倾向但仍需要避坑解释的学生。",
    "majorInterestSignals": [
      "喜欢拆解原理",
      "愿意理解公式背后的逻辑",
      "对技术、机器、数据或自然规律好奇",
      "愿意用工具解决问题"
    ],
    "learningStyleTraits": [
      "能接受抽象概念",
      "愿意做题和验证",
      "能耐心排查错误",
      "不排斥实验或项目"
    ],
    "strengthSignals": [
      "逻辑拆解能力",
      "数学/物理接受度",
      "自学工具的耐心",
      "把复杂问题分步骤处理的能力"
    ],
    "riskSignals": [
      "可能低估基础课难度",
      "可能把专业名和未来岗位简单等同",
      "不适合完全排斥数学和实验的人",
      "需要接受长期练习"
    ],
    "commonMotivations": [
      "想进一步了解交叉学科类的真实学习内容",
      "希望找到和自己兴趣相符的方向",
      "希望专业有相对清晰的成长路径",
      "希望提前知道可能踩坑的地方"
    ],
    "commonMisunderstandings": [
      "以为交叉学科类只等于专业名称表面的意思",
      "以为热门或冷门就能直接判断好坏",
      "忽略不同学校培养方向差异",
      "把单个学生经验当成所有学校的情况"
    ],
    "schoolTierSensitivity": "high",
    "longCyclePressure": "medium",
    "requiresSpecialCondition": false,
    "recommendedOnlyIfHighInterest": true,
    "sixBucketAffinity": {
      "stem": 88,
      "life_health": 8,
      "business": 8,
      "social_science": 4,
      "humanities": 2,
      "art_creative": 5
    },
    "answerStyleHints": {
      "likesMath": "high",
      "likesPhysics": "medium",
      "likesChemistry": "low",
      "likesBiology": "low",
      "likesWriting": "low",
      "likesCommunication": "low",
      "likesHandsOn": "medium",
      "likesProgramming": "medium",
      "likesExperiment": "low",
      "likesMemorization": "medium",
      "acceptsLongStudyCycle": "medium",
      "valuesStability": "medium",
      "valuesIncome": "medium",
      "valuesInterest": "high",
      "acceptsGraduateStudy": "high"
    },
    "notes": "模拟器用虚拟画像，不代表该专业真实学生全部情况；建议结合真实问卷和本专业同学审核继续校准。"
  }
];

export function pickPersonaBySamplingWeight(
  random: () => number = Math.random,
  library: MajorPersona[] = majorPersonaLibrary
): MajorPersona {
  const total = library.reduce((sum, p) => sum + p.samplingWeight, 0);
  let cursor = random() * total;
  for (const persona of library) {
    cursor -= persona.samplingWeight;
    if (cursor <= 0) return persona;
  }
  return library[library.length - 1];
}

export function getPersonasByCategory(categorySlug: string): MajorPersona[] {
  return majorPersonaLibrary.filter((p) => p.categorySlug === categorySlug);
}

export function getSamplingProfile(categorySlug: string): MajorCategorySamplingProfile | undefined {
  return majorCategorySamplingTable.find((p) => p.categorySlug === categorySlug);
}
