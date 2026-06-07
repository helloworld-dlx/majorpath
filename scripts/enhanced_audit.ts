/**
 * v0.5 enhanced coverage audit — 逐类诊断
 */
import * as fs from 'fs';
import { majorPersonaLibrary } from '../src/data/majorPersonaLibrary';
import { CATEGORY_DIM_PROFILES } from '../src/data/categoryDimProfiles';
import { evaluateNicheExploration } from '../src/lib/nicheExploration';
import type { NicheExplorationInput } from '../src/lib/nicheExploration';

const weightsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const fieldsRaw = JSON.parse(fs.readFileSync('simulation-results/v04_fields.json', 'utf8'));
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');

const catBuckets: Record<string,string[]> = {};
const bmr = reportJS.match(/var GATE_PRIORITY_CATEGORIES = \{([\s\S]*?)\};/)!;
const bRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\]/g;
let bm; while ((bm = bRegex.exec(bmr[1])) !== null) catBuckets[bm[1]] = bm[2].match(/'([a-z0-9_]+)'/g)!.map(b=>b.replace(/'/g,''));

const gates = ['01','02','03','04','05','06','07','08','09','10','12','13','14'];
const catToGate: Record<string,string> = {};
gates.forEach(g=>{ const gr=new RegExp("'"+g+"':\\s*\\[([\\s\\S]*?)\\]"+"(?=\\s*\\})",'g'); let gm; while((gm=gr.exec(reportJS))!==null){(gm[1].match(/categorySlug:\s*'([a-z0-9-]+)'/g)||[]).forEach(s=>{catToGate[s.match(/'([a-z0-9-]+)'/)![1]]=g;});}});

const nmr = reportJS.match(/var CAT_NAME_MAP = \{([\s\S]*?)\n  \};/)!;
const catNameMap: Record<string,string> = {}; (nmr[1].match(/'(?:[a-z0-9-]+)':\s*'(?:[^']+)'/g)||[]).forEach(p=>{const m=p.match(/'([a-z0-9-]+)':\s*'([^']+)'/);if(m)catNameMap[m[1]]=m[2];});

const B2D: Record<string,{gateCode:string,weight:number}[]> = {
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

function dimFromHints(h:any):Record<string,number>{
  if(!h)h={};const d:Record<string,number>={math_logic:25,reading_expression:25,interpersonal:25,business_sense:25,engineering_practice:25,info_systems:25,life_health_interest:25,aesthetic_creation:25,abstract_theory:25,stable_path:25,rule_detail:25};
  if(h.likesMath==='high')d.math_logic=85;else if(h.likesMath==='medium')d.math_logic=55;
  if(h.likesWriting==='high')d.reading_expression=85;else if(h.likesWriting==='medium')d.reading_expression=55;
  if(h.likesCommunication==='high')d.interpersonal=85;else if(h.likesCommunication==='medium')d.interpersonal=55;
  if(h.valuesIncome==='high')d.business_sense=70;
  if(h.likesHandsOn==='high')d.engineering_practice=85;else if(h.likesHandsOn==='medium')d.engineering_practice=55;
  if(h.likesProgramming==='high')d.info_systems=85;else if(h.likesProgramming==='medium')d.info_systems=55;
  if(h.likesBiology==='high')d.life_health_interest=85;else if(h.likesBiology==='medium')d.life_health_interest=55;
  if(h.valuesStability==='high')d.stable_path=85;
  if(h.likesExperiment==='high')d.engineering_practice=Math.max(d.engineering_practice||25,70);
  Object.keys(d).forEach(k=>d[k]=Math.min(100,Math.max(5,d[k])));return d;
}

function scoreGates(bs:Record<string,number>){const gs=new Map<string,number>();Object.entries(B2D).forEach(([b,discs])=>{const s=bs[b]||0;discs.forEach(d=>{const c=s*d.weight/100;const ex=gs.get(d.gateCode)||0;gs.set(d.gateCode,Math.max(ex,c)+(ex>0?c*0.3:0));});});return Array.from(gs.entries()).filter(([,s])=>s>=12).sort((a,b)=>b[1]-a[1]);}

function scoreCategory(slug:string,weight:number,bs:Record<string,number>,dimScores:Record<string,number>){
  const buckets=catBuckets[slug]||['stem'];const f=(fieldsRaw as any)[slug]||{};const profile=CATEGORY_DIM_PROFILES[slug];
  let bScore=0,bCount=0;buckets.forEach((b:string)=>{bScore+=bs[b]||0;bCount++;});
  const bucketMatch=bCount>0?bScore/bCount:0;
  let dimAvg=25;if(profile?.positiveDims?.length){dimAvg=profile.positiveDims.reduce((s:number,d:string)=>s+(dimScores[d]||25),0)/profile.positiveDims.length;}
  const dimScore=Math.min(100,Math.max(0,dimAvg*1.6));
  const weightScore=(weight/22)*100;let riskAdj=0;if(f.blindChoiceRisk==='high')riskAdj+=15;if(f.longCyclePressure==='high')riskAdj+=10;if(f.requiresSpecialCondition)riskAdj+=5;if(f.recommendedOnlyIfHighInterest&&bucketMatch<70)riskAdj+=20;
  const riskScore=Math.max(0,100-riskAdj);let score=bucketMatch*0.45+dimScore*0.40+weightScore*0.10+riskScore*0.05;
  if(f.recommendedOnlyIfHighInterest&&bucketMatch<60)score*=0.6;if(f.requiresSpecialCondition)score*=0.85;
  score=Math.round(Math.max(0,Math.min(100,score)));
  let interestSignalScore=25;if(profile?.interestSignals?.length)interestSignalScore=Math.min(100,50+profile.interestSignals.length*5);
  let mismatchPenalty=0;if(profile?.negativeDims?.length){const negTotal=profile.negativeDims.reduce((s:number,d:string)=>s+(dimScores[d]||25)*0.15,0);mismatchPenalty=Math.min(50,negTotal/profile.negativeDims.length*0.5);}
  return {slug,name:catNameMap[slug]||slug,gate:(GATE_META[catToGate[slug]]||{}).name||'',score,bucketMatch,dimScore,weightScore,interestSignalScore,mismatchPenalty,fields:f,profile};
}

const allSlugs = Object.keys(weightsRaw);
const totalCats = allSlugs.length;
let out = `# v0.5 enhanced audit — 逐类诊断\n\n> 时间: ${new Date().toISOString()}\n\n## Baseline\n\n| 指标 | 值 |\n|------|:--:|\n`;

// Run audit
let mainCovered=0, nicheCovered=0;
const diagnostics: any[] = [];
const allRows: any[] = [];

for (const slug of allSlugs) {
  const name = catNameMap[slug] || slug;
  const f = (fieldsRaw as any)[slug] || {};
  const w = (weightsRaw as any)[slug] || 4;
  const matchingPersonas = majorPersonaLibrary.filter(p => p.categorySlug === slug);
  const persona = matchingPersonas.length > 0 ? matchingPersonas[0] : null;
  if (!persona) { diagnostics.push({slug,name,reason:'NO_PERSONA',weight:w,hiOnly:f.recommendedOnlyIfHighInterest}); continue; }

  const aff = persona.sixBucketAffinity || {};
  const bs: Record<string,number> = {};
  ['stem','life_health','business','social_science','humanities','art_creative'].forEach(b => bs[b] = aff[b]!==undefined?aff[b]:10);
  const dimScores = dimFromHints(persona.answerStyleHints || {});
  const gateResults = scoreGates(bs).map(([code,score]) => ({ code, score }));
  const gateSet = new Set(gateResults.map(g => g.code));
  const gateScore = gateResults.find(g => g.code === catToGate[slug])?.score || 0;

  const cat = scoreCategory(slug, w, bs, dimScores);
  const passTopGate = gateSet.has(catToGate[slug]);
  
  // Check all scored categories to see if this cat is in recommended
  const allCats: any[] = []; allSlugs.forEach(s => { const sw=(weightsRaw as any)[s]||4; const g=catToGate[s]; if(g){ const c2=scoreCategory(s,sw,bs,dimScores); c2.passTopGate=gateSet.has(g); allCats.push({...c2}); }});
  allCats.sort((a,b)=>b.score-a.score);
  const recommended = allCats.filter(c => c.score>=55 && c.passTopGate).slice(0,5);
  const cautious = allCats.filter(c => !recommended.includes(c) && (c.fields.blindChoiceRisk==='high'||c.fields.longCyclePressure==='high'||c.fields.requiresSpecialCondition||c.fields.schoolTierSensitive||c.fields.commonMisunderstandingRisk==='high')).slice(0,4);
  const inMain = recommended.some((c:any)=>c.slug===slug);
  if (inMain) mainCovered++;

  // Niche: evaluate target category directly (not through selectNicheExplorations which caps at 2-3)
  const nicheInput: NicheExplorationInput = {
    categorySlug: slug,
    baseWeight: w,
    bucketMatchScore: cat.bucketMatch,
    dimMatchScore: cat.dimScore,
    interestSignalScore: cat.interestSignalScore,
    strongMismatchPenalty: cat.mismatchPenalty,
    recommendedOnlyIfHighInterest: f.recommendedOnlyIfHighInterest || false,
    requiresSpecialCondition: f.requiresSpecialCondition || false,
    passTopGate: passTopGate,
    alreadyInMainRecommended: inMain,
    alreadyInCautious: cautious.some((r:any) => r.slug === slug),
  };
  const nicheResult = evaluateNicheExploration(nicheInput);
  const inNiche = nicheResult.eligible;
  const nicheScore = nicheResult.score;
  if (inNiche) nicheCovered++;

  const covered = inMain ? 'MAIN' : inNiche ? 'NICHE' : 'NONE';
  
  // Smarter classification: distinguish rank-limited from signal-limited
  let classify = ''; let action = '';
  const hiOnly = f.recommendedOnlyIfHighInterest || false;
  if (covered==='MAIN') { classify='✅_MAIN'; action='已在主推荐'; }
  else if (covered==='NICHE') { classify='🟡_NICHE'; action='在小众探索'; }
  else {
    // Score >= 55 and passes gate → good match, just crowded out by other categories in same gate
    if (cat.score >= 55 && passTopGate) {
      if (hiOnly || w <= 5) { classify='A_CROWDED_HI'; action='高匹配但被同门类热门挤出Top5——预期内，探索层可补充'; }
      else { classify='A_CROWDED'; action='高匹配但同门竞争对手更多——如果niche未捕获，可补探索入口'; }
    } else if (!passTopGate && cat.score >= 45) {
      classify='A_GATE_BLOCKED'; action='门类得分不足，需补gateBypassDims或降门类门槛'; 
    } else if (cat.score < 45 && cat.score >= 35) {
      classify='A_MODERATE'; action='中等匹配，bucket或dim信号不够强。补persona或提升dim权重'; 
    } else if (w <= 5 && cat.score < 35) {
      classify='B_REASONABLE_COLD'; action='极冷门合理低频'; 
    } else {
      classify='A_WEAK_SIGNAL'; action='信号弱：补persona bucket/dim/interest映射'; 
    }
  }

  allRows.push({
    name,slug,covered,classify,action,weight:w,hiOnly,
    bucketMatch:Math.round(cat.bucketMatch),dimScore:Math.round(cat.dimScore),
    interestScore:Math.round(cat.interestSignalScore),mainScore:cat.score,
    gateScore:Math.round(gateScore),passTopGate,
    requiresSpecialCondition:f.requiresSpecialCondition||false,
    nicheScore,
    persona:persona.personaName||'N/A'
  });
}

// Output
out += `| realistic 100 | 34/93 (37%) |\n`;
out += `| realistic 500 | 36/93 (39%) |\n`;
out += `| audit 主推荐 | ${mainCovered}/93 (${(mainCovered/93*100).toFixed(1)}%) |\n`;
out += `| audit 主+探索 | ${mainCovered+nicheCovered}/93 (${((mainCovered+nicheCovered)/93*100).toFixed(1)}%) |\n\n`;

// Group by classify
const groups: Record<string,any[]> = {};
allRows.forEach(r => {
  if (!groups[r.classify]) groups[r.classify] = [];
  groups[r.classify].push(r);
});

out += `## 分类汇总\n\n`;
Object.entries(groups).sort().forEach(([cls, rows]) => {
  out += `### ${cls}（${rows.length} 类）\n\n`;
  out += `| 专业类 | weight | hiOnly | bucket | dim | interest | score | gate | 建议 |\n`;
  out += `|--------|:------:|:------:|:------:|:---:|:--------:|:-----:|:----:|------|\n`;
  rows.forEach(r => {
    out += `| ${r.name} | ${r.weight} | ${r.hiOnly?'✅':''} | ${r.bucketMatch} | ${r.dimScore} | ${r.interestScore} | ${r.mainScore} | ${r.gateScore} | ${r.action} |\n`;
  });
  out += '\n';
});

// A/B/C breakdown
const aCount = allRows.filter(r => r.classify.startsWith('A_')).length;
const bCount = allRows.filter(r => r.classify.startsWith('B_')).length;
const cCount = allRows.filter(r => r.classify.startsWith('C_')).length;
out += `## A/B/C 分类\n\n`;
out += `| 类别 | 数量 | 含义 |\n|------|:----:|------|\n`;
out += `| A 类(补画像) | ${aCount} | persona 缺 bucket/dim/interest 信号 |\n`;
out += `| B 类(合理低频) | ${bCount} | 不应为覆盖率强行推荐 |\n`;
out += `| C 类(规则误伤) | ${cCount} | 算法门槛或映射导致 |\n`;

fs.writeFileSync('simulation-results/enhanced_audit_baseline.md', out);
console.log(`mainCovered=${mainCovered} nicheCovered=${nicheCovered} total=${mainCovered+nicheCovered}`);
console.log(`A=${aCount} B=${bCount} C=${cCount}`);
console.log('✅ simulation-results/enhanced_audit_baseline.md');
