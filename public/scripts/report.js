/**
 * 测试报告引擎 — 纯原生 JS，零框架，秒加载
 *
 * 从 sessionStorage 读取测试结果，从 window.__QUESTION_BANK__ 读取题库，
 * 本地运行评分引擎生成完整推荐结果并渲染报告。
 *
 * AI 不参与任何评分计算。
 */

(function () {
  'use strict';

  var ROOT_ID = 'report-root';

  // ─── 常量 ───

  var BUCKETS = ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'];
  var BUCKET_LABELS = { humanities: '人文', social_science: '社科', business: '商科', stem: '理工', life_health: '生命健康', art_creative: '艺术创作' };
  var BUCKET_ICONS = { humanities: '📖', social_science: '⚖️', business: '📊', stem: '🔧', life_health: '💊', art_creative: '🎨' };

  var DIMENSION_LABELS = {
    math_logic: '数理逻辑', reading_expression: '阅读表达', interpersonal: '人际沟通',
    business_sense: '商业意识', engineering_practice: '动手实践', info_systems: '信息系统',
    life_health_interest: '生命健康', aesthetic_creation: '审美创作', abstract_theory: '抽象思维',
    stable_path: '稳定导向', rule_detail: '规则细节',
  };

  var DIMENSION_ICONS = {
    math_logic: '🧮', reading_expression: '📝', interpersonal: '🤝',
    business_sense: '💼', engineering_practice: '🔨', info_systems: '💻',
    life_health_interest: '🫀', aesthetic_creation: '✨', abstract_theory: '🧠',
    stable_path: '🛡️', rule_detail: '📐',
  };

  var RISK_LABELS = {
    trend_chasing: '热门跟风', salary_misconception: '薪资预期偏差', info_bubble: '信息茧房',
    long_cycle: '长周期高投入', reading_writing_aversion: '排斥大量读写',
    rule_detail_aversion: '排斥规则细节', hands_on_aversion: '排斥动手操作',
    name_misconception: '名字误解', surface_interest: '表面兴趣', arts_science_mismatch: '文理不匹配',
  };

  // ─── 文案常量（所有中文 UI 文案集中管理）───

  var TXT = {};
  TXT.loading = '报告加载中…';
  TXT.loadFail = '题库加载失败，请刷新页面重试';
  TXT.noResult = '没有找到测试结果';
  TXT.noResultHint = '你可能还没有完成测试，或者测试结果已经过期';
  TXT.startTest = '开始测试';
  TXT.disclaimer1 = '本测试仅供初步了解专业方向，不构成志愿填报建议。最终选择请结合你的高考分数、位次、目标院校、家庭情况和个人规划综合判断。本站不提供院校推荐、分数位次分析和录取概率预测。';
  TXT.disclaimer2 = '本测试结果仅供了解专业方向的参考，不是志愿填报结论。测试不包含院校推荐、分数位次分析和录取概率预测。最终选择哪个专业，需要你结合高考成绩、目标院校、家庭情况和个人目标综合判断。我们建议你把这里的推荐当作一个探索起点，而不是最终答案。';
  TXT.disclaimer3 = '专业不迷路 · 公益项目 · 核心功能永久免费';
  TXT.profileTitle = '你的方向画像';
  TXT.profileSub = '基于你的答题偏好，勾勒出大致的方向轮廓';
  TXT.confidence = '置信度：';
  TXT.confHigh = '较高';
  TXT.confMedium = '中等';
  TXT.confLow = '偏开放';
  TXT.disciplineTitle = '推荐了解的学科门类';
  TXT.disciplineSub = '以下学科门类与你的方向偏好较为匹配';
  TXT.dimensionTitle = '你的能力倾向';
  TXT.dimensionSub = '这不是测评，只是帮你看到自己在哪些维度上更感兴趣';
  TXT.dimHigh = '比较突出的方面：';
  TXT.dimMid = '有一定倾向的方面：';
  TXT.recommendedTitle = '建议优先了解';
  TXT.recommendedSub = '这些专业类与你的方向偏好比较匹配，可以从这里开始深入探索';
  TXT.recommendedBadge = '建议优先了解';
  TXT.optionalTitle = '可以继续看看';
  TXT.optionalSub = '这些方向也有一定的匹配度，万一你在这里找到意外之喜呢';
  TXT.optionalBadge = '可以继续看看';
  TXT.cautiousTitle = '建议谨慎了解';
  TXT.cautiousSub = '这些方向你可能感兴趣，但有一些需要先看清楚的地方——不是说不能选';
  TXT.cautiousBadge = '建议谨慎了解';
  TXT.riskTitle = '避坑提醒';
  TXT.riskSub = '基于你的答题发现的一些风险信号，不是否定——只是提醒你多看一眼';
  TXT.nextTitle = '下一步建议';
  TXT.nextSub = '几个温和的行动建议，不替你做决定——选择权一直在你手里';
  TXT.browseCatalog = '浏览完整专业目录';
  TXT.feedbackTitle = '反馈 & 帮助改进';
  TXT.feedbackSub = '如果你觉得结果不准、题目没问对、推荐方向不对——请告诉我们';
  TXT.feedbackPrivacyTitle = '你的隐私很安全';
  TXT.feedbackPrivacyLines = [
    '默认不保存任何答案（只有你主动提交才记录）',
    '不收集姓名、手机号、身份证、准考证号',
    '不收集具体分数、成绩、排名',
    '提交后仅用于算法和题库优化，不会用于其他目的',
  ];
  TXT.feedbackBtn = '匿名提交这次结果，帮助我们改进';
  TXT.feedbackExternalNote = '点击后将跳转到外部问卷链接（匿名），请放心填写';
  TXT.feedbackContributeLink = '参与内容共建';
  TXT.feedbackContributeNote = '你是大学生？想补充专业内容或纠错？';
  TXT.importantNotice = '重要提醒';
  TXT.retest = '重新测试';
  TXT.browseMajors = '浏览专业目录';
  TXT.goHome = '回到首页';
  TXT.viewDetail = '查看详情';
  TXT.priorityTag = '优先';
  TXT.aiTitle = '大白话说说你的方向';
  TXT.aiSub = '帮你用人话理解上面的结果——这不是结论，是参考';
  TXT.aiLoading = '正在帮你组织语言…';
  TXT.aiTemplateNote = '（当前使用模板解释，不影响核心结果）';

  // ─── 数据映射（inlined from recommendationWeights.ts）───

  var BUCKET_TO_DISCIPLINES = {
    humanities: [{ gateCode: '05', weight: 40 }, { gateCode: '01', weight: 30 }, { gateCode: '06', weight: 30 }],
    social_science: [{ gateCode: '03', weight: 50 }, { gateCode: '04', weight: 30 }, { gateCode: '12', weight: 20 }],
    business: [{ gateCode: '02', weight: 45 }, { gateCode: '12', weight: 55 }],
    stem: [{ gateCode: '08', weight: 60 }, { gateCode: '07', weight: 40 }],
    life_health: [{ gateCode: '10', weight: 60 }, { gateCode: '09', weight: 25 }, { gateCode: '07', weight: 15 }],
    art_creative: [{ gateCode: '13', weight: 100 }],
  };

  var DIMENSION_TO_BUCKET = {
    math_logic: { stem: 30, business: 20 },
    reading_expression: { humanities: 35, social_science: 25 },
    interpersonal: { social_science: 30, life_health: 25, business: 15, humanities: 10 },
    business_sense: { business: 40, stem: 15 },
    engineering_practice: { stem: 40, art_creative: 10 },
    info_systems: { stem: 35, business: 15 },
    life_health_interest: { life_health: 45 },
    aesthetic_creation: { art_creative: 45, humanities: 10 },
    abstract_theory: { humanities: 20, stem: 20, social_science: 10 },
    stable_path: { business: 20, social_science: 15, life_health: 15 },
    rule_detail: { social_science: 20, business: 20, life_health: 10 },
  };

  var GATE_PRIORITY_CATEGORIES = {
    '01': [{ categorySlug: 'philosophy-class', buckets: ['humanities'], weight: 100 }],
    '02': [{ categorySlug: 'economics-class', buckets: ['business'], weight: 50 }, { categorySlug: 'finance', buckets: ['business'], weight: 30 }, { categorySlug: 'international-trade', buckets: ['business'], weight: 20 }],
    '03': [{ categorySlug: 'law-class', buckets: ['social_science'], weight: 50 }, { categorySlug: 'political-science', buckets: ['social_science'], weight: 25 }, { categorySlug: 'sociology', buckets: ['social_science'], weight: 25 }],
    '04': [{ categorySlug: 'education', buckets: ['social_science'], weight: 60 }, { categorySlug: 'physical-education', buckets: ['social_science'], weight: 40 }],
    '05': [{ categorySlug: 'chinese-literature', buckets: ['humanities'], weight: 40 }, { categorySlug: 'foreign-languages', buckets: ['humanities'], weight: 30 }, { categorySlug: 'journalism', buckets: ['humanities', 'social_science'], weight: 30 }],
    '06': [{ categorySlug: 'history-class', buckets: ['humanities'], weight: 100 }],
    '07': [{ categorySlug: 'mathematics', buckets: ['stem'], weight: 25 }, { categorySlug: 'physics', buckets: ['stem'], weight: 20 }, { categorySlug: 'chemistry', buckets: ['stem'], weight: 15 }, { categorySlug: 'biology', buckets: ['stem', 'life_health'], weight: 20 }, { categorySlug: 'statistics', buckets: ['stem', 'business'], weight: 20 }],
    '08': [{ categorySlug: 'computer-science', buckets: ['stem'], weight: 15 }, { categorySlug: 'electronic-information', buckets: ['stem'], weight: 12 }, { categorySlug: 'automation', buckets: ['stem'], weight: 8 }, { categorySlug: 'mechanical', buckets: ['stem'], weight: 8 }, { categorySlug: 'electrical', buckets: ['stem'], weight: 6 }, { categorySlug: 'civil-engineering', buckets: ['stem'], weight: 5 }, { categorySlug: 'materials', buckets: ['stem'], weight: 5 }, { categorySlug: 'architecture', buckets: ['stem', 'art_creative'], weight: 5 }, { categorySlug: 'aerospace', buckets: ['stem'], weight: 4 }, { categorySlug: 'biomedical-eng', buckets: ['stem', 'life_health'], weight: 4 }],
    '09': [{ categorySlug: 'plant-production', buckets: ['life_health'], weight: 30 }, { categorySlug: 'environmental-ecology', buckets: ['life_health', 'stem'], weight: 25 }, { categorySlug: 'veterinary', buckets: ['life_health'], weight: 25 }, { categorySlug: 'animal-production', buckets: ['life_health'], weight: 20 }],
    '10': [{ categorySlug: 'clinical-medicine', buckets: ['life_health'], weight: 30 }, { categorySlug: 'pharmacy', buckets: ['life_health'], weight: 20 }, { categorySlug: 'nursing', buckets: ['life_health'], weight: 15 }, { categorySlug: 'stomatology', buckets: ['life_health'], weight: 10 }, { categorySlug: 'public-health', buckets: ['life_health', 'social_science'], weight: 15 }, { categorySlug: 'medical-technology', buckets: ['life_health', 'stem'], weight: 10 }],
    '12': [{ categorySlug: 'business-administration', buckets: ['business'], weight: 35 }, { categorySlug: 'public-administration', buckets: ['business', 'social_science'], weight: 20 }, { categorySlug: 'management-science', buckets: ['business', 'stem'], weight: 15 }, { categorySlug: 'e-commerce', buckets: ['business'], weight: 15 }, { categorySlug: 'tourism-management', buckets: ['business'], weight: 15 }],
    '13': [{ categorySlug: 'design', buckets: ['art_creative', 'stem'], weight: 30 }, { categorySlug: 'fine-arts', buckets: ['art_creative'], weight: 25 }, { categorySlug: 'drama-film', buckets: ['art_creative'], weight: 20 }, { categorySlug: 'music-dance', buckets: ['art_creative'], weight: 25 }],
    '14': [{ categorySlug: 'interdisciplinary-class', buckets: ['stem', 'life_health'], weight: 100 }],
  };

  var RISK_CATEGORY_PENALTIES = {
    trend_chasing: { slugs: ['computer-science', 'electronic-information', 'finance', 'business-administration'], penalty: 15, reason: '你可能因为热门才关注这个方向，建议先看看它到底学什么' },
    salary_misconception: { slugs: ['computer-science', 'finance', 'business-administration'], penalty: 10, reason: '高薪不等于适合你，建议先了解真实学习内容和压力' },
    info_bubble: { slugs: [], penalty: 0, reason: '你可能只接触到少数几个专业方向，建议拓宽了解范围' },
    long_cycle: { slugs: ['clinical-medicine', 'stomatology', 'law-class'], penalty: 20, reason: '这个方向学习周期很长（5-8年），需要做好心理准备' },
    reading_writing_aversion: { slugs: ['law-class', 'chinese-literature', 'journalism', 'history-class', 'sociology'], penalty: 25, reason: '你似乎不太喜欢大量读写，但这个方向需要很多阅读和写作' },
    rule_detail_aversion: { slugs: ['law-class', 'finance', 'public-administration', 'clinical-medicine'], penalty: 20, reason: '这个方向需要和大量规则、细节打交道' },
    hands_on_aversion: { slugs: ['mechanical', 'electrical', 'electronic-information', 'civil-engineering', 'plant-production'], penalty: 20, reason: '你似乎不太喜欢动手操作，但这个方向有不少实验和实践' },
    name_misconception: { slugs: ['business-administration', 'public-administration'], penalty: 10, reason: '你可能对这个专业的名字有误解，建议先看看详情页' },
    surface_interest: { slugs: [], penalty: 0, reason: '你对这个方向的兴趣可能来自表面印象，建议深入了解再做判断' },
    arts_science_mismatch: { slugs: ['computer-science', 'electronic-information', 'automation', 'electrical'], penalty: 30, reason: '你的选科背景和这个方向不太匹配' },
  };

  var PROFILE_TEMPLATES = {
    humanities: { name: '偏感性的人文表达型', summary: '你喜欢用文字和思想来理解世界，对语言、文学和思辨有天然的亲近感。建议优先了解文学、哲学、历史学等方向。' },
    social_science: { name: '偏理性的社会关怀型', summary: '你对社会怎么运作、人和人之间的关系有很强的好奇心。法学、教育、公共管理可能是你的菜。' },
    business: { name: '偏实务的商业管理型', summary: '你对商业规则、资源组织和效率有天然的敏感。经济学、管理学和金融方向值得深入了解。' },
    stem: { name: '偏逻辑的理工探索型', summary: '你喜欢用逻辑和数学来看世界，对技术、系统和如何建造东西有热情。理工科方向有丰富的选择。' },
    life_health: { name: '偏实践的生命关怀型', summary: '你对生命、健康和自然世界有真诚的关注。医学、药学、农学等方向可能让你找到意义感。' },
    art_creative: { name: '偏直觉的艺术创作型', summary: '你喜欢用创作来表达自己，对美和形式有敏感的判断。艺术和设计方向能让你把天赋变成专业。' },
  };
  var MIXED_PROFILE = { name: '多元探索型', summary: '你的兴趣比较多元，在多个方向都有体现。这未必是坏事——很多有意思的方向恰好是交叉领域。建议你从下面挑最感兴趣的 2-3 个深入了解。' };

  var CAT_NAME_MAP = {
    'philosophy-class': '哲学类', 'economics-class': '经济学类', 'finance': '金融学类',
    'international-trade': '经济与贸易类', 'law-class': '法学类', 'political-science': '政治学类',
    'sociology': '社会学类', 'education': '教育学类', 'physical-education': '体育学类',
    'chinese-literature': '中国语言文学类', 'foreign-languages': '外国语言文学类',
    'journalism': '新闻传播学类', 'history-class': '历史学类', 'mathematics': '数学类',
    'physics': '物理学类', 'chemistry': '化学类', 'biology': '生物科学类',
    'statistics': '统计学类', 'computer-science': '计算机类', 'electronic-information': '电子信息类',
    'automation': '自动化类', 'mechanical': '机械类', 'electrical': '电气类',
    'civil-engineering': '土木类', 'materials': '材料类', 'architecture': '建筑类',
    'aerospace': '航空航天类', 'biomedical-eng': '生物医学工程类', 'plant-production': '植物生产类',
    'environmental-ecology': '自然保护与环境生态类', 'veterinary': '动物医学类',
    'animal-production': '动物生产类', 'clinical-medicine': '临床医学类', 'pharmacy': '药学类',
    'nursing': '护理学类', 'stomatology': '口腔医学类', 'public-health': '公共卫生与预防医学类',
    'medical-technology': '医学技术类', 'business-administration': '工商管理类',
    'public-administration': '公共管理类', 'management-science': '管理科学与工程类',
    'e-commerce': '电子商务类', 'tourism-management': '旅游管理类', 'design': '设计学类',
    'fine-arts': '美术学类', 'drama-film': '戏剧与影视学类', 'music-dance': '音乐与舞蹈学类',
    'interdisciplinary-class': '交叉学科类',
  };

  var GATE_META = {
    '01': { name: '哲学', slug: 'philosophy', icon: '💡' },
    '02': { name: '经济学', slug: 'economics', icon: '📊' },
    '03': { name: '法学', slug: 'law', icon: '⚖️' },
    '04': { name: '教育学', slug: 'pedagogy', icon: '📚' },
    '05': { name: '文学', slug: 'literature', icon: '✍️' },
    '06': { name: '历史学', slug: 'history', icon: '🏛️' },
    '07': { name: '理学', slug: 'science', icon: '🔬' },
    '08': { name: '工学', slug: 'engineering', icon: '🔧' },
    '09': { name: '农学', slug: 'agronomy', icon: '🌾' },
    '10': { name: '医学', slug: 'medicine', icon: '💊' },
    '12': { name: '管理学', slug: 'management', icon: '📋' },
    '13': { name: '艺术学', slug: 'art', icon: '🎨' },
    '14': { name: '交叉学科', slug: 'interdisciplinary', icon: '🔗' },
  };

  // ─── 评分引擎 ───

  function computeBucketScores(bank, responses) {
    var scores = { humanities: 0, social_science: 0, business: 0, stem: 0, life_health: 0, art_creative: 0 };
    Object.keys(responses).forEach(function (qId) {
      var q = bank.questions.find(function (x) { return x.id === qId; });
      if (!q) return;
      var opt = q.options.find(function (o) { return o.id === responses[qId]; });
      if (!opt) return;
      (opt.scoreEffects || []).forEach(function (eff) {
        if (BUCKETS.indexOf(eff.target) >= 0) scores[eff.target] += eff.points;
      });
    });
    return scores;
  }

  function normalizeScores(scores) {
    var vals = Object.values(scores);
    var min = Math.min.apply(null, vals);
    var max = Math.max.apply(null, vals);
    if (max === min) {
      var copy = {};
      BUCKETS.forEach(function (k) { copy[k] = scores[k]; });
      return copy;
    }
    var out = {};
    BUCKETS.forEach(function (k) { out[k] = Math.round(((scores[k] - min) / (max - min)) * 100); });
    return out;
  }

  function computeDimensionScores(bank, responses) {
    var scores = { math_logic: 0, reading_expression: 0, interpersonal: 0, business_sense: 0, engineering_practice: 0, info_systems: 0, life_health_interest: 0, aesthetic_creation: 0, abstract_theory: 0, stable_path: 0, rule_detail: 0 };
    Object.keys(responses).forEach(function (qId) {
      var q = bank.questions.find(function (x) { return x.id === qId; });
      if (!q) return;
      var opt = q.options.find(function (o) { return o.id === responses[qId]; });
      if (!opt) return;
      (opt.scoreEffects || []).forEach(function (eff) {
        if (scores.hasOwnProperty(eff.target)) scores[eff.target] += eff.points;
      });
    });
    return scores;
  }

  function computeRefinedBucketScores(rawBucketScores, dimScores) {
    var dimBucketScores = { humanities: 0, social_science: 0, business: 0, stem: 0, life_health: 0, art_creative: 0 };
    Object.keys(DIMENSION_TO_BUCKET).forEach(function (dim) {
      var dimScore = dimScores[dim] || 0;
      var map = DIMENSION_TO_BUCKET[dim];
      Object.keys(map).forEach(function (bucket) {
        dimBucketScores[bucket] += (dimScore * map[bucket]) / 100;
      });
    });
    var refined = {};
    BUCKETS.forEach(function (k) {
      refined[k] = Math.round(rawBucketScores[k] * 0.4 + dimBucketScores[k] * 0.6);
    });
    return normalizeScores(refined);
  }

  function generateDisciplineRecommendations(bucketScores) {
    var gateScores = new Map();
    Object.keys(BUCKET_TO_DISCIPLINES).forEach(function (bucket) {
      var bucketScore = bucketScores[bucket] || 0;
      var discList = BUCKET_TO_DISCIPLINES[bucket];
      discList.forEach(function (d) {
        var contrib = (bucketScore * d.weight) / 100;
        var existing = gateScores.get(d.gateCode);
        if (!existing || contrib > existing.score) {
          gateScores.set(d.gateCode, { score: contrib, primaryBucket: bucket });
        } else {
          existing.score += contrib * 0.3;
        }
      });
    });
    var sorted = Array.from(gateScores.entries()).sort(function (a, b) { return b[1].score - a[1].score; });
    return sorted.map(function (entry, i) {
      var code = entry[0];
      var info = entry[1];
      var meta = GATE_META[code] || { name: code, slug: '', icon: '📚' };
      var bl = BUCKET_LABELS[info.primaryBucket] || '综合';
      return {
        code: code, name: meta.name, slug: meta.slug, icon: meta.icon,
        tier: i < 2 ? 'primary' : 'secondary',
        score: Math.round(info.score),
        reason: '你的「' + bl + '」方向偏好较高，' + meta.name + '是该方向的核心门类',
      };
    }).filter(function (d) { return d.score >= 20; });
  }

  function getTopDimensions(dimScores, buckets, n) {
    var bucketSet = {};
    buckets.forEach(function (b) { bucketSet[b] = true; });
    return Object.keys(dimScores)
      .filter(function (dim) {
        var map = DIMENSION_TO_BUCKET[dim];
        return map && Object.keys(map).some(function (b) { return bucketSet[b]; });
      })
      .sort(function (a, b) { return dimScores[b] - dimScores[a]; })
      .slice(0, n);
  }

  function generateCategoryRecommendations(bucketScores, dimScores, riskTags, topDisciplines) {
    var scored = [];
    var gateCodes = {};
    topDisciplines.forEach(function (d) { gateCodes[d.code] = true; });

    Object.keys(GATE_PRIORITY_CATEGORIES).forEach(function (gateCode) {
      if (!gateCodes[gateCode]) return;
      var cats = GATE_PRIORITY_CATEGORIES[gateCode];
      cats.forEach(function (cat) {
        var score = 0, totalWeight = 0;
        cat.buckets.forEach(function (bucket) {
          var bs = bucketScores[bucket] || 0;
          score += bs * cat.weight;
          totalWeight += cat.weight;
        });
        if (totalWeight > 0) score = score / totalWeight;
        var topDims = getTopDimensions(dimScores, cat.buckets, 2);
        scored.push({
          name: CAT_NAME_MAP[cat.categorySlug] || cat.categorySlug,
          gate: (GATE_META[gateCode] || {}).name || gateCode,
          gateSlug: (GATE_META[gateCode] || {}).slug || '',
          slug: cat.categorySlug,
          code: gateCode,
          score: Math.round(score),
          reason: topDims.length > 0 ? '你的「' + topDims.map(function (d) { return DIMENSION_LABELS[d]; }).join('、') + '」维度得分较高' : '与你的方向偏好匹配',
          topDimensions: topDims.map(function (d) { return DIMENSION_LABELS[d]; }),
          cautions: [],
        });
      });
    });

    var penalized = new Map();
    riskTags.forEach(function (tag) {
      var rule = RISK_CATEGORY_PENALTIES[tag];
      if (!rule) return;
      rule.slugs.forEach(function (slug) {
        var existing = penalized.get(slug);
        penalized.set(slug, {
          penalty: Math.max((existing && existing.penalty) || 0, rule.penalty),
          reason: existing ? existing.reason + '；' + rule.reason : rule.reason,
        });
      });
    });

    var recommended = [], optional = [], cautious = [];
    scored.sort(function (a, b) { return b.score - a.score; });

    scored.forEach(function (cat) {
      var penalty = penalized.get(cat.slug);
      if (penalty) {
        cat.score = Math.max(0, cat.score - penalty.penalty);
        cat.cautions.push(penalty.reason);
        cautious.push(cat);
      } else if (cat.score >= 55) {
        recommended.push(cat);
      } else if (cat.score >= 35) {
        optional.push(cat);
      }
    });

    return {
      recommended: recommended.slice(0, 5),
      optional: optional.slice(0, 4),
      cautious: cautious.slice(0, 4),
    };
  }

  function generateRiskResults(riskTags) {
    return riskTags.map(function (tag) {
      var rule = RISK_CATEGORY_PENALTIES[tag] || { slugs: [], reason: '' };
      return { tag: tag, label: RISK_LABELS[tag] || tag, description: rule.reason || '', affectedCategories: rule.slugs || [] };
    });
  }

  function determineConfidence(bucketScores, userType) {
    var sorted = Object.entries(bucketScores).sort(function (a, b) { return b[1] - a[1]; });
    var gap = (sorted[0] || [0, 0])[1] - (sorted[1] || [0, 0])[1];
    if (userType === 'single' && gap >= 10) {
      return { level: 'high', note: '你的方向偏好比较明确，建议优先深入了解推荐的专业类' };
    }
    if (userType === 'dual') {
      return { level: 'medium', note: '你的兴趣在两个方向都有体现，可以都了解看看，不急着决定' };
    }
    return { level: 'low', note: '你目前的方向还比较开放，这很正常。建议从推荐的专业类中挑感兴趣的，慢慢了解' };
  }

  function generateProfile(bucketScores, userType) {
    var sorted = Object.entries(bucketScores).sort(function (a, b) { return b[1] - a[1]; });
    var topBuckets = sorted.slice(0, 3).map(function (entry) {
      return { bucket: entry[0], label: BUCKET_LABELS[entry[0]] || entry[0], score: Math.round(entry[1]) };
    });
    if (userType === 'exploratory') {
      return { name: MIXED_PROFILE.name, summary: MIXED_PROFILE.summary, topBuckets: topBuckets };
    }
    if (userType === 'dual') {
      var b1 = BUCKET_LABELS[sorted[0][0]] || '';
      var b2 = BUCKET_LABELS[sorted[1][0]] || '';
      return { name: b1 + '\u00d7' + b2 + ' 双主线型', summary: '你既有' + b1 + '倾向也有' + b2 + '倾向，在两者的交叉地带可能有意想不到的发现。', topBuckets: topBuckets };
    }
    var primary = sorted[0][0];
    var tpl = PROFILE_TEMPLATES[primary] || PROFILE_TEMPLATES.humanities;
    return { name: tpl.name, summary: tpl.summary, topBuckets: topBuckets };
  }

  function generateDimensionProfile(dimScores) {
    return Object.keys(dimScores)
      .sort(function (a, b) { return dimScores[b] - dimScores[a]; })
      .map(function (dim) {
        var score = Math.round(dimScores[dim]);
        return { dimension: dim, label: DIMENSION_LABELS[dim] || dim, score: score, level: score >= 40 ? 'high' : score >= 15 ? 'mid' : 'low' };
      });
  }

  function buildNextSteps(profileName, recommended, cautious, confidence) {
    var steps = [];
    if (confidence === 'low') {
      steps.push('你的方向还比较开放，不用急着定。从「建议优先了解」的专业类中挑 2-3 个感兴趣的，点进去看看实际学什么');
    } else {
      steps.push('优先了解推荐的专业类，点击进入详情页看看大学到底学什么');
    }
    if (recommended.length > 0) {
      steps.push('「' + recommended[0].name + '」是你得分最高的方向，从它的详情页开始了解是个好起点');
    }
    if (cautious.length > 0) {
      steps.push('有 ' + cautious.length + ' 个方向放入了「建议谨慎了解」区，不是说你不能选，而是建议先看清楚再决定');
    }
    steps.push('本测试只是认知工具——帮你缩小了解范围，最终选择还需结合你的分数、位次、学校和家庭情况');
    return steps;
  }

  function generateResult(bank, responses, riskTags, userType) {
    var raw = computeBucketScores(bank, responses);
    var dim = computeDimensionScores(bank, responses);
    var refined = computeRefinedBucketScores(raw, dim);
    var disc = generateDisciplineRecommendations(refined);
    var cats = generateCategoryRecommendations(refined, dim, riskTags, disc);
    var risks = generateRiskResults(riskTags);
    var conf = determineConfidence(refined, userType);
    var prof = generateProfile(refined, userType);
    var dims = generateDimensionProfile(dim);
    var steps = buildNextSteps(prof.name, cats.recommended, cats.cautious, conf.level);

    return {
      profileName: prof.name, profileSummary: prof.summary, topBuckets: prof.topBuckets,
      dimensions: dims, topDisciplines: disc,
      recommendedCategories: cats.recommended, optionalCategories: cats.optional,
      cautiousCategories: cats.cautious, riskTags: risks,
      userType: userType, confidenceLevel: conf.level, confidenceNote: conf.note,
      nextStepSuggestions: steps,
    };
  }

  // ─── DOM 工具 ───

  function el(tag, attrs) {
    var children = [];
    for (var i = 2; i < arguments.length; i++) children.push(arguments[i]);
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') { e.className = attrs[k]; }
        else if (k === 'innerHTML') { e.innerHTML = attrs[k]; }
        else if (k === 'style') { e.setAttribute('style', attrs[k]); }
        else if (k === 'href') { e.setAttribute('href', attrs[k]); }
        else if (k.charAt(0) === 'o' && k.charAt(1) === 'n') { e.addEventListener(k.slice(2).toLowerCase(), attrs[k]); }
        else { e.setAttribute(k, attrs[k]); }
      });
    }
    children.forEach(function (c) {
      if (typeof c === 'string') { e.appendChild(document.createTextNode(c)); }
      else if (c) { e.appendChild(c); }
    });
    return e;
  }

  function rootEl() { return document.getElementById(ROOT_ID); }

  function scoreBar(score, width) {
    var color = score >= 70 ? 'bg-accent' : score >= 50 ? 'bg-primary' : 'bg-warning';
    return el('div', { className: 'h-2 bg-slate-100 rounded-full overflow-hidden', style: 'width:' + (width || '100%') },
      el('div', { className: 'h-full ' + color + ' rounded-full transition-all duration-500', style: 'width:' + score + '%' })
    );
  }

  // ─── 渲染函数 ───

  function renderEmptyState() {
    var r = rootEl();
    r.innerHTML = '';
    r.appendChild(
      el('div', { className: 'max-w-xl mx-auto px-4 py-16 text-center' },
        el('div', { className: 'text-4xl mb-4' }, '📭'),
        el('h1', { className: 'text-xl font-bold text-slate-900 mb-2' }, TXT.noResult),
        el('p', { className: 'text-sm text-slate-500 mb-6' }, TXT.noResultHint),
        el('a', { href: '/test', className: 'inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm text-sm' },
          TXT.startTest, el('span', { className: 'text-base' }, '\u2192')
        )
      )
    );
  }

  function renderDisclaimer() {
    return el('div', { className: 'bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6' },
      el('p', { className: 'text-xs text-amber-700 leading-relaxed' }, TXT.disclaimer1)
    );
  }

  function renderProfile(result) {
    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    var header = el('div', { className: 'flex items-center gap-3 mb-4' },
      el('span', { className: 'text-2xl' }, '🧭'),
      el('div', {},
        el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.profileTitle),
        el('p', { className: 'text-xs text-slate-400' }, TXT.profileSub)
      )
    );
    container.appendChild(header);

    container.appendChild(
      el('div', { className: 'bg-primary-light border border-primary-border rounded-lg p-4 mb-5' },
        el('p', { className: 'text-sm font-semibold text-primary mb-1' }, result.profileName),
        el('p', { className: 'text-sm text-slate-600 leading-relaxed' }, result.profileSummary)
      )
    );

    var bars = el('div', { className: 'space-y-3' });
    result.topBuckets.forEach(function (tb) {
      bars.appendChild(
        el('div', { className: 'flex items-center gap-3' },
          el('span', { className: 'text-sm w-16 shrink-0 text-slate-600' }, (BUCKET_ICONS[tb.bucket] || '📚') + ' ' + tb.label),
          el('div', { className: 'flex-1' }, scoreBar(tb.score)),
          el('span', { className: 'text-xs font-medium text-slate-500 w-8 text-right' }, '' + tb.score)
        )
      );
    });
    container.appendChild(bars);

    var levelMap = { high: TXT.confHigh, medium: TXT.confMedium, low: TXT.confLow };
    var colorMap = { high: 'text-accent', medium: 'text-primary', low: 'text-warning' };
    container.appendChild(
      el('div', { className: 'mt-4 pt-4 border-t border-slate-100 flex items-center gap-2' },
        el('span', { className: 'text-xs ' + (colorMap[result.confidenceLevel] || 'text-slate-400') }, TXT.confidence + (levelMap[result.confidenceLevel] || '')),
        el('span', { className: 'text-xs text-slate-400' }, result.confidenceNote)
      )
    );
    return container;
  }

  function renderDisciplines(result) {
    var discs = result.topDisciplines;
    if (!discs || discs.length === 0) return document.createTextNode('');

    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '📚'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.disciplineTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.disciplineSub)
        )
      )
    );

    var grid = el('div', { className: 'grid grid-cols-2 gap-3' });
    discs.slice(0, 6).forEach(function (d) {
      var isPrimary = d.tier === 'primary';
      var card = el('a', {
        href: '/majors/' + d.slug,
        className: 'block p-3 rounded-lg border transition-colors ' + (isPrimary ? 'border-primary-border bg-primary-light hover:bg-primary-light/70' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'),
      },
        el('div', { className: 'flex items-center gap-2 mb-1' },
          el('span', { className: 'text-base' }, d.icon),
          el('span', { className: 'text-sm font-medium ' + (isPrimary ? 'text-primary' : 'text-slate-700') }, d.name)
        ),
        el('p', { className: 'text-[11px] text-slate-400 leading-relaxed' }, d.reason.length > 40 ? d.reason.slice(0, 40) + '\u2026' : d.reason)
      );
      if (isPrimary) {
        card.firstChild.appendChild(el('span', { className: 'text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full ml-1.5' }, TXT.priorityTag));
      }
      grid.appendChild(card);
    });
    container.appendChild(grid);
    return container;
  }

  function renderDimensionProfile(result) {
    var dims = result.dimensions;
    if (!dims || dims.length === 0) return document.createTextNode('');

    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '📐'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.dimensionTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.dimensionSub)
        )
      )
    );

    var highList = dims.filter(function (d) { return d.level === 'high'; });
    var midList = dims.filter(function (d) { return d.level === 'mid'; });

    if (highList.length > 0) {
      var highRow = el('div', { className: 'flex flex-wrap gap-2 mb-3' });
      highList.forEach(function (d) {
        highRow.appendChild(
          el('span', { className: 'inline-flex items-center gap-1 text-xs bg-accent-light border border-accent-border text-accent px-2.5 py-1 rounded-full font-medium' },
            (DIMENSION_ICONS[d.dimension] || '\u25cf') + ' ' + d.label
          )
        );
      });
      container.appendChild(el('p', { className: 'text-[11px] text-slate-400 mb-2' }, '\ud83d\udca1 ' + TXT.dimHigh));
      container.appendChild(highRow);
    }

    if (midList.length > 0) {
      var midRow = el('div', { className: 'flex flex-wrap gap-2' });
      midList.forEach(function (d) {
        midRow.appendChild(
          el('span', { className: 'inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full' },
            (DIMENSION_ICONS[d.dimension] || '\u25cb') + ' ' + d.label
          )
        );
      });
      container.appendChild(el('p', { className: 'text-[11px] text-slate-400 mb-2 mt-3' }, '\ud83d\udccc ' + TXT.dimMid));
      container.appendChild(midRow);
    }

    return container;
  }

  function buildCatCard(cat, tier) {
    var colors = {
      recommended: { border: 'border-accent-border', bg: 'bg-accent-light hover:bg-accent-light/70', badge: 'bg-accent text-white', badgeText: TXT.recommendedBadge },
      optional: { border: 'border-slate-200', bg: 'bg-white hover:bg-slate-50', badge: 'bg-primary text-white', badgeText: TXT.optionalBadge },
      cautious: { border: 'border-warning-border', bg: 'bg-warning-light hover:bg-warning-light/70', badge: 'bg-warning text-white', badgeText: TXT.cautiousBadge },
    };
    var c = colors[tier];
    var detailUrl = '/majors/' + cat.gateSlug + '/' + cat.slug;

    var card = el('a', { href: detailUrl, className: 'block p-4 rounded-xl border transition-colors ' + c.border + ' ' + c.bg });

    var dimStr = (cat.topDimensions && cat.topDimensions.length > 0) ? cat.topDimensions.slice(0, 2).join(' \u00b7 ') : '';
    card.appendChild(
      el('div', { className: 'flex items-start justify-between mb-2' },
        el('div', {},
          el('h4', { className: 'text-sm font-semibold text-slate-900' }, cat.name),
          el('p', { className: 'text-[11px] text-slate-400' }, cat.gate + (dimStr ? ' \u00b7 ' + dimStr : ''))
        ),
        el('span', { className: 'shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ' + c.badge }, c.badgeText)
      )
    );

    if (cat.reason) {
      card.appendChild(el('p', { className: 'text-[11px] text-slate-500 leading-relaxed mb-1' }, cat.reason.length > 60 ? cat.reason.slice(0, 60) + '\u2026' : cat.reason));
    }

    if (cat.cautions && cat.cautions.length > 0) {
      cat.cautions.slice(0, 2).forEach(function (caution) {
        card.appendChild(
          el('div', { className: 'flex items-start gap-1 mt-1' },
            el('span', { className: 'text-[10px] shrink-0 mt-0.5' }, '\u26a0\ufe0f'),
            el('p', { className: 'text-[10px] text-amber-600 leading-relaxed' }, caution.length > 50 ? caution.slice(0, 50) + '\u2026' : caution)
          )
        );
      });
    }

    card.appendChild(
      el('div', { className: 'flex items-center gap-1 mt-2 pt-2 border-t border-slate-100' },
        el('span', { className: 'text-[10px] text-primary' }, TXT.viewDetail),
        el('span', { className: 'text-[10px] text-primary' }, '\u2192')
      )
    );

    return card;
  }

  function renderCategorySection(result, key, config) {
    var cats = result[key];
    if (!cats || cats.length === 0) return document.createTextNode('');

    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, config.icon),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, config.title),
          el('p', { className: 'text-xs text-slate-400' }, config.sub)
        )
      )
    );

    var grid = el('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-3' });
    cats.forEach(function (cat) { grid.appendChild(buildCatCard(cat, config.tier)); });
    container.appendChild(grid);
    return container;
  }

  function renderRiskTags(result) {
    var tags = result.riskTags || [];
    var real = tags.filter(function (t) { return t.description && t.description.length > 0; });
    if (real.length === 0) return document.createTextNode('');

    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '\ud83d\udee1\ufe0f'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.riskTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.riskSub)
        )
      )
    );

    var list = el('div', { className: 'space-y-2' });
    real.forEach(function (t) {
      list.appendChild(
        el('div', { className: 'flex items-start gap-3 p-3 bg-slate-50 rounded-lg' },
          el('span', { className: 'text-sm shrink-0 mt-0.5' }, '\u26a0\ufe0f'),
          el('div', {},
            el('p', { className: 'text-xs font-medium text-slate-700' }, t.label),
            el('p', { className: 'text-[11px] text-slate-500 leading-relaxed' }, t.description)
          )
        )
      );
    });
    container.appendChild(list);
    return container;
  }

  function renderNextSteps(result) {
    var container = el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '\ud83d\udca1'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.nextTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.nextSub)
        )
      )
    );

    var list = el('ul', { className: 'space-y-2' });
    (result.nextStepSuggestions || []).forEach(function (step) {
      list.appendChild(
        el('li', { className: 'flex items-start gap-2 text-sm text-slate-600 leading-relaxed' },
          el('span', { className: 'text-primary shrink-0' }, '\u2022'),
          el('span', {}, step)
        )
      );
    });
    container.appendChild(list);

    container.appendChild(
      el('div', { className: 'mt-4 pt-4 border-t border-slate-100' },
        el('a', { href: '/majors', className: 'inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium' },
          TXT.browseCatalog, el('span', {}, '\u2192')
        )
      )
    );
    return container;
  }

  function renderFeedback() {
    var privacyLines = TXT.feedbackPrivacyLines.map(function (line) {
      return el('li', { className: 'flex items-start gap-1.5 text-[11px] text-slate-500 leading-relaxed' },
        el('span', { className: 'text-green-500 shrink-0 mt-0.5' }, '\u2713'),
        line
      );
    });

    return el('div', { className: 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6' },
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '\ud83d\udcac'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.feedbackTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.feedbackSub)
        )
      ),

      // privacy box
      el('div', { className: 'bg-green-50 border border-green-100 rounded-lg p-3 mb-4' },
        el('p', { className: 'text-xs font-semibold text-green-700 mb-2' }, '\ud83d\udecd\ufe0f ' + TXT.feedbackPrivacyTitle),
        el('ul', { className: 'space-y-0.5' }, privacyLines)
      ),

      // main CTA button
      el('div', { className: 'mb-3' },
        el('button', {
          className: 'w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm',
          onClick: function () {
            // 外部匿名问卷链接
            if (!confirm('即将跳转到问卷星匿名问卷（不收集姓名/手机号/身份证等信息），是否继续？')) return;
            var surveyUrl = 'https://v.wjx.cn/vm/wFFJa5x.aspx';
            window.open(surveyUrl, '_blank', 'noopener,noreferrer');
          },
        }, '\ud83d\udcab ' + TXT.feedbackBtn),
        el('p', { className: 'text-[10px] text-slate-400 text-center mt-1.5' }, TXT.feedbackExternalNote)
      ),

      // contribute link
      el('div', { className: 'text-center' },
        el('p', { className: 'text-[11px] text-slate-400 mb-1' }, TXT.feedbackContributeNote),
        el('a', {
          href: '/contribute',
          className: 'text-xs text-primary hover:underline font-medium'
        }, '\ud83d\udcdd ' + TXT.feedbackContributeLink + ' \u2192')
      )
    );
  }

  function renderFinalDisclaimer() {
    return el('div', { className: 'bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-center' },
      el('h3', { className: 'text-sm font-semibold text-slate-700 mb-2' }, '\ud83d\udccb ' + TXT.importantNotice),
      el('p', { className: 'text-xs text-slate-500 leading-relaxed mb-3' }, TXT.disclaimer2),
      el('p', { className: 'text-[10px] text-slate-400' }, TXT.disclaimer3)
    );
  }

  function renderActionBar() {
    return el('div', { className: 'flex items-center justify-center gap-4 mb-8' },
      el('a', { href: '/test', className: 'inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors underline' },
        '\ud83d\udd04 ' + TXT.retest
      ),
      el('span', { className: 'text-slate-300' }, '|'),
      el('a', { href: '/majors', className: 'inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors underline' },
        '\ud83d\udcda ' + TXT.browseMajors
      ),
      el('span', { className: 'text-slate-300' }, '|'),
      el('a', { href: '/', className: 'inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors underline' },
        '\ud83c\udfe0 ' + TXT.goHome
      )
    );
  }

  // ─── AI 解释区域 ───

  var aiExplainCalled = false; // 防重复点击

  function renderAIExplanationLoading() {
    return el('div', { className: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm mb-6' },
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, '🤖'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.aiTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.aiSub)
        )
      ),
      el('div', { className: 'flex items-center gap-2 text-sm text-slate-400' },
        el('span', { className: 'animate-pulse' }, '⏳'),
        el('span', {}, TXT.aiLoading)
      )
    );
  }

  function renderAIExplanation(text, fromTemplate) {
    var container = el('div', { className: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm mb-6' });
    container.appendChild(
      el('div', { className: 'flex items-center gap-3 mb-4' },
        el('span', { className: 'text-2xl' }, fromTemplate ? '📝' : '🤖'),
        el('div', {},
          el('h2', { className: 'text-lg font-bold text-slate-900' }, TXT.aiTitle),
          el('p', { className: 'text-xs text-slate-400' }, TXT.aiSub)
        )
      )
    );

    // 解释文本
    var paragraphs = text.split('\n').filter(function (p) { return p.trim().length > 0; });
    var content = el('div', { className: 'space-y-2 mb-3' });
    paragraphs.forEach(function (p) {
      content.appendChild(
        el('p', { className: 'text-sm text-slate-700 leading-relaxed' }, p.trim())
      );
    });
    container.appendChild(content);

    // 模板提示
    if (fromTemplate) {
      container.appendChild(
        el('p', { className: 'text-[11px] text-slate-400 mt-2 pt-2 border-t border-blue-100' }, TXT.aiTemplateNote)
      );
    }

    return container;
  }

  function fetchAIExplanation(result, subjectiveNotes) {
    if (aiExplainCalled) return; // 防重复点击
    aiExplainCalled = true;

    var payload = { result: result };
    if (subjectiveNotes && subjectiveNotes.trim().length > 0) {
      payload.subjectiveNotes = subjectiveNotes.trim();
    }

    fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('API error ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && data.explanation) {
          var section = document.getElementById('ai-explain-section');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderAIExplanation(data.explanation, !!data.fromTemplate));
          }
        }
      })
      .catch(function () {
        // API 完全不可达时的客户端兜底
        var section = document.getElementById('ai-explain-section');
        if (section && section.querySelector('.animate-pulse')) {
          var fallbackText = '根据你的答题偏好，系统为你匹配了几个值得了解的专业方向。\n\n建议你从「优先了解」区的专业类开始探索，点进去看看大学到底学什么、未来可能做什么。如果觉得不太对，也可以去「可以继续看看」区碰碰运气——有时候兴趣恰好藏在那些你还没注意到的地方。\n\n本测试只是认知工具，最终选择还需要结合你的高考成绩、位次和家庭情况综合判断。';
          section.innerHTML = '';
          section.appendChild(renderAIExplanation(fallbackText, true));
        }
      });
  }

  function renderFullReport(result) {
    var r = rootEl();
    r.innerHTML = '';

    var wrapper = el('div', { className: 'max-w-xl mx-auto px-4 py-8' });

    wrapper.appendChild(el('div', { className: 'text-center mb-8' },
      el('h1', { className: 'text-2xl font-bold text-slate-900 mb-2' }, '你的测试报告'),
      el('p', { className: 'text-sm text-slate-500' }, '基于你的答题，看看哪些方向值得进一步了解')
    ));

    wrapper.appendChild(renderDisclaimer());
    // AI 解释区域（初始为加载态，API 返回后替换）
    var aiSection = el('div', { id: 'ai-explain-section' },
      renderAIExplanationLoading()
    );
    wrapper.appendChild(aiSection);
    wrapper.appendChild(renderProfile(result));
    wrapper.appendChild(renderDimensionProfile(result));
    wrapper.appendChild(renderDisciplines(result));
    wrapper.appendChild(renderCategorySection(result, 'recommendedCategories', { icon: '\ud83c\udfaf', title: TXT.recommendedTitle, sub: TXT.recommendedSub, tier: 'recommended' }));
    wrapper.appendChild(renderCategorySection(result, 'optionalCategories', { icon: '\ud83d\udc40', title: TXT.optionalTitle, sub: TXT.optionalSub, tier: 'optional' }));
    wrapper.appendChild(renderCategorySection(result, 'cautiousCategories', { icon: '\u26a0\ufe0f', title: TXT.cautiousTitle, sub: TXT.cautiousSub, tier: 'cautious' }));
    wrapper.appendChild(renderRiskTags(result));
    wrapper.appendChild(renderNextSteps(result));
    wrapper.appendChild(renderFeedback());
    wrapper.appendChild(renderFinalDisclaimer());
    wrapper.appendChild(renderActionBar());

    r.appendChild(wrapper);
  }

  // ─── 启动 ───

  function boot() {
    var bank = window.__QUESTION_BANK__;
    if (!bank || !bank.questions || bank.questions.length === 0) {
      var r = rootEl();
      if (r) r.innerHTML = '<div class="py-16 text-center text-slate-400"><p class="text-sm">' + TXT.loadFail + '</p></div>';
      return;
    }

    var stored = null;
    try {
      var raw = sessionStorage.getItem('majornav_test_results');
      if (raw) stored = JSON.parse(raw);
    } catch (e) { /* noop */ }

    if (!stored || !stored.responses) {
      renderEmptyState();
      return;
    }

    var result = generateResult(bank, stored.responses, stored.riskTags || [], stored.userType || 'exploratory');
    renderFullReport(result);

    // 主观题答案非空 → 调用 AI；为空 → 直接显示模板
    var subjectiveNotes = stored.subjectiveNotes || '';
    if (subjectiveNotes.trim().length > 0) {
      fetchAIExplanation(result, subjectiveNotes);
    } else {
      // 用户未填写主观题 → 直接用模板解释
      var section = document.getElementById('ai-explain-section');
      if (section) {
        var templateText = '根据你的答题偏好，系统为你匹配了几个值得了解的专业方向。\n\n建议你从「优先了解」区的专业类开始探索，点进去看看大学到底学什么、未来可能做什么。如果觉得不太对，也可以去「可以继续看看」区碰碰运气——有时候兴趣恰好藏在那些你还没注意到的地方。\n\n如果你想让报告更懂你，下次测试时在最后的「随便聊聊」环节多说两句你的想法。本测试只是认知工具，最终选择还需要结合你的高考成绩、位次和家庭情况综合判断。';
        section.innerHTML = '';
        section.appendChild(renderAIExplanation(templateText, true));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
