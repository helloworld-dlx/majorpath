const fs = require('fs');
const r = fs.readFileSync('public/scripts/report.js','utf8');
const subjData = fs.readFileSync('/tmp/subject_requirements.js','utf8');

// 1. Insert SUBJECT_REQUIREMENTS after CATEGORY_FIELDS
const fieldsEnd = r.indexOf('var CATEGORY_FIELDS = {');
const fieldsBlockEnd = r.indexOf('  };', fieldsEnd) + 4;
let updated = r.substring(0, fieldsBlockEnd) + '\n\n' + subjData + '\n' + r.substring(fieldsBlockEnd);

// 2. Add subject gate functions before generateCategoryRecommendations
const genCatFn = 'function generateCategoryRecommendations(bucketScores, dimScores, riskTags, topDisciplines)';
const subjectGateFn = `  // v0.5 选科硬关卡
  function checkSubjectEligibility(slug, userSubjects) {
    if (!userSubjects || !userSubjects.selected || userSubjects.mode === 'unknown') return 'eligible';
    var req = SUBJECT_REQUIREMENTS[slug];
    if (!req) return 'eligible';
    var has = userSubjects.selected || [];
    var hasSet = {};
    has.forEach(function(s) { hasSet[s] = true; });
    if (req.rfs && !hasSet[req.rfs]) return 'blocked';
    for (var i = 0; i < req.rsa.length; i++) {
      if (!hasSet[req.rsa[i]]) return 'blocked';
    }
    if (req.rec && req.rec.length > 0) {
      for (var i = 0; i < req.rec.length; i++) {
        if (!hasSet[req.rec[i]]) return 'softRisk';
      }
    }
    return 'eligible';
  }

  function getSubjectBlockNote(slug, userSubjects) {
    var req = SUBJECT_REQUIREMENTS[slug];
    if (!req) return '';
    var has = (userSubjects && userSubjects.selected) || [];
    var missing = [];
    if (req.rfs && has.indexOf(req.rfs) < 0) missing.push(req.rfs);
    req.rsa.forEach(function(s) { if (has.indexOf(s) < 0) missing.push(s); });
    if (missing.length === 0) return '';
    return '该专业通常要求选考 ' + (req.rfs?req.rfs+'、':'') + req.rsa.join('、') + '，你缺少 ' + missing.join('、') + '。';
  }

`;

updated = updated.replace(genCatFn, subjectGateFn + '  ' + genCatFn);

// 3. Apply subject gate filter before sorting
const sortLine = 'scored.sort(function (a, b) { return b.score - a.score; });';
const subjectFilter = `    // v0.5 subject gate: filter blocked categories
    var userSubjects = window.__USER_SUBJECTS__;
    var subjectBlocked = [];
    scored = scored.filter(function(cat) {
      var eligibility = checkSubjectEligibility(cat.slug, userSubjects);
      cat.subjectEligibility = eligibility;
      if (eligibility === 'blocked') {
        cat.subjectBlockReason = getSubjectBlockNote(cat.slug, userSubjects);
        subjectBlocked.push(cat);
        return false;
      }
      if (eligibility === 'softRisk') cat.softRisk = true;
      return true;
    });

`;
updated = updated.replace(sortLine, subjectFilter + '    ' + sortLine);

// 4. Add subjectBlocked to generateResult return
updated = updated.replace(
  "nicheExplorationCategories: niche,",
  "nicheExplorationCategories: niche, subjectBlockedCategories: subjectBlocked,"
);
// Also need to expose subjectBlocked before returning
updated = updated.replace(
  "var steps = buildNextSteps(prof.name, cats.recommended, cats.cautious, conf.level);",
  "var subjectBlocked = cats.scored.filter(function(c) { return c.subjectEligibility === 'blocked'; });\n    var steps = buildNextSteps(prof.name, cats.recommended, cats.cautious, conf.level);"
);

// 5. Add subject blocked rendering section  
const renderNicheLine = 'wrapper.appendChild(renderNicheExploration(result));';
const subjectBlockedRender = `    // v0.5 选科受限提醒
    wrapper.appendChild(renderSubjectBlocked(result));

`;
updated = updated.replace(renderNicheLine, subjectBlockedRender + '    ' + renderNicheLine);

// 6. Add subject gate note rendering to recommended categories
// Add softRisk note to category cards
const renderCategorySectionLine = 'function renderCategorySection(result, key, opts)';
const renderCategorySectionInsert = updated.indexOf(renderCategorySectionLine);
if (renderCategorySectionInsert > 0) {
  // In renderCategorySection, after the category card header, add softRisk indicator
  // Find: el('span', { className: 'text-[11px] text-slate-400 ml-2' }, cat.gate)
  // We'll add a softRisk indicator after the gate label
  updated = updated.replace(
    /el\('span', \{ className: 'text-\[11px\] text-slate-400 ml-2' \}, cat\.gate\)/g,
    "el('span', { className: 'text-[11px] text-slate-400 ml-2' }, cat.gate + (cat.softRisk ? ' ⚠️未选关联科' : ''))"
  );
}

// 7. Add renderSubjectBlocked function before renderFullReport
const renderFullReportLine = 'function renderFullReport(result) {';
const renderSubjectBlockedFn = `  // v0.5 选科受限模块
  function renderSubjectBlocked(result) {
    var blocked = result.subjectBlockedCategories;
    if (!blocked || blocked.length === 0) return el('div', {});
    var children = [];
    children.push(el('div', { className: 'text-center mb-3' },
      el('h2', { className: 'text-base font-bold text-slate-700' }, '⚠️ 兴趣可能相关，但选科受限'),
      el('p', { className: 'text-xs text-slate-400 mt-1' }, '以下方向与你的兴趣有交集，但你的选考科目不满足这些专业通常的要求。最终以本省考试院公布为准。')
    ));
    var shown = 0;
    blocked.forEach(function(cat) {
      if (shown >= 3) return;
      var detailUrl = '/majors/' + cat.gateSlug + '/' + cat.slug;
      children.push(
        el('div', { className: 'bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2' },
          el('div', { className: 'flex items-center justify-between mb-1' },
            el('span', { className: 'text-sm font-semibold text-slate-600' }, cat.name),
            el('span', { className: 'text-[10px] text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0' }, '选科受限')
          ),
          cat.subjectBlockReason ? el('p', { className: 'text-[11px] text-slate-500 mb-1' }, cat.subjectBlockReason) : el('div', {}),
          el('p', { className: 'text-[10px] text-amber-500' }, '建议查看专业详情页中的培养方案和报考要求，并核对本省考试院的当年招生选科要求。')
        )
      );
      shown++;
    });
    return el('div', { className: 'mb-6' }, children);
  }

`;

updated = updated.replace(renderFullReportLine, renderSubjectBlockedFn + '\n  ' + renderFullReportLine);

fs.writeFileSync('public/scripts/report.js', updated);
console.log('Updated report.js with subject gate (functions + filter + render + blocked list)');
