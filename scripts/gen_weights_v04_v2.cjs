/**
 * v0.4 候选权重 — 修订版
 * 调整：高优先 6→10, highInterestOnly 29→19, 艺术学理论类修正
 */
const fs = require('fs');

// Updated weights with adjustments
const v04Weights = {
  // === 01 哲学 ===
  'philosophy-class': 11,

  // === 02 经济学 ===
  'economics-class': 20,
  'finance': 17,
  'international-trade': 8,
  'public-finance': 8,

  // === 03 法学 ===
  'law-class': 20,
  'political-science': 8,
  'sociology': 8,
  'marxism': 7,
  'public-security': 4,
  'ethnology': 3,

  // === 04 教育学 ===
  'education': 20,
  'physical-education': 7,

  // === 05 文学 ===
  'chinese-literature': 19,
  'foreign-languages': 15,
  'journalism': 13,

  // === 06 历史学 ===
  'history-class': 11,

  // === 07 理学 ===
  'mathematics': 9,
  'physics': 7,
  'chemistry': 6,
  'biology': 12,
  'statistics': 16,    // ↑ 12→16 数据科学路径清晰
  'psychology': 11,
  'geography': 7,
  'astronomy': 3,
  'atmospheric-science': 3,
  'ocean-science': 3,
  'geophysics': 3,
  'geology': 3,

  // === 08 工学 ===
  'computer-science': 16,   // ↑ 15→16 路径最清晰的大众方向
  'electronic-information': 14,
  'energy-power': 11,
  'automation': 11,
  'instrumentation': 8,
  'mechanical': 10,
  'chemical-pharma': 7,
  'transportation': 7,
  'environmental': 7,
  'bioengineering': 7,
  'food-science': 6,
  'electrical': 11,
  'water-resources': 5,
  'civil-engineering': 7,
  'materials': 7,
  'architecture': 6,
  'aerospace': 5,
  'biomedical-eng': 6,
  'mechanics': 4,
  'surveying': 4,
  'safety-eng': 4,
  'geological-eng': 3,
  'nuclear': 3,
  'ocean-engineering': 3,
  'agricultural-eng': 3,
  'light-industry': 3,
  'public-security-tech': 3,
  'mining': 3,
  'textile': 3,
  'ordnance': 3,
  'forestry-eng': 3,

  // === 09 农学 ===
  'plant-production': 10,
  'environmental-ecology': 9,
  'veterinary': 14,
  'animal-production': 9,   // 保持 9
  'forestry': 5,
  'aquaculture': 3,
  'grassland-science': 3,

  // === 10 医学 ===
  'clinical-medicine': 20,
  'pharmacy': 10,
  'tcm': 11,
  'nursing': 10,
  'public-health': 9,
  'stomatology': 16,       // ↑ 14→16 路径清晰
  'integrated-medicine': 7,
  'chinese-pharmacy': 7,
  'medical-technology': 8,
  'basic-medicine': 6,
  'forensic-medicine': 5,

  // === 12 管理学 ===
  'business-administration': 14,
  'public-administration': 10,
  'management-science': 9,
  'e-commerce': 9,
  'tourism-management': 8,
  'logistics': 7,
  'industrial-engineering': 7,
  'library-science': 5,
  'agri-economics': 3,

  // === 13 艺术学 ===
  'design': 11,
  'fine-arts': 9,
  'drama-film': 8,
  'music-dance': 9,
  'art-theory': 4,

  // === 14 交叉学科 ===
  'interdisciplinary-class': 6,
};

// Verify
console.log('Total entries:', Object.keys(v04Weights).length);

const dist = {};
Object.values(v04Weights).forEach(w => {
  const tier = w >= 16 ? '高优先(16-22)' : w >= 10 ? '常规(10-15)' : w >= 6 ? '小众(6-9)' : '专门(3-5)';
  dist[tier] = (dist[tier] || 0) + 1;
});
Object.entries(dist).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`));

fs.writeFileSync('simulation-results/v04_weights_raw.json', JSON.stringify(v04Weights, null, 2));

// ========== UPDATED FIELDS ==========
// Trim highInterestOnly from 29 to 19
const onlyHighInterest = [
  'philosophy-class', 'history-class',       // 哲学/历史 — 需真正兴趣
  'astronomy', 'geology', 'geophysics',       // 理学冷门
  'ocean-science', 'atmospheric-science',     // 理学冷门
  'mining', 'textile', 'ordnance', 'nuclear', // 工学极冷
  'agricultural-eng', 'forestry-eng', 'light-industry', // 工学冷门
  'grassland-science', 'aquaculture', 'forestry', // 农学极冷
  'ethnology', 'art-theory',                 // 社科/艺术冷门
];

const fieldsDef = {};
const allSlugs = Object.keys(v04Weights);

allSlugs.forEach(slug => {
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

  fieldsDef[slug] = {
    resourceDependency: highRes.includes(slug) ? 'high' : medRes.includes(slug) ? 'medium' : 'low',
    blindChoiceRisk: highBlind.includes(slug) ? 'high' : medBlind.includes(slug) ? 'medium' : 'low',
    requiresSpecialCondition: special.includes(slug),
    recommendedOnlyIfHighInterest: onlyHighInterest.includes(slug),
    longCyclePressure: highLCP.includes(slug) ? 'high' : medLCP.includes(slug) ? 'medium' : 'low',
    schoolTierSensitive: schoolSens.includes(slug),
    commonMisunderstandingRisk: highMis.includes(slug) ? 'high' : medMis.includes(slug) ? 'medium' : 'low',
  };
});

fs.writeFileSync('simulation-results/v04_fields.json', JSON.stringify(fieldsDef, null, 2));

// Count highInterestOnly
const hiCount = Object.values(fieldsDef).filter(f => f.recommendedOnlyIfHighInterest).length;
console.log('highInterestOnly:', hiCount, '(was 29)');

console.log('Written v04_weights_raw.json and v04_fields.json');
