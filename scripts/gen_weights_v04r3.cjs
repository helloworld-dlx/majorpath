/**
 * v0.4 FINAL — 与 ADDJUSTMENT_SPEC 对齐
 * 修复: 权重3处 + 字段4处 + 公式比例
 */
const fs = require('fs');

// ====== WEIGHTS (v0.4r3) ======
const v04 = {
  'philosophy-class': 11, 'history-class': 11, 'interdisciplinary-class': 6,
  'economics-class': 20, 'finance': 17, 'international-trade': 8, 'public-finance': 8,
  'law-class': 20, 'political-science': 8, 'sociology': 8, 'marxism': 7, 'public-security': 4, 'ethnology': 3,
  'education': 20, 'physical-education': 7,
  'chinese-literature': 19, 'foreign-languages': 15, 'journalism': 13,
  'mathematics': 9, 'physics': 7, 'chemistry': 6, 'biology': 12, 'statistics': 16, 'psychology': 11,
  'geography': 7, 'astronomy': 3, 'atmospheric-science': 3, 'ocean-science': 3, 'geophysics': 3, 'geology': 3,
  'computer-science': 16, 'electronic-information': 14, 'energy-power': 11, 'automation': 11,
  'instrumentation': 8, 'mechanical': 10, 'chemical-pharma': 7, 'transportation': 7,
  'environmental': 7, 'bioengineering': 7, 'food-science': 6,
  'electrical': 11, 'water-resources': 5, 'civil-engineering': 7, 'materials': 7,
  'architecture': 6, 'aerospace': 5, 'biomedical-eng': 6, 'mechanics': 4,
  'surveying': 4, 'safety-eng': 4, 'geological-eng': 3, 'nuclear': 3,
  'ocean-engineering': 3, 'agricultural-eng': 3, 'light-industry': 3,
  'public-security-tech': 3, 'mining': 3, 'textile': 3, 'ordnance': 3, 'forestry-eng': 3,
  'plant-production': 10, 'environmental-ecology': 9, 'veterinary': 14, 'animal-production': 9,
  'forestry': 5, 'aquaculture': 3, 'grassland-science': 3,
  'clinical-medicine': 20, 'pharmacy': 12, 'tcm': 11, 'nursing': 12,       // FIX: 药学 10→12, 护理 10→12
  'public-health': 9, 'stomatology': 14,                                      // FIX: 口腔 16→14
  'integrated-medicine': 7, 'chinese-pharmacy': 7, 'medical-technology': 8,
  'basic-medicine': 6, 'forensic-medicine': 5,
  'business-administration': 14, 'public-administration': 10, 'management-science': 9,
  'e-commerce': 9, 'tourism-management': 8, 'logistics': 7, 'industrial-engineering': 7,
  'library-science': 5, 'agri-economics': 3,
  'design': 11, 'fine-arts': 9, 'drama-film': 8, 'music-dance': 9, 'art-theory': 4,
};

console.log('Total:', Object.keys(v04).length);
const dist = {}; Object.values(v04).forEach(w => { const t = w>=16?'高优先':w>=10?'常规':w>=6?'小众':'专门'; dist[t]=(dist[t]||0)+1; });
Object.entries(dist).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

fs.writeFileSync('simulation-results/v04_weights_raw.json', JSON.stringify(v04, null, 2));

// ====== FIELDS (v0.4r3) ======
const onlyHI = [
  'philosophy-class','history-class','astronomy','geology','geophysics',
  'ocean-science','atmospheric-science','mining','textile','ordnance','nuclear',
  'agricultural-eng','forestry-eng','light-industry',
  'grassland-science','aquaculture','forestry','ethnology','art-theory',
];

const fields = {};
Object.keys(v04).forEach(slug => {
  // resourceDependency — FIX: psychology → high
  const highRes = ['computer-science','electronic-information','aerospace','biomedical-eng',
    'clinical-medicine','stomatology','nuclear','ordnance','architecture',
    'ocean-engineering','mining','geological-eng','geology','geophysics','astronomy',
    'atmospheric-science','ocean-science','interdisciplinary-class','pharmacy','psychology'];
  const medRes = ['mechanical','electrical','automation','instrumentation','energy-power',
    'chemical-pharma','materials','food-science','bioengineering','environmental',
    'civil-engineering','water-resources','transportation','surveying','safety-eng',
    'agricultural-eng','light-industry','textile','forestry-eng','forestry',
    'veterinary','plant-production','animal-production','aquaculture','grassland-science',
    'public-health','medical-technology','basic-medicine','tcm','integrated-medicine',
    'chinese-pharmacy','forensic-medicine','nursing','fine-arts','music-dance','drama-film',
    'design','physics','chemistry','biology','statistics','mathematics','geography',
    'mechanics','tourism-management'];

  // blindChoiceRisk — FIX: environmental→high, bioengineering→high
  const highBlind = ['computer-science','electronic-information','finance','business-administration',
    'psychology','clinical-medicine','journalism','e-commerce','public-administration',
    'management-science','international-trade','law-class','stomatology',
    'environmental','bioengineering'];
  const medBlind = ['automation','mechanical','electrical','energy-power','architecture',
    'design','tcm','nursing','food-science',
    'political-science','sociology','economics-class','statistics','pharmacy',
    'civil-engineering','materials','chinese-literature'];

  const special = ['physical-education','fine-arts','music-dance','drama-film','design',
    'public-security','public-security-tech','ordnance','nuclear'];

  const highLCP = ['clinical-medicine','stomatology','tcm','integrated-medicine',
    'basic-medicine','law-class','pharmacy','chinese-pharmacy','psychology'];
  const medLCP = ['architecture','forensic-medicine','veterinary','nursing','medical-technology','education'];

  // FIX: psychology → schoolTierSensitive=true (was already true)
  const schoolSens = ['computer-science','electronic-information','aerospace','biomedical-eng',
    'architecture','clinical-medicine','stomatology','law-class','finance',
    'journalism','business-administration','interdisciplinary-class',
    'nuclear','ordnance','psychology'];

  const highMis = ['business-administration','public-administration','e-commerce',
    'computer-science','electronic-information','psychology','journalism',
    'environmental','bioengineering','mechanical','automation','finance'];
  const medMis = ['economics-class','management-science','tourism-management',
    'design','architecture','clinical-medicine','nursing','pharmacy',
    'statistics','electrical','energy-power','food-science','sociology','tcm'];

  fields[slug] = {
    resourceDependency: highRes.includes(slug)?'high':medRes.includes(slug)?'medium':'low',
    blindChoiceRisk: highBlind.includes(slug)?'high':medBlind.includes(slug)?'medium':'low',
    requiresSpecialCondition: special.includes(slug),
    recommendedOnlyIfHighInterest: onlyHI.includes(slug),
    longCyclePressure: highLCP.includes(slug)?'high':medLCP.includes(slug)?'medium':'low',
    schoolTierSensitive: schoolSens.includes(slug),
    commonMisunderstandingRisk: highMis.includes(slug)?'high':medMis.includes(slug)?'medium':'low',
  };
});

fs.writeFileSync('simulation-results/v04_fields.json', JSON.stringify(fields, null, 2));
console.log('highInterestOnly:', Object.values(fields).filter(f=>f.recommendedOnlyIfHighInterest).length);
console.log('resourceDep=high:', Object.values(fields).filter(f=>f.resourceDependency==='high').length);
console.log('blindChoice=high:', Object.values(fields).filter(f=>f.blindChoiceRisk==='high').length);
console.log('Written v04_weights_raw.json + v04_fields.json');
