/**
 * 推荐权重配置
 *
 * 管理方向桶↔学科门类↔专业类的映射关系和权重。
 * 与评分引擎 decoupled，调参只改此文件。
 *
 * ⚠️ 权重值为相对值 0-100，最终会归一化。
 *    不同映射之间不直接比较绝对值。
 */

import type { DirectionBucket, Dimension, RiskTag } from '../types/test';

// ───── 方向桶 → 学科门类映射 ─────

/** 桶→门类映射（含权重） */
export const BUCKET_TO_DISCIPLINES: Record<
  DirectionBucket,
  { gateCode: string; weight: number }[]
> = {
  humanities: [
    { gateCode: '05', weight: 40 }, // 文学
    { gateCode: '01', weight: 30 }, // 哲学
    { gateCode: '06', weight: 30 }, // 历史学
  ],
  social_science: [
    { gateCode: '03', weight: 50 }, // 法学
    { gateCode: '04', weight: 30 }, // 教育学
    { gateCode: '12', weight: 20 }, // 管理学（公共管理）
  ],
  business: [
    { gateCode: '02', weight: 45 }, // 经济学
    { gateCode: '12', weight: 55 }, // 管理学
  ],
  stem: [
    { gateCode: '08', weight: 60 }, // 工学
    { gateCode: '07', weight: 40 }, // 理学
  ],
  life_health: [
    { gateCode: '10', weight: 60 }, // 医学
    { gateCode: '09', weight: 25 }, // 农学
    { gateCode: '07', weight: 15 }, // 理学（生物方向）
  ],
  art_creative: [
    { gateCode: '13', weight: 100 }, // 艺术学
  ],
};

// ───── 维度↔方向桶权重矩阵 ─────

/** 每个维度对各方向桶的得分加成 */
export const DIMENSION_TO_BUCKET: Record<Dimension, Partial<Record<DirectionBucket, number>>> = {
  math_logic:            { stem: 30, business: 20 },
  reading_expression:    { humanities: 35, social_science: 25 },
  interpersonal:         { social_science: 30, life_health: 25, business: 15, humanities: 10 },
  business_sense:        { business: 40, stem: 15 },
  engineering_practice:  { stem: 40, art_creative: 10 },
  info_systems:          { stem: 35, business: 15 },
  life_health_interest:  { life_health: 45 },
  aesthetic_creation:    { art_creative: 45, humanities: 10 },
  abstract_theory:       { humanities: 20, stem: 20, social_science: 10 },
  stable_path:           { business: 20, social_science: 15, life_health: 15 },
  rule_detail:           { social_science: 20, business: 20, life_health: 10 },
};

// ───── 学科门类 → 优先专业类 ─────

/** 每个门类内，方向桶加权后的优先专业类及权重 */
export const GATE_PRIORITY_CATEGORIES: Record<
  string,
  { categorySlug: string; buckets: DirectionBucket[]; weight: number }[]
> = {
  '01': [ // 哲学
    { categorySlug: 'philosophy-class', buckets: ['humanities'], weight: 100 },
  ],
  '02': [ // 经济学
    { categorySlug: 'economics-class', buckets: ['business'], weight: 50 },
    { categorySlug: 'finance', buckets: ['business'], weight: 30 },
    { categorySlug: 'international-trade', buckets: ['business'], weight: 20 },
    { categorySlug: 'public-finance', buckets: ['business'], weight: 15 },
  ],
  '03': [ // 法学
    { categorySlug: 'law-class', buckets: ['social_science'], weight: 50 },
    { categorySlug: 'political-science', buckets: ['social_science'], weight: 25 },
    { categorySlug: 'sociology', buckets: ['social_science'], weight: 25 },
    { categorySlug: 'ethnology', buckets: ['social_science'], weight: 8 },
    { categorySlug: 'marxism', buckets: ['social_science'], weight: 6 },
    { categorySlug: 'public-security', buckets: ['social_science'], weight: 8 },
  ],
  '04': [ // 教育学
    { categorySlug: 'education', buckets: ['social_science'], weight: 60 },
    { categorySlug: 'physical-education', buckets: ['social_science'], weight: 40 },
  ],
  '05': [ // 文学
    { categorySlug: 'chinese-literature', buckets: ['humanities'], weight: 40 },
    { categorySlug: 'foreign-languages', buckets: ['humanities'], weight: 30 },
    { categorySlug: 'journalism', buckets: ['humanities', 'social_science'], weight: 30 },
  ],
  '06': [ // 历史学
    { categorySlug: 'history-class', buckets: ['humanities'], weight: 100 },
  ],
  '07': [ // 理学
    { categorySlug: 'mathematics', buckets: ['stem'], weight: 6 },
    { categorySlug: 'physics', buckets: ['stem'], weight: 16 },
    { categorySlug: 'chemistry', buckets: ['stem'], weight: 15 },
    { categorySlug: 'biology', buckets: ['stem', 'life_health'], weight: 20 },
    { categorySlug: 'statistics', buckets: ['stem', 'business'], weight: 20 },
    { categorySlug: 'astronomy', buckets: ['stem'], weight: 4 },
    { categorySlug: 'geography', buckets: ['stem'], weight: 5 },
    { categorySlug: 'atmospheric-science', buckets: ['stem'], weight: 3 },
    { categorySlug: 'ocean-science', buckets: ['stem'], weight: 3 },
    { categorySlug: 'geophysics', buckets: ['stem'], weight: 3 },
    { categorySlug: 'geology', buckets: ['stem'], weight: 4 },
    { categorySlug: 'psychology', buckets: ['social_science', 'life_health'], weight: 6 },
  ],
  '08': [ // 工学 — 全部 32 个专业类
    { categorySlug: 'computer-science', buckets: ['stem'], weight: 15 },
    { categorySlug: 'electronic-information', buckets: ['stem'], weight: 12 },
    { categorySlug: 'electrical', buckets: ['stem'], weight: 10 },
    { categorySlug: 'automation', buckets: ['stem'], weight: 8 },
    { categorySlug: 'mechanical', buckets: ['stem'], weight: 10 },
    { categorySlug: 'aerospace', buckets: ['stem'], weight: 12 },
    { categorySlug: 'energy-power', buckets: ['stem'], weight: 7 },
    { categorySlug: 'instrumentation', buckets: ['stem'], weight: 6 },
    { categorySlug: 'civil-engineering', buckets: ['stem'], weight: 2 },
    { categorySlug: 'materials', buckets: ['stem'], weight: 5 },
    { categorySlug: 'architecture', buckets: ['stem', 'art_creative'], weight: 5 },
    { categorySlug: 'biomedical-eng', buckets: ['stem', 'life_health'], weight: 4 },
    { categorySlug: 'mechanics', buckets: ['stem'], weight: 5 },
    { categorySlug: 'water-resources', buckets: ['stem'], weight: 4 },
    { categorySlug: 'surveying', buckets: ['stem'], weight: 4 },
    { categorySlug: 'chemical-pharma', buckets: ['stem'], weight: 5 },
    { categorySlug: 'geological-eng', buckets: ['stem'], weight: 4 },
    { categorySlug: 'mining', buckets: ['stem'], weight: 3 },
    { categorySlug: 'textile', buckets: ['stem'], weight: 3 },
    { categorySlug: 'light-industry', buckets: ['stem'], weight: 3 },
    { categorySlug: 'transportation', buckets: ['stem'], weight: 5 },
    { categorySlug: 'ocean-engineering', buckets: ['stem'], weight: 3 },
    { categorySlug: 'ordnance', buckets: ['stem'], weight: 3 },
    { categorySlug: 'nuclear', buckets: ['stem'], weight: 4 },
    { categorySlug: 'agricultural-eng', buckets: ['stem'], weight: 4 },
    { categorySlug: 'forestry-eng', buckets: ['stem'], weight: 3 },
    { categorySlug: 'environmental', buckets: ['stem', 'life_health'], weight: 5 },
    { categorySlug: 'food-science', buckets: ['stem', 'life_health'], weight: 4 },
    { categorySlug: 'safety-eng', buckets: ['stem'], weight: 4 },
    { categorySlug: 'bioengineering', buckets: ['stem', 'life_health'], weight: 5 },
    { categorySlug: 'public-security-tech', buckets: ['stem', 'social_science'], weight: 3 },
  ],
  '09': [ // 农学
    { categorySlug: 'plant-production', buckets: ['life_health'], weight: 30 },
    { categorySlug: 'environmental-ecology', buckets: ['life_health', 'stem'], weight: 25 },
    { categorySlug: 'veterinary', buckets: ['life_health'], weight: 25 },
    { categorySlug: 'animal-production', buckets: ['life_health'], weight: 20 },
    { categorySlug: 'forestry', buckets: ['life_health'], weight: 15 },
    { categorySlug: 'aquaculture', buckets: ['life_health'], weight: 12 },
    { categorySlug: 'grassland-science', buckets: ['life_health'], weight: 8 },
  ],
  '10': [ // 医学
    { categorySlug: 'clinical-medicine', buckets: ['life_health'], weight: 30 },
    { categorySlug: 'pharmacy', buckets: ['life_health'], weight: 20 },
    { categorySlug: 'nursing', buckets: ['life_health'], weight: 15 },
    { categorySlug: 'stomatology', buckets: ['life_health'], weight: 10 },
    { categorySlug: 'public-health', buckets: ['life_health', 'social_science'], weight: 15 },
    { categorySlug: 'medical-technology', buckets: ['life_health', 'stem'], weight: 10 },
    { categorySlug: 'basic-medicine', buckets: ['life_health'], weight: 8 },
    { categorySlug: 'tcm', buckets: ['life_health'], weight: 8 },
    { categorySlug: 'integrated-medicine', buckets: ['life_health'], weight: 6 },
    { categorySlug: 'chinese-pharmacy', buckets: ['life_health'], weight: 6 },
    { categorySlug: 'forensic-medicine', buckets: ['life_health', 'stem'], weight: 5 },
  ],
  '12': [ // 管理学
    { categorySlug: 'business-administration', buckets: ['business'], weight: 35 },
    { categorySlug: 'public-administration', buckets: ['business', 'social_science'], weight: 20 },
    { categorySlug: 'management-science', buckets: ['business', 'stem'], weight: 15 },
    { categorySlug: 'e-commerce', buckets: ['business'], weight: 15 },
    { categorySlug: 'tourism-management', buckets: ['business'], weight: 15 },
    { categorySlug: 'agri-economics', buckets: ['business', 'life_health'], weight: 10 },
    { categorySlug: 'library-science', buckets: ['social_science'], weight: 8 },
    { categorySlug: 'logistics', buckets: ['business', 'stem'], weight: 10 },
    { categorySlug: 'industrial-engineering', buckets: ['stem', 'business'], weight: 8 },
  ],
  '13': [ // 艺术学
    { categorySlug: 'design', buckets: ['art_creative', 'stem'], weight: 30 },
    { categorySlug: 'fine-arts', buckets: ['art_creative'], weight: 25 },
    { categorySlug: 'drama-film', buckets: ['art_creative'], weight: 20 },
    { categorySlug: 'music-dance', buckets: ['art_creative'], weight: 25 },
    { categorySlug: 'art-theory', buckets: ['art_creative', 'humanities'], weight: 10 },
  ],
  '14': [ // 交叉学科
    { categorySlug: 'interdisciplinary-class', buckets: ['stem', 'life_health'], weight: 100 },
  ],
};

// ───── 避坑规则 ─────

/** 风险标签 → 受影响的专业类 slug */
export const RISK_CATEGORY_PENALTIES: Record<RiskTag, { slugs: string[]; penalty: number; reason: string }> = {
  trend_chasing: {
    slugs: ['computer-science', 'electronic-information', 'finance', 'business-administration'],
    penalty: 15,
    reason: '你可能因为热门才关注这个方向，建议先看看它到底学什么',
  },
  salary_misconception: {
    slugs: ['computer-science', 'finance', 'business-administration'],
    penalty: 10,
    reason: '高薪不等于适合你，建议先了解真实学习内容和压力',
  },
  info_bubble: {
    slugs: [],
    penalty: 0,
    reason: '你可能只接触到少数几个专业方向，建议拓宽了解范围',
  },
  long_cycle: {
    slugs: ['clinical-medicine', 'stomatology', 'law-class'],
    penalty: 20,
    reason: '这个方向学习周期很长（5-8年），需要做好心理准备',
  },
  reading_writing_aversion: {
    slugs: ['law-class', 'chinese-literature', 'journalism', 'history-class', 'sociology'],
    penalty: 25,
    reason: '你似乎不太喜欢大量读写，但这个方向需要很多阅读和写作',
  },
  rule_detail_aversion: {
    slugs: ['law-class', 'finance', 'public-administration', 'clinical-medicine'],
    penalty: 20,
    reason: '这个方向需要和大量规则、细节打交道',
  },
  hands_on_aversion: {
    slugs: ['mechanical', 'electrical', 'electronic-information', 'civil-engineering', 'plant-production'],
    penalty: 20,
    reason: '你似乎不太喜欢动手操作，但这个方向有不少实验和实践',
  },
  name_misconception: {
    slugs: ['business-administration', 'public-administration'],
    penalty: 10,
    reason: '你可能对这个专业的名字有误解——建议先看看详情页',
  },
  surface_interest: {
    slugs: [],
    penalty: 0,
    reason: '你对这个方向的兴趣可能来自表面印象，建议深入了解再做判断',
  },
  arts_science_mismatch: {
    slugs: ['computer-science', 'electronic-information', 'automation', 'electrical'],
    penalty: 30,
    reason: '你的选科背景和这个方向不太匹配',
  },
};

// ───── 画像名称生成 ─────

/** 按最高桶生成画像名称 */
export const PROFILE_TEMPLATES: Record<DirectionBucket, { name: string; summary: string }> = {
  humanities: {
    name: '偏感性的人文表达型',
    summary: '你喜欢用文字和思想来理解世界，对语言、文学和思辨有天然的亲近感。适合关注文学、哲学、历史学等方向。',
  },
  social_science: {
    name: '偏理性的社会关怀型',
    summary: '你对社会怎么运作、人和人之间的关系有很强的好奇心。法学、教育、公共管理可能是你的菜。',
  },
  business: {
    name: '偏实务的商业管理型',
    summary: '你对商业规则、资源组织和效率有天然的敏感。经济学、管理学和金融方向值得深入了解。',
  },
  stem: {
    name: '偏逻辑的理工探索型',
    summary: '你喜欢用逻辑和数学来看世界，对技术、系统和如何建造东西有热情。理工科方向有丰富的选择。',
  },
  life_health: {
    name: '偏实践的生命关怀型',
    summary: '你对生命、健康和自然世界有真诚的关注。医学、药学、农学等方向可能让你找到意义感。',
  },
  art_creative: {
    name: '偏直觉的艺术创作型',
    summary: '你喜欢用创作来表达自己，对美和形式有敏感的判断。艺术和设计方向能把你那种对美的直觉变成一门专业。',
  },
};

/** 多桶混合画像 */
export const MIXED_PROFILE = {
  name: '多元探索型',
  summary: '你的兴趣比较多元，在多个方向都有强信号。这未必是坏事——很多有意思的方向恰好是交叉领域。建议你从几个方向中挑最感兴趣的 2-3 个深入了解。',
};
