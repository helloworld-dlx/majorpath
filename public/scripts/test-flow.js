/**
 * 纯原生 JS 测试引擎 — 零框架、零 hydration、秒加载
 *
 * 从 window.__QUESTION_BANK__ 读取题库数据（由 Astro 注入），
 * 实现两阶段自适应测试，全部 DOM 手动渲染。
 */

(function () {
  'use strict';

  const ROOT_ID = 'major-test-root';
  const BUCKETS = ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'];

  const ADJACENT = {
    humanities: ['social_science', 'art_creative'],
    social_science: ['humanities', 'business', 'life_health'],
    business: ['social_science', 'stem'],
    stem: ['business', 'life_health', 'art_creative'],
    life_health: ['stem', 'social_science', 'art_creative'],
    art_creative: ['humanities', 'stem', 'life_health'],
  };

  // ─── state ───
  let bank = null;
  let phase = 'start'; // start | general | adaptive | done
  let idx = 0;
  let responses = {};
  let generalQ = [];
  let adaptiveQ = [];
  let allQ = [];
  let bucketScores = null;
  let userType = null;
  let humanitiesProtected = false;

  // ─── helpers ───

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function byPriority(a, b) { return (a.priority ?? 99) - (b.priority ?? 99); }

  function pick(bank, type, count, buckets, exclude) {
    let pool = bank.questions.filter(q => q.type === type);
    if (buckets?.length) {
      const set = new Set(buckets);
      pool = pool.filter(q => q.targetBuckets.some(b => set.has(b)));
    }
    if (exclude?.size) pool = pool.filter(q => !exclude.has(q.id));
    return shuffle(pool).slice(0, count);
  }

  function computeBucketScores(responses) {
    const scores = Object.fromEntries(BUCKETS.map(b => [b, 0]));
    for (const [qId, optId] of Object.entries(responses)) {
      const q = bank.questions.find(x => x.id === qId);
      if (!q) continue;
      const opt = q.options.find(o => o.id === optId);
      if (!opt) continue;
      for (const eff of (opt.scoreEffects || [])) {
        if (BUCKETS.includes(eff.target)) scores[eff.target] += eff.points;
      }
    }
    return scores;
  }

  function normalizeScores(scores) {
    const vals = Object.values(scores);
    const min = Math.min(...vals), max = Math.max(...vals);
    if (max === min) return { ...scores };
    const out = {};
    for (const k of BUCKETS) out[k] = Math.round(((scores[k] - min) / (max - min)) * 100);
    return out;
  }

  function determineUserType(scores) {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = sorted[0][1], second = sorted[1][1];
    if (top >= 62 && top - second >= 8) return 'single';
    if (top < 58) return 'exploratory';
    if (top >= 55 && second >= 55 && top - second < 8) return 'dual';
    return 'exploratory';
  }

  function checkHumanitiesProtection(scores) {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top2 = new Set(sorted.slice(0, 2).map(([k]) => k));
    return (top2.has('humanities') || top2.has('social_science')) && scores.stem < 55;
  }

  function collectRiskTags(responses) {
    const tags = new Set();
    for (const [qId, optId] of Object.entries(responses)) {
      const q = bank.questions.find(x => x.id === qId);
      if (!q || q.type !== 'risk') continue;
      const opt = q.options.find(o => o.id === optId);
      if (opt?.riskTags) opt.riskTags.forEach(t => tags.add(t));
    }
    return [...tags];
  }

  function buildAdaptivePhase(rawScores, normalized, usedIds) {
    const uType = determineUserType(normalized);
    const hp = checkHumanitiesProtection(normalized);
    const sorted = Object.entries(normalized).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = uType === 'dual' ? sorted[1][0] : null;

    // branch questions
    let branchCount, buckets;
    if (uType === 'single') { branchCount = 8; buckets = secondary ? [primary, secondary] : [primary]; }
    else if (uType === 'dual') { branchCount = 8; buckets = [primary, secondary]; }
    else { branchCount = 9; buckets = sorted.slice(0, 3).map(([k]) => k); }

    // 文科保护：跳过 stem
    if (hp) buckets = buckets.filter(b => b !== 'stem');
    if (buckets.length === 0) buckets = [primary];

    const perBucket = Math.ceil(branchCount / buckets.length);
    const branchQs = [];
    for (const bucket of buckets) {
      const pool = bank.questions.filter(q => q.type === 'branch' && q.targetBuckets.includes(bucket) && !usedIds.has(q.id));
      const picks = shuffle(pool).slice(0, perBucket);
      picks.forEach(q => { usedIds.add(q); branchQs.push(q); });
    }

    // cross_check
    const adjacent = ADJACENT[primary] || [];
    const active = adjacent.filter(b => normalized[b] >= 50);
    let crossQs = [];
    if (active.length > 0) {
      const aSet = new Set(active);
      crossQs = pick(bank, 'cross_check', 2, [primary, ...active], usedIds).filter(
        q => q.targetBuckets.some(b => aSet.has(b))
      );
      crossQs.forEach(q => usedIds.add(q));
    }

    // risk
    const riskQs = pick(bank, 'risk', 2, null, usedIds);
    riskQs.forEach(q => usedIds.add(q));

    return { uType, hp, primary, secondary, branchQs, crossQs, riskQs };
  }

  // ─── DOM helpers ───

  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
      else e.setAttribute(k, v);
    });
    children.forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function root() { return document.getElementById(ROOT_ID); }

  function render(html) {
    const r = root();
    if (r) r.innerHTML = html;
  }

  // ─── views ───

  function viewStart() {
    render(`
      <div class="max-w-xl mx-auto px-4 py-8">
        <div class="text-center py-12">
          <h1 class="text-2xl font-bold text-slate-900 mb-2">专业倾向小测试</h1>
          <p class="text-slate-500 text-sm mb-2">帮你从兴趣和思维方式出发，发现可能适合的专业方向</p>
          <p class="text-xs text-slate-400 mb-8">共 8 道通用题 + 约 8 道方向题，大约 5 分钟</p>
          <div class="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-left max-w-sm mx-auto">
            <p class="text-xs text-amber-700 leading-relaxed">⚠️ 本测试仅供参考，不构成志愿填报建议。最终选择请结合分数、位次、院校、家庭情况综合判断。</p>
          </div>
          <button id="btn-start" class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
            开始测试<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </button>
          <p class="text-xs text-slate-400 mt-6">不需要注册，结果仅在当前浏览器中保存</p>
        </div>
      </div>
    `);
    document.getElementById('btn-start').onclick = startTest;
  }

  function startTest() {
    // 从 20 道通用题库中随机抽取 8 道，保证每次轮换不同题目
    const pool = bank.questions.filter(q => q.type === 'general');
    const selected = shuffle(pool).slice(0, 8);
    generalQ = selected.map((q, i) => ({ question: q, phase: 'general', order: i + 1 }));
    allQ = [...generalQ];
    phase = 'general';
    idx = 0;
    responses = {};
    adaptiveQ = [];
    renderQuestion();
  }

  function renderQuestion() {
    const q = allQ[idx];
    if (!q) return;
    const isGen = phase === 'general' || (phase === 'adaptive' && idx < generalQ.length);
    const total = allQ.length;
    const progress = total > 0 ? Math.round((idx / total) * 100) : 0;
    const ansId = responses[q.question.id];
    const isLast = idx === total - 1;

    let html = '<div class="max-w-xl mx-auto px-4 py-8">';
    // progress bar
    html += '<div class="mb-6"><div class="flex items-center justify-between text-xs text-slate-400 mb-2">';
    html += `<span>${isGen ? '第 1 步：通用题' : '第 2 步：方向题'}</span>`;
    html += `<span>${idx + 1} / ${total}</span></div>`;
    html += `<div class="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-primary rounded-full transition-all duration-300" style="width:${progress}%"></div></div></div>`;

    // question card
    html += '<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">';
    if (q.question.description) html += `<p class="text-xs text-slate-400 mb-2">${q.question.description}</p>`;
    html += `<h2 class="text-base font-medium text-slate-800 leading-relaxed">${q.question.title}</h2></div>`;

    // options
    // 选项随机排列
    const shuffledOptions = shuffle(q.question.options);
    html += '<div class="space-y-2 mb-6">';
    shuffledOptions.forEach((opt, oi) => {
      const isThis = ansId === opt.id;
      let cls = 'w-full text-left p-4 rounded-xl border transition-all cursor-pointer ';
      if (isThis) cls += 'border-primary bg-primary/5 ring-1 ring-primary/20';
      else cls += 'border-slate-200 bg-white hover:border-primary/30 hover:bg-slate-50';

      html += `<button class="${cls}" data-opt="${opt.id}">`;
      html += '<div class="flex items-start gap-3">';
      const circleCls = isThis ? 'bg-primary text-white border-primary' : 'border-slate-300 text-slate-500';
      html += `<span class="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${circleCls}">${opt.label}</span>`;
      html += `<span class="text-sm text-slate-700 leading-relaxed pt-0.5">${opt.text}</span>`;
      html += '</div></button>';
    });
    html += '</div>';

    // next button
    const nextDisabled = !ansId;
    const nextCls = nextDisabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 shadow-sm';
    html += `<div class="flex justify-end"><button id="btn-next" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${nextCls}" ${nextDisabled ? 'disabled' : ''}>${isLast ? '查看结果' : '下一题'}<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button></div>`;

    if (phase === 'adaptive' && idx === generalQ.length) {
      html += '<div class="mt-4 text-center"><p class="text-xs text-slate-400">接下来会问你一些更具体的问题，帮你缩小方向</p></div>';
    }
    html += '</div>';
    render(html);

    // bind events
    document.querySelectorAll('[data-opt]').forEach(btn => {
      btn.onclick = () => {
        const optId = btn.getAttribute('data-opt');
        responses[q.question.id] = optId;
        renderQuestion();
      };
    });

    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.onclick = handleNext;
  }

  function handleNext() {
    const q = allQ[idx];
    if (!q || !responses[q.question.id]) return;

    const isLastGen = phase === 'general' && idx === generalQ.length - 1;

    if (isLastGen) {
      const raw = computeBucketScores(responses);
      const norm = normalizeScores(raw);
      const usedIds = new Set(generalQ.map(x => x.question.id));
      const adp = buildAdaptivePhase(raw, norm, usedIds);

      bucketScores = raw;
      userType = adp.uType;
      humanitiesProtected = adp.hp;

      const items = [];
      let ord = generalQ.length + 1;
      for (const x of [...adp.branchQs, ...adp.crossQs, ...adp.riskQs]) {
        items.push({ question: x, phase: 'branch', order: ord++ });
      }
      adaptiveQ = items;
      allQ = [...generalQ, ...adaptiveQ];
      phase = 'adaptive';
      idx++;
      renderQuestion();
      return;
    }

    const isLastAll = phase === 'adaptive' && idx === allQ.length - 1;

    if (isLastAll) {
      const tags = collectRiskTags(responses);
      const payload = {
        bucketScores: bucketScores ?? computeBucketScores(responses),
        userType: userType ?? 'exploratory',
        humanitiesProtected,
        riskTags: tags,
        responses,
        generalCount: generalQ.length,
        totalCount: allQ.length,
      };
      try { sessionStorage.setItem('majornav_test_results', JSON.stringify(payload)); } catch (e) { /* noop */ }
      phase = 'done';
      window.location.href = '/report';
      return;
    }

    idx++;
    renderQuestion();
  }

  // ─── boot ───

  function boot() {
    bank = window.__QUESTION_BANK__;
    if (!bank || !bank.questions || bank.questions.length === 0) {
      const r = root();
      if (r) r.innerHTML = '<div class="py-16 text-center text-slate-400"><p>题库加载失败，请刷新页面重试</p></div>';
      return;
    }
    viewStart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
