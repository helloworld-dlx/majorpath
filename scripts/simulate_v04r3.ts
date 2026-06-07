/**
 * v0.4r3 模拟器 — spec 对齐版
 * 公式: bucket*0.45 + dim*0.40 + weight*0.10 + risk*0.05
 */
import * as fs from 'fs';
import { questionBank } from '../src/data/questionBank';
import { computeBucketScores, normalizeScores } from '../src/utils/adaptiveQuestioning';
import type { BucketScore, UserResponses } from '../src/utils/adaptiveQuestioning';

const weightsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const fieldsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_fields.json', 'utf8'));
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');

const catBuckets: Record<string, string[]> = {};
const bRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\]/g;
let bm;
while ((bm = bRegex.exec(reportJS.match(/var GATE_PRIORITY_CATEGORIES = \{([\s\S]*?)\};/)![1])) !== null) {
  catBuckets[bm[1]] = bm[2].match(/'([a-z0-9_]+)'/g)!.map(b => b.replace(/'/g, ''));
}

const gates = ['01','02','03','04','05','06','07','08','09','10','12','13','14'];
const catToGate: Record<string, string> = {};
gates.forEach(g => {
  const gRegex = new RegExp("'" + g + "':\\s*\\[([\\s\\S]*?)\\]" + "(?=\\s*\\})", 'g');
  let gm;
  while ((gm = gRegex.exec(reportJS)) !== null) {
    const slugs = gm[1].match(/categorySlug:\s*'([a-z0-9-]+)'/g) || [];
    slugs.forEach(s => { catToGate[s.match(/'([a-z0-9-]+)'/)![1]] = g; });
  }
});

const nameMapMatch = reportJS.match(/var CAT_NAME_MAP = \{([\s\S]*?)\n  \};/)!;
const catNameMap: Record<string, string> = {};
const np = nameMapMatch[1].match(/'(?:[a-z0-9-]+)':\s*'(?:[^']+)'/g) || [];
np.forEach(p => { const m = p.match(/'([a-z0-9-]+)':\s*'([^']+)'/); if (m) catNameMap[m[1]] = m[2]; });

const B2D: Record<string, { gateCode: string; weight: number }[]> = {
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

const RISK_PENALTIES: Record<string, { slugs: string[]; penalty: number }> = {
  trend_chasing: { slugs: ['computer-science','electronic-information','finance','business-administration','e-commerce','psychology'], penalty: 15 },
  salary_misconception: { slugs: ['computer-science','finance','business-administration','international-trade'], penalty: 10 },
  info_bubble: { slugs: [], penalty: 0 },
  long_cycle: { slugs: ['clinical-medicine','stomatology','law-class','pharmacy'], penalty: 20 },
  reading_writing_aversion: { slugs: ['law-class','chinese-literature','journalism','history-class','sociology','public-administration'], penalty: 25 },
  rule_detail_aversion: { slugs: ['law-class','finance','public-administration','clinical-medicine','management-science'], penalty: 20 },
  hands_on_aversion: { slugs: ['mechanical','electrical','electronic-information','civil-engineering','plant-production'], penalty: 20 },
  name_misconception: { slugs: ['business-administration','public-administration','e-commerce','management-science','psychology'], penalty: 10 },
  surface_interest: { slugs: ['psychology','journalism','clinical-medicine','stomatology','law-class'], penalty: 8 },
  arts_science_mismatch: { slugs: ['computer-science','electronic-information','automation','electrical'], penalty: 30 },
};

const DIM_MATCH: Record<string, string[]> = {
  'computer-science': ['math_logic','info_systems'], 'electronic-information': ['math_logic','engineering_practice'],
  'mechanical': ['engineering_practice','math_logic'], 'electrical': ['math_logic','engineering_practice'],
  'clinical-medicine': ['life_health_interest','rule_detail'], 'law-class': ['reading_expression','rule_detail'],
  'finance': ['business_sense','math_logic'], 'chinese-literature': ['reading_expression','abstract_theory'],
};

const VP = [
  { id: 'stem_nerd', dim: { math_logic: 90, engineering_practice: 80, info_systems: 70, reading_expression: 30, interpersonal: 20, business_sense: 10, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 60, stable_path: 30, rule_detail: 40 }, buckets: { stem: 85, humanities: 10, social_science: 15, business: 20, life_health: 15, art_creative: 5 } },
  { id: 'humanities_lover', dim: { reading_expression: 90, abstract_theory: 80, interpersonal: 50, math_logic: 15, engineering_practice: 5, info_systems: 10, business_sense: 10, life_health_interest: 20, aesthetic_creation: 60, stable_path: 30, rule_detail: 30 }, buckets: { humanities: 90, social_science: 50, business: 15, stem: 10, life_health: 20, art_creative: 40 } },
  { id: 'social_care', dim: { interpersonal: 90, reading_expression: 60, rule_detail: 50, math_logic: 20, engineering_practice: 5, info_systems: 20, business_sense: 30, life_health_interest: 60, aesthetic_creation: 10, abstract_theory: 30, stable_path: 60 }, buckets: { social_science: 85, life_health: 50, humanities: 30, business: 25, stem: 10, art_creative: 5 } },
  { id: 'business_minded', dim: { business_sense: 90, math_logic: 50, interpersonal: 60, reading_expression: 40, engineering_practice: 10, info_systems: 40, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 20, stable_path: 40, rule_detail: 50 }, buckets: { business: 90, social_science: 40, stem: 25, humanities: 10, life_health: 5, art_creative: 5 } },
  { id: 'life_science', dim: { life_health_interest: 90, rule_detail: 60, math_logic: 40, reading_expression: 40, interpersonal: 50, business_sense: 5, engineering_practice: 15, info_systems: 20, aesthetic_creation: 10, abstract_theory: 30, stable_path: 50 }, buckets: { life_health: 90, stem: 30, social_science: 30, business: 5, humanities: 10, art_creative: 5 } },
  { id: 'artist', dim: { aesthetic_creation: 95, reading_expression: 50, abstract_theory: 40, math_logic: 10, engineering_practice: 20, info_systems: 15, interpersonal: 30, business_sense: 5, life_health_interest: 10, stable_path: 15, rule_detail: 10 }, buckets: { art_creative: 95, humanities: 30, social_science: 10, stem: 15, business: 5, life_health: 5 } },
  { id: 'balanced', dim: { math_logic: 50, reading_expression: 50, interpersonal: 50, business_sense: 50, engineering_practice: 40, info_systems: 40, life_health_interest: 40, aesthetic_creation: 40, abstract_theory: 40, stable_path: 40, rule_detail: 40 }, buckets: { stem: 40, humanities: 40, social_science: 40, business: 40, life_health: 40, art_creative: 40 } },
  { id: 'low_math_creative', dim: { math_logic: 10, reading_expression: 70, abstract_theory: 60, engineering_practice: 5, info_systems: 10, interpersonal: 40, business_sense: 10, life_health_interest: 30, aesthetic_creation: 80, stable_path: 20, rule_detail: 20 }, buckets: { humanities: 60, art_creative: 70, social_science: 30, stem: 5, business: 10, life_health: 20 } },
  { id: 'engineering_hands', dim: { engineering_practice: 95, math_logic: 60, info_systems: 30, reading_expression: 20, interpersonal: 20, business_sense: 15, life_health_interest: 10, aesthetic_creation: 25, abstract_theory: 30, stable_path: 40, rule_detail: 30 }, buckets: { stem: 90, business: 10, art_creative: 20, humanities: 5, social_science: 10, life_health: 10 } },
  { id: 'med_aspirant', dim: { life_health_interest: 95, rule_detail: 70, math_logic: 55, reading_expression: 45, interpersonal: 60, business_sense: 5, engineering_practice: 10, info_systems: 15, aesthetic_creation: 10, abstract_theory: 20, stable_path: 60 }, buckets: { life_health: 95, stem: 30, social_science: 25, business: 5, humanities: 10, art_creative: 5 } },
  { id: 'tech_creative', dim: { info_systems: 80, aesthetic_creation: 70, engineering_practice: 50, math_logic: 50, reading_expression: 30, interpersonal: 20, business_sense: 20, life_health_interest: 10, abstract_theory: 40, stable_path: 25, rule_detail: 30 }, buckets: { stem: 60, art_creative: 60, business: 20, humanities: 10, social_science: 10, life_health: 5 } },
  { id: 'rule_lover', dim: { rule_detail: 95, math_logic: 40, reading_expression: 40, interpersonal: 30, business_sense: 40, engineering_practice: 5, info_systems: 20, life_health_interest: 20, aesthetic_creation: 5, abstract_theory: 15, stable_path: 80 }, buckets: { business: 50, social_science: 60, stem: 15, humanities: 10, life_health: 20, art_creative: 5 } },
  { id: 'popular_chaser', dim: { math_logic: 50, reading_expression: 30, interpersonal: 30, business_sense: 50, engineering_practice: 30, info_systems: 50, life_health_interest: 20, aesthetic_creation: 10, abstract_theory: 20, stable_path: 30, rule_detail: 30 }, buckets: { stem: 60, business: 60, social_science: 20, humanities: 5, life_health: 10, art_creative: 5 } },
  { id: 'stable_learner', dim: { stable_path: 95, math_logic: 30, reading_expression: 50, interpersonal: 40, business_sense: 20, engineering_practice: 10, info_systems: 20, life_health_interest: 40, aesthetic_creation: 10, abstract_theory: 20, rule_detail: 60 }, buckets: { social_science: 50, business: 40, life_health: 40, stem: 15, humanities: 20, art_creative: 5 } },
  { id: 'lit_stem', dim: { math_logic: 85, info_systems: 90, engineering_practice: 20, reading_expression: 20, interpersonal: 15, business_sense: 10, life_health_interest: 10, aesthetic_creation: 10, abstract_theory: 50, stable_path: 20, rule_detail: 30 }, buckets: { stem: 95, business: 15, humanities: 5, social_science: 5, life_health: 5, art_creative: 5 } },
  // === v0.4r4 新增 15 画像 ===
  { id: 'pure_business', dim: { business_sense: 95, math_logic: 40, interpersonal: 50, reading_expression: 35, engineering_practice: 5, info_systems: 30, life_health_interest: 5, aesthetic_creation: 5, abstract_theory: 15, stable_path: 45, rule_detail: 40 }, buckets: { business: 95, social_science: 25, stem: 10, humanities: 5, life_health: 5, art_creative: 5 } },
  { id: 'nurse_care', dim: { life_health_interest: 80, interpersonal: 85, rule_detail: 60, stable_path: 70, math_logic: 20, reading_expression: 40, engineering_practice: 5, info_systems: 15, business_sense: 5, aesthetic_creation: 10, abstract_theory: 15 }, buckets: { life_health: 85, social_science: 40, humanities: 15, stem: 10, business: 5, art_creative: 5 } },
  { id: 'pharma_sci', dim: { life_health_interest: 80, math_logic: 60, rule_detail: 70, reading_expression: 35, interpersonal: 15, business_sense: 5, engineering_practice: 25, info_systems: 25, aesthetic_creation: 5, abstract_theory: 35, stable_path: 40 }, buckets: { life_health: 75, stem: 50, humanities: 5, social_science: 10, business: 5, art_creative: 5 } },
  { id: 'tcm_lover', dim: { life_health_interest: 85, reading_expression: 55, abstract_theory: 50, rule_detail: 45, interpersonal: 35, math_logic: 20, business_sense: 5, engineering_practice: 5, info_systems: 10, aesthetic_creation: 15, stable_path: 50 }, buckets: { life_health: 85, humanities: 30, social_science: 20, stem: 15, business: 5, art_creative: 5 } },
  { id: 'gov_aspirant', dim: { stable_path: 95, rule_detail: 85, reading_expression: 60, interpersonal: 45, math_logic: 25, business_sense: 20, engineering_practice: 5, info_systems: 15, life_health_interest: 10, aesthetic_creation: 5, abstract_theory: 20 }, buckets: { social_science: 80, business: 35, humanities: 20, stem: 5, life_health: 10, art_creative: 5 } },
  { id: 'earth_lover', dim: { abstract_theory: 55, math_logic: 45, reading_expression: 35, engineering_practice: 40, info_systems: 30, interpersonal: 20, business_sense: 5, life_health_interest: 30, aesthetic_creation: 20, stable_path: 40, rule_detail: 35 }, buckets: { stem: 70, life_health: 35, humanities: 15, social_science: 10, business: 5, art_creative: 5 } },
  { id: 'psych_curious', dim: { reading_expression: 70, interpersonal: 65, abstract_theory: 60, math_logic: 40, rule_detail: 50, life_health_interest: 55, engineering_practice: 5, info_systems: 20, business_sense: 10, aesthetic_creation: 15, stable_path: 35 }, buckets: { social_science: 55, life_health: 50, humanities: 35, stem: 20, business: 10, art_creative: 10 } },
  { id: 'math_pure', dim: { math_logic: 98, abstract_theory: 90, info_systems: 50, reading_expression: 25, interpersonal: 10, business_sense: 5, engineering_practice: 15, life_health_interest: 5, aesthetic_creation: 5, stable_path: 25, rule_detail: 30 }, buckets: { stem: 90, humanities: 10, social_science: 5, business: 10, life_health: 5, art_creative: 5 } },
  { id: 'foodie', dim: { life_health_interest: 55, engineering_practice: 50, rule_detail: 45, math_logic: 30, reading_expression: 25, interpersonal: 25, business_sense: 20, info_systems: 20, aesthetic_creation: 15, abstract_theory: 15, stable_path: 40 }, buckets: { life_health: 55, stem: 45, business: 20, humanities: 5, social_science: 10, art_creative: 5 } },
  { id: 'logistics_pro', dim: { business_sense: 65, math_logic: 55, rule_detail: 60, engineering_practice: 40, info_systems: 45, interpersonal: 30, reading_expression: 25, life_health_interest: 5, aesthetic_creation: 5, abstract_theory: 15, stable_path: 50 }, buckets: { business: 65, stem: 45, social_science: 15, humanities: 5, life_health: 5, art_creative: 5 } },
  { id: 'polyglot', dim: { reading_expression: 90, interpersonal: 60, abstract_theory: 35, math_logic: 15, engineering_practice: 5, info_systems: 10, business_sense: 15, life_health_interest: 10, aesthetic_creation: 25, stable_path: 30, rule_detail: 25 }, buckets: { humanities: 85, social_science: 30, business: 15, stem: 5, life_health: 5, art_creative: 10 } },
  { id: 'arch_builder', dim: { engineering_practice: 75, aesthetic_creation: 70, math_logic: 55, abstract_theory: 45, info_systems: 30, reading_expression: 25, interpersonal: 20, business_sense: 15, life_health_interest: 5, stable_path: 30, rule_detail: 35 }, buckets: { stem: 65, art_creative: 55, humanities: 10, social_science: 10, business: 10, life_health: 5 } },
  { id: 'military_bent', dim: { engineering_practice: 70, math_logic: 60, rule_detail: 65, stable_path: 75, info_systems: 40, reading_expression: 20, interpersonal: 15, business_sense: 5, life_health_interest: 10, aesthetic_creation: 5, abstract_theory: 25 }, buckets: { stem: 80, social_science: 20, humanities: 5, business: 5, life_health: 10, art_creative: 5 } },
  { id: 'data_geek', dim: { info_systems: 95, math_logic: 85, business_sense: 40, reading_expression: 20, interpersonal: 10, engineering_practice: 25, life_health_interest: 5, aesthetic_creation: 5, abstract_theory: 45, stable_path: 25, rule_detail: 35 }, buckets: { stem: 80, business: 35, humanities: 5, social_science: 5, life_health: 5, art_creative: 5 } },
  { id: 'nature_bio', dim: { life_health_interest: 90, abstract_theory: 55, reading_expression: 40, math_logic: 35, engineering_practice: 25, info_systems: 15, interpersonal: 20, business_sense: 5, aesthetic_creation: 15, stable_path: 35, rule_detail: 30 }, buckets: { life_health: 85, stem: 35, humanities: 10, social_science: 10, business: 5, art_creative: 5 } },
];

// v0.4r3 formula: bucket*0.45 + dim*0.40 + weight*0.10 + risk*0.05
function scoreCategories(bs: BucketScore, dimScores: Record<string, number>, topGates: string[]) {
  const gateSet = new Set(topGates);
  const results: any[] = [];

  Object.entries(weightsRaw as Record<string, number>).forEach(([slug, weight]) => {
    const gate = catToGate[slug];
    if (!gate || !gateSet.has(gate)) return;
    const buckets = catBuckets[slug] || ['stem'];
    const f = (fieldsRaw as any)[slug] || {};

    let bScore = 0, bCount = 0;
    buckets.forEach((b: string) => { bScore += (bs as any)[b] || 0; bCount++; });
    const bucketMatch = bCount > 0 ? bScore / bCount : 0;

    // dimScore: max relevant dimension
    const matchDims = DIM_MATCH[slug];
    let dimAvg = 25;
    if (matchDims && matchDims.length > 0) dimAvg = matchDims.reduce((s: number, d: string) => s + (dimScores[d] ?? 25), 0) / matchDims.length;
    const dimScore = Math.min(100, Math.max(0, dimAvg * 1.6));

    // weight score on 0-100
    const weightScore = (weight / 22) * 100;

    // risk adjustment (0-100, higher = more risky = negative)
    let riskAdj = 0;
    if (f.blindChoiceRisk === 'high') riskAdj += 15;
    if (f.longCyclePressure === 'high') riskAdj += 10;
    if (f.requiresSpecialCondition) riskAdj += 5;
    if (f.recommendedOnlyIfHighInterest && bucketMatch < 70) riskAdj += 20;
    const riskScore = Math.max(0, 100 - riskAdj);

    // spec-aligned formula
    let score = bucketMatch * 0.45 + dimScore * 0.40 + weightScore * 0.10 + riskScore * 0.05;

    // Hard gates
    if (f.recommendedOnlyIfHighInterest && bucketMatch < 60) score *= 0.6;
    if (f.requiresSpecialCondition) score *= 0.85;

    score = Math.round(Math.max(0, Math.min(100, score)));

    results.push({
      name: catNameMap[slug] || slug, gate: (GATE_META[gate] || {}).name || gate,
      gateSlug: (GATE_META[gate] || {}).slug || '', slug, code: gate, score, weight,
      resourceDependency: f.resourceDependency, blindChoiceRisk: f.blindChoiceRisk,
      requiresSpecialCondition: f.requiresSpecialCondition,
      longCyclePressure: f.longCyclePressure, schoolTierSensitive: f.schoolTierSensitive,
      commonMisunderstandingRisk: f.commonMisunderstandingRisk,
    });
  });

  results.sort((a, b) => b.score - a.score);
  const rec: any[] = [], opt: any[] = [], cau: any[] = [];
  results.forEach(cat => {
    if (cat.score >= 55) rec.push(cat);
    else if (cat.score >= 35) opt.push(cat);
    // Cautious: not in rec/opt but has significant risk flags
    const hasSigRisk = cat.blindChoiceRisk === 'high' || cat.longCyclePressure === 'high' ||
      cat.requiresSpecialCondition || cat.schoolTierSensitive || cat.commonMisunderstandingRisk === 'high';
    if (!rec.includes(cat) && !opt.includes(cat) && hasSigRisk) {
      cat.cautions = [];
      if (cat.blindChoiceRisk === 'high') cat.cautions.push('⚠️ 该专业容易被名称或热度误导，建议先了解真实学习内容');
      if (cat.longCyclePressure === 'high') cat.cautions.push('⚠️ 学习周期较长，需做好长期投入准备');
      if (cat.schoolTierSensitive) cat.cautions.push('⚠️ 对院校平台和资源依赖较高，建议查看目标院校培养方案');
      if (cat.commonMisunderstandingRisk === 'high') cat.cautions.push('⚠️ 高中生容易误解该专业，建议先看详情页');
      if (cat.requiresSpecialCondition) cat.cautions.push('⚠️ 需要特殊招生条件（艺考/体测/政审等）');
      cau.push(cat);
    }
  });

  return { recommended: rec.slice(0, 5), optional: opt.slice(0, 4), cautious: cau.slice(0, 4) };
}

function scoreGates(bs: BucketScore) {
  const gs = new Map<string, number>();
  Object.entries(B2D).forEach(([b, discs]) => {
    const s = (bs as any)[b] || 0;
    discs.forEach(d => {
      const c = s * d.weight / 100;
      const ex = gs.get(d.gateCode) || 0;
      gs.set(d.gateCode, Math.max(ex, c) + (ex > 0 ? c * 0.3 : 0));
    });
  });
  return Array.from(gs.entries()).filter(([, s]) => s >= 15).sort((a, b) => b[1] - a[1]).map(([c]) => c);
}

const args = process.argv.slice(2);
const runs = parseInt(args[args.indexOf('--runs') + 1]) || 100;
const seed = parseInt(args[args.indexOf('--seed') + 1]) || 2026;
console.log(`🧪 v0.4r3 模拟器  runs=${runs}  seed=${seed}  formula: bucket*0.45+dim*0.40+weight*0.10+risk*0.05`);

const recCounts: Record<string, number> = {};
const allRecs: string[] = [];
const allResults: any[] = [];

for (let i = 0; i < runs; i++) {
  const pr = VP[i % VP.length];
  const responses: UserResponses = {};
  const riskTags: string[] = [];
  const gqs = questionBank.questions.filter(q => q.type === 'general');
  gqs.forEach((q, j) => { if (j < 8 && q.options?.length) responses[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id; });
  const topB = Object.entries(pr.buckets).sort(([, a], [, b]) => b - a)[0][0];
  const bqs = questionBank.questions.filter(q => q.type === 'branch' && q.id.startsWith('br_' + topB.substring(0, 3)));
  bqs.forEach(q => { if (q.options?.length) responses[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id; });
  if (pr.id === 'popular_chaser') { riskTags.push('trend_chasing', 'salary_misconception'); }
  const raw = computeBucketScores(questionBank, responses);
  const bucketScores = normalizeScores(raw);
  const dimScores: Record<string, number> = {};
  ['math_logic','reading_expression','interpersonal','business_sense','engineering_practice','info_systems','life_health_interest','aesthetic_creation','abstract_theory','stable_path','rule_detail'].forEach(k => { dimScores[k] = (pr.dim as any)[k] || 25; });
  const topGates = scoreGates(bucketScores);
  const cats = scoreCategories(bucketScores, dimScores, topGates);
  cats.recommended.forEach((c: any) => { recCounts[c.name] = (recCounts[c.name] || 0) + 1; allRecs.push(c.name); });
  allResults.push({ profile: pr.id, recommended: cats.recommended.map((c: any) => c.name), optional: cats.optional.map((c: any) => c.name), cautious: cats.cautious.map((c: any) => c.name + (c.cautions?.length ? ' [risk:'+c.cautions.length+']' : '')) });
}

const sorted = Object.entries(recCounts).sort(([, a], [, b]) => (b as number) - (a as number));
const uniqueRecs = new Set(allRecs);
const totalCats = Object.keys(weightsRaw).length;
const coverage = ((uniqueRecs.size / totalCats) * 100).toFixed(1);

let s = `# v0.4r3 模拟报告 (spec 对齐版)\n\n> 时间: ${new Date().toISOString()} | runs=${runs}\n> 公式: bucket*0.45 + dim*0.40 + weight*0.10 + risk*0.05\n\n## 覆盖率: ${uniqueRecs.size}/${totalCats} (${coverage}%)\n\n## 推荐 Top30\n\n| # | 专业类 | 次数 | % |\n|---|--------|:--:|:--:|\n`;
sorted.slice(0, 30).forEach(([n, c], i) => s += `| ${i+1} | ${n} | ${c} | ${((c as number)/runs*100).toFixed(0)}% |\n`);

s += `\n## 关键检查\n\n`;
const checks: [string, string, number][] = [
  ['计算机类', '热门垄断', 60], ['金融学类', '热门垄断', 60], ['法学类', '热门垄断', 60],
  ['临床医学类', '热门垄断', 60], ['哲学类', '极端权重', 40], ['历史学类', '极端权重', 40],
  ['交叉学科类', '极端权重', 20], ['艺术学理论类', '偏高检查', 20],
  ['电气类', 'STEM偏差', 70],
];
checks.forEach(([name, reason, threshold]) => {
  const c = recCounts[name] || 0;
  const pct = ((c / runs) * 100).toFixed(0);
  const flag = c > threshold ? '⚠️偏高' : c === 0 ? '❌未出现' : '✅';
  s += `- ${name}: ${c}次(${pct}%) ${flag}  [${reason}]\n`;
});

s += `\n## 冷门可见性\n`;
['矿业类','草学类','兵器类','纺织类','天文学类','民族学类','力学类','测绘类','安全科学与工程类','地质类','海洋工程类','图书情报与档案管理类','农业经济管理类','基础医学类','法医学类'].forEach(n => {
  s += `- ${n}: ${recCounts[n] ? '✅ '+recCounts[n]+'次' : '❌未出现'}\n`;
});

s += `\n## 低数学保护\n`;
const lm = allResults.filter(r => r.profile === 'low_math_creative');
if (lm.length > 0) {
  const stemR = lm[0].recommended.filter((r: string) => ['计算机类','电子信息类','自动化类','电气类','机械类','航空航天类'].includes(r));
  s += `- low_math_creative → STEM推荐: ${stemR.length}个\n`;
}

s += `\n## cautious 示例（前5用户）\n`;
allResults.slice(0, 5).forEach(r => {
  s += `- **${r.profile}**: ${r.cautious.join(' / ') || '无'}\n`;
});

fs.writeFileSync('simulation-results/summary_v04r3.md', s);
console.log(s);
console.log('\n✅ simulation-results/summary_v04r3.md');
