/**
 * 生成 categoryDimProfiles.ts — 93 专业类维度画像
 * 覆盖：positiveDims, interestSignals, gateBypassDims, nicheExplorationTriggers
 */
const fs = require('fs');

const dims = ['math_logic','reading_expression','interpersonal','business_sense','engineering_practice',
  'info_systems','life_health_interest','aesthetic_creation','abstract_theory','stable_path','rule_detail'];
const dimNames = { math_logic:'数理逻辑', reading_expression:'阅读表达', interpersonal:'人际沟通',
  business_sense:'商业意识', engineering_practice:'动手实践', info_systems:'信息系统',
  life_health_interest:'生命健康', aesthetic_creation:'审美创作', abstract_theory:'抽象思维',
  stable_path:'稳定导向', rule_detail:'规则细节' };

const v04 = JSON.parse(fs.readFileSync('simulation-results/v04_weights_raw.json', 'utf8'));
const fields = JSON.parse(fs.readFileSync('simulation-results/v04_fields.json', 'utf8'));
const reportJS = fs.readFileSync('public/scripts/report.js', 'utf8');

// Bucket mapping
const catBuckets = {};
const gateMatchResult = reportJS.match(/var GATE_PRIORITY_CATEGORIES = \{([\s\S]*?)\};/);
const bRegex = /categorySlug:\s*'([a-z0-9-]+)',\s*buckets:\s*\[([^\]]+)\]/g;
let bm;
while ((bm = bRegex.exec(gateMatchResult[1])) !== null) {
  catBuckets[bm[1]] = bm[2].match(/'([a-z0-9_]+)'/g).map(b => b.replace(/'/g, ''));
}

// Name map
const nameMapMatch = reportJS.match(/var CAT_NAME_MAP = \{([\s\S]*?)\n  \};/);
const catNameMap = {};
const np = nameMapMatch[1].match(/'(?:[a-z0-9-]+)':\s*'(?:[^']+)'/g) || [];
np.forEach(p => { const m = p.match(/'([a-z0-9-]+)':\s*'([^']+)'/); if (m) catNameMap[m[1]] = m[2]; });

// Map buckets to dimensions
const bucketToDims = {
  stem: ['math_logic','engineering_practice','info_systems','abstract_theory'],
  life_health: ['life_health_interest','rule_detail','stable_path'],
  business: ['business_sense','interpersonal','math_logic'],
  social_science: ['reading_expression','interpersonal','rule_detail'],
  humanities: ['reading_expression','abstract_theory','aesthetic_creation'],
  art_creative: ['aesthetic_creation','abstract_theory','engineering_practice'],
};

// Manual overrides for specific categories
const manualProfiles = {
  'mining': { positiveDims:['engineering_practice','stable_path'], strongPositiveDims:[], negativeDims:['aesthetic_creation'], interestSignals:['对资源开发有明确兴趣'], learningStyleSignals:['能接受艰苦/户外/特定工作环境'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'极冷门方向，仅强兴趣探索' },
  'textile': { positiveDims:['engineering_practice','aesthetic_creation'], strongPositiveDims:[], negativeDims:['business_sense'], interestSignals:['对纺织工艺/材料有兴趣'], learningStyleSignals:['能接受制造/工艺场景'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice','aesthetic_creation'], notes:'冷门方向' },
  'ordnance': { positiveDims:['engineering_practice','math_logic','stable_path'], strongPositiveDims:[], negativeDims:['interpersonal'], interestSignals:['对军工/国防有明确兴趣，了解行业特殊性'], learningStyleSignals:['能接受纪律性/保密性强的环境'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'军工方向，需特殊背景' },
  'forestry-eng': { positiveDims:['engineering_practice','life_health_interest'], strongPositiveDims:[], negativeDims:['info_systems'], interestSignals:['对林业/木材加工有明确兴趣'], learningStyleSignals:['能接受工程+林业交叉场景'], gateBypassDims:['life_health_interest'], nicheExplorationTriggers:['life_health_interest'], notes:'冷门交叉方向' },
  'aquaculture': { positiveDims:['life_health_interest','stable_path'], strongPositiveDims:[], negativeDims:['business_sense','info_systems'], interestSignals:['对水生生物/养殖/水产有明确兴趣'], learningStyleSignals:['能接受实践/养殖/行业场景'], gateBypassDims:['life_health_interest'], nicheExplorationTriggers:['life_health_interest'], notes:'极冷门，仅强生命科学兴趣者可探索' },
  'grassland-science': { positiveDims:['life_health_interest','abstract_theory'], strongPositiveDims:[], negativeDims:['business_sense','info_systems'], interestSignals:['对草原生态/草业有明确研究兴趣'], learningStyleSignals:['能接受野外/科研场景'], gateBypassDims:['life_health_interest'], nicheExplorationTriggers:['life_health_interest'], notes:'极冷门方向' },
  'geophysics': { positiveDims:['math_logic','engineering_practice','abstract_theory'], strongPositiveDims:[], negativeDims:['interpersonal'], interestSignals:['对地球物理/地震/探测有明确兴趣'], learningStyleSignals:['能接受数理+野外+科研训练'], gateBypassDims:['math_logic','engineering_practice'], nicheExplorationTriggers:['math_logic'], notes:'极小众，仅强数理兴趣者可探索' },
  'ocean-science': { positiveDims:['life_health_interest','abstract_theory','stable_path'], strongPositiveDims:[], negativeDims:['business_sense'], interestSignals:['对海洋/海洋生命/海洋环境有强兴趣'], learningStyleSignals:['能接受科研/实验/出海场景'], gateBypassDims:['life_health_interest','abstract_theory'], nicheExplorationTriggers:['life_health_interest'], notes:'小众科研方向' },
  'atmospheric-science': { positiveDims:['math_logic','abstract_theory','info_systems'], strongPositiveDims:[], negativeDims:['interpersonal'], interestSignals:['对气象/大气/气候变化有强兴趣'], learningStyleSignals:['能接受数理+模型+科研训练'], gateBypassDims:['math_logic','abstract_theory'], nicheExplorationTriggers:['math_logic'], notes:'小众科研方向' },
  'ethnology': { positiveDims:['reading_expression','interpersonal','abstract_theory'], strongPositiveDims:[], negativeDims:['engineering_practice'], interestSignals:['对民族文化/人类学有明确兴趣'], learningStyleSignals:['能接受田野调查/人文研究'], gateBypassDims:['reading_expression','interpersonal'], nicheExplorationTriggers:['interpersonal'], notes:'极小众人文方向' },
  'art-theory': { positiveDims:['aesthetic_creation','reading_expression','abstract_theory'], strongPositiveDims:['aesthetic_creation'], negativeDims:['engineering_practice','business_sense'], interestSignals:['对艺术理论和艺术史有明确兴趣'], learningStyleSignals:['能接受大量阅读/写作/理论分析'], gateBypassDims:['aesthetic_creation','reading_expression'], nicheExplorationTriggers:['aesthetic_creation'], notes:'艺术学科中的理论方向，与创作类不同' },
  'astronomy': { positiveDims:['math_logic','abstract_theory','info_systems'], strongPositiveDims:[], negativeDims:['business_sense','interpersonal'], interestSignals:['对宇宙/天体/空间科学有强兴趣'], learningStyleSignals:['能接受高强度数理+长期学术训练'], gateBypassDims:['math_logic','abstract_theory'], nicheExplorationTriggers:['math_logic','abstract_theory'], notes:'极小众专业，仅强兴趣探索' },
  'geology': { positiveDims:['engineering_practice','abstract_theory','stable_path'], strongPositiveDims:[], negativeDims:['info_systems'], interestSignals:['对地质/矿物/地球演化有明确兴趣'], learningStyleSignals:['能接受野外工作+科研训练'], gateBypassDims:['engineering_practice','abstract_theory'], nicheExplorationTriggers:['engineering_practice'], notes:'小众方向，需接受野外工作' },
  'ocean-engineering': { positiveDims:['engineering_practice','math_logic','stable_path'], strongPositiveDims:[], negativeDims:['interpersonal'], interestSignals:['对海洋装备/船舶/海洋开发有明确兴趣'], learningStyleSignals:['能接受工程+海洋交叉场景'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'小众工程方向' },
  'nuclear': { positiveDims:['math_logic','engineering_practice','stable_path'], strongPositiveDims:[], negativeDims:['interpersonal','aesthetic_creation'], interestSignals:['对核能/辐射防护/核技术有明确兴趣，了解行业特殊性'], learningStyleSignals:['能接受高安全要求/纪律性/科研场景'], gateBypassDims:['math_logic','engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'特殊行业方向，需特殊背景' },
  'agricultural-eng': { positiveDims:['engineering_practice','life_health_interest','stable_path'], strongPositiveDims:[], negativeDims:['info_systems'], interestSignals:['对农机/灌溉/农业工程有明确兴趣'], learningStyleSignals:['能接受工程+农业交叉'], gateBypassDims:['engineering_practice','life_health_interest'], nicheExplorationTriggers:['life_health_interest'], notes:'冷门交叉方向' },
  'light-industry': { positiveDims:['engineering_practice','aesthetic_creation'], strongPositiveDims:[], negativeDims:['info_systems'], interestSignals:['对轻工/包装/印刷有明确兴趣'], learningStyleSignals:['能接受工艺/制造场景'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'冷门方向' },
  'public-security-tech': { positiveDims:['engineering_practice','rule_detail','stable_path'], strongPositiveDims:[], negativeDims:['interpersonal'], interestSignals:['对公安技术有明确兴趣，了解行业背景'], learningStyleSignals:['能接受技术+纪律+政审'], gateBypassDims:['engineering_practice','rule_detail'], nicheExplorationTriggers:['rule_detail'], notes:'特殊行业，有政审门槛' },
  'geological-eng': { positiveDims:['engineering_practice','abstract_theory','stable_path'], strongPositiveDims:[], negativeDims:['info_systems'], interestSignals:['对地质工程/勘探/灾害防治有明确兴趣'], learningStyleSignals:['能接受野外+工程训练'], gateBypassDims:['engineering_practice'], nicheExplorationTriggers:['engineering_practice'], notes:'小众工程方向' },
  'firensic-medicine': null, // will be handled generically
  'basic-medicine': null,
  'mechanics': null,
  'surveying': null,
  'safety-eng': null,
  'library-science': null,
  'agri-economics': null,
  'marxism': null,
  'public-security': null,
  'integrated-medicine': null,
  'chinese-pharmacy': null,
  'forensic-medicine': null,
};

// Generate profile for a category
function genProfile(slug) {
  if (manualProfiles[slug]) return manualProfiles[slug];
  
  const buckets = catBuckets[slug] || ['stem'];
  const f = fields[slug] || {};
  const name = catNameMap[slug] || slug;
  
  // Gather dims from buckets
  let positiveDims = [];
  let allDims = new Set();
  buckets.forEach(b => {
    const bd = bucketToDims[b] || [];
    bd.forEach(d => allDims.add(d));
  });
  positiveDims = [...allDims];
  
  // If still <3, add some defaults
  while (positiveDims.length < 3) {
    const defaults = ['reading_expression','interpersonal','stable_path'];
    for (const d of defaults) {
      if (!positiveDims.includes(d)) { positiveDims.push(d); break; }
    }
  }
  
  // Strong positive: first two bucket-aligned dims
  const strongPositive = positiveDims.slice(0, 2);
  
  // Negative dims for high-risk
  let negativeDims = [];
  if (f.blindChoiceRisk === 'high') negativeDims.push('interpersonal');
  if (f.requiresSpecialCondition) negativeDims.push('stable_path');
  if (f.longCyclePressure === 'high' || f.longCyclePressure === 'medium') negativeDims.push('math_logic');
  
  // Interest signals from bucket name
  const bucketLabels = { stem:'理工/技术/工程', life_health:'生命科学/健康/医学',
    business:'商业/管理/经济', social_science:'社会/法律/教育',
    humanities:'人文/语言/思想', art_creative:'艺术/创作/设计' };
  const interestSignals = buckets.map(b => `对${bucketLabels[b]||b}方向有兴趣`).slice(0, 2);
  
  // Learning style
  const learningMap = { stem:'能接受数理逻辑/实验/动手', life_health:'能接受实验/实践/理论学习',
    business:'能接受案例分析/团队协作', social_science:'能接受大量阅读/写作/分析',
    humanities:'能接受大量阅读/思辨', art_creative:'能接受长期训练/创作' };
  const learningStyleSignals = buckets.map(b => learningMap[b]||'能接受该方向的学习方式').slice(0, 2);
  
  // Gate bypass: first 2 positive dims
  const gateBypassDims = positiveDims.slice(0, 2);
  
  // Niche triggers
  let nicheTriggers = [];
  if (f.recommendedOnlyIfHighInterest || (v04[slug]||0) <= 5 || f.requiresSpecialCondition) {
    nicheTriggers = positiveDims.slice(0, 2);
  }
  
  return { positiveDims, strongPositiveDims:strongPositive, weakPositiveDims:[], 
    negativeDims, strongNegativeDims:[], interestSignals, learningStyleSignals,
    gateBypassDims, nicheExplorationTriggers:nicheTriggers,
    notes: f.recommendedOnlyIfHighInterest ? '仅强兴趣探索' : f.requiresSpecialCondition ? '需特殊条件' : '' };
}

// Generate TypeScript
let out = `/**
 * categoryDimProfiles.ts — 专业类维度画像
 *
 * 版本: v0.5-candidate
 * 覆盖: 93 个专业类的维度匹配、兴趣信号、学习风格信号
 *
 * 用途:
 * - 主推荐评分中的 dimMatchScore
 * - 小众探索( nicheExplorationScore )
 * - gate bypass 触发条件
 * - 报告中的推荐理由生成
 *
 * ⚠️ 候选版本，部分映射为启发式，标注了需人工校准的条目。
 *    正式上线前应结合真实测试反馈和本专业同学审核。
 */

export interface CategoryDimProfile {
  categorySlug: string;
  categoryName: string;

  /** 该专业类相关的正向维度（至少 3 个） */
  positiveDims: string[];
  /** 强正向维度，匹配度高时显著拉分 */
  strongPositiveDims?: string[];
  /** 弱正向维度，辅助参考 */
  weakPositiveDims?: string[];

  /** 该专业类可能排斥的维度（用户在该维度上高分可能不适合） */
  negativeDims?: string[];
  strongNegativeDims?: string[];

  /** 用户对该方向的兴趣信号描述 */
  interestSignals: string[];
  /** 该方向需要的学习风格信号 */
  learningStyleSignals: string[];

  /** 可绕过门类关卡(gate bypass)的维度 */
  gateBypassDims?: string[];
  /** 触发小众探索的信号维度 */
  nicheExplorationTriggers?: string[];

  /** 人工校准备注 */
  notes?: string;
}

export const CATEGORY_DIM_PROFILES: Record<string, CategoryDimProfile> = {
`;

const slugs = Object.keys(v04).sort();
slugs.forEach(slug => {
  const profile = genProfile(slug);
  if (!profile) return;
  const name = catNameMap[slug] || slug;
  const notes = profile.notes && profile.notes.trim() ? `  notes: '${profile.notes}',\n` : '  // 无需人工校准\n';
  
  out += `  '${slug}': {\n`;
  out += `    categorySlug: '${slug}',\n    categoryName: '${name}',\n`;
  out += `    positiveDims: [${profile.positiveDims.map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    strongPositiveDims: [${(profile.strongPositiveDims||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    weakPositiveDims: [${(profile.weakPositiveDims||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    negativeDims: [${(profile.negativeDims||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    strongNegativeDims: [${(profile.strongNegativeDims||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    interestSignals: [${(profile.interestSignals||[]).map(s=>`'${s}'`).join(', ')}],\n`;
  out += `    learningStyleSignals: [${(profile.learningStyleSignals||[]).map(s=>`'${s}'`).join(', ')}],\n`;
  out += `    gateBypassDims: [${(profile.gateBypassDims||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += `    nicheExplorationTriggers: [${(profile.nicheExplorationTriggers||[]).map(d=>`'${d}'`).join(', ')}],\n`;
  out += notes;
  out += `  },\n`;
});

out += `};\n`;

fs.writeFileSync('src/data/categoryDimProfiles.ts', out);
console.log('Written src/data/categoryDimProfiles.ts');
console.log('Categories covered:', slugs.length);

// Quick verification
slugs.forEach(s => {
  const p = genProfile(s);
  if (!p || p.positiveDims.length < 3) console.log(`WARN: ${s} has <3 positiveDims`);
});
