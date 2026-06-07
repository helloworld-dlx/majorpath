const fs = require('fs');
let r = fs.readFileSync('public/scripts/report.js','utf8');

// 1. Update generateCategoryRecommendations return to include scored
const oldReturn = `    return {
      recommended: recommended.slice(0, 5),
      optional: optional.slice(0, 4),
      cautious: cautious.slice(0, 4),
    };
  }`;

const newReturn = `    return {
      recommended: recommended.slice(0, 5),
      optional: optional.slice(0, 4),
      cautious: cautious.slice(0, 4),
      scored: scored,
    };
  }

  // v0.5 小众探索引擎
  function computeNicheExplorations(scored, recommended, cautious, dimScores) {
    var niche = [];
    var used = {};
    recommended.forEach(function(c) { used[c.slug] = true; });
    cautious.forEach(function(c) { used[c.slug] = true; });
    scored.forEach(function(cat) {
      if (used[cat.slug]) return;
      var f = CATEGORY_FIELDS[cat.slug] || {};
      var hiOnly = f.hi || false;
      var isSpecial = f.sc || false;
      var bw = f.bw || 4;
      if (!hiOnly && bw > 3 && !isSpecial) return;
      if (cat.dimScore < 68 && cat.interestSignal < 70 && cat.bucketMatch < 75) return;
      if (cat.mismatchPenalty >= 15) return;
      var ns = cat.bucketMatch * 0.30 + cat.dimScore * 0.45 + cat.interestSignal * 0.20 + (bw / 22 * 100) * 0.05 - cat.mismatchPenalty;
      if (ns < 52) return;
      cat.nicheScore = Math.round(ns);
      cat.nicheReasons = [];
      cat.nicheReasons.push(cat.dimScore >= 68 ? '你的学习风格和这个方向有匹配' : '你的方向偏好和这个专业有微弱交集');
      cat.nicheCaution = '';
      var cauts = [];
      if (hiOnly) cauts.push('这是一个比较专门的方向');
      if (isSpecial) cauts.push('该方向可能有特殊招生条件');
      if (bw <= 3) cauts.push('这是非常小众的方向');
      cat.nicheCaution = cauts.join('；') || '建议进一步了解再做判断';
      niche.push(cat);
    });
    niche.sort(function(a, b) { return b.nicheScore - a.nicheScore; });
    return niche.slice(0, 2);
  }`;

r = r.replace(oldReturn, newReturn);
console.log('Step 1: niche engine added');

// 2. Add dimScore/bucketMatch computation in scoring
const dimsLine = "var topDims = getTopDimensions(dimScores, cat.buckets, 2);";
if (r.indexOf(dimsLine) > 0 && r.indexOf('var dimScore = 25;') < 0) {
  const newDims = "var topDims = getTopDimensions(dimScores, cat.buckets, 2);\n" +
    "        var dimScore = 25;\n" +
    "        if (topDims.length > 0) { var dimSum = 0; topDims.forEach(function(d) { dimSum += (dimScores[d] || 25); }); dimScore = Math.min(100, Math.round(dimSum / topDims.length * 1.6)); }\n" +
    "        var interestSignal = 50;\n" +
    "        var bucketMatchScore = Math.round(baseScore);";
  r = r.replace(dimsLine, newDims);
  console.log('Step 2: dimScore computed');
}

// 3. Add extra fields to scored.push()
const reasonStr = "reason: topDims.length > 0 ? '你的「' + topDims.map(function (d) { return DIMENSION_LABELS[d]; }).join('、') + '」维度得分较高' : '与你的方向偏好匹配',";
if (r.indexOf('bucketMatch: bucketMatchScore') < 0) {
  r = r.replace(reasonStr, reasonStr + "\n          bucketMatch: bucketMatchScore,\n          dimScore: dimScore,\n          interestSignal: interestSignal,\n          mismatchPenalty: 0,");
  console.log('Step 3: extra fields added');
}

// 4. Update generateResult to compute niche
const stepsLine = "var steps = buildNextSteps(prof.name, cats.recommended, cats.cautious, conf.level);";
r = r.replace(stepsLine, stepsLine + "\n    var niche = computeNicheExplorations(cats.scored, cats.recommended, cats.cautious, dim);");
console.log('Step 4: niche compute in generateResult');

// 5. Add niche to return
r = r.replace('subjectBlockedCategories: subjectBlockedCats,', 'subjectBlockedCategories: subjectBlockedCats,\n      nicheExplorationCategories: niche,');
console.log('Step 5: niche in return');

// 6. Add renderNicheExploration function
const renderFullFn = '  function renderFullReport(result) {';
const nicheRender = `  function renderNicheExploration(result) {
    var niche = result.nicheExplorationCategories;
    if (!niche || niche.length === 0) return el('div', {});
    var children = [];
    children.push(el('div', { className: 'text-center mb-3' },
      el('h2', { className: 'text-lg font-bold text-slate-700' }, '\\ud83d\\udd0d 你也可以顺手了解的小众方向'),
      el('p', { className: 'text-xs text-slate-400 mt-1' }, '这些方向不是主推荐，只是因为你某些兴趣维度上有信号。小众多半对条件有要求，建议先看介绍。')
    ));
    niche.forEach(function(cat) {
      var detailUrl = '/majors/' + cat.gateSlug + '/' + cat.slug;
      var card = el('div', { className: 'bg-purple-50 border border-purple-200 rounded-xl p-4 mb-3' });
      card.appendChild(el('div', { className: 'flex items-center justify-between mb-2' },
        el('div', {}, el('span', { className: 'text-sm font-semibold text-slate-700' }, cat.name), el('span', { className: 'text-[11px] text-slate-400 ml-2' }, cat.gate)),
        el('span', { className: 'text-[10px] text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full shrink-0' }, '小众探索')
      ));
      if (cat.nicheReasons && cat.nicheReasons.length) card.appendChild(el('p', { className: 'text-xs text-slate-500 mb-1' }, cat.nicheReasons.join('；')));
      if (cat.nicheCaution) card.appendChild(el('p', { className: 'text-[11px] text-amber-700 bg-amber-100 rounded-lg p-2' }, cat.nicheCaution));
      card.appendChild(el('a', { href: detailUrl, className: 'text-xs text-primary hover:underline mt-1' }, '查看专业介绍 \\u2192'));
      children.push(card);
    });
    return el('div', { className: 'mb-6' }, children);
  }

`;

r = r.replace(renderFullFn, nicheRender + renderFullFn);
console.log('Step 6: renderNicheExploration added');

// 7. Add niche render call in renderFullReport
const riskLine = 'wrapper.appendChild(renderRiskTags(result));';
// Only add if not already present
if (r.indexOf('wrapper.appendChild(renderNicheExploration(result));') < 0) {
  r = r.replace(riskLine, 'wrapper.appendChild(renderNicheExploration(result));\n    ' + riskLine);
  console.log('Step 7: niche render call added');
}

fs.writeFileSync('public/scripts/report.js', r);
console.log('DONE');
