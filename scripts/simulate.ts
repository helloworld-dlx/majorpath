/**
 * 统一模拟器 — 专业不迷路
 *
 * 用法：
 *   npx tsx scripts/simulate.ts --mode single --profile stem_nerd
 *   npx tsx scripts/simulate.ts --mode batch --runs 200 --seed 606
 *   npx tsx scripts/simulate.ts --mode audit
 *   npx tsx scripts/simulate.ts --mode niche
 *
 * 模式说明：
 *   single  — 单个画像模拟，输出完整调试文件（8 个文件）
 *   batch   — 批量模拟，输出汇总 + 详细 JSON + CSV
 *   audit   — 覆盖率审计，逐类诊断未覆盖原因
 *   niche   — 冷门探针，检测 highInterestOnly + 低权重专业可见性
 *
 * ⚠️ 不修改线上参数文件
 * ⚠️ 输出到 simulation-results/
 */

import * as fs from 'fs';
import * as path from 'path';
import { questionBank } from '../src/data/questionBank';
import type { QuestionBank, Question, DirectionBucket, Dimension, RiskTag } from '../src/types/test';
import type { BucketScore, UserResponses } from '../src/utils/adaptiveQuestioning';
import {
  computeBucketScores,
  normalizeScores,
  collectRiskTags,
  determineUserType,
  checkHumanitiesProtection,
} from '../src/utils/adaptiveQuestioning';
import { computeDimensionScores, generateResult } from '../src/utils/scoring';
import type { RecommendationResult, CategoryRecommendation } from '../src/types/result';
import { majorPersonaLibrary } from '../src/data/majorPersonaLibrary';

// ═══════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════

interface SimOptions {
  mode: 'single' | 'batch' | 'audit' | 'niche';
  runs: number;
  seed: number;
  profile?: string;
}

interface CategoryBreakdown {
  slug: string;
  name: string;
  gate: string;
  score: number;
  topDimensions: string[];
  reasons: string[];
  cautions: string[];
}

interface SingleResult {
  profileId: string;
  profileName: string;
  profileDesc: string;
  answers: Array<{ questionId: string; questionTitle: string; selectedOptionId: string; optionText: string }>;
  dimensionScores: Record<string, number>;
  bucketScores: Record<string, number>;
  recommended: CategoryBreakdown[];
  optional: CategoryBreakdown[];
  cautious: CategoryBreakdown[];
  riskTags: Array<{ tag: string; label: string; description: string; affectedCategories: string[] }>;
  nicheExplorations: Array<{ slug: string; name: string; score: number; reasons: string[] }>;
  profileSummary: string;
  confidenceLevel: string;
  confidenceNote: string;
  nextSteps: string[];
  userType: string;
  humanitiesProtected: boolean;
  anomalies: string[];
}

interface AuditEntry {
  slug: string;
  name: string;
  gate: string;
  weight: number;
  inRecommended: boolean;
  inOptional: boolean;
  inCautious: boolean;
  inNiche: boolean;
  score: number;
  reason: string;
}

// ═══════════════════════════════════════════════
// CLI 参数解析
// ═══════════════════════════════════════════════

function parseArgs(): SimOptions {
  const args = process.argv.slice(2);
  const opts: SimOptions = {
    mode: 'batch',
    runs: 200,
    seed: Math.floor(Math.random() * 10000),
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mode' && args[i + 1]) opts.mode = args[i + 1] as SimOptions['mode'];
    if (args[i] === '--runs' && args[i + 1]) opts.runs = parseInt(args[i + 1]);
    if (args[i] === '--seed' && args[i + 1]) opts.seed = parseInt(args[i + 1]);
    if (args[i] === '--profile' && args[i + 1]) opts.profile = args[i + 1];
  }
  return opts;
}

// ═══════════════════════════════════════════════
// 简易随机（带 seed）
// ═══════════════════════════════════════════════

class SeededRandom {
  private s: number;
  constructor(seed: number) { this.s = seed; }
  next(): number {
    this.s = (this.s * 1664525 + 1013904223) % 2 ** 32;
    return (this.s >>> 0) / 2 ** 32;
  }
  pick<T>(arr: T[]): T { return arr[Math.floor(this.next() * arr.length)]; }
  gaussian(mean: number, stdDev: number): number {
    let u = 0, v = 0;
    while (u === 0) u = this.next();
    while (v === 0) v = this.next();
    return mean + stdDev * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
}

// ═══════════════════════════════════════════════
// 虚拟用户画像（单次模式用）
// ═══════════════════════════════════════════════

interface VirtualProfile {
  id: string;
  name: string;
  desc: string;
  dimBiases: Partial<Record<Dimension, number>>;
  bucketBiases: Partial<Record<DirectionBucket, number>>;
  riskBiases: { tag: string; chance: number }[];
  interestSlugs: string[];
}

const VIRTUAL_PROFILES: VirtualProfile[] = [
  {
    id: 'stem_nerd', name: '数学好·喜欢电路·能接受抽象', desc: '数学较好、喜欢电路、能接受抽象思维',
    dimBiases: { math_logic: 80, info_systems: 60, engineering_practice: 70, abstract_theory: 50 },
    bucketBiases: { stem: 80 }, riskBiases: [], interestSlugs: ['electronic-information', 'computer-science', 'automation', 'electrical'],
  },
  {
    id: 'humanities_lover', name: '喜欢沟通表达·不喜欢数学', desc: '喜欢沟通表达，不喜欢数学',
    dimBiases: { interpersonal: 80, reading_expression: 70, math_logic: -80, info_systems: -50 },
    bucketBiases: { humanities: 50, social_science: 50 }, riskBiases: [], interestSlugs: ['journalism', 'chinese-literature', 'education', 'law-class'],
  },
  {
    id: 'business_minded', name: '对商业·管理·财务感兴趣', desc: '对商业、管理、财务感兴趣',
    dimBiases: { business_sense: 80, interpersonal: 50, math_logic: 40, rule_detail: 30 },
    bucketBiases: { business: 80 }, riskBiases: [], interestSlugs: ['business-administration', 'finance', 'economics-class', 'international-trade'],
  },
  {
    id: 'med_aspirant', name: '对医学/生命科学感兴趣', desc: '对医学、生命科学感兴趣',
    dimBiases: { life_health_interest: 90, interpersonal: 50, rule_detail: 30 },
    bucketBiases: { life_health: 90 }, riskBiases: [{ tag: 'long_cycle', chance: 0.3 }],
    interestSlugs: ['clinical-medicine', 'pharmacy', 'nursing', 'biology', 'biomedical-eng'],
  },
  {
    id: 'engineering_hands', name: '喜欢机械结构·工程实践', desc: '喜欢机械结构和工程实践',
    dimBiases: { engineering_practice: 90, math_logic: 50, abstract_theory: 20 },
    bucketBiases: { stem: 80 }, riskBiases: [], interestSlugs: ['mechanical', 'automation', 'aerospace', 'civil-engineering'],
  },
  {
    id: 'artist', name: '喜欢设计·审美·创作', desc: '喜欢设计、审美、创作',
    dimBiases: { aesthetic_creation: 95, engineering_practice: 40, interpersonal: 20 },
    bucketBiases: { art_creative: 80, stem: 30 }, riskBiases: [], interestSlugs: ['design', 'fine-arts', 'architecture', 'drama-film'],
  },
  {
    id: 'low_math_creative', name: '数学弱·抗压弱·希望轻松', desc: '数学弱、抗压弱、希望大学轻松',
    dimBiases: { math_logic: -90, abstract_theory: -70, info_systems: -60, stable_path: 60, reading_expression: 40 },
    bucketBiases: { humanities: 40, social_science: 40 }, riskBiases: [{ tag: 'trend_chasing', chance: 0.3 }],
    interestSlugs: ['education', 'foreign-languages', 'journalism', 'tourism-management'],
  },
  {
    id: 'math_pure', name: '数学强·愿长期自学·愿读研', desc: '数学强、能接受长期自学、愿意读研',
    dimBiases: { math_logic: 90, abstract_theory: 80, info_systems: 60, engineering_practice: 40 },
    bucketBiases: { stem: 90 }, riskBiases: [], interestSlugs: ['mathematics', 'physics', 'computer-science', 'electronic-information'],
  },
  {
    id: 'popular_chaser', name: '热门跟风·想选计算机', desc: '只因为热门而想选计算机的人',
    dimBiases: { info_systems: 10, math_logic: 10 },
    bucketBiases: { stem: 40 }, riskBiases: [{ tag: 'trend_chasing', chance: 0.8 }, { tag: 'info_bubble', chance: 0.7 }],
    interestSlugs: ['computer-science'],
  },
  {
    id: 'balanced', name: '各方面都比较中立', desc: '各方面都比较中立',
    dimBiases: {}, bucketBiases: {}, riskBiases: [], interestSlugs: [],
  },
  {
    id: 'social_care', name: '喜欢帮助他人·关注社会', desc: '喜欢帮助他人，关注社会问题',
    dimBiases: { interpersonal: 90, reading_expression: 60, rule_detail: 50, math_logic: 20 },
    bucketBiases: { social_science: 85, life_health: 50 }, riskBiases: [],
    interestSlugs: ['law-class', 'sociology', 'public-administration', 'social-work'],
  },
  {
    id: 'rule_lover', name: '偏稳定和规则·不喜欢冒险', desc: '偏稳定和规则，不喜欢冒险',
    dimBiases: { stable_path: 70, rule_detail: 70, business_sense: 30, math_logic: -10 },
    bucketBiases: { business: 50, social_science: 40 }, riskBiases: [],
    interestSlugs: ['law-class', 'finance', 'public-administration', 'business-administration'],
  },
  {
    id: 'tech_creative', name: '喜欢编程+设计交叉', desc: '喜欢编程和设计的交叉领域',
    dimBiases: { info_systems: 80, aesthetic_creation: 70, engineering_practice: 50, math_logic: 50 },
    bucketBiases: { stem: 60, art_creative: 60 }, riskBiases: [],
    interestSlugs: ['computer-science', 'design', 'drama-film'],
  },
  {
    id: 'nature_lover', name: '喜欢大自然·生物·环境', desc: '喜欢大自然、生物、环境',
    dimBiases: { life_health_interest: 80, engineering_practice: 40, abstract_theory: 30 },
    bucketBiases: { life_health: 70, stem: 30 }, riskBiases: [],
    interestSlugs: ['biology', 'environmental-ecology', 'forestry', 'plant-production'],
  },
  {
    id: 'data_geek', name: '喜欢数据·编程·逻辑推理', desc: '喜欢数据、编程、逻辑推理',
    dimBiases: { info_systems: 95, math_logic: 85, business_sense: 40, abstract_theory: 45 },
    bucketBiases: { stem: 80, business: 35 }, riskBiases: [],
    interestSlugs: ['computer-science', 'mathematics', 'statistics', 'management-science'],
  },

  // ── v0.21.0 新增：覆盖 business/art/life_health/humanities/social_science 短板 ──

  {
    id: 'finance_detail', name: '对金融/财务感兴趣·细心', desc: '对金融、财务感兴趣，细心有条理',
    dimBiases: { business_sense: 85, rule_detail: 70, math_logic: 55, stable_path: 40 },
    bucketBiases: { business: 90 }, riskBiases: [],
    interestSlugs: ['finance', 'accounting', 'financial-management', 'auditing', 'economics-class'],
  },
  {
    id: 'manager_organizer', name: '喜欢管理·组织事务', desc: '喜欢管理协调、组织事务',
    dimBiases: { interpersonal: 70, business_sense: 65, stable_path: 50, rule_detail: 40 },
    bucketBiases: { business: 80, social_science: 30 }, riskBiases: [],
    interestSlugs: ['business-administration', 'public-administration', 'management-science', 'logistics'],
  },
  {
    id: 'sales_persuader', name: '擅长沟通·说服力强', desc: '擅长沟通、说服和谈判',
    dimBiases: { interpersonal: 90, reading_expression: 65, business_sense: 60 },
    bucketBiases: { business: 75, social_science: 30 }, riskBiases: [],
    interestSlugs: ['business-administration', 'international-trade', 'e-commerce', 'tourism-management'],
  },
  {
    id: 'performer', name: '喜欢表演·音乐·舞蹈', desc: '喜欢表演、音乐、舞蹈等舞台艺术',
    dimBiases: { aesthetic_creation: 90, interpersonal: 60, reading_expression: 30 },
    bucketBiases: { art_creative: 90 }, riskBiases: [],
    interestSlugs: ['music-dance', 'drama-film', 'fine-arts'],
  },
  {
    id: 'visual_designer', name: '喜欢视觉设计·美学', desc: '喜欢视觉设计、平面/产品/交互设计',
    dimBiases: { aesthetic_creation: 90, engineering_practice: 45, info_systems: 40 },
    bucketBiases: { art_creative: 85, stem: 25 }, riskBiases: [],
    interestSlugs: ['design', 'fine-arts', 'architecture'],
  },
  {
    id: 'writer_creator', name: '喜欢写作·表达·创作', desc: '喜欢文字表达和内容创作',
    dimBiases: { reading_expression: 90, interpersonal: 40, abstract_theory: 30 },
    bucketBiases: { humanities: 80, social_science: 30 }, riskBiases: [],
    interestSlugs: ['chinese-literature', 'journalism', 'foreign-languages'],
  },
  {
    id: 'philosopher', name: '喜欢思辨·抽象·哲学', desc: '喜欢抽象思考、哲学思辨',
    dimBiases: { abstract_theory: 90, reading_expression: 50, math_logic: 30 },
    bucketBiases: { humanities: 80, stem: 20 }, riskBiases: [],
    interestSlugs: ['philosophy-class', 'history-class', 'sociology'],
  },
  {
    id: 'clinical_dedicated', name: '想做医生·能接受长期学习', desc: '想做医生，能接受长学习周期',
    dimBiases: { life_health_interest: 95, interpersonal: 70, rule_detail: 50, stable_path: 40 },
    bucketBiases: { life_health: 95 }, riskBiases: [{ tag: 'long_cycle', chance: 0.5 }],
    interestSlugs: ['clinical-medicine', 'stomatology', 'pharmacy', 'nursing'],
  },
  {
    id: 'life_science_researcher', name: '喜欢生物·化学·科研', desc: '喜欢生命科学基础研究',
    dimBiases: { life_health_interest: 80, abstract_theory: 70, engineering_practice: 40 },
    bucketBiases: { life_health: 80, stem: 30 }, riskBiases: [],
    interestSlugs: ['biology', 'pharmacy', 'biomedical-eng', 'basic-medicine'],
  },
  {
    id: 'agriculture_green', name: '喜欢自然·农业·生态环境', desc: '喜欢自然、农业和生态',
    dimBiases: { life_health_interest: 75, engineering_practice: 60, abstract_theory: 20 },
    bucketBiases: { life_health: 85 }, riskBiases: [],
    interestSlugs: ['plant-production', 'animal-production', 'forestry', 'environmental-ecology', 'veterinary'],
  },
  {
    id: 'public_health_policy', name: '关注公共健康·社会政策', desc: '关注公共卫生、健康政策',
    dimBiases: { life_health_interest: 70, interpersonal: 60, reading_expression: 50, rule_detail: 40 },
    bucketBiases: { life_health: 70, social_science: 40 }, riskBiases: [],
    interestSlugs: ['public-health', 'medical-technology', 'sociology'],
  },
  {
    id: 'law_justice', name: '喜欢规则·正义·辩论', desc: '喜欢规则、法律、辩论',
    dimBiases: { rule_detail: 85, reading_expression: 70, interpersonal: 50 },
    bucketBiases: { social_science: 85 }, riskBiases: [],
    interestSlugs: ['law-class', 'political-science', 'public-security'],
  },
  {
    id: 'educator', name: '喜欢教书·帮助人成长', desc: '喜欢教育、帮助他人成长',
    dimBiases: { interpersonal: 85, reading_expression: 60, stable_path: 50 },
    bucketBiases: { social_science: 85, life_health: 20 }, riskBiases: [],
    interestSlugs: ['education', 'physical-education', 'chinese-literature'],
  },
  {
    id: 'architect_designer', name: '喜欢建筑·空间·结构设计', desc: '喜欢建筑设计、空间规划',
    dimBiases: { aesthetic_creation: 75, engineering_practice: 70, info_systems: 30 },
    bucketBiases: { stem: 60, art_creative: 60 }, riskBiases: [],
    interestSlugs: ['architecture', 'design', 'civil-engineering'],
  },
  {
    id: 'business_analytics', name: '喜欢数据分析·商业决策', desc: '喜欢用数据分析做商业决策',
    dimBiases: { info_systems: 85, math_logic: 75, business_sense: 70, rule_detail: 30 },
    bucketBiases: { business: 70, stem: 40 }, riskBiases: [],
    interestSlugs: ['statistics', 'management-science', 'computer-science', 'finance'],
  },
];

// ═══════════════════════════════════════════════
// 核心辅助函数
// ═══════════════════════════════════════════════

/** 确保输出目录存在 */
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** 生成时间戳目录名 */
function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

/** 前端固定 12 题（与 adaptiveQuestioning.ts / test-flow.js 一致） */
const FIXED_GENERAL_IDS = [
  'gen_001', 'gen_002', 'gen_019', 'gen_004', 'gen_006', 'gen_007',
  'gen_008', 'gen_010', 'gen_014', 'gen_016', 'gen_017', 'gen_020',
];

/** 生成模拟用户答案 */
function generateAnswers(
  profile: VirtualProfile,
  bank: QuestionBank,
  rng: SeededRandom,
  useFixedGeneral = true,
): { answers: UserResponses; answerDetails: SingleResult['answers'] } {
  const answers: UserResponses = {};
  const details: SingleResult['answers'] = [];

  const qMap: Record<string, Question> = {};
  for (const q of bank.questions) qMap[q.id] = q;

  const branchQ = bank.questions.filter((q) => q.type === 'branch');
  const crossQ = bank.questions.filter((q) => q.type === 'cross_check');
  const riskQ = bank.questions.filter((q) => q.type === 'risk');

  const shuffleAndTake = (qs: Question[], n: number) => {
    const arr = [...qs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
  };

  const fixedGeneral: Question[] = [];
  for (const id of FIXED_GENERAL_IDS) {
    if (qMap[id]) fixedGeneral.push(qMap[id]);
  }

  const selectedQ = [
    ...fixedGeneral,
    ...shuffleAndTake(branchQ, 6),
    ...shuffleAndTake(crossQ, 2),
    ...shuffleAndTake(riskQ, 2),
  ];

  for (const q of selectedQ) {
    const scoredOpts = q.options.map((opt) => {
      let score = 0;
      for (const effect of opt.scoreEffects) {
        const dimBias = profile.dimBiases[effect.target as Dimension];
        if (dimBias !== undefined) score += dimBias * effect.points * 0.1;
        const bucketBias = profile.bucketBiases[effect.target as DirectionBucket];
        if (bucketBias !== undefined) score += bucketBias * effect.points * 0.1;
      }
      return { option: opt, score };
    });

    scoredOpts.forEach((o) => { o.score += rng.gaussian(0, 8); });
    scoredOpts.sort((a, b) => b.score - a.score);

    const chosen = scoredOpts[0].option;
    answers[q.id] = chosen.id;
    details.push({
      questionId: q.id,
      questionTitle: q.title,
      selectedOptionId: chosen.id,
      optionText: chosen.text,
    });
  }

  return { answers, answerDetails: details };
}

/** 从 majorPersonaLibrary 生成答案（简化：用 sixBucketAffinity 直接作为桶得分） */
function generateAnswersFromPersona(
  persona: any,
  bank: QuestionBank,
  rng: SeededRandom,
): { answers: UserResponses; answerDetails: SingleResult['answers'] } {
  const answers: UserResponses = {};
  const details: SingleResult['answers'] = [];

  const qMap: Record<string, Question> = {};
  for (const q of bank.questions) qMap[q.id] = q;

  const branchQ = bank.questions.filter((q) => q.type === 'branch');
  const crossQ = bank.questions.filter((q) => q.type === 'cross_check');
  const riskQ = bank.questions.filter((q) => q.type === 'risk');

  const shuffleAndTake = (qs: Question[], n: number) => {
    const arr = [...qs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
  };

  const fixedGeneral: Question[] = [];
  for (const id of FIXED_GENERAL_IDS) {
    if (qMap[id]) fixedGeneral.push(qMap[id]);
  }

  const selectedQ = [
    ...fixedGeneral,
    ...shuffleAndTake(branchQ, 6),
    ...shuffleAndTake(crossQ, 2),
    ...shuffleAndTake(riskQ, 2),
  ];

  // 从 persona hints 推断维度偏好
  const h = persona.answerStyleHints || {};
  const dimBiases: Partial<Record<Dimension, number>> = {};
  if (h.likesMath === 'high') dimBiases.math_logic = 85;
  else if (h.likesMath === 'medium') dimBiases.math_logic = 55;
  if (h.likesWriting === 'high') dimBiases.reading_expression = 85;
  else if (h.likesWriting === 'medium') dimBiases.reading_expression = 55;
  if (h.likesCommunication === 'high') dimBiases.interpersonal = 85;
  if (h.valuesIncome === 'high') dimBiases.business_sense = 70;
  if (h.likesHandsOn === 'high') dimBiases.engineering_practice = 85;
  if (h.likesProgramming === 'high') dimBiases.info_systems = 85;
  if (h.likesBiology === 'high') dimBiases.life_health_interest = 85;
  if (h.valuesStability === 'high') dimBiases.stable_path = 85;

  const aff = persona.sixBucketAffinity || {};
  const bucketBiases: Partial<Record<DirectionBucket, number>> = {};
  Object.entries(aff).forEach(([b, v]) => { bucketBiases[b as DirectionBucket] = v as number; });

  for (const q of selectedQ) {
    const scoredOpts = q.options.map((opt) => {
      let score = 0;
      for (const effect of opt.scoreEffects) {
        const dimBias = dimBiases[effect.target as Dimension];
        if (dimBias !== undefined) score += dimBias * effect.points * 0.1;
        const bucketBias = bucketBiases[effect.target as DirectionBucket];
        if (bucketBias !== undefined) score += bucketBias * effect.points * 0.1;
      }
      return { option: opt, score };
    });
    scoredOpts.forEach((o) => { o.score += rng.gaussian(0, 8); });
    scoredOpts.sort((a, b) => b.score - a.score);

    const chosen = scoredOpts[0].option;
    answers[q.id] = chosen.id;
    details.push({
      questionId: q.id,
      questionTitle: q.title,
      selectedOptionId: chosen.id,
      optionText: chosen.text,
    });
  }

  return { answers, answerDetails: details };
}

/** 提取专业类得分明细 */
function extractCategoryBreakdown(result: RecommendationResult): {
  recommended: CategoryBreakdown[];
  optional: CategoryBreakdown[];
  cautious: CategoryBreakdown[];
} {
  const extract = (cats: CategoryRecommendation[]): CategoryBreakdown[] =>
    cats.map((c) => ({
      slug: c.slug,
      name: c.name,
      gate: c.gate,
      score: c.score,
      topDimensions: c.topDimensions,
      reasons: [c.reason, ...c.cautions],
      cautions: c.cautions,
    }));

  return {
    recommended: extract(result.recommendedCategories),
    optional: extract(result.optionalCategories),
    cautious: extract(result.cautiousCategories),
  };
}

/** 提取避坑明细 */
function extractAvoidance(result: RecommendationResult) {
  return result.riskTags.map((r) => ({
    tag: r.tag,
    label: r.label,
    description: r.description,
    affectedCategories: r.affectedCategories,
  }));
}

/** 异常检测 */
function detectAnomalies(result: RecommendationResult, dimScores: Record<string, number>): string[] {
  const anomalies: string[] = [];

  // 推荐与画像矛盾
  const stemRec = result.recommendedCategories.some((c) =>
    ['计算机类', '电子信息类', '自动化类', '机械类', '电气类'].includes(c.name));
  if (stemRec && (dimScores['math_logic'] ?? 0) < 15) {
    anomalies.push('推荐STEM专业但数学维度低(<15)');
  }

  // 推荐过于集中
  const uniqueRecs = new Set(result.recommendedCategories.map((c) => c.name));
  if (uniqueRecs.size <= 1 && result.recommendedCategories.length >= 2) {
    anomalies.push('推荐结果过于集中(仅1个专业类)');
  }

  // 推荐/谨慎重叠
  const recSlugs = new Set(result.recommendedCategories.map((c) => c.slug));
  const cautiousOverlap = result.cautiousCategories.filter((c) => recSlugs.has(c.slug));
  if (cautiousOverlap.length > 0) {
    anomalies.push(`推荐/谨慎列表重叠: ${cautiousOverlap.map((c) => c.name).join(', ')}`);
  }

  return anomalies;
}

/** 简化的 niche 探索（复用 v05 逻辑） */
function computeNicheExplorations(
  result: RecommendationResult,
  dimScores: Record<string, number>,
  bucketScores: BucketScore,
): Array<{ slug: string; name: string; score: number; reasons: string[] }> {
  // 简化版：从 optional 中找出有强维度信号的
  const niche: Array<{ slug: string; name: string; score: number; reasons: string[] }> = [];
  const recSlugs = new Set(result.recommendedCategories.map((c) => c.slug));
  const cautiousSlugs = new Set(result.cautiousCategories.map((c) => c.slug));

  for (const cat of result.optionalCategories) {
    if (recSlugs.has(cat.slug) || cautiousSlugs.has(cat.slug)) continue;
    if (cat.score >= 30 && cat.topDimensions.length > 0) {
      niche.push({
        slug: cat.slug,
        name: cat.name,
        score: cat.score,
        reasons: [`维度信号: ${cat.topDimensions.join('、')}`, `综合得分: ${cat.score}`],
      });
    }
  }

  return niche.slice(0, 3);
}

// ═══════════════════════════════════════════════
// 模式 1: 单次模拟
// ═══════════════════════════════════════════════

function runSingle(opts: SimOptions) {
  const rng = new SeededRandom(opts.seed);

  // 查找画像
  const profileId = opts.profile || 'stem_nerd';
  let profile = VIRTUAL_PROFILES.find((p) => p.id === profileId);

  if (!profile) {
    // 尝试从 majorPersonaLibrary 查找
    const persona = majorPersonaLibrary.find((p: any) => p.id === profileId);
    if (persona) {
      console.log(`✅ 从 majorPersonaLibrary 找到画像: ${persona.categoryName}`);
      const { answers, answerDetails } = generateAnswersFromPersona(persona, questionBank, rng);
      const riskTags = collectRiskTags(questionBank, answers);
      const rawBuckets = computeBucketScores(questionBank, answers);
      const normalized = normalizeScores(rawBuckets);
      const userType = determineUserType(normalized);
      const humanitiesProtected = checkHumanitiesProtection(normalized);
      const dimScores = computeDimensionScores(questionBank, answers);
      const result = generateResult(questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

      const breakdown = extractCategoryBreakdown(result);
      const avoidance = extractAvoidance(result);
      const niche = computeNicheExplorations(result, dimScores, normalized as BucketScore);
      const anomalies = detectAnomalies(result, dimScores);

      writeSingleOutput(opts, {
        profileId: persona.id,
        profileName: persona.categoryName,
        profileDesc: persona.description || '',
        answers: answerDetails,
        dimensionScores: Object.fromEntries(Object.entries(dimScores).map(([k, v]) => [k, Math.round(v)])),
        bucketScores: Object.fromEntries(Object.entries(normalized as Record<string, number>).map(([k, v]) => [k, Math.round(v)])),
        ...breakdown,
        riskTags: avoidance,
        nicheExplorations: niche,
        profileSummary: result.profileSummary,
        confidenceLevel: result.confidenceLevel,
        confidenceNote: result.confidenceNote,
        nextSteps: result.nextStepSuggestions,
        userType: result.userType,
        humanitiesProtected: result.humanitiesProtected,
        anomalies,
      });
      return;
    }

    console.log(`❌ 未找到画像: ${profileId}`);
    console.log(`   可用内置画像: ${VIRTUAL_PROFILES.map((p) => p.id).join(', ')}`);
    console.log(`   或使用 majorPersonaLibrary 中的 persona ID`);
    process.exit(1);
  }

  console.log(`\n🔬 单次模拟: ${profile.name}\n`);

  const { answers, answerDetails } = generateAnswers(profile, questionBank, rng);
  const riskTags = collectRiskTags(questionBank, answers);
  const rawBuckets = computeBucketScores(questionBank, answers);
  const normalized = normalizeScores(rawBuckets);
  const userType = determineUserType(normalized);
  const humanitiesProtected = checkHumanitiesProtection(normalized);
  const dimScores = computeDimensionScores(questionBank, answers);
  const result = generateResult(questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

  const breakdown = extractCategoryBreakdown(result);
  const avoidance = extractAvoidance(result);
  const niche = computeNicheExplorations(result, dimScores, normalized as BucketScore);
  const anomalies = detectAnomalies(result, dimScores);

  writeSingleOutput(opts, {
    profileId: profile.id,
    profileName: profile.name,
    profileDesc: profile.desc,
    answers: answerDetails,
    dimensionScores: Object.fromEntries(Object.entries(dimScores).map(([k, v]) => [k, Math.round(v)])),
    bucketScores: Object.fromEntries(Object.entries(normalized as Record<string, number>).map(([k, v]) => [k, Math.round(v)])),
    ...breakdown,
    riskTags: avoidance,
    nicheExplorations: niche,
    profileSummary: result.profileSummary,
    confidenceLevel: result.confidenceLevel,
    confidenceNote: result.confidenceNote,
    nextSteps: result.nextStepSuggestions,
    userType: result.userType,
    humanitiesProtected: result.humanitiesProtected,
    anomalies,
  });
}

function writeSingleOutput(opts: SimOptions, data: SingleResult) {
  const dir = path.resolve(`simulation-results/single/${timestamp()}`);
  ensureDir(dir);

  // 1. input.json
  fs.writeFileSync(path.join(dir, 'input.json'), JSON.stringify({
    profileId: data.profileId,
    profileName: data.profileName,
    profileDesc: data.profileDesc,
    answers: data.answers,
    seed: opts.seed,
  }, null, 2));

  // 2. dimension-scores.json
  fs.writeFileSync(path.join(dir, 'dimension-scores.json'), JSON.stringify(data.dimensionScores, null, 2));

  // 3. bucket-scores.json
  fs.writeFileSync(path.join(dir, 'bucket-scores.json'), JSON.stringify(data.bucketScores, null, 2));

  // 4. category-scores.json
  fs.writeFileSync(path.join(dir, 'category-scores.json'), JSON.stringify({
    recommended: data.recommended,
    optional: data.optional,
    cautious: data.cautious,
  }, null, 2));

  // 5. recommendation.json
  fs.writeFileSync(path.join(dir, 'recommendation.json'), JSON.stringify({
    recommended: data.recommended,
    optional: data.optional,
    cautious: data.cautious,
    profileSummary: data.profileSummary,
    confidenceLevel: data.confidenceLevel,
    confidenceNote: data.confidenceNote,
    userType: data.userType,
    humanitiesProtected: data.humanitiesProtected,
    nextSteps: data.nextSteps,
  }, null, 2));

  // 6. avoidance.json
  fs.writeFileSync(path.join(dir, 'avoidance.json'), JSON.stringify(data.riskTags, null, 2));

  // 7. niche.json
  fs.writeFileSync(path.join(dir, 'niche.json'), JSON.stringify(data.nicheExplorations, null, 2));

  // 8. summary.md
  const md = buildSingleSummaryMd(data);
  fs.writeFileSync(path.join(dir, 'summary.md'), md);

  console.log(`✅ 输出目录: ${dir}`);
  console.log(`   - input.json`);
  console.log(`   - dimension-scores.json`);
  console.log(`   - bucket-scores.json`);
  console.log(`   - category-scores.json`);
  console.log(`   - recommendation.json`);
  console.log(`   - avoidance.json`);
  console.log(`   - niche.json`);
  console.log(`   - summary.md`);
}

function buildSingleSummaryMd(data: SingleResult): string {
  const lines = [
    `# 单次模拟报告`,
    ``,
    `> 画像: ${data.profileName} | ${data.profileDesc}`,
    `> 用户类型: ${data.userType} | 文科保护: ${data.humanitiesProtected ? '是' : '否'} | 置信度: ${data.confidenceLevel}`,
    ``,
    `## 📊 维度得分`,
    ``,
    `| 维度 | 得分 | 级别 |`,
    `|------|:----:|:----:|`,
  ];

  Object.entries(data.dimensionScores)
    .sort(([, a], [, b]) => b - a)
    .forEach(([dim, score]) => {
      const level = score >= 40 ? '🟢 高' : score >= 15 ? '🟡 中' : '🔴 低';
      lines.push(`| ${dim} | ${score} | ${level} |`);
    });

  lines.push(``, `## 🪣 桶得分`, ``);
  Object.entries(data.bucketScores)
    .sort(([, a], [, b]) => b - a)
    .forEach(([bucket, score]) => {
      lines.push(`- **${bucket}**: ${score}`);
    });

  lines.push(``, `## ✅ 优先了解 (${data.recommended.length})`, ``);
  data.recommended.forEach((c, i) => {
    lines.push(`### ${i + 1}. ${c.name} (${c.gate}) — ${c.score} 分`);
    lines.push(`- 得分明细: 桶匹配 + 维度匹配 + 权重 + 风险调整`);
    lines.push(`- 关联维度: ${c.topDimensions.join('、')}`);
    if (c.cautions.length > 0) {
      lines.push(`- ⚠️ 注意: ${c.cautions.join('；')}`);
    }
    lines.push(``);
  });

  lines.push(`## 📋 可以了解 (${data.optional.length})`, ``);
  data.optional.forEach((c, i) => {
    lines.push(`${i + 1}. **${c.name}** (${c.gate}) — ${c.score} 分`);
  });

  lines.push(``, `## ⚠️ 谨慎了解 (${data.cautious.length})`, ``);
  data.cautious.forEach((c, i) => {
    lines.push(`${i + 1}. **${c.name}** (${c.gate}) — ${c.score} 分`);
    if (c.cautions.length > 0) {
      lines.push(`   - ${c.cautions.join('；')}`);
    }
  });

  if (data.riskTags.length > 0) {
    lines.push(``, `## 🚩 避坑提醒`, ``);
    data.riskTags.forEach((r) => {
      lines.push(`- **${r.label}**: ${r.description}`);
      lines.push(`  - 受影响专业: ${r.affectedCategories.join('、')}`);
    });
  }

  if (data.nicheExplorations.length > 0) {
    lines.push(``, `## 🔍 小众探索`, ``);
    data.nicheExplorations.forEach((n) => {
      lines.push(`- **${n.name}** (${n.score} 分): ${n.reasons.join('；')}`);
    });
  }

  if (data.anomalies.length > 0) {
    lines.push(``, `## ❗ 异常检测`, ``);
    data.anomalies.forEach((a) => lines.push(`- ${a}`));
  }

  lines.push(``, `## 💡 下一步`, ``);
  data.nextSteps.forEach((s) => lines.push(`- ${s}`));

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// 模式 2: 批量模拟
// ═══════════════════════════════════════════════

function runBatch(opts: SimOptions) {
  const dir = path.resolve(`simulation-results/batch/${timestamp()}`);
  ensureDir(dir);

  const rng = new SeededRandom(opts.seed);
  const allSlugs = Object.keys(
    JSON.parse(fs.readFileSync(path.resolve('simulation-results/v04_weights_raw.json'), 'utf8'))
  );

  console.log(`\n🧪 批量模拟: runs=${opts.runs} seed=${opts.seed}\n`);

  // 配置
  const config = { runs: opts.runs, seed: opts.seed, mode: 'batch', timestamp: new Date().toISOString() };
  fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(config, null, 2));

  const allResults: SingleResult[] = [];
  const recCounts: Record<string, number> = {};
  const cautiousCounts: Record<string, number> = {};

  for (let i = 0; i < opts.runs; i++) {
    const profileIdx = i % VIRTUAL_PROFILES.length;
    const profile = VIRTUAL_PROFILES[profileIdx];

    const { answers, answerDetails } = generateAnswers(profile, questionBank, rng);
    const riskTags = collectRiskTags(questionBank, answers);
    const rawBuckets = computeBucketScores(questionBank, answers);
    const normalized = normalizeScores(rawBuckets);
    const userType = determineUserType(normalized);
    const humanitiesProtected = checkHumanitiesProtection(normalized);
    const dimScores = computeDimensionScores(questionBank, answers);
    const result = generateResult(questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

    const breakdown = extractCategoryBreakdown(result);
    const avoidance = extractAvoidance(result);
    const niche = computeNicheExplorations(result, dimScores, normalized as BucketScore);
    const anomalies = detectAnomalies(result, dimScores);

    const singleResult: SingleResult = {
      profileId: profile.id,
      profileName: profile.name,
      profileDesc: profile.desc,
      answers: answerDetails,
      dimensionScores: Object.fromEntries(Object.entries(dimScores).map(([k, v]) => [k, Math.round(v)])),
      bucketScores: Object.fromEntries(Object.entries(normalized as Record<string, number>).map(([k, v]) => [k, Math.round(v)])),
      ...breakdown,
      riskTags: avoidance,
      nicheExplorations: niche,
      profileSummary: result.profileSummary,
      confidenceLevel: result.confidenceLevel,
      confidenceNote: result.confidenceNote,
      nextSteps: result.nextStepSuggestions,
      userType: result.userType,
      humanitiesProtected: result.humanitiesProtected,
      anomalies,
    };

    allResults.push(singleResult);
    result.recommendedCategories.forEach((c) => { recCounts[c.name] = (recCounts[c.name] ?? 0) + 1; });
    result.cautiousCategories.forEach((c) => { cautiousCounts[c.name] = (cautiousCounts[c.name] ?? 0) + 1; });

    if ((i + 1) % 50 === 0) process.stdout.write(`   已完成 ${i + 1}/${opts.runs}...\n`);
  }

  // 写入 results.json
  fs.writeFileSync(path.join(dir, 'results.json'), JSON.stringify(allResults, null, 2));

  // 写入 results.csv
  const csvHeaders = ['profileId', 'profileName', 'userType', 'recommendedCategories', 'optionalCategories', 'cautiousCategories', 'riskTags', 'dimMathLogic', 'dimInfoSystems', 'dimEngineering', 'bucketStem', 'bucketBusiness', 'bucketHumanities', 'anomalies'];
  const csvRows = [csvHeaders.join(',')];
  for (const r of allResults) {
    csvRows.push([
      `"${r.profileId}"`, `"${r.profileName}"`, `"${r.userType}"`,
      `"${r.recommended.map((c) => c.name).join('; ')}"`,
      `"${r.optional.map((c) => c.name).join('; ')}"`,
      `"${r.cautious.map((c) => c.name).join('; ')}"`,
      `"${r.riskTags.map((t) => t.label).join('; ')}"`,
      r.dimensionScores['math_logic'] ?? 0, r.dimensionScores['info_systems'] ?? 0,
      r.dimensionScores['engineering_practice'] ?? 0,
      r.bucketScores['stem'] ?? 0, r.bucketScores['business'] ?? 0,
      r.bucketScores['humanities'] ?? 0,
      `"${r.anomalies.join('; ')}"`,
    ].join(','));
  }
  fs.writeFileSync(path.join(dir, 'results.csv'), csvRows.join('\n'));

  // 写入 summary.md
  const md = buildBatchSummaryMd(allResults, recCounts, cautiousCounts, opts, allSlugs);
  fs.writeFileSync(path.join(dir, 'summary.md'), md);

  // 写入 audit.md
  const auditMd = buildAuditMd(allResults, recCounts, allSlugs);
  fs.writeFileSync(path.join(dir, 'audit.md'), auditMd);

  console.log(`\n✅ 输出目录: ${dir}`);
  console.log(`   - config.json`);
  console.log(`   - results.json (${allResults.length} 条)`);
  console.log(`   - results.csv`);
  console.log(`   - summary.md`);
  console.log(`   - audit.md`);
}

function buildBatchSummaryMd(
  results: SingleResult[],
  recCounts: Record<string, number>,
  cautiousCounts: Record<string, number>,
  opts: SimOptions,
  allSlugs: string[],
): string {
  const n = results.length;
  const sorted = Object.entries(recCounts).sort(([, a], [, b]) => b - a);
  const uniqueRecs = new Set(Object.keys(recCounts));
  const totalCats = allSlugs.length;

  const lines = [
    `# 批量模拟报告`,
    ``,
    `> 时间: ${new Date().toISOString()} | runs=${opts.runs} | seed=${opts.seed}`,
    ``,
    `## 📊 覆盖率: ${uniqueRecs.size}/${totalCats} (${(uniqueRecs.size / totalCats * 100).toFixed(1)}%)`,
    ``,
    `## 推荐 Top20`,
    ``,
    `| # | 专业类 | 次数 | % |`,
    `|---|--------|:----:|:--:|`,
  ];

  sorted.slice(0, 20).forEach(([name, count], i) => {
    lines.push(`| ${i + 1} | ${name} | ${count} | ${((count / n) * 100).toFixed(0)}% |`);
  });

  lines.push(``, `## 热门检查`, ``);
  ['计算机类', '金融学类', '法学类', '临床医学类', '哲学类', '历史学类'].forEach((name) => {
    const count = recCounts[name] ?? 0;
    const flag = count > n * 0.5 ? '⚠️ 偏高' : count === 0 ? '❌ 未出现' : '✅';
    lines.push(`- ${name}: ${count}次(${((count / n) * 100).toFixed(0)}%) ${flag}`);
  });

  lines.push(``, `## 未出现类 (${totalCats - uniqueRecs.size})`, ``);
  allSlugs.filter((s) => !recCounts[s]).slice(0, 20).forEach((s) => lines.push(`- ${s}`));
  if (totalCats - uniqueRecs.size > 20) lines.push(`- ... 共 ${totalCats - uniqueRecs.size} 类`);

  // 异常统计
  const allAnomalies = results.flatMap((r) => r.anomalies);
  const anomalyCounts: Record<string, number> = {};
  allAnomalies.forEach((a) => { anomalyCounts[a] = (anomalyCounts[a] ?? 0) + 1; });

  if (Object.keys(anomalyCounts).length > 0) {
    lines.push(``, `## ❗ 异常统计`, ``);
    Object.entries(anomalyCounts).sort(([, a], [, b]) => b - a).forEach(([type, count]) => {
      lines.push(`- ${type}: ${count}次 (${((count / n) * 100).toFixed(1)}%)`);
    });
  }

  return lines.join('\n');
}

function buildAuditMd(
  results: SingleResult[],
  recCounts: Record<string, number>,
  allSlugs: string[],
): string {
  const n = results.length;
  const lines = [
    `# 覆盖率审计`,
    ``,
    `> runs=${n}`,
    ``,
    `## 推荐覆盖率: ${Object.keys(recCounts).length}/${allSlugs.length}`,
    ``,
    `## 全部专业类`,
    ``,
    `| 专业类 | 推荐次数 | 推荐% | 状态 |`,
    `|--------|:--------:|:-----:|:----:|`,
  ];

  allSlugs.sort((a, b) => (recCounts[b] ?? 0) - (recCounts[a] ?? 0)).forEach((slug) => {
    const count = recCounts[slug] ?? 0;
    const pct = ((count / n) * 100).toFixed(0);
    const status = count > 0 ? '✅' : '❌';
    lines.push(`| ${slug} | ${count} | ${pct}% | ${status} |`);
  });

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// 模式 3: 覆盖率审计
// ═══════════════════════════════════════════════

function runAudit(opts: SimOptions) {
  console.log(`\n📋 覆盖率审计模式\n`);

  const dir = path.resolve(`simulation-results/audit/${timestamp()}`);
  ensureDir(dir);

  const rng = new SeededRandom(opts.seed);
  const entries: AuditEntry[] = [];

  for (const persona of majorPersonaLibrary) {
    const { answers } = generateAnswersFromPersona(persona, questionBank, rng);
    const riskTags = collectRiskTags(questionBank, answers);
    const rawBuckets = computeBucketScores(questionBank, answers);
    const normalized = normalizeScores(rawBuckets);
    const userType = determineUserType(normalized);
    const humanitiesProtected = checkHumanitiesProtection(normalized);
    const result = generateResult(questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

    const slug = persona.categorySlug;
    const name = persona.categoryName;
    const inRec = result.recommendedCategories.some((c) => c.slug === slug);
    const inOpt = result.optionalCategories.some((c) => c.slug === slug);
    const inCau = result.cautiousCategories.some((c) => c.slug === slug);
    const allCats = [...result.recommendedCategories, ...result.optionalCategories, ...result.cautiousCategories];
    const catData = allCats.find((c) => c.slug === slug);

    entries.push({
      slug,
      name,
      gate: catData?.gate ?? '',
      weight: 0,
      inRecommended: inRec,
      inOptional: inOpt,
      inCautious: inCau,
      inNiche: false,
      score: catData?.score ?? 0,
      reason: inRec ? '✅ 主推荐' : inOpt ? '📋 可选' : inCau ? '⚠️ 谨慎' : '❌ 未出现',
    });
  }

  // 统计
  const mainCovered = entries.filter((e) => e.inRecommended).length;
  const optCovered = entries.filter((e) => e.inOptional).length;
  const total = entries.length;

  const md = [
    `# 覆盖率审计报告`,
    ``,
    `> 时间: ${new Date().toISOString()} | 画像数: ${total}`,
    ``,
    `## 覆盖率`,
    ``,
    `- 主推荐覆盖: ${mainCovered}/${total} (${(mainCovered / total * 100).toFixed(1)}%)`,
    `- 可选覆盖: ${optCovered}/${total} (${(optCovered / total * 100).toFixed(1)}%)`,
    `- 主+可选总覆盖: ${mainCovered + optCovered}/${total} (${((mainCovered + optCovered) / total * 100).toFixed(1)}%)`,
    ``,
    `## 逐类诊断`,
    ``,
    `| 专业类 | 主推荐 | 可选 | 谨慎 | 得分 | 状态 |`,
    `|--------|:------:|:----:|:----:|:----:|:----:|`,
  ];

  entries.sort((a, b) => b.score - a.score).forEach((e) => {
    md.push(`| ${e.name} | ${e.inRecommended ? '✅' : ''} | ${e.inOptional ? '✅' : ''} | ${e.inCautious ? '✅' : ''} | ${e.score} | ${e.reason} |`);
  });

  // 未出现类
  const notAppeared = entries.filter((e) => !e.inRecommended && !e.inOptional && !e.inCautious);
  if (notAppeared.length > 0) {
    md.push(``, `## ❌ 未出现类 (${notAppeared.length})`, ``);
    notAppeared.forEach((e) => md.push(`- ${e.name} (${e.slug})`));
  }

  fs.writeFileSync(path.join(dir, 'audit.md'), md.join('\n'));
  fs.writeFileSync(path.join(dir, 'entries.json'), JSON.stringify(entries, null, 2));

  console.log(`✅ 输出目录: ${dir}`);
  console.log(`   - audit.md`);
  console.log(`   - entries.json`);
  console.log(`\n📊 主推荐覆盖: ${mainCovered}/${total} (${(mainCovered / total * 100).toFixed(1)}%)`);
}

// ═══════════════════════════════════════════════
// 模式 4: 冷门探针
// ═══════════════════════════════════════════════

function runNiche(opts: SimOptions) {
  console.log(`\n🔍 冷门探针模式\n`);

  const dir = path.resolve(`simulation-results/niche/${timestamp()}`);
  ensureDir(dir);

  const rng = new SeededRandom(opts.seed);

  // 找出冷门画像（highInterestOnly 或低权重）
  const weightsRaw = JSON.parse(fs.readFileSync(path.resolve('simulation-results/v04_weights_raw.json'), 'utf8'));
  const fieldsRaw = JSON.parse(fs.readFileSync(path.resolve('simulation-results/v04_fields.json'), 'utf8'));

  const coldPersonas = majorPersonaLibrary.filter((p: any) => {
    const w = weightsRaw[p.categorySlug] || 4;
    const f = fieldsRaw[p.categorySlug] || {};
    return f.recommendedOnlyIfHighInterest || w <= 5;
  });

  console.log(`   冷门画像数: ${coldPersonas.length}`);

  const results: Array<{ slug: string; name: string; weight: number; hiOnly: boolean; inRecommended: boolean; inOptional: boolean; score: number }> = [];

  for (const persona of coldPersonas) {
    const { answers } = generateAnswersFromPersona(persona, questionBank, rng);
    const riskTags = collectRiskTags(questionBank, answers);
    const rawBuckets = computeBucketScores(questionBank, answers);
    const normalized = normalizeScores(rawBuckets);
    const userType = determineUserType(normalized);
    const humanitiesProtected = checkHumanitiesProtection(normalized);
    const result = generateResult(questionBank, answers, riskTags, userType, humanitiesProtected, rawBuckets);

    const slug = persona.categorySlug;
    const allCats = [...result.recommendedCategories, ...result.optionalCategories, ...result.cautiousCategories];
    const catData = allCats.find((c) => c.slug === slug);

    results.push({
      slug,
      name: persona.categoryName,
      weight: weightsRaw[slug] || 4,
      hiOnly: fieldsRaw[slug]?.recommendedOnlyIfHighInterest || false,
      inRecommended: result.recommendedCategories.some((c) => c.slug === slug),
      inOptional: result.optionalCategories.some((c) => c.slug === slug),
      score: catData?.score ?? 0,
    });
  }

  const canReach = results.filter((r) => r.inRecommended || r.inOptional);
  const cannotReach = results.filter((r) => !r.inRecommended && !r.inOptional);

  const md = [
    `# 冷门探针报告`,
    ``,
    `> 时间: ${new Date().toISOString()} | 冷门画像: ${coldPersonas.length}`,
    ``,
    `## 结果`,
    ``,
    `- 能进入推荐/可选: ${canReach.length}/${coldPersonas.length} (${(canReach.length / coldPersonas.length * 100).toFixed(1)}%)`,
    `- 被阻挡: ${cannotReach.length}/${coldPersonas.length}`,
    ``,
    `## 能进入的冷门专业`,
    ``,
    `| 专业类 | 权重 | hiOnly | 得分 | 层级 |`,
    `|--------|:----:|:------:|:----:|:----:|`,
  ];

  canReach.sort((a, b) => b.score - a.score).forEach((r) => {
    md.push(`| ${r.name} | ${r.weight} | ${r.hiOnly ? '是' : ''} | ${r.score} | ${r.inRecommended ? '推荐' : '可选'} |`);
  });

  md.push(``, `## 被阻挡的冷门专业`, ``);
  cannotReach.forEach((r) => {
    md.push(`- **${r.name}** (weight=${r.weight}, hiOnly=${r.hiOnly}) — 得分: ${r.score}`);
  });

  fs.writeFileSync(path.join(dir, 'niche.md'), md.join('\n'));
  fs.writeFileSync(path.join(dir, 'results.json'), JSON.stringify(results, null, 2));

  console.log(`✅ 输出目录: ${dir}`);
  console.log(`   - niche.md`);
  console.log(`   - results.json`);
  console.log(`\n📊 冷门可进入: ${canReach.length}/${coldPersonas.length}`);
}

// ═══════════════════════════════════════════════
// 主入口
// ═══════════════════════════════════════════════

function main() {
  const opts = parseArgs();

  switch (opts.mode) {
    case 'single':
      runSingle(opts);
      break;
    case 'batch':
      runBatch(opts);
      break;
    case 'audit':
      runAudit(opts);
      break;
    case 'niche':
      runNiche(opts);
      break;
    default:
      console.log(`❌ 未知模式: ${opts.mode}`);
      console.log(`   可用模式: single, batch, audit, niche`);
      process.exit(1);
  }
}

main();
