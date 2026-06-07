/**
 * v0.4 模拟器 —— 加载新权重 + 新评分公式跑验证
 * 用法: npx tsx scripts/simulate_v04.ts --runs 100 --seed 2026
 */
import * as fs from 'fs';
import * as path from 'path';
import { questionBank } from '../src/data/questionBank';
import type { DirectionBucket, Dimension } from '../src/types/test';
import {
  computeBucketScores, normalizeScores, determineUserType,
  checkHumanitiesProtection, collectRiskTags,
} from '../src/utils/adaptiveQuestioning';
import type { BucketScore, UserResponses } from '../src/utils/adaptiveQuestioning';

// ─── 加载 v0.4 权重 ───
const weightsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));

// Reconstruct GATE_PRIORITY_CATEGORIES from report.js structure + v04 weights
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');
const gateMatch = reportJS.match(/var GATE_PRIORITY_CATEGORIES = \{([\s\S]*?)\};/)!;
const gateStr = gateMatch[1];

// Extract old buckets
const catBuckets: Record<string, string[]> = {};
const bRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\]/g;
let bm;
while ((bm = bRegex.exec(gateStr)) !== null) {
  catBuckets[bm[1]] = bm[2].match(/'([a-z0-9_]+)'/g)!.map(b => b.replace(/'/g, ''));
}

// GATES
const gates = ['01','02','03','04','05','06','07','08','09','10','12','13','14'];
const catToGate: Record<string, string> = {};
gates.forEach(g => {
  const escaped = g.replace(/'/g, "'");
  const gRegex = new RegExp("'" + escaped + "':\\s*\\[([\\s\\S]*?)\\]" + "(?=\\s*\\})", 'g');
  let gm;
  while ((gm = gRegex.exec(reportJS)) !== null) {
    const slugs = gm[1].match(/categorySlug:\s*'([a-z0-9-]+)'/g) || [];
    slugs.forEach(s => { catToGate[s.match(/'([a-z0-9-]+)'/)![1]] = g; });
  }
});

// NEW FIELDS (same logic)
function getFields(slug: string) {
  const highRes = ['computer-science', 'electronic-information', 'aerospace', 'biomedical-eng','clinical-medicine', 'stomatology', 'nuclear', 'ordnance', 'architecture','ocean-engineering', 'mining', 'geological-eng', 'geology', 'geophysics', 'astronomy','atmospheric-science', 'ocean-science', 'interdisciplinary-class', 'pharmacy'];
  const medRes = ['mechanical', 'electrical', 'automation', 'instrumentation', 'energy-power','chemical-pharma', 'materials', 'food-science', 'bioengineering', 'environmental','civil-engineering', 'water-resources', 'transportation', 'surveying', 'safety-eng','agricultural-eng', 'light-industry', 'textile', 'forestry-eng', 'forestry','veterinary', 'plant-production', 'animal-production', 'aquaculture', 'grassland-science','public-health', 'medical-technology', 'basic-medicine', 'tcm', 'integrated-medicine','chinese-pharmacy', 'forensic-medicine', 'nursing', 'fine-arts', 'music-dance', 'drama-film','design', 'physics', 'chemistry', 'biology', 'statistics', 'mathematics', 'geography','mechanics', 'psychology', 'tourism-management'];
  const rd = highRes.includes(slug) ? 'high' : medRes.includes(slug) ? 'medium' : 'low';
  const highBlind = ['computer-science', 'electronic-information', 'finance', 'business-administration','psychology', 'clinical-medicine', 'journalism', 'e-commerce', 'public-administration','management-science', 'international-trade', 'law-class', 'stomatology'];
  const medBlind = ['automation', 'mechanical', 'electrical', 'energy-power', 'architecture','design', 'tcm', 'nursing', 'environmental', 'bioengineering', 'food-science','political-science', 'sociology', 'economics-class', 'statistics', 'pharmacy','civil-engineering', 'materials', 'chinese-literature'];
  const br = highBlind.includes(slug) ? 'high' : medBlind.includes(slug) ? 'medium' : 'low';
  const special = ['physical-education', 'fine-arts', 'music-dance', 'drama-film', 'design','public-security', 'public-security-tech', 'ordnance', 'nuclear'];
  const onlyHI = ['philosophy-class', 'history-class', 'astronomy', 'geology','geophysics', 'ocean-science', 'atmospheric-science', 'mining', 'textile', 'ordnance','nuclear', 'agricultural-eng', 'forestry-eng', 'light-industry', 'grassland-science','aquaculture', 'forestry', 'ethnology', 'art-theory', 'mechanics','library-science', 'agri-economics', 'ocean-engineering', 'geological-eng','surveying', 'safety-eng', 'basic-medicine', 'forensic-medicine', 'marxism'];
  const highLCP = ['clinical-medicine', 'stomatology', 'tcm', 'integrated-medicine','basic-medicine', 'law-class', 'pharmacy', 'chinese-pharmacy'];
  const medLCP = ['psychology', 'architecture', 'forensic-medicine', 'veterinary','nursing', 'medical-technology', 'education'];
  const schoolSens = ['computer-science', 'electronic-information', 'aerospace', 'biomedical-eng','architecture', 'clinical-medicine', 'stomatology', 'law-class', 'finance','journalism', 'business-administration', 'interdisciplinary-class','nuclear', 'ordnance', 'psychology'];
  const highMis = ['business-administration', 'public-administration', 'e-commerce','computer-science', 'electronic-information', 'psychology', 'journalism','environmental', 'bioengineering', 'mechanical', 'automation', 'finance'];
  const medMis = ['economics-class', 'management-science', 'tourism-management','design', 'architecture', 'clinical-medicine', 'nursing', 'pharmacy','statistics', 'electrical', 'energy-power', 'food-science', 'sociology', 'tcm'];
  return {
    resourceDependency: rd, blindChoiceRisk: br,
    requiresSpecialCondition: special.includes(slug),
    recommendedOnlyIfHighInterest: onlyHI.includes(slug),
    longCyclePressure: highLCP.includes(slug) ? 'high' : medLCP.includes(slug) ? 'medium' : 'low',
    schoolTierSensitive: schoolSens.includes(slug),
    commonMisunderstandingRisk: highMis.includes(slug) ? 'high' : medMis.includes(slug) ? 'medium' : 'low',
  };
}

// CAT_NAME_MAP from report.js
const nameMapMatch = reportJS.match(/var CAT_NAME_MAP = \{([\s\S]*?)\n  \};/)!;
const catNameMap: Record<string, string> = {};
const np = nameMapMatch[1].match(/'(?:[a-z0-9-]+)':\s*'(?:[^']+)'/g) || [];
np.forEach(p => { const m = p.match(/'([a-z0-9-]+)':\s*'([^']+)'/); if (m) catNameMap[m[1]] = m[2]; });

// BUCKET_TO_DISCIPLINES
const BUCKET_TO_DISCIPLINES: Record<string, { gateCode: string; weight: number }[]> = {
  humanities: [{ gateCode: '05', weight: 40 }, { gateCode: '01', weight: 30 }, { gateCode: '06', weight: 30 }],
  social_science: [{ gateCode: '03', weight: 50 }, { gateCode: '04', weight: 30 }, { gateCode: '12', weight: 20 }],
  business: [{ gateCode: '02', weight: 45 }, { gateCode: '12', weight: 55 }],
  stem: [{ gateCode: '08', weight: 60 }, { gateCode: '07', weight: 40 }],
  life_health: [{ gateCode: '10', weight: 60 }, { gateCode: '09', weight: 25 }, { gateCode: '07', weight: 15 }],
  art_creative: [{ gateCode: '13', weight: 100 }],
};

const GATE_META: Record<string, { name: string; slug: string }> = {
  '01': { name: '哲学', slug: 'philosophy' }, '02': { name: '经济学', slug: 'economics' },
  '03': { name: '法学', slug: 'law' }, '04': { name: '教育学', slug: 'pedagogy' },
  '05': { name: '文学', slug: 'literature' }, '06': { name: '历史学', slug: 'history' },
  '07': { name: '理学', slug: 'science' }, '08': { name: '工学', slug: 'engineering' },
  '09': { name: '农学', slug: 'agronomy' }, '10': { name: '医学', slug: 'medicine' },
  '12': { name: '管理学', slug: 'management' }, '13': { name: '艺术学', slug: 'art' },
  '14': { name: '交叉学科', slug: 'interdisciplinary' },
};

// RISK (same as before)
const RISK_PENALTIES: Record<string, { slugs: string[]; penalty: number }> = {
  trend_chasing: { slugs: ['computer-science', 'electronic-information', 'finance', 'business-administration'], penalty: 15 },
  salary_misconception: { slugs: ['computer-science', 'finance', 'business-administration'], penalty: 10 },
  info_bubble: { slugs: [], penalty: 0 },
  long_cycle: { slugs: ['clinical-medicine', 'stomatology', 'law-class'], penalty: 20 },
  reading_writing_aversion: { slugs: ['law-class', 'chinese-literature', 'journalism', 'history-class', 'sociology'], penalty: 25 },
  rule_detail_aversion: { slugs: ['law-class', 'finance', 'public-administration', 'clinical-medicine'], penalty: 20 },
  hands_on_aversion: { slugs: ['mechanical', 'electrical', 'electronic-information', 'civil-engineering', 'plant-production'], penalty: 20 },
  name_misconception: { slugs: ['business-administration', 'public-administration'], penalty: 10 },
  surface_interest: { slugs: [], penalty: 0 },
  arts_science_mismatch: { slugs: ['computer-science', 'electronic-information', 'automation', 'electrical'], penalty: 30 },
};

// DIM_MATCH (simplified)
const DIM_MATCH: Record<string, string[]> = {
  'computer-science': ['math_logic', 'info_systems'],
  'electronic-information': ['math_logic', 'engineering_practice'],
  'mechanical': ['engineering_practice', 'math_logic'],
  'electrical': ['math_logic', 'engineering_practice'],
  'clinical-medicine': ['life_health_interest', 'rule_detail'],
  'law-class': ['reading_expression', 'rule_detail'],
  'finance': ['business_sense', 'math_logic'],
  'chinese-literature': ['reading_expression', 'abstract_theory'],
};

// ─── VIRTUAL PROFILES ───
const VIRTUAL_PROFILES = [
  { id: 'stem_nerd', dimBiases: { math_logic: 90, engineering_practice: 80, info_systems: 70, reading_expression: 30, interpersonal: 20, business_sense: 10, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 60, stable_path: 30, rule_detail: 40 }, bucketBiases: { stem: 85, humanities: 10, social_science: 15, business: 20, life_health: 15, art_creative: 5 } },
  { id: 'humanities_lover', dimBiases: { reading_expression: 90, abstract_theory: 80, interpersonal: 50, math_logic: 15, engineering_practice: 5, info_systems: 10, business_sense: 10, life_health_interest: 20, aesthetic_creation: 60, stable_path: 30, rule_detail: 30 }, bucketBiases: { humanities: 90, social_science: 50, business: 15, stem: 10, life_health: 20, art_creative: 40 } },
  { id: 'social_care', dimBiases: { interpersonal: 90, reading_expression: 60, rule_detail: 50, math_logic: 20, engineering_practice: 5, info_systems: 20, business_sense: 30, life_health_interest: 60, aesthetic_creation: 10, abstract_theory: 30, stable_path: 60 }, bucketBiases: { social_science: 85, life_health: 50, humanities: 30, business: 25, stem: 10, art_creative: 5 } },
  { id: 'business_minded', dimBiases: { business_sense: 90, math_logic: 50, interpersonal: 60, reading_expression: 40, engineering_practice: 10, info_systems: 40, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 20, stable_path: 40, rule_detail: 50 }, bucketBiases: { business: 90, social_science: 40, stem: 25, humanities: 10, life_health: 5, art_creative: 5 } },
  { id: 'life_science', dimBiases: { life_health_interest: 90, rule_detail: 60, math_logic: 40, reading_expression: 40, interpersonal: 50, business_sense: 5, engineering_practice: 15, info_systems: 20, aesthetic_creation: 10, abstract_theory: 30, stable_path: 50 }, bucketBiases: { life_health: 90, stem: 30, social_science: 30, business: 5, humanities: 10, art_creative: 5 } },
  { id: 'artist', dimBiases: { aesthetic_creation: 95, reading_expression: 50, abstract_theory: 40, math_logic: 10, engineering_practice: 20, info_systems: 15, interpersonal: 30, business_sense: 5, life_health_interest: 10, stable_path: 15, rule_detail: 10 }, bucketBiases: { art_creative: 95, humanities: 30, social_science: 10, stem: 15, business: 5, life_health: 5 } },
  { id: 'balanced', dimBiases: { math_logic: 50, reading_expression: 50, interpersonal: 50, business_sense: 50, engineering_practice: 40, info_systems: 40, life_health_interest: 40, aesthetic_creation: 40, abstract_theory: 40, stable_path: 40, rule_detail: 40 }, bucketBiases: { stem: 40, humanities: 40, social_science: 40, business: 40, life_health: 40, art_creative: 40 } },
  { id: 'low_math_creative', dimBiases: { math_logic: 10, reading_expression: 70, abstract_theory: 60, engineering_practice: 5, info_systems: 10, interpersonal: 40, business_sense: 10, life_health_interest: 30, aesthetic_creation: 80, stable_path: 20, rule_detail: 20 }, bucketBiases: { humanities: 60, art_creative: 70, social_science: 30, stem: 5, business: 10, life_health: 20 } },
  { id: 'engineering_hands', dimBiases: { engineering_practice: 95, math_logic: 60, info_systems: 30, reading_expression: 20, interpersonal: 20, business_sense: 15, life_health_interest: 10, aesthetic_creation: 25, abstract_theory: 30, stable_path: 40, rule_detail: 30 }, bucketBiases: { stem: 90, business: 10, art_creative: 20, humanities: 5, social_science: 10, life_health: 10 } },
  { id: 'med_aspirant', dimBiases: { life_health_interest: 95, rule_detail: 70, math_logic: 55, reading_expression: 45, interpersonal: 60, business_sense: 5, engineering_practice: 10, info_systems: 15, aesthetic_creation: 10, abstract_theory: 20, stable_path: 60 }, bucketBiases: { life_health: 95, stem: 30, social_science: 25, business: 5, humanities: 10, art_creative: 5 } },
  { id: 'tech_creative', dimBiases: { info_systems: 80, aesthetic_creation: 70, engineering_practice: 50, math_logic: 50, reading_expression: 30, interpersonal: 20, business_sense: 20, life_health_interest: 10, abstract_theory: 40, stable_path: 25, rule_detail: 30 }, bucketBiases: { stem: 60, art_creative: 60, business: 20, humanities: 10, social_science: 10, life_health: 5 } },
  { id: 'rule_lover', dimBiases: { rule_detail: 95, math_logic: 40, reading_expression: 40, interpersonal: 30, business_sense: 40, engineering_practice: 5, info_systems: 20, life_health_interest: 20, aesthetic_creation: 5, abstract_theory: 15, stable_path: 80 }, bucketBiases: { business: 50, social_science: 60, stem: 15, humanities: 10, life_health: 20, art_creative: 5 } },
  { id: 'popular_chaser', dimBiases: { math_logic: 50, reading_expression: 30, interpersonal: 30, business_sense: 50, engineering_practice: 30, info_systems: 50, life_health_interest: 20, aesthetic_creation: 10, abstract_theory: 20, stable_path: 30, rule_detail: 30 }, bucketBiases: { stem: 60, business: 60, social_science: 20, humanities: 5, life_health: 10, art_creative: 5 } },
  { id: 'stable_learner', dimBiases: { stable_path: 95, math_logic: 30, reading_expression: 50, interpersonal: 40, business_sense: 20, engineering_practice: 10, info_systems: 20, life_health_interest: 40, aesthetic_creation: 10, abstract_theory: 20, rule_detail: 60 }, bucketBiases: { social_science: 50, business: 40, life_health: 40, stem: 15, humanities: 20, art_creative: 5 } },
  { id: 'lit_stem', dimBiases: { math_logic: 85, info_systems: 90, engineering_practice: 20, reading_expression: 20, interpersonal: 15, business_sense: 10, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 50, stable_path: 20, rule_detail: 30 }, bucketBiases: { stem: 95, business: 15, humanities: 5, social_science: 5, life_health: 5, art_creative: 5 } },
];

// ─── Scoring (v0.4 formula) ───
function scoreCategories(bucketScores: BucketScore, dimScores: Record<string, number>, topGates: string[]) {
  const gateSet = new Set(topGates);
  const results: any[] = [];

  Object.entries(weightsRaw).forEach(([slug, weight]) => {
    const gate = catToGate[slug];
    if (!gate || !gateSet.has(gate)) return;

    const buckets = catBuckets[slug] || ['stem'];
    const fields = getFields(slug);

    // v0.4: bucket match (55%) + weight bonus (15%) + dim bonus (30%)
    let bucketScore = 0, bucketCount = 0;
    buckets.forEach(b => {
      bucketScore += bucketScores[b as keyof BucketScore] || 0;
      bucketCount++;
    });
    const baseScore = bucketCount > 0 ? bucketScore / bucketCount : 0;

    // Weight bonus: normalized to 0-22 scale, mapped to 0-10 contribution
    const weightBonus = (weight / 22) * 10;

    // Dimension bonus: max relevant dimension score
    let dimBonus = 0;
    const matchDims = DIM_MATCH[slug];
    if (matchDims && matchDims.length > 0) {
      dimBonus = matchDims.reduce((s, d) => s + (dimScores[d] ?? 25), 0) / matchDims.length;
    } else {
      dimBonus = 25; // neutral
    }
    const dimNorm = Math.min(100, Math.max(0, dimBonus * 1.5));

    // v0.4 formula: baseScore * 0.55 + weightBonus * 0.15 + dimNorm * 0.30
    let score = baseScore * 0.55 + weightBonus * 0.15 * 10 + dimNorm * 0.30;

    // Non-weight field adjustments
    if (fields.recommendedOnlyIfHighInterest && baseScore < 70) score *= 0.7;
    if (fields.requiresSpecialCondition) score *= 0.85;
    if (fields.blindChoiceRisk === 'high') score *= 0.9;

    score = Math.round(Math.max(0, Math.min(100, score)));

    results.push({
      name: catNameMap[slug] || slug,
      gate: (GATE_META[gate] || {}).name || gate,
      gateSlug: (GATE_META[gate] || {}).slug || '',
      slug,
      code: gate,
      score,
      weight: weight as number,
      ...fields,
    });
  });

  // Sort and tier
  results.sort((a, b) => b.score - a.score);
  const recommended: any[] = [], optional: any[] = [], cautious: any[] = [];

  results.forEach(cat => {
    if (cat.score >= 55) recommended.push(cat);
    else if (cat.score >= 35) optional.push(cat);
    // Cautious: high blind risk or long cycle pressure
    if (cat.blindChoiceRisk === 'high' || cat.longCyclePressure === 'high') {
      cat.cautions = cat.cautions || [];
      if (cat.blindChoiceRisk === 'high') cat.cautions.push('热门/名字可能造成盲选，建议深入了解');
      if (cat.longCyclePressure === 'high') cat.cautions.push('学习周期长，需做好长期投入准备');
      if (cat.schoolTierSensitive) cat.cautions.push('对院校平台资源依赖较高');
      if (!recommended.includes(cat) && !optional.includes(cat)) cautious.push(cat);
    }
  });

  return { recommended: recommended.slice(0, 5), optional: optional.slice(0, 4), cautious: cautious.slice(0, 4) };
}

// ─── Gate scoring ───
function scoreGates(bucketScores: BucketScore) {
  const gateScores = new Map<string, number>();
  Object.entries(BUCKET_TO_DISCIPLINES).forEach(([bucket, discs]) => {
    const bs = bucketScores[bucket as keyof BucketScore] || 0;
    discs.forEach(d => {
      const contrib = (bs * d.weight) / 100;
      const existing = gateScores.get(d.gateCode) || 0;
      gateScores.set(d.gateCode, Math.max(existing, contrib) + (existing > 0 ? contrib * 0.3 : 0));
    });
  });
  return Array.from(gateScores.entries())
    .filter(([, s]) => s >= 15)
    .sort((a, b) => b[1] - a[1])
    .map(([code]) => code);
}

// ─── Simulate one user ───
function simulateUser(profile: any) {
  // Generate pseudo-responses based on profile biases
  const responses: UserResponses = {};
  const riskTags: string[] = [];

  // Simple: use dim biases to answer general questions
  const generalQs = questionBank.questions.filter(q => q.type === 'general');
  generalQs.forEach((q, i) => {
    if (i < 8) { // answer first 8
      // Pick option that best matches dim biases
      if (q.options && q.options.length > 0) {
        const idx = Math.floor(Math.random() * q.options.length);
        responses[q.id] = q.options[idx].id;
      }
    }
  });

  // Branch questions based on top bucket
  const topB = Object.entries(profile.bucketBiases as Record<string, number>)
    .sort(([, a], [, b]) => b - a)[0][0];
  const branchQs = questionBank.questions.filter(q => q.type === 'branch' && q.id.startsWith('br_' + topB.substring(0, 3)));
  branchQs.forEach(q => {
    if (q.options && q.options.length > 0) {
      responses[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    }
  });

  // Risk: for popular_chaser profile
  if (profile.id === 'popular_chaser') {
    riskTags.push('trend_chasing');
    riskTags.push('salary_misconception');
  }

  return { responses, riskTags };
}

// ─── Main ───
const args = process.argv.slice(2);
const runs = parseInt(args[args.indexOf('--runs') + 1]) || 100;
const seed = parseInt(args[args.indexOf('--seed') + 1]) || 2026;

console.log(`🧪 v0.4 权重模拟器\n   runs=${runs}  seed=${seed}`);

const allResults: any[] = [];
const recCounts: Record<string, number> = {};
const allRecs: string[] = [];

for (let i = 0; i < runs; i++) {
  const profile = VIRTUAL_PROFILES[i % VIRTUAL_PROFILES.length];
  const user = simulateUser(profile);

  // Compute bucket scores
  const raw = computeBucketScores(questionBank, user.responses);
  const bucketScores = normalizeScores(raw);
  const dimScores: Record<string, number> = {};
  // Simple dim computation
  dimScores.math_logic = profile.dimBiases.math_logic || 25;
  dimScores.reading_expression = profile.dimBiases.reading_expression || 25;
  dimScores.interpersonal = profile.dimBiases.interpersonal || 25;
  dimScores.business_sense = profile.dimBiases.business_sense || 25;
  dimScores.engineering_practice = profile.dimBiases.engineering_practice || 25;
  dimScores.info_systems = profile.dimBiases.info_systems || 25;
  dimScores.life_health_interest = profile.dimBiases.life_health_interest || 25;
  dimScores.aesthetic_creation = profile.dimBiases.aesthetic_creation || 25;
  dimScores.abstract_theory = profile.dimBiases.abstract_theory || 25;
  dimScores.stable_path = profile.dimBiases.stable_path || 25;
  dimScores.rule_detail = profile.dimBiases.rule_detail || 25;

  const topGates = scoreGates(bucketScores);
  const cats = scoreCategories(bucketScores, dimScores, topGates);

  cats.recommended.forEach(c => {
    recCounts[c.name] = (recCounts[c.name] || 0) + 1;
    allRecs.push(c.name);
  });

  allResults.push({ profile: profile.id, topBuckets: Object.entries(profile.bucketBiases).sort(([,a],[,b]) => b-a).slice(0,2).map(([k]) => k), recommended: cats.recommended.map(c => c.name), optional: cats.optional.map(c => c.name), cautious: cats.cautious.map(c => c.name) });
}

// Sort recCounts
const sorted = Object.entries(recCounts).sort(([, a], [, b]) => b - a);

// Stats
const uniqueRecs = new Set(allRecs);
const totalCats = Object.keys(weightsRaw).length;
const coverage = ((uniqueRecs.size / totalCats) * 100).toFixed(1);

let summary = `# v0.4 权重模拟报告\n\n> 时间：${new Date().toISOString()} | 次数：${runs} | 种子：${seed}\n\n`;
summary += `## 覆盖率\n\n`;
summary += `- 推荐覆盖：${uniqueRecs.size}/${totalCats}（${coverage}%）\n`;
summary += `- 旧版覆盖率：29/93（31%）\n\n`;
summary += `## 推荐次数排名（Top 30）\n\n`;
summary += `| 排名 | 专业类 | 次数 | 占比 |\n|:----:|--------|:----:|:----:|\n`;
sorted.slice(0, 30).forEach(([name, count], i) => {
  summary += `| ${i + 1} | ${name} | ${count} | ${((count / runs) * 100).toFixed(0)}% |\n`;
});

summary += `\n## 高频推荐检查\n\n`;
const hotChecks = ['计算机类', '金融学类', '法学类', '临床医学类', '哲学类', '历史学类', '交叉学科类'];
hotChecks.forEach(name => {
  const count = recCounts[name] || 0;
  const pct = ((count / runs) * 100).toFixed(0);
  const flag = count > runs * 0.6 ? '⚠️ 偏高' : count === 0 ? '❌ 未出现' : '✅';
  summary += `- ${name}: ${count}次(${pct}%) ${flag}\n`;
});

summary += `\n## 冷门类检查\n\n`;
const coldChecks = ['矿业类', '草学类', '兵器类', '纺织类', '天文学类', '民族学类', '艺术学理论类'];
coldChecks.forEach(name => {
  const count = recCounts[name] || 0;
  const flag = count > 0 ? `✅ 出现 ${count}次` : '❌ 未出现';
  summary += `- ${name}: ${flag}\n`;
});

summary += `\n## 画像一致性检查\n\n`;
// Low math should NOT get STEM-heavy
const lowMathResults = allResults.filter(r => r.profile === 'low_math_creative');
if (lowMathResults.length > 0) {
  const stemRecs = lowMathResults[0].recommended.filter((r: string) => ['计算机类', '电子信息类', '自动化类', '电气类', '机械类', '航空航天类'].includes(r));
  summary += `- low_math_creative: 推荐了 ${stemRecs.length} 个 STEM 类 (${stemRecs.join(', ') || '无'})\n`;
}

// Popular chaser should have blind choice warnings
const popResults = allResults.filter(r => r.profile === 'popular_chaser');
if (popResults.length > 0) {
  summary += `- popular_chaser cautious: ${popResults[0].cautious.length} 个\n`;
}

fs.writeFileSync('simulation-results/summary_v04.md', summary);
console.log(summary);
console.log('\n✅ simulation-results/summary_v04.md');
fs.writeFileSync('simulation-results/results_v04.json', JSON.stringify({ runs, seed, coverage, recCounts: sorted, results: allResults.slice(0, 20) }, null, 2));
