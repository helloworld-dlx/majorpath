/**
 * 生成 v0.4 版本的 recommendationWeights.ts
 * 新权重 + 新字段
 */
const fs = require('fs');

const v04 = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const oldContent = fs.readFileSync('src/data/recommendationWeights.ts', 'utf8');

// Extract old GATE_PRIORITY_CATEGORIES to get existing bucket mappings
const gateMatch = oldContent.match(/export const GATE_PRIORITY_CATEGORIES: Record<[\s\S]*?> = \{([\s\S]*?)\n\};/);
if (!gateMatch) { console.log('FAIL: cannot find GATE_PRIORITY_CATEGORIES'); process.exit(1); }

// Build slug → {buckets, gate} map from old content
const slugInfo = {};
const catRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\],\s*weight:\s*(\d+)/g;
let m;
while ((m = catRegex.exec(gateMatch[0])) !== null) {
  const buckets = m[2].match(/'([a-z0-9_]+)'/g).map(b => b.replace(/'/g, ''));
  slugInfo[m[1]] = { buckets };
}

// Group by gate
const gates = ['01','02','03','04','05','06','07','08','09','10','12','13','14'];
const catToGate = {};
// Parse old content to get gate assignment
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');
gates.forEach(g => {
  const escaped = g.replace(/'/g, "'");
  const gRegex = new RegExp("'" + escaped + "':\\s*\\[([\\s\\S]*?)\\]" + "(?=\\s*\\})", 'g');
  let gm;
  while ((gm = gRegex.exec(reportJS)) !== null) {
    const slugs = gm[1].match(/categorySlug:\s*'([a-z0-9-]+)'/g) || [];
    slugs.forEach(s => {
      const slug = s.match(/'([a-z0-9-]+)'/)[1];
      catToGate[slug] = g;
    });
  }
});

// New fields helper
function getFields(slug) {
  const highRes = ['computer-science', 'electronic-information', 'aerospace', 'biomedical-eng',
    'clinical-medicine', 'stomatology', 'nuclear', 'ordnance', 'architecture',
    'ocean-engineering', 'mining', 'geological-eng', 'geology', 'geophysics', 'astronomy',
    'atmospheric-science', 'ocean-science', 'interdisciplinary-class', 'pharmacy'];
  const medRes = ['mechanical', 'electrical', 'automation', 'instrumentation', 'energy-power',
    'chemical-pharma', 'materials', 'food-science', 'bioengineering', 'environmental',
    'civil-engineering', 'water-resources', 'transportation', 'surveying', 'safety-eng',
    'agricultural-eng', 'light-industry', 'textile', 'forestry-eng', 'forestry',
    'veterinary', 'plant-production', 'animal-production', 'aquaculture', 'grassland-science',
    'public-health', 'medical-technology', 'basic-medicine', 'tcm', 'integrated-medicine',
    'chinese-pharmacy', 'forensic-medicine', 'nursing', 'fine-arts', 'music-dance', 'drama-film',
    'design', 'physics', 'chemistry', 'biology', 'statistics', 'mathematics', 'geography',
    'mechanics', 'psychology', 'tourism-management'];

  const highBlind = ['computer-science', 'electronic-information', 'finance', 'business-administration',
    'psychology', 'clinical-medicine', 'journalism', 'e-commerce', 'public-administration',
    'management-science', 'international-trade', 'law-class', 'stomatology'];
  const medBlind = ['automation', 'mechanical', 'electrical', 'energy-power', 'architecture',
    'design', 'tcm', 'nursing', 'environmental', 'bioengineering', 'food-science',
    'political-science', 'sociology', 'economics-class', 'statistics', 'pharmacy',
    'civil-engineering', 'materials', 'chinese-literature'];

  const special = ['physical-education', 'fine-arts', 'music-dance', 'drama-film', 'design',
    'public-security', 'public-security-tech', 'ordnance', 'nuclear'];

  const onlyHI = ['philosophy-class', 'history-class', 'astronomy', 'geology',
    'geophysics', 'ocean-science', 'atmospheric-science', 'mining', 'textile', 'ordnance',
    'nuclear', 'agricultural-eng', 'forestry-eng', 'light-industry', 'grassland-science',
    'aquaculture', 'forestry', 'ethnology', 'art-theory', 'mechanics',
    'library-science', 'agri-economics', 'ocean-engineering', 'geological-eng',
    'surveying', 'safety-eng', 'basic-medicine', 'forensic-medicine', 'marxism'];

  const highLCP = ['clinical-medicine', 'stomatology', 'tcm', 'integrated-medicine',
    'basic-medicine', 'law-class', 'pharmacy', 'chinese-pharmacy'];
  const medLCP = ['psychology', 'architecture', 'forensic-medicine', 'veterinary',
    'nursing', 'medical-technology', 'education'];

  const schoolSens = ['computer-science', 'electronic-information', 'aerospace', 'biomedical-eng',
    'architecture', 'clinical-medicine', 'stomatology', 'law-class', 'finance',
    'journalism', 'business-administration', 'interdisciplinary-class',
    'nuclear', 'ordnance', 'psychology'];

  const highMis = ['business-administration', 'public-administration', 'e-commerce',
    'computer-science', 'electronic-information', 'psychology', 'journalism',
    'environmental', 'bioengineering', 'mechanical', 'automation', 'finance'];
  const medMis = ['economics-class', 'management-science', 'tourism-management',
    'design', 'architecture', 'clinical-medicine', 'nursing', 'pharmacy',
    'statistics', 'electrical', 'energy-power', 'food-science', 'sociology', 'tcm'];

  return {
    resourceDependency: highRes.includes(slug) ? 'high' : medRes.includes(slug) ? 'medium' : 'low',
    blindChoiceRisk: highBlind.includes(slug) ? 'high' : medBlind.includes(slug) ? 'medium' : 'low',
    requiresSpecialCondition: special.includes(slug),
    recommendedOnlyIfHighInterest: onlyHI.includes(slug),
    longCyclePressure: highLCP.includes(slug) ? 'high' : medLCP.includes(slug) ? 'medium' : 'low',
    schoolTierSensitive: schoolSens.includes(slug),
    commonMisunderstandingRisk: highMis.includes(slug) ? 'high' : medMis.includes(slug) ? 'medium' : 'low',
  };
}

// Generate new GATE_PRIORITY_CATEGORIES
let newContent = `/**
 * 推荐权重配置 v0.4
 *
 * 管理方向桶↔学科门类↔专业类的映射关系和权重。
 * 与评分引擎 decoupled，调参只改此文件。
 *
 * v0.4 变更：
 * - 权重范围从 0-100 压缩至 3-22
 * - 新增 7 个非权重字段（resourceDependency, blindChoiceRisk 等）
 * - 消除极端权重（100/60/50 降级）
 *
 * ⚠️ 候选版本，未覆盖正式上线。
 */

import type { DirectionBucket, Dimension, RiskTag } from '../types/test';

/** 扩展的专业类权重条目 */
export interface CategoryWeightEntry {
  categorySlug: string;
  buckets: DirectionBucket[];
  /** 权重 3-22，仅作轻微排序，不主宰推荐 */
  weight: number;
  /** 对院校平台/实验室/行业资源的依赖程度 */
  resourceDependency: 'low' | 'medium' | 'high';
  /** 高中生是否容易因名字/热度/薪资想象而误选 */
  blindChoiceRisk: 'low' | 'medium' | 'high';
  /** 是否需要艺考/体测/政审/体检等特殊招生条件 */
  requiresSpecialCondition: boolean;
  /** 是否仅在用户兴趣维度很高时才推荐 */
  recommendedOnlyIfHighInterest: boolean;
  /** 学习周期/考试周期/培养周期压力 */
  longCyclePressure: 'low' | 'medium' | 'high';
  /** 对学校平台和资源是否特别敏感 */
  schoolTierSensitive: boolean;
  /** 高中生是否容易误解该专业 */
  commonMisunderstandingRisk: 'low' | 'medium' | 'high';
}

// ───── 方向桶 → 学科门类映射（不变） ─────

/** 桶→门类映射（含权重） */
export const BUCKET_TO_DISCIPLINES: Record<
  DirectionBucket,
  { gateCode: string; weight: number }[]
> = {
  humanities: [
    { gateCode: '05', weight: 40 },
    { gateCode: '01', weight: 30 },
    { gateCode: '06', weight: 30 },
  ],
  social_science: [
    { gateCode: '03', weight: 50 },
    { gateCode: '04', weight: 30 },
    { gateCode: '12', weight: 20 },
  ],
  business: [
    { gateCode: '02', weight: 45 },
    { gateCode: '12', weight: 55 },
  ],
  stem: [
    { gateCode: '08', weight: 60 },
    { gateCode: '07', weight: 40 },
  ],
  life_health: [
    { gateCode: '10', weight: 60 },
    { gateCode: '09', weight: 25 },
    { gateCode: '07', weight: 15 },
  ],
  art_creative: [
    { gateCode: '13', weight: 100 },
  ],
};

// ───── 维度 → 桶映射（不变） ─────

export const DIMENSION_TO_BUCKET: Record<Dimension, Partial<Record<DirectionBucket, number>>> = {
  math_logic:              { stem: 30, business: 20 },
  reading_expression:      { humanities: 35, social_science: 25 },
  interpersonal:           { social_science: 30, life_health: 25, business: 15, humanities: 10 },
  business_sense:          { business: 40, stem: 15 },
  engineering_practice:    { stem: 40, art_creative: 10 },
  info_systems:            { stem: 35, business: 15 },
  life_health_interest:    { life_health: 45 },
  aesthetic_creation:      { art_creative: 45, humanities: 10 },
  abstract_theory:         { humanities: 20, stem: 20, social_science: 10 },
  stable_path:             { business: 20, social_science: 15, life_health: 15 },
  rule_detail:             { social_science: 20, business: 20, life_health: 10 },
};

// ───── 学科门类 → 优先专业类 (v0.4 权重) ─────

/** 每个门类内，方向桶加权后的优先专业类及权重（v0.4 压缩版） */
export const GATE_PRIORITY_CATEGORIES: Record<
  string,
  CategoryWeightEntry[]
> = {
`;

// Generate gate entries
gates.forEach(g => {
  const catsInGate = Object.keys(v04).filter(s => catToGate[s] === g);
  if (catsInGate.length === 0) return;
  
  const gateNames = { '01': '哲学', '02': '经济学', '03': '法学', '04': '教育学',
    '05': '文学', '06': '历史学', '07': '理学', '08': '工学', '09': '农学',
    '10': '医学', '12': '管理学', '13': '艺术学', '14': '交叉学科' };
  newContent += `  '${g}': [ // ${gateNames[g]}\n`;
  
  catsInGate.forEach(s => {
    const info = slugInfo[s] || { buckets: ['stem'] };
    const f = getFields(s);
    const w = v04[s];
    newContent += `    { categorySlug: '${s}', buckets: [${info.buckets.map(b => `'${b}'`).join(', ')}], weight: ${w}, resourceDependency: '${f.resourceDependency}', blindChoiceRisk: '${f.blindChoiceRisk}', requiresSpecialCondition: ${f.requiresSpecialCondition}, recommendedOnlyIfHighInterest: ${f.recommendedOnlyIfHighInterest}, longCyclePressure: '${f.longCyclePressure}', schoolTierSensitive: ${f.schoolTierSensitive}, commonMisunderstandingRisk: '${f.commonMisunderstandingRisk}' },\n`;
  });
  
  newContent += `  ],\n`;
});

// Copy the rest of the old content (RISK_CATEGORY_PENALTIES, PROFILE_TEMPLATES, etc.)
const restStart = oldContent.indexOf('export const RISK_CATEGORY_PENALTIES');
if (restStart > 0) {
  newContent += '\n' + oldContent.substring(restStart);
}

fs.writeFileSync('src/data/recommendationWeights_v04.ts', newContent);
console.log('Written src/data/recommendationWeights_v04.ts');
console.log('Categories with weights:', Object.keys(v04).filter(s => catToGate[s]).length);
