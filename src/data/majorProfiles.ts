/**
 * 专业画像参数 —— 模拟器 & 调参工具用
 *
 * 定义各专业类的"理想参数"，包括：
 *  - 应该匹配的方向桶
 *  - 维度倾向
 *  - 避坑敏感度
 *
 * ⚠️ 本文件仅供模拟器 / 自动调参工具使用，不影响线上推荐逻辑。
 *    线上推荐权重在 src/data/recommendationWeights.ts。
 */

import type { DirectionBucket, Dimension } from '../types/test';

/** 专业画像 */
export interface MajorProfile {
  /** 专业类名称 */
  name: string;
  /** 专业类 slug */
  slug: string;
  /** 所属门类代码 */
  gateCode: string;
  /** 方向桶倾向 */
  buckets: { bucket: DirectionBucket; weight: number }[];
  /** 维度期望——高分维度说明该方向看重什么 */
  dimensions: { dim: Dimension; weight: number }[];
  /** Golden case 条件：满足这些特征的人应该更倾向此专业 */
  goldenConditions: GoldenCondition[];
}

/** Golden Case 条件 */
export interface GoldenCondition {
  /** 条件描述（中文） */
  label: string;
  /** 必须高分的维度 */
  highDimensions?: Dimension[];
  /** 必须低分的维度 */
  lowDimensions?: Dimension[];
  /** 必须命中的桶 */
  mustHitBuckets?: DirectionBucket[];
  /** 必须回避的桶 */
  mustMissBuckets?: DirectionBucket[];
  /** 期望的推荐层级：recommended / optional / cautious */
  expectedTier?: 'recommended' | 'optional' | 'cautious';
  /** 额外检查 */
  checks?: string[];
}

/** 专业画像映射表 */
export type MajorProfileMap = Record<string, MajorProfile>;

/** 所有专业类的 slug→profile 映射 */
export const MAJOR_PROFILES: MajorProfileMap = {
  // ────────── 工学 ──────────
  'computer-science': {
    name: '计算机类',
    slug: 'computer-science',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 90 },
      { dim: 'info_systems', weight: 95 },
      { dim: 'abstract_theory', weight: 60 },
      { dim: 'engineering_practice', weight: 40 },
    ],
    goldenConditions: [
      {
        label: '数学强+信息系统兴趣高 → 推荐计算机',
        highDimensions: ['math_logic', 'info_systems'],
        mustHitBuckets: ['stem'],
        expectedTier: 'recommended',
      },
      {
        label: '不喜欢编程 → 计算机不应该排很前',
        lowDimensions: ['info_systems'],
        expectedTier: 'cautious',
      },
    ],
  },
  'electronic-information': {
    name: '电子信息类',
    slug: 'electronic-information',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 85 },
      { dim: 'info_systems', weight: 70 },
      { dim: 'engineering_practice', weight: 75 },
      { dim: 'abstract_theory', weight: 55 },
    ],
    goldenConditions: [
      {
        label: '喜欢电路+能接受抽象 → 推荐电子信息',
        highDimensions: ['math_logic', 'engineering_practice'],
        mustHitBuckets: ['stem'],
        expectedTier: 'recommended',
      },
      {
        label: '数学弱 → 电子信息不宜排前位',
        lowDimensions: ['math_logic'],
        checks: ['电子信息score <= 计算机score ？合理'],
      },
    ],
  },
  'automation': {
    name: '自动化类',
    slug: 'automation',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 80 },
      { dim: 'engineering_practice', weight: 80 },
      { dim: 'info_systems', weight: 60 },
    ],
    goldenConditions: [
      {
        label: '喜欢动手+能接受控制理论 → 推荐自动化',
        highDimensions: ['engineering_practice', 'math_logic'],
        mustHitBuckets: ['stem'],
        expectedTier: 'recommended',
      },
    ],
  },
  'mechanical': {
    name: '机械类',
    slug: 'mechanical',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'engineering_practice', weight: 90 },
      { dim: 'math_logic', weight: 70 },
      { dim: 'abstract_theory', weight: 40 },
    ],
    goldenConditions: [
      {
        label: '喜欢机械结构+动手实践 → 推荐机械',
        highDimensions: ['engineering_practice'],
        mustHitBuckets: ['stem'],
        expectedTier: 'recommended',
      },
      {
        label: '排斥动手 → 机械应到谨慎区',
        lowDimensions: ['engineering_practice'],
        expectedTier: 'cautious',
      },
    ],
  },
  'electrical': {
    name: '电气类',
    slug: 'electrical',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 75 },
      { dim: 'engineering_practice', weight: 75 },
      { dim: 'stable_path', weight: 40 },
    ],
    goldenConditions: [],
  },
  'civil-engineering': {
    name: '土木类',
    slug: 'civil-engineering',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'engineering_practice', weight: 80 },
      { dim: 'math_logic', weight: 65 },
      { dim: 'stable_path', weight: 30 },
    ],
    goldenConditions: [],
  },
  'architecture': {
    name: '建筑类',
    slug: 'architecture',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 55 }, { bucket: 'art_creative', weight: 45 }],
    dimensions: [
      { dim: 'engineering_practice', weight: 60 },
      { dim: 'aesthetic_creation', weight: 70 },
      { dim: 'math_logic', weight: 50 },
    ],
    goldenConditions: [],
  },
  'materials': {
    name: '材料类',
    slug: 'materials',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'engineering_practice', weight: 65 },
      { dim: 'abstract_theory', weight: 55 },
    ],
    goldenConditions: [],
  },
  'aerospace': {
    name: '航空航天类',
    slug: 'aerospace',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 85 },
      { dim: 'engineering_practice', weight: 80 },
      { dim: 'abstract_theory', weight: 60 },
    ],
    goldenConditions: [],
  },
  'biomedical-eng': {
    name: '生物医学工程类',
    slug: 'biomedical-eng',
    gateCode: '08',
    buckets: [{ bucket: 'stem', weight: 60 }, { bucket: 'life_health', weight: 40 }],
    dimensions: [
      { dim: 'engineering_practice', weight: 60 },
      { dim: 'life_health_interest', weight: 65 },
      { dim: 'math_logic', weight: 55 },
    ],
    goldenConditions: [],
  },

  // ────────── 理学 ──────────
  'mathematics': {
    name: '数学类',
    slug: 'mathematics',
    gateCode: '07',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 100 },
      { dim: 'abstract_theory', weight: 80 },
    ],
    goldenConditions: [],
  },
  'physics': {
    name: '物理学类',
    slug: 'physics',
    gateCode: '07',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 90 },
      { dim: 'abstract_theory', weight: 85 },
      { dim: 'engineering_practice', weight: 30 },
    ],
    goldenConditions: [],
  },
  'chemistry': {
    name: '化学类',
    slug: 'chemistry',
    gateCode: '07',
    buckets: [{ bucket: 'stem', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 60 },
      { dim: 'engineering_practice', weight: 65 },
      { dim: 'abstract_theory', weight: 50 },
    ],
    goldenConditions: [],
  },
  'biology': {
    name: '生物科学类',
    slug: 'biology',
    gateCode: '07',
    buckets: [{ bucket: 'stem', weight: 50 }, { bucket: 'life_health', weight: 50 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 80 },
      { dim: 'abstract_theory', weight: 45 },
    ],
    goldenConditions: [],
  },
  'statistics': {
    name: '统计学类',
    slug: 'statistics',
    gateCode: '07',
    buckets: [{ bucket: 'stem', weight: 65 }, { bucket: 'business', weight: 35 }],
    dimensions: [
      { dim: 'math_logic', weight: 85 },
      { dim: 'business_sense', weight: 40 },
      { dim: 'info_systems', weight: 40 },
    ],
    goldenConditions: [],
  },

  // ────────── 医学 ──────────
  'clinical-medicine': {
    name: '临床医学类',
    slug: 'clinical-medicine',
    gateCode: '10',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 95 },
      { dim: 'interpersonal', weight: 55 },
      { dim: 'rule_detail', weight: 50 },
      { dim: 'stable_path', weight: 30 },
    ],
    goldenConditions: [
      {
        label: '生命健康兴趣高 → 推荐临床医学',
        highDimensions: ['life_health_interest'],
        mustHitBuckets: ['life_health'],
        expectedTier: 'recommended',
      },
      {
        label: '排斥长周期 → 临床医学应到谨慎区',
        checks: ['长周期tag触发时clinical-medicine进cautious'],
      },
    ],
  },
  'pharmacy': {
    name: '药学类',
    slug: 'pharmacy',
    gateCode: '10',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 75 },
      { dim: 'engineering_practice', weight: 50 },
      { dim: 'rule_detail', weight: 45 },
    ],
    goldenConditions: [],
  },
  'nursing': {
    name: '护理学类',
    slug: 'nursing',
    gateCode: '10',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 65 },
      { dim: 'interpersonal', weight: 70 },
      { dim: 'stable_path', weight: 50 },
    ],
    goldenConditions: [],
  },
  'stomatology': {
    name: '口腔医学类',
    slug: 'stomatology',
    gateCode: '10',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 70 },
      { dim: 'engineering_practice', weight: 60 },
      { dim: 'interpersonal', weight: 45 },
    ],
    goldenConditions: [],
  },

  // ────────── 商科 ──────────
  'business-administration': {
    name: '工商管理类',
    slug: 'business-administration',
    gateCode: '12',
    buckets: [{ bucket: 'business', weight: 100 }],
    dimensions: [
      { dim: 'business_sense', weight: 85 },
      { dim: 'interpersonal', weight: 65 },
      { dim: 'rule_detail', weight: 40 },
      { dim: 'stable_path', weight: 35 },
    ],
    goldenConditions: [
      {
        label: '商业兴趣高+沟通好 → 推荐工商管理',
        highDimensions: ['business_sense', 'interpersonal'],
        mustHitBuckets: ['business'],
        expectedTier: 'recommended',
      },
    ],
  },
  'economics-class': {
    name: '经济学类',
    slug: 'economics-class',
    gateCode: '02',
    buckets: [{ bucket: 'business', weight: 100 }],
    dimensions: [
      { dim: 'math_logic', weight: 70 },
      { dim: 'business_sense', weight: 75 },
      { dim: 'abstract_theory', weight: 50 },
    ],
    goldenConditions: [],
  },
  'finance': {
    name: '金融学类',
    slug: 'finance',
    gateCode: '02',
    buckets: [{ bucket: 'business', weight: 100 }],
    dimensions: [
      { dim: 'business_sense', weight: 80 },
      { dim: 'math_logic', weight: 65 },
      { dim: 'rule_detail', weight: 50 },
    ],
    goldenConditions: [],
  },
  'international-trade': {
    name: '经济与贸易类',
    slug: 'international-trade',
    gateCode: '02',
    buckets: [{ bucket: 'business', weight: 100 }],
    dimensions: [
      { dim: 'business_sense', weight: 65 },
      { dim: 'interpersonal', weight: 70 },
    ],
    goldenConditions: [],
  },

  // ────────── 法学 / 社科 ──────────
  'law-class': {
    name: '法学类',
    slug: 'law-class',
    gateCode: '03',
    buckets: [{ bucket: 'social_science', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 85 },
      { dim: 'rule_detail', weight: 90 },
      { dim: 'interpersonal', weight: 45 },
      { dim: 'abstract_theory', weight: 50 },
    ],
    goldenConditions: [
      {
        label: '喜欢规则+阅读表达强 → 推荐法学',
        highDimensions: ['rule_detail', 'reading_expression'],
        mustHitBuckets: ['social_science'],
        expectedTier: 'recommended',
      },
    ],
  },
  'sociology': {
    name: '社会学类',
    slug: 'sociology',
    gateCode: '03',
    buckets: [{ bucket: 'social_science', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 70 },
      { dim: 'interpersonal', weight: 65 },
      { dim: 'abstract_theory', weight: 45 },
    ],
    goldenConditions: [],
  },
  'political-science': {
    name: '政治学类',
    slug: 'political-science',
    gateCode: '03',
    buckets: [{ bucket: 'social_science', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 65 },
      { dim: 'interpersonal', weight: 55 },
      { dim: 'abstract_theory', weight: 50 },
    ],
    goldenConditions: [],
  },
  'education': {
    name: '教育学类',
    slug: 'education',
    gateCode: '04',
    buckets: [{ bucket: 'social_science', weight: 100 }],
    dimensions: [
      { dim: 'interpersonal', weight: 80 },
      { dim: 'reading_expression', weight: 55 },
      { dim: 'stable_path', weight: 45 },
    ],
    goldenConditions: [],
  },
  'public-administration': {
    name: '公共管理类',
    slug: 'public-administration',
    gateCode: '12',
    buckets: [{ bucket: 'business', weight: 50 }, { bucket: 'social_science', weight: 50 }],
    dimensions: [
      { dim: 'interpersonal', weight: 55 },
      { dim: 'rule_detail', weight: 50 },
      { dim: 'stable_path', weight: 60 },
    ],
    goldenConditions: [],
  },

  // ────────── 人文 ──────────
  'chinese-literature': {
    name: '中国语言文学类',
    slug: 'chinese-literature',
    gateCode: '05',
    buckets: [{ bucket: 'humanities', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 95 },
      { dim: 'aesthetic_creation', weight: 50 },
      { dim: 'abstract_theory', weight: 40 },
    ],
    goldenConditions: [
      {
        label: '喜欢写作阅读表达 → 推荐文学',
        highDimensions: ['reading_expression'],
        mustHitBuckets: ['humanities'],
        expectedTier: 'recommended',
      },
    ],
  },
  'foreign-languages': {
    name: '外国语言文学类',
    slug: 'foreign-languages',
    gateCode: '05',
    buckets: [{ bucket: 'humanities', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 80 },
      { dim: 'interpersonal', weight: 45 },
    ],
    goldenConditions: [],
  },
  'journalism': {
    name: '新闻传播学类',
    slug: 'journalism',
    gateCode: '05',
    buckets: [{ bucket: 'humanities', weight: 55 }, { bucket: 'social_science', weight: 45 }],
    dimensions: [
      { dim: 'reading_expression', weight: 75 },
      { dim: 'interpersonal', weight: 70 },
      { dim: 'business_sense', weight: 30 },
    ],
    goldenConditions: [],
  },
  'history-class': {
    name: '历史学类',
    slug: 'history-class',
    gateCode: '06',
    buckets: [{ bucket: 'humanities', weight: 100 }],
    dimensions: [
      { dim: 'reading_expression', weight: 75 },
      { dim: 'abstract_theory', weight: 55 },
      { dim: 'rule_detail', weight: 40 },
    ],
    goldenConditions: [],
  },
  'philosophy-class': {
    name: '哲学类',
    slug: 'philosophy-class',
    gateCode: '01',
    buckets: [{ bucket: 'humanities', weight: 100 }],
    dimensions: [
      { dim: 'abstract_theory', weight: 80 },
      { dim: 'reading_expression', weight: 65 },
    ],
    goldenConditions: [],
  },

  // ────────── 艺术 ──────────
  'design': {
    name: '设计学类',
    slug: 'design',
    gateCode: '13',
    buckets: [{ bucket: 'art_creative', weight: 100 }],
    dimensions: [
      { dim: 'aesthetic_creation', weight: 95 },
      { dim: 'engineering_practice', weight: 40 },
      { dim: 'interpersonal', weight: 30 },
    ],
    goldenConditions: [
      {
        label: '审美创作兴趣高 → 推荐设计',
        highDimensions: ['aesthetic_creation'],
        mustHitBuckets: ['art_creative'],
        expectedTier: 'recommended',
      },
    ],
  },
  'fine-arts': {
    name: '美术学类',
    slug: 'fine-arts',
    gateCode: '13',
    buckets: [{ bucket: 'art_creative', weight: 100 }],
    dimensions: [
      { dim: 'aesthetic_creation', weight: 95 },
    ],
    goldenConditions: [],
  },
  'drama-film': {
    name: '戏剧与影视学类',
    slug: 'drama-film',
    gateCode: '13',
    buckets: [{ bucket: 'art_creative', weight: 100 }],
    dimensions: [
      { dim: 'aesthetic_creation', weight: 70 },
      { dim: 'interpersonal', weight: 55 },
    ],
    goldenConditions: [],
  },
  'music-dance': {
    name: '音乐与舞蹈学类',
    slug: 'music-dance',
    gateCode: '13',
    buckets: [{ bucket: 'art_creative', weight: 100 }],
    dimensions: [
      { dim: 'aesthetic_creation', weight: 90 },
    ],
    goldenConditions: [],
  },

  // ────────── 农学 ──────────
  'plant-production': {
    name: '植物生产类',
    slug: 'plant-production',
    gateCode: '09',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 70 },
      { dim: 'engineering_practice', weight: 50 },
    ],
    goldenConditions: [],
  },
  'veterinary': {
    name: '动物医学类',
    slug: 'veterinary',
    gateCode: '09',
    buckets: [{ bucket: 'life_health', weight: 100 }],
    dimensions: [
      { dim: 'life_health_interest', weight: 80 },
      { dim: 'interpersonal', weight: 45 },
    ],
    goldenConditions: [],
  },
};

export default MAJOR_PROFILES;
