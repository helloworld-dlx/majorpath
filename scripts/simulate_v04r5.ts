/**
 * v0.4r5 模拟器 — 加载 majorPersonaLibrary.ts 的 193 画像
 */
import * as fs from 'fs';
import { questionBank } from '../src/data/questionBank';
import { computeBucketScores, normalizeScores } from '../src/utils/adaptiveQuestioning';
import { majorPersonaLibrary } from '../src/data/majorPersonaLibrary';
import type { BucketScore, UserResponses } from '../src/utils/adaptiveQuestioning';

const weightsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const fieldsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_fields.json', 'utf8'));
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');

// Extract buckets
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

const DIM_MATCH: Record<string, string[]> = {
  'computer-science': ['math_logic','info_systems'], 'electronic-information': ['math_logic','engineering_practice'],
  'mechanical': ['engineering_practice','math_logic'], 'electrical': ['math_logic','engineering_practice'],
  'clinical-medicine': ['life_health_interest','rule_detail'], 'law-class': ['reading_expression','rule_detail'],
  'finance': ['business_sense','math_logic'], 'chinese-literature': ['reading_expression','abstract_theory'],
};

function dimFromHints(h: any): Record<string, number> {
  const d: Record<string, number> = {};
  d.math_logic = (h.likesMath === 'high' ? 85 : h.likesMath === 'medium' ? 55 : 20) + (h.likesPhysics === 'high' ? 10 : 0);
  d.reading_expression = (h.likesWriting === 'high' ? 85 : h.likesWriting === 'medium' ? 55 : 20);
  d.interpersonal = (h.likesCommunication === 'high' ? 85 : h.likesCommunication === 'medium' ? 55 : 20);
  d.business_sense = h.valuesIncome === 'high' ? 70 : 25;
  d.engineering_practice = (h.likesHandsOn === 'high' ? 85 : h.likesHandsOn === 'medium' ? 55 : 20) + (h.likesExperiment === 'high' ? 10 : 0);
  d.info_systems = (h.likesProgramming === 'high' ? 85 : h.likesProgramming === 'medium' ? 55 : 20);
  d.life_health_interest = (h.likesBiology === 'high' ? 85 : h.likesBiology === 'medium' ? 55 : 20);
  d.aesthetic_creation = 25;
  d.abstract_theory = (h.likesMemorization === 'high' ? 30 : 25);
  d.stable_path = h.valuesStability === 'high' ? 85 : 40;
  d.rule_detail = 25;
  Object.keys(d).forEach(k => { d[k] = Math.min(100, Math.max(5, d[k])); });
  return d;
}

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
    const matchDims = DIM_MATCH[slug];
    let dimAvg = 25;
    if (matchDims?.length) dimAvg = matchDims.reduce((s: number, d: string) => s + (dimScores[d] ?? 25), 0) / matchDims.length;
    const dimScore = Math.min(100, Math.max(0, dimAvg * 1.6));
    const weightScore = (weight / 22) * 100;
    let riskAdj = 0;
    if (f.blindChoiceRisk === 'high') riskAdj += 15;
    if (f.longCyclePressure === 'high') riskAdj += 10;
    if (f.requiresSpecialCondition) riskAdj += 5;
    if (f.recommendedOnlyIfHighInterest && bucketMatch < 70) riskAdj += 20;
    const riskScore = Math.max(0, 100 - riskAdj);
    let score = bucketMatch * 0.45 + dimScore * 0.40 + weightScore * 0.10 + riskScore * 0.05;
    if (f.recommendedOnlyIfHighInterest && bucketMatch < 60) score *= 0.6;
    if (f.requiresSpecialCondition) score *= 0.85;
    score = Math.round(Math.max(0, Math.min(100, score)));
    results.push({ name: catNameMap[slug] || slug, gate: (GATE_META[gate] || {}).name, slug, score, ...f });
  });
  results.sort((a, b) => b.score - a.score);
  const rec: any[] = [], opt: any[] = [], cau: any[] = [];
  results.forEach(cat => {
    if (cat.score >= 55) rec.push(cat);
    else if (cat.score >= 35) opt.push(cat);
    const hasSigRisk = cat.blindChoiceRisk === 'high' || cat.longCyclePressure === 'high' || cat.requiresSpecialCondition || cat.schoolTierSensitive || cat.commonMisunderstandingRisk === 'high';
    if (!rec.includes(cat) && !opt.includes(cat) && hasSigRisk) {
      cat.cautions = [];
      if (cat.blindChoiceRisk === 'high') cat.cautions.push('盲选风险');
      if (cat.longCyclePressure === 'high') cat.cautions.push('长周期');
      if (cat.schoolTierSensitive) cat.cautions.push('院校依赖');
      if (cat.commonMisunderstandingRisk === 'high') cat.cautions.push('易误解');
      cau.push(cat);
    }
  });
  return { recommended: rec.slice(0, 5), optional: opt.slice(0, 4), cautious: cau.slice(0, 4) };
}

function scoreGates(bs: BucketScore) {
  const gs = new Map<string, number>();
  Object.entries(B2D).forEach(([b, discs]) => {
    const s = (bs as any)[b] || 0;
    discs.forEach(d => { const c = s * d.weight / 100; const ex = gs.get(d.gateCode) || 0; gs.set(d.gateCode, Math.max(ex, c) + (ex > 0 ? c * 0.3 : 0)); });
  });
  return Array.from(gs.entries()).filter(([, s]) => s >= 12).sort((a, b) => b[1] - a[1]).map(([c]) => c);
}

// Sample personas with samplingWeight
function samplePersonas(count: number, seed: number): any[] {
  // Use all personas evenly, not weighted by samplingWeight
  const rng = ((s: number) => { let v = s; return () => { v = (v * 1103515245 + 12345) & 0x7fffffff; return v / 0x7fffffff; }; })(seed);
  const result: any[] = [];
  for (let i = 0; i < count; i++) {
    result.push(majorPersonaLibrary[Math.floor(rng() * majorPersonaLibrary.length)]);
  }
  return result;
}

const args = process.argv.slice(2);
const runs = parseInt(args[args.indexOf('--runs') + 1]) || 200;
const seed = parseInt(args[args.indexOf('--seed') + 1]) || 606;
console.log(`🧪 v0.4r5 模拟器  runs=${runs}  seed=${seed}  personas=193  formula=spec-aligned`);

const personas = samplePersonas(runs, seed);
const recCounts: Record<string, number> = {};
const allRecs: string[] = [];
const allResults: any[] = [];

for (let i = 0; i < runs; i++) {
  const persona = personas[i];
  const riskTags: string[] = [];
  if ((persona.commonMisunderstandings || []).length > 0 && Math.random() < 0.5) riskTags.push('name_misconception');
  // Use persona's sixBucketAffinity directly as bucket scores
  const aff = persona.sixBucketAffinity || {};
  const bucketScores: any = { ...aff };
  ['stem','life_health','business','social_science','humanities','art_creative'].forEach(b => { if (bucketScores[b] === undefined) bucketScores[b] = 10; });
  const dimScores = dimFromHints(persona.answerStyleHints || {});
  const topGates = scoreGates(bucketScores as BucketScore);
  const cats = scoreCategories(bucketScores as BucketScore, dimScores, topGates);
  cats.recommended.forEach((c: any) => { recCounts[c.name] = (recCounts[c.name] || 0) + 1; allRecs.push(c.name); });
  allResults.push({ persona: persona.id, category: persona.categoryName, recommended: cats.recommended.map((c: any) => c.name), optional: cats.optional.map((c: any) => c.name), cautious: cats.cautious.map((c: any) => c.name) });
  if (i % 50 === 49) process.stdout.write('.');
}

const sorted = Object.entries(recCounts).sort(([, a], [, b]) => (b as number) - (a as number));
const uniqueRecs = new Set(allRecs);
const totalCats = Object.keys(weightsRaw).length;
const coverage = ((uniqueRecs.size / totalCats) * 100).toFixed(1);

let s = `# v0.4r5 模拟报告 (193 persona library)\n\n> 时间: ${new Date().toISOString()} | runs=${runs} | seed=${seed}\n> 画像库: majorPersonaLibrary.ts (193 personas × 93 categories)\n\n## 覆盖率: ${uniqueRecs.size}/${totalCats} (${coverage}%)\n\n## 推荐 Top30\n\n| # | 专业类 | 次数 | % |\n|---|--------|:--:|:--:|\n`;
sorted.slice(0, 30).forEach(([n, c], i) => s += `| ${i+1} | ${n} | ${c} | ${((c as number)/runs*100).toFixed(0)}% |\n`);

s += `\n## 关键检查\n`;
const checks = [['计算机类',60],['金融学类',60],['法学类',60],['临床医学类',60],['哲学类',40],['历史学类',40],['交叉学科类',20],['艺术学理论类',20]];
checks.forEach(([name,th]) => { const c = recCounts[name as string] || 0; s += `- ${name}: ${c}次(${((c/runs)*100).toFixed(0)}%) ${c > (th as number) ? '⚠️' : c===0?'❌':'✅'}\n`; });

s += `\n## 冷门类可见性\n`;
['矿业类','草学类','兵器类','纺织类','天文学类','民族学类','力学类','测绘类','安全科学与工程类','地质类','海洋工程类','图书情报与档案管理类','农业经济管理类','基础医学类','法医学类','核工程类','公安技术类','水产类','林业工程类','轻工类','地球物理学类','大气科学类','海洋科学类'].forEach(n => { s += `- ${n}: ${recCounts[n] ? '✅ '+recCounts[n]+'次' : '❌'}\n`; });

s += `\n## 快速统计\n- 推荐覆盖: ${uniqueRecs.size} 类\n- 完全未出现: ${totalCats - uniqueRecs.size} 类\n- Top 1: ${sorted[0]?.[0] || 'N/A'} (${sorted[0]?.[1] || 0}次)\n`;

fs.writeFileSync('simulation-results/summary_v04r5.md', s);
console.log('\n' + s);
console.log('✅ simulation-results/summary_v04r5.md');
