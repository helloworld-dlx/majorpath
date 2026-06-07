/**
 * v0.5 模拟器 — 3 模式: realistic | coverage-audit | niche-probe
 * 用法:
 *   npx tsx scripts/simulate_v05.ts --runs 500 --seed 606 --mode realistic
 *   npx tsx scripts/simulate_v05.ts --mode coverage-audit
 *   npx tsx scripts/simulate_v05.ts --mode niche-probe
 */
import * as fs from 'fs';
import { majorPersonaLibrary } from '../src/data/majorPersonaLibrary';
import { CATEGORY_DIM_PROFILES } from '../src/data/categoryDimProfiles';
import { computeNicheExplorationScore, evaluateNicheExploration, selectNicheExplorations } from '../src/lib/nicheExploration';
import { classifyFailure, generateDiagnosticsSummary } from '../src/lib/recommendationDiagnostics';
import type { CategoryFailureDiagnostic } from '../src/lib/recommendationDiagnostics';
import type { NicheExplorationInput } from '../src/lib/nicheExploration';

const weightsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const fieldsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_fields.json', 'utf8'));
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');

const catBuckets: Record<string, string[]> = {};
const gmr = reportJS.match(/var GATE_PRIORITY_CATEGORIES = \{([\s\S]*?)\};/)!;
const bRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\]/g;
let bm;
while ((bm = bRegex.exec(gmr[1])) !== null) catBuckets[bm[1]] = bm[2].match(/'([a-z0-9_]+)'/g)!.map(b => b.replace(/'/g, ''));

const gates = ['01','02','03','04','05','06','07','08','09','10','12','13','14'];
const catToGate: Record<string, string> = {};
gates.forEach(g => {
  const gr = new RegExp("'" + g + "':\\s*\\[([\\s\\S]*?)\\]" + "(?=\\s*\\})", 'g');
  let gm;
  while ((gm = gr.exec(reportJS)) !== null) {
    (gm[1].match(/categorySlug:\s*'([a-z0-9-]+)'/g) || []).forEach(s => { catToGate[s.match(/'([a-z0-9-]+)'/)![1]] = g; });
  }
});

const nmr = reportJS.match(/var CAT_NAME_MAP = \{([\s\S]*?)\n  \};/)!;
const catNameMap: Record<string, string> = {};
(nmr[1].match(/'(?:[a-z0-9-]+)':\s*'(?:[^']+)'/g) || []).forEach(p => { const m = p.match(/'([a-z0-9-]+)':\s*'([^']+)'/); if (m) catNameMap[m[1]] = m[2]; });

const B2D: Record<string, {gateCode:string,weight:number}[]> = {
  humanities:[{gateCode:'05',weight:40},{gateCode:'01',weight:30},{gateCode:'06',weight:30}],
  social_science:[{gateCode:'03',weight:50},{gateCode:'04',weight:30},{gateCode:'12',weight:20},{gateCode:'07',weight:15}],
  business:[{gateCode:'02',weight:45},{gateCode:'12',weight:55}],
  stem:[{gateCode:'08',weight:60},{gateCode:'07',weight:40},{gateCode:'14',weight:40}],
  life_health:[{gateCode:'10',weight:60},{gateCode:'09',weight:25},{gateCode:'07',weight:15},{gateCode:'14',weight:60},{gateCode:'04',weight:15}],
  art_creative:[{gateCode:'13',weight:100}],
};
const GATE_META: Record<string,{name:string,slug:string}> = {
  '01':{name:'哲学',slug:'philosophy'},'02':{name:'经济学',slug:'economics'},'03':{name:'法学',slug:'law'},
  '04':{name:'教育学',slug:'pedagogy'},'05':{name:'文学',slug:'literature'},'06':{name:'历史学',slug:'history'},
  '07':{name:'理学',slug:'science'},'08':{name:'工学',slug:'engineering'},'09':{name:'农学',slug:'agronomy'},
  '10':{name:'医学',slug:'medicine'},'12':{name:'管理学',slug:'management'},'13':{name:'艺术学',slug:'art'},
  '14':{name:'交叉学科',slug:'interdisciplinary'},
};

function dimFromHints(h: any): Record<string,number> {
  if (!h) h = {};
  const d: Record<string,number> = { math_logic:25,reading_expression:25,interpersonal:25,business_sense:25,engineering_practice:25,info_systems:25,life_health_interest:25,aesthetic_creation:25,abstract_theory:25,stable_path:25,rule_detail:25 };
  if (h.likesMath === 'high') d.math_logic = 85; else if (h.likesMath === 'medium') d.math_logic = 55;
  if (h.likesWriting === 'high') d.reading_expression = 85; else if (h.likesWriting === 'medium') d.reading_expression = 55;
  if (h.likesCommunication === 'high') d.interpersonal = 85; else if (h.likesCommunication === 'medium') d.interpersonal = 55;
  if (h.valuesIncome === 'high') d.business_sense = 70;
  if (h.likesHandsOn === 'high') d.engineering_practice = 85; else if (h.likesHandsOn === 'medium') d.engineering_practice = 55;
  if (h.likesProgramming === 'high') d.info_systems = 85; else if (h.likesProgramming === 'medium') d.info_systems = 55;
  if (h.likesBiology === 'high') d.life_health_interest = 85; else if (h.likesBiology === 'medium') d.life_health_interest = 55;
  if (h.valuesStability === 'high') d.stable_path = 85;
  if (h.likesExperiment === 'high') d.engineering_practice = Math.max(d.engineering_practice||25, 70);
  Object.keys(d).forEach(k => d[k] = Math.min(100,Math.max(5,d[k])));
  return d;
}

function scoreGates(bs: Record<string,number>) {
  const gs = new Map<string,number>();
  Object.entries(B2D).forEach(([b, discs]) => { const s = bs[b]||0; discs.forEach(d => { const c = s*d.weight/100; const ex = gs.get(d.gateCode)||0; gs.set(d.gateCode, Math.max(ex,c)+(ex>0?c*0.3:0)); }); });
  return Array.from(gs.entries()).filter(([,s]) => s>=12).sort((a,b)=>b[1]-a[1]).map(([c,s])=>({code:c,score:s}));
}

function scoreCategory(slug:string, weight:number, bs:Record<string,number>, dimScores:Record<string,number>, gateMaxW:number) {
  const buckets = catBuckets[slug] || ['stem'];
  const f = (fieldsRaw as any)[slug] || {};
  const profile = CATEGORY_DIM_PROFILES[slug];
  let bScore=0,bCount=0; buckets.forEach((b:string) => { bScore+=bs[b]||0; bCount++; });
  const bucketMatch = bCount>0?bScore/bCount:0;
  // Dim score from profile
  let dimAvg = 25;
  if (profile?.positiveDims?.length) {
    const matches = profile.positiveDims.filter((d:string) => (dimScores[d]||0) > 40);
    const dimTotal = profile.positiveDims.reduce((s:number,d:string) => s+(dimScores[d]||25), 0);
    dimAvg = Math.max(25, dimTotal / profile.positiveDims.length);
  }
  const dimScore = Math.min(100, Math.max(0, dimAvg * 1.6));
  const weightScore = (weight / 22) * 100;
  let riskAdj = 0; if (f.blindChoiceRisk==='high') riskAdj+=15; if (f.longCyclePressure==='high') riskAdj+=10; if (f.requiresSpecialCondition) riskAdj+=5; if (f.recommendedOnlyIfHighInterest && bucketMatch<70) riskAdj+=20;
  const riskScore = Math.max(0, 100-riskAdj);
  let score = bucketMatch*0.45 + dimScore*0.40 + weightScore*0.10 + riskScore*0.05;
  if (f.recommendedOnlyIfHighInterest && bucketMatch<60) score*=0.6;
  if (f.requiresSpecialCondition) score*=0.85;
  score = Math.round(Math.max(0,Math.min(100,score)));
  // Interest signal score
  let interestSignalScore = 0;
  if (profile?.interestSignals?.length) {
    interestSignalScore = Math.min(100, 40 + profile.interestSignals.length * 10 / 3 * 100 / profile.interestSignals.length);
  } else { interestSignalScore = 25; }
  // Mismatch penalty
  let mismatchPenalty = 0;
  if (profile?.negativeDims?.length) {
    const strongNeg = profile.strongNegativeDims || [];
    const negTotal = profile.negativeDims.reduce((s:number,d:string) => {
      const dv = dimScores[d]||25;
      return s + (strongNeg.includes(d) ? dv * 0.3 : dv * 0.15);
    }, 0);
    mismatchPenalty = Math.min(50, negTotal / profile.negativeDims.length * 0.5);
  }
  return { slug, name: catNameMap[slug]||slug, gate: (GATE_META[catToGate[slug]]||{}).name||'', score, bucketMatch, dimScore, weightScore, interestSignalScore, mismatchPenalty, fields: f, profile };
}

function runSimPersona(persona: any, allSlugs: string[]) {
  const bsInput: Record<string,number> = {};
  const aff = persona.sixBucketAffinity || {};
  ['stem','life_health','business','social_science','humanities','art_creative'].forEach(b => { bsInput[b] = aff[b] !== undefined ? aff[b] : 10; });
  const dimScores = dimFromHints(persona.answerStyleHints || {});
  const gates = scoreGates(bsInput);
  const gateSet = new Set(gates.map(g=>g.code));
  const gateScores: Record<string,number> = {}; gates.forEach(g => gateScores[g.code] = g.score);
  
  const allCats: any[] = []; allSlugs.forEach(slug => {
    const gate = catToGate[slug];
    const w = (weightsRaw as any)[slug] || 4;
    if (!gate) return;
    const gateCats = allSlugs.filter(s => catToGate[s] === gate);
    const gateMaxW = Math.max(...gateCats.map(s => (weightsRaw as any)[s] || 4), 1);
    const cat = scoreCategory(slug, w, bsInput, dimScores, gateMaxW);
    cat.passTopGate = gateSet.has(gate);
    cat.topGateScore = gateScores[gate] || 0;
    allCats.push(cat);
  });
  
  allCats.sort((a,b) => b.score - a.score);
  const recommended = allCats.filter(c => c.score >= 55 && c.passTopGate).slice(0, 5);
  const optional = allCats.filter(c => c.score >= 35 && !recommended.includes(c)).slice(0, 4);
  const cautious = allCats.filter(c => {
    return !recommended.includes(c) && !optional.includes(c) && (c.fields.blindChoiceRisk === 'high' || c.fields.longCyclePressure === 'high' || c.fields.requiresSpecialCondition || c.fields.schoolTierSensitive || c.fields.commonMisunderstandingRisk === 'high');
  }).slice(0, 4);
  
  // Niche exploration
  const nicheInputs: NicheExplorationInput[] = allCats.map(c => ({
    categorySlug: c.slug,
    baseWeight: c.score > 50 ? 10 : (weightsRaw as any)[c.slug] || 4,
    bucketMatchScore: c.bucketMatch,
    dimMatchScore: c.dimScore,
    interestSignalScore: c.interestSignalScore,
    strongMismatchPenalty: c.mismatchPenalty,
    recommendedOnlyIfHighInterest: c.fields.recommendedOnlyIfHighInterest || false,
    requiresSpecialCondition: c.fields.requiresSpecialCondition || false,
    passTopGate: c.passTopGate,
    alreadyInMainRecommended: recommended.some(r => r.slug === c.slug),
    alreadyInCautious: cautious.some(r => r.slug === c.slug),
  }));
  const niche = selectNicheExplorations(nicheInputs, 2);
  
  return { recommended, optional, cautious, niche, allCats, gateScores, dimScores, bsInput };
}

// ====== MODE: realistic ======
function modeRealistic(runs: number, seed: number) {
  const allSlugs = Object.keys(weightsRaw);
  const rng = ((s:number)=>{let v=s;return()=>{v=(v*1103515245+12345)&0x7fffffff;return v/0x7fffffff;}})(seed);
  const personas: any[] = [];
  for (let i = 0; i < runs; i++) personas.push(majorPersonaLibrary[Math.floor(rng() * majorPersonaLibrary.length)]);

  const recCounts: Record<string,number> = {}, nicheCounts: Record<string,number> = {};
  let totalNiche = 0;
  const failures: Record<string,{slug:string,examples:any[]}> = {};

  for (let i = 0; i < runs; i++) {
    const r = runSimPersona(personas[i], allSlugs);
    r.recommended.forEach((c:any) => recCounts[c.name] = (recCounts[c.name]||0)+1);
    r.niche.forEach((c:any) => {
      // niche results here are NicheExplorationResult objects, not cats
      // need a different tracking approach
    });
    if (i % 50 === 49) process.stdout.write('.');
  }

  const sortedRec = Object.entries(recCounts).sort(([,a],[,b])=>b-a);
  const uniqueRec = Object.keys(recCounts).length;
  const totalCats = allSlugs.length;

  let out = `# v0.5 realistic 模式\n\n> runs=${runs} seed=${seed}\n\n## 主推荐覆盖率: ${uniqueRec}/${totalCats} (${(uniqueRec/totalCats*100).toFixed(1)}%)\n\n## 主推荐 Top20\n\n| # | 专业类 | 次数 | % |\n|---|--------|:--:|:--:|\n`;
  sortedRec.slice(0,20).forEach(([n,c],i) => out += `| ${i+1} | ${n} | ${c} | ${((c/runs)*100).toFixed(0)}% |\n`);
  
  out += `\n## 热门检查\n`;
  ['计算机类','金融学类','法学类','临床医学类','哲学类','历史学类'].forEach(n => {
    const c = recCounts[n]||0; out += `- ${n}: ${c}次(${((c/runs)*100).toFixed(0)}%) ${c>runs*0.5?'⚠️':c===0?'❌':'✅'}\n`;
  });
  
  out += `\n## 未出现类 (${totalCats - uniqueRec})\n`;
  allSlugs.filter(s => !recCounts[catNameMap[s]||s]).slice(0,20).forEach(s => out += `- ${catNameMap[s]||s}\n`);
  if (totalCats - uniqueRec > 20) out += `- ... 共 ${totalCats - uniqueRec} 类\n`;

  fs.writeFileSync('simulation-results/summary_v05_realistic.md', out);
  console.log('\n' + out.split('\n').slice(0,8).join('\n'));
  console.log('✅ simulation-results/summary_v05_realistic.md');
}

// ====== MODE: coverage-audit ======
function modeCoverageAudit() {
  const allSlugs = Object.keys(weightsRaw);
  const totalCats = allSlugs.length;
  const diagnostics: CategoryFailureDiagnostic[] = [];
  let mainCovered = 0, nicheCovered = 0, totalCovered = 0;

  const out = [`# v0.5 coverage-audit 模式\n\n> 每个专业类跑其对应的画像\n`];

  for (const slug of allSlugs) {
    const name = catNameMap[slug] || slug;
    // Find matching persona
    const matchingPersonas = majorPersonaLibrary.filter(p => p.categorySlug === slug);
    if (matchingPersonas.length === 0) {
      diagnostics.push({ categorySlug:slug, categoryName:name, reasonType:'needs_review', baseWeight:(weightsRaw as any)[slug]||4, highInterestOnly:(fieldsRaw as any)[slug]?.recommendedOnlyIfHighInterest||false, topGateScore:0, bucketMatchScore:0, dimMatchScore:0, interestSignalScore:0, suggestedAction:'画像库中无对应 persona，需补充。' });
      continue;
    }
    const persona = matchingPersonas[0];
    const r = runSimPersona(persona, allSlugs);
    
    const inMain = r.recommended.some((c:any) => c.slug === slug);
    const inNiche = !inMain && r.niche.some((nc:any) => nc.categorySlug === slug);
    const inAny = inMain || inNiche;
    
    if (inMain) mainCovered++;
    if (inNiche) nicheCovered++;
    if (inAny) totalCovered++;
    
    const topGateScore = r.gateScores[catToGate[slug] || ''] || 0;
    const catData = r.allCats.find((c:any) => c.slug === slug);
    
    if (!inAny && catData) {
      const d = classifyFailure(slug, name, (weightsRaw as any)[slug]||4,
        (fieldsRaw as any)[slug]?.recommendedOnlyIfHighInterest||false,
        topGateScore, catData.bucketMatch, catData.dimScore, catData.interestSignalScore,
        catData.mismatchPenalty > 15);
      diagnostics.push(d);
    }
  }

  let md = out.join('');
  md += `\n## 覆盖率\n\n`;
  md += `- 主推荐覆盖: ${mainCovered}/${totalCats} (${(mainCovered/totalCats*100).toFixed(1)}%)\n`;
  md += `- 主推荐+探索总覆盖: ${totalCovered}/${totalCats} (${(totalCovered/totalCats*100).toFixed(1)}%)\n`;
  md += `\n## 未出现诊断 (${diagnostics.length} 类)\n\n`;
  md += generateDiagnosticsSummary(diagnostics);
  md += `\n## 未出现详情\n\n`;
  diagnostics.forEach(d => md += `- **${d.categoryName}** (weight=${d.baseWeight}, hiOnly=${d.highInterestOnly}): ${d.reasonType} → ${d.suggestedAction}\n`);

  fs.writeFileSync('simulation-results/summary_v05_audit.md', md);
  console.log(md);
  console.log('✅ simulation-results/summary_v05_audit.md');
}

// ====== MODE: niche-probe ======
function modeNicheProbe() {
  const allSlugs = Object.keys(weightsRaw);
  const coldSlugs = allSlugs.filter(s => {
    const f = (fieldsRaw as any)[s] || {};
    const w = (weightsRaw as any)[s] || 4;
    return f.recommendedOnlyIfHighInterest || w <= 5;
  });

  let out = `# v0.5 niche-probe 模式\n\n> 专测 highInterestOnly + 冷门专业\n> 共 ${coldSlugs.length} 个候选\n\n`;
  let canNiche = 0, cannotNiche = 0;
  const reasonCounts: Record<string,number> = {};

  for (const slug of coldSlugs) {
    const name = catNameMap[slug] || slug;
    const matchingPersonas = majorPersonaLibrary.filter(p => p.categorySlug === slug);
    const persona = matchingPersonas.length > 0 ? matchingPersonas[0] : null;
    if (!persona) continue;
    
    const r = runSimPersona(persona, allSlugs);
    const catData = r.allCats.find((c:any) => c.slug === slug);
    if (!catData) continue;
    
    const inNiche = r.niche.some((nc:any) => nc.categorySlug === slug);
    if (inNiche) canNiche++;
    else {
      cannotNiche++;
      const f = (fieldsRaw as any)[slug] || {};
      const reason = catData.dimScore < 72 ? 'dim_low' : catData.interestSignalScore < 75 ? 'interest_low' : catData.mismatchPenalty >= 15 ? 'mismatch_high' : 'score_below_52';
      reasonCounts[reason] = (reasonCounts[reason]||0)+1;
    }
  }

  out += `## 结果\n\n- 可进入小众探索: ${canNiche} / ${coldSlugs.length}\n- 无法进入: ${cannotNiche}\n\n`;
  out += `## 无法进入原因\n\n`;
  Object.entries(reasonCounts).forEach(([r,c]) => out += `- ${r}: ${c}\n`);

  fs.writeFileSync('simulation-results/summary_v05_niche.md', out);
  console.log(out);
  console.log('✅ simulation-results/summary_v05_niche.md');
}

// ====== MAIN ======
const args = process.argv.slice(2);
const mode = args[args.indexOf('--mode')+1] || 'realistic';
const runs = parseInt(args[args.indexOf('--runs')+1]) || 500;
const seed = parseInt(args[args.indexOf('--seed')+1]) || 606;

console.log(`🧪 v0.5 模拟器  mode=${mode}  runs=${runs}  seed=${seed}`);

if (mode === 'coverage-audit') modeCoverageAudit();
else if (mode === 'niche-probe') modeNicheProbe();
else modeRealistic(runs, seed);
