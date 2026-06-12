/**
 * 方向测试题库数据
 * 对齐 ALGORITHM_SPEC.md v0.3 六桶体系
 *
 * 题目统计：通用 20 + 方向 65 + 校验 13 + 避坑 8 + 主观 4 = 110 题
 *
 * 命名规则：
 *   gen_xxx   = general 通用粗筛题
 *   br_xxx    = branch 方向分流题
 *   cc_xxx    = cross_check 相邻校验题
 *   risk_xxx  = risk 避坑风险题
 */

import type { QuestionBank } from '../types/test';

export const questionBank: QuestionBank = {
  version: '0.2-full',
  updatedAt: '2026-06-04',

  questions: [
    // ============================================================
    // 通用粗筛题（20 题）
    // 覆盖 6 桶，无专业术语，从日常场景出发
    // 题型分布：学科偏好 5 + 任务场景 5 + 人与事 3 + 抽象具体 3 + 职业期待 2 + 排斥 2
    // ============================================================

    // --- 任务场景偏好（gen_001 - gen_005）---
    { id: 'gen_001', type: 'general', title: '如果周末突然空出一整个下午，没人催你学习，也没有必须完成的任务，你更可能怎么安排？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 1, options: [
      { id: 'gen_001_a', label: 'A', text: '找个安静地方，把最近脑子里一个想法慢慢想清楚，最好还能写下来', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'gen_001_b', label: 'B', text: '约朋友聊聊近况，顺手帮人捋一捋最近卡住的事', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_001_c', label: 'C', text: '找点东西上手试试，哪怕一开始做得很丑，也想把它弄成"能用"的样子', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }, { target: 'info_systems', points: 4 }] },
      { id: 'gen_001_d', label: 'D', text: '给自己留一段沉浸时间，用画面、声音、排版、镜头之类的方式表达点什么', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'gen_001_e', label: 'E', text: '去观察一个真实的东西怎么变化，比如身体状态、植物、天气、动物、生活里的小规律', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'stem', points: 4 }, { target: 'life_health_interest', points: 4 }] },
    ]},
    { id: 'gen_002', type: 'general', title: '班上要组织一次活动（比如毕业旅行或主题班会），如果让你负责一块，你更想管哪部分？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 2, options: [
      { id: 'gen_002_a', label: 'A', text: '写方案、做介绍——把想法整理清楚，让所有人都能看懂', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'reading_expression', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_002_b', label: 'B', text: '协调大家——谁做什么、什么时候交、有分歧怎么解决', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'business', points: 6 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_002_c', label: 'C', text: '算预算、排计划——盯着数据和条件，确保不超支不超时', scoreEffects: [{ target: 'math_logic', points: 8 }, { target: 'business', points: 6 }, { target: 'stem', points: 4 }] },
      { id: 'gen_002_d', label: 'D', text: '搭东西、做道具——把想法变成实物，先做个简陋版试试', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }, { target: 'info_systems', points: 4 }] },
      { id: 'gen_002_e', label: 'E', text: '照顾人——有人不舒服或情绪不好，我去帮忙处理', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'interpersonal', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_002_f', label: 'F', text: '搞氛围和设计——海报、音乐、布置，让现场有感觉', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }, { target: 'reading_expression', points: 4 }] },
    ]},
    { id: 'gen_003', type: 'general', title: '如果给你一笔不多不少的钱，只能用来体验或学习一个新东西，你会更想花在哪？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 5, options: [
      { id: 'gen_003_a', label: 'A', text: '买课程、资料或会员，把一个一直好奇的话题系统补一补', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'reading_expression', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'gen_003_b', label: 'B', text: '参加一个需要和别人配合完成的项目，看看大家怎么把事做成', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'interpersonal', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_003_c', label: 'C', text: '买点材料、工具或零件，亲手折腾出一个看得见摸得着的东西', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'gen_003_d', label: 'D', text: '报一个沉浸式体验课，重点不是学会多少，而是做出一点自己的表达', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'gen_003_e', label: 'E', text: '去体验一个和身体、自然、健康或生命有关的活动，看看真实世界怎么运作', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'life_health_interest', points: 6 }] },
    ]},
    { id: 'gen_004', type: 'general', title: '小组作业快要开始了，你通常会自然滑到哪个位置？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health'], priority: 6, options: [
      { id: 'gen_004_a', label: 'A', text: '先把大方向想清楚：这事到底要解决什么，先后顺序是什么', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'abstract_theory', points: 6 }, { target: 'stem', points: 4 }] },
      { id: 'gen_004_b', label: 'B', text: '负责把大家拉到同一个频道：谁做什么、什么时候交、哪里有分歧', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_004_c', label: 'C', text: '少说两句，直接开干。别人想方案，我负责把东西做出来', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'gen_004_d', label: 'D', text: '最后负责检查：格式、数据、逻辑、细节，哪里不对我会很难受', scoreEffects: [{ target: 'rule_detail', points: 8 }, { target: 'business', points: 6 }, { target: 'life_health', points: 4 }] },
    ]},
    { id: 'gen_005', type: 'general', title: '如果你有额外的一小时空闲，你最容易做什么？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 7, options: [
      { id: 'gen_005_a', label: 'A', text: '拿起手边任何有字的东西读一读', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }] },
      { id: 'gen_005_b', label: 'B', text: '给朋友发消息聊聊最近的事', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_005_c', label: 'C', text: '打开电脑看看有什么可优化或可学习的', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_005_d', label: 'D', text: '随手画点东西、拍照片或摆弄一个小创作', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'gen_005_e', label: 'E', text: '看看健康/运动/自然相关的资讯或视频', scoreEffects: [{ target: 'life_health', points: 8 }, { target: 'life_health_interest', points: 6 }] },
    ]},

    // --- 学科/学习偏好（gen_006 - gen_010）---
    { id: 'gen_006', type: 'general', title: '遇到一个完全陌生的问题，你第一反应更像哪一种？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 8, options: [
      { id: 'gen_006_a', label: 'A', text: '先搜一圈资料，把不同说法拼起来，慢慢搭出一个框架', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'reading_expression', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_006_b', label: 'B', text: '找几个想法不一样的人聊聊，听完之后再判断哪种更靠谱', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'interpersonal', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_006_c', label: 'C', text: '先把已知条件列出来，一步一步推，看能不能推出一个更稳的答案', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'math_logic', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_006_d', label: 'D', text: '不想光想，先试一下。错了再改，改到能跑通为止', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'gen_006_e', label: 'E', text: '找真实发生过的例子，看别人当时是怎么处理的', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'life_health', points: 4 }, { target: 'business', points: 4 }, { target: 'art_creative', points: 4 }] },
    ]},
    { id: 'gen_007', type: 'general', title: '下面哪种瞬间，最容易让你觉得\'爽到了\'？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 9, options: [
      { id: 'gen_007_a', label: 'A', text: '一团说不清的想法，终于被你讲成了别人能听懂的话', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_007_b', label: 'B', text: '原本乱糟糟的条件，被你一步步推到一个确定结果', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 8 }] },
      { id: 'gen_007_c', label: 'C', text: '反复试了好几次之后，终于看到某个变化真的发生了', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'life_health', points: 6 }] },
      { id: 'gen_007_d', label: 'D', text: '你突然看懂了一个系统：原来这群人、这件事、这个环境是这样运转的', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'business', points: 6 }, { target: 'life_health', points: 4 }] },
      { id: 'gen_007_e', label: 'E', text: '做了一个东西（画、视频、音乐、手工都行），别人看到后说"我懂你想表达什么"', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
    ]},
    { id: 'gen_008', type: 'general', title: '学一个新东西时，你通常最想先抓住什么？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 10, options: [
      { id: 'gen_008_a', label: 'A', text: '先搞清楚它为什么会出现，前因后果是什么', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'abstract_theory', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_008_b', label: 'B', text: '先看规则：它怎么运行，什么能做，什么不能做', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'rule_detail', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_008_c', label: 'C', text: '先搞清楚它最基本的几条规则或原理', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'math_logic', points: 6 }] },
      { id: 'gen_008_d', label: 'D', text: '先别讲太多，给我试一下，边做边懂', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'gen_008_e', label: 'E', text: '先亲自体验一下，看看感觉对不对', scoreEffects: [{ target: 'art_creative', points: 6 }, { target: 'life_health', points: 4 }, { target: 'aesthetic_creation', points: 4 }] },
      { id: 'gen_008_f', label: 'F', text: '先看真实场景里的人是怎么用它、怎么被它影响的', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'social_science', points: 6 }, { target: 'business', points: 4 }] },
    ]},
    { id: 'gen_009', type: 'general', title: '面对一道难题，你的第一反应更接近哪种？', targetBuckets: ['humanities', 'social_science', 'stem', 'business', 'life_health'], priority: 11, options: [
      { id: 'gen_009_a', label: 'A', text: '先查资料、阅读相关背景', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'gen_009_b', label: 'B', text: '先找人讨论一下，听听别人的思路', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_009_c', label: 'C', text: '先列出已知条件和可能的解法，一步一步推', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_009_d', label: 'D', text: '先看有没有现成的例子或案例可以参照', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'business', points: 6 }, { target: 'engineering_practice', points: 4 }] },
    ]},
    { id: 'gen_010', type: 'general', title: '刷手机时，哪种内容最容易让你停下来看？', targetBuckets: ['humanities', 'stem', 'business', 'social_science', 'life_health', 'art_creative'], priority: 12, options: [
      { id: 'gen_010_a', label: 'A', text: '一篇深度分析文章，把一个复杂话题讲得很透', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'gen_010_b', label: 'B', text: '一条讲社会现象的短视频，分析为什么大家会这么做', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 4 }, { target: 'business', points: 4 }] },
      { id: 'gen_010_c', label: 'C', text: '一个技术拆解或原理科普，告诉你某个东西到底怎么工作', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'math_logic', points: 6 }, { target: 'info_systems', points: 4 }] },
      { id: 'gen_010_d', label: 'D', text: '一条商业案例或效率技巧，讲怎么把一件事做得更好', scoreEffects: [{ target: 'business', points: 6 }, { target: 'math_logic', points: 6 }, { target: 'rule_detail', points: 4 }] },
      { id: 'gen_010_e', label: 'E', text: '一个视觉作品或创意视频，画面、节奏或设计让你印象深刻', scoreEffects: [{ target: 'art_creative', points: 6 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'gen_010_f', label: 'F', text: '一个关于身体、自然或动物的内容，讲生命怎么运作', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'life_health_interest', points: 4 }] },
    ]},

    // --- 人与事倾向（gen_011 - gen_013）---
    { id: 'gen_011', type: 'general', title: '和人打交道 vs 和事物打交道，你更偏哪一边？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health'], priority: 13, options: [
      { id: 'gen_011_a', label: 'A', text: '强烈偏好和人打交道——聊天、帮助、教学、组织', scoreEffects: [{ target: 'social_science', points: 10 }, { target: 'interpersonal', points: 10 }, { target: 'life_health', points: 4 }] },
      { id: 'gen_011_b', label: 'B', text: '偏和人打交道，但也不排斥和事物独处', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'business', points: 6 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_011_c', label: 'C', text: '偏好和思想/知识打交道——阅读、思考、分析问题', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'gen_011_d', label: 'D', text: '偏和事物打交道，但也愿意有适当的人际互动', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'engineering_practice', points: 6 }, { target: 'interpersonal', points: 2 }] },
      { id: 'gen_011_e', label: 'E', text: '强烈偏好和事物打交道——机器、数据、实验、技术问题', scoreEffects: [{ target: 'stem', points: 10 }, { target: 'info_systems', points: 8 }, { target: 'math_logic', points: 6 }] },
    ]},
    { id: 'gen_012', type: 'general', title: '在团队里，哪种角色让你最自在？', targetBuckets: ['social_science', 'business', 'humanities', 'stem', 'life_health'], priority: 14, options: [
      { id: 'gen_012_a', label: 'A', text: '倾听者和支持者——关心每个人的状态', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 8 }, { target: 'life_health', points: 4 }] },
      { id: 'gen_012_b', label: 'B', text: '策划者和组织者——定方向、分任务、推进度', scoreEffects: [{ target: 'business', points: 10 }, { target: 'interpersonal', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_012_c', label: 'C', text: '技术专家——别人搞不定的技术活我来', scoreEffects: [{ target: 'stem', points: 10 }, { target: 'info_systems', points: 6 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'gen_012_d', label: 'D', text: '独立贡献者——分好活我自己做，不需要太多交流', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'humanities', points: 6 }, { target: 'art_creative', points: 4 }] },
    ]},
    { id: 'gen_013', type: 'general', title: '看到社会热点事件，你的第一反应更接近？', targetBuckets: ['humanities', 'social_science', 'business', 'stem'], priority: 15, options: [
      { id: 'gen_013_a', label: 'A', text: '这件事背后反映了什么社会结构和价值观？', scoreEffects: [{ target: 'social_science', points: 10 }, { target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'gen_013_b', label: 'B', text: '各方是怎么说的？我想对比不同人的叙述', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 8 }] },
      { id: 'gen_013_c', label: 'C', text: '从经济和组织角度，这个事件是怎么发生的？', scoreEffects: [{ target: 'business', points: 10 }, { target: 'social_science', points: 4 }] },
      { id: 'gen_013_d', label: 'D', text: '有没有数据和证据？我想看事实的部分', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'math_logic', points: 6 }, { target: 'business', points: 4 }] },
    ]},

    // --- 抽象与具体偏好（gen_014 - gen_016）---
    { id: 'gen_014', type: 'general', title: '做一件重要的事（比如考试复习或组织活动），你对规则和计划的态度更接近？', targetBuckets: ['social_science', 'business', 'stem', 'humanities', 'art_creative'], priority: 16, options: [
      { id: 'gen_014_a', label: 'A', text: '有规则我会安心很多，至少知道怎么做才不容易翻车', scoreEffects: [{ target: 'rule_detail', points: 8 }, { target: 'social_science', points: 6 }, { target: 'business', points: 4 }] },
      { id: 'gen_014_b', label: 'B', text: '太细的规则会让我憋得慌，我更想留点发挥空间', scoreEffects: [{ target: 'rule_detail', points: -6 }, { target: 'art_creative', points: 6 }, { target: 'humanities', points: 4 }] },
      { id: 'gen_014_c', label: 'C', text: '看情况。重要的事按规则来，小事没必要每一步都框死', scoreEffects: [{ target: 'stem', points: 4 }, { target: 'business', points: 4 }, { target: 'social_science', points: 4 }] },
    ]},
    { id: 'gen_015', type: 'general', title: '以下两种思维方式，你更偏向哪种？', targetBuckets: ['humanities', 'stem', 'social_science', 'business'], priority: 17, options: [
      { id: 'gen_015_a', label: 'A', text: '更习惯从具体的例子出发，慢慢归纳出规律', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: 6 }, { target: 'life_health', points: 4 }] },
      { id: 'gen_015_b', label: 'B', text: '更习惯从抽象的原理出发，推导到具体场景', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 8 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'gen_015_c', label: 'C', text: '两个都会用，看情况切换', scoreEffects: [{ target: 'business', points: 4 }, { target: 'stem', points: 4 }, { target: 'humanities', points: 4 }] },
    ]},
    { id: 'gen_016', type: 'general', title: '开学前不知道新老师是谁、课程怎么安排，你的感觉更接近？', targetBuckets: ['social_science', 'business', 'stem', 'humanities', 'art_creative'], priority: 18, options: [
      { id: 'gen_016_a', label: 'A', text: '有点慌，希望提前打听一下，至少知道个大概', scoreEffects: [{ target: 'stable_path', points: 6 }, { target: 'rule_detail', points: 4 }] },
      { id: 'gen_016_b', label: 'B', text: '无所谓，到时候再说，总能适应的', scoreEffects: [{ target: 'stable_path', points: 3 }] },
      { id: 'gen_016_c', label: 'C', text: '挺期待的，未知才有意思，不喜欢什么都被安排好', scoreEffects: [{ target: 'exploration_preference', points: 6 }] },
    ]},

    // --- 职业期待（gen_017 - gen_018）---
    { id: 'gen_017', type: 'general', title: '如果暑假去做一个月的兼职或实习，你最不想遇到哪种情况？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 3, options: [
      { id: 'gen_017_a', label: 'A', text: '做的事对别人完全没用，只是机械重复', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'life_health', points: 6 }] },
      { id: 'gen_017_b', label: 'B', text: '每天都在做一模一样的事，学不到任何新东西', scoreEffects: [{ target: 'self_improvement_preference', points: 6 }] },
      { id: 'gen_017_c', label: 'C', text: '完全不知道下个月干什么，没有任何规划和安排', scoreEffects: [{ target: 'stable_path', points: 6 }, { target: 'business', points: 6 }, { target: 'rule_detail', points: 4 }] },
      { id: 'gen_017_d', label: 'D', text: '只能照着别人安排做，没有任何自己创作或发挥的空间', scoreEffects: [{ target: 'aesthetic_creation', points: 6 }, { target: 'art_creative', points: 6 }, { target: 'stem', points: 4 }] },
      { id: 'gen_017_e', label: 'E', text: '所有选择都要听别人的，自己完全没有决定权', scoreEffects: [{ target: 'autonomy_preference', points: 6 }] },
    ]},
    { id: 'gen_018', type: 'general', title: '以下哪种职业描述最接近你理想的未来？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 4, options: [
      { id: 'gen_018_a', label: 'A', text: '用文字/语言/思想影响人们对世界的理解', scoreEffects: [{ target: 'humanities', points: 10 }, { target: 'reading_expression', points: 8 }] },
      { id: 'gen_018_b', label: 'B', text: '参与制定规则、解决问题、让社会运转更好', scoreEffects: [{ target: 'social_science', points: 10 }, { target: 'business', points: 6 }, { target: 'interpersonal', points: 6 }] },
      { id: 'gen_018_c', label: 'C', text: '设计/建造/优化系统——看见自己的成果在运行', scoreEffects: [{ target: 'stem', points: 10 }, { target: 'engineering_practice', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'gen_018_d', label: 'D', text: '帮助人恢复健康、过上更好的生活', scoreEffects: [{ target: 'life_health', points: 10 }, { target: 'interpersonal', points: 8 }] },
      { id: 'gen_018_e', label: 'E', text: '创造出能打动人心的作品——视觉、声音、故事', scoreEffects: [{ target: 'art_creative', points: 10 }, { target: 'aesthetic_creation', points: 8 }] },
    ]},

    // --- 明显排斥项（gen_019 - gen_020）---
    { id: 'gen_019', type: 'general', title: '以下哪种情境最让你想逃避？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'], priority: 19, options: [
      { id: 'gen_019_a', label: 'A', text: '被要求写一篇很长的文章或分析', scoreEffects: [{ target: 'humanities', points: -8 }, { target: 'reading_expression', points: -6 }] },
      { id: 'gen_019_b', label: 'B', text: '被要求在很多人面前讲话或组织活动', scoreEffects: [{ target: 'social_science', points: -6 }, { target: 'interpersonal', points: -6 }, { target: 'business', points: -4 }] },
      { id: 'gen_019_c', label: 'C', text: '被要求做复杂的推理证明或调试运行很久找不出错', scoreEffects: [{ target: 'stem', points: -8 }, { target: 'math_logic', points: -6 }] },
      { id: 'gen_019_d', label: 'D', text: '被要求在户外或车间待一整天，不停地动手操作', scoreEffects: [{ target: 'stem', points: -6 }, { target: 'engineering_practice', points: -6 }] },
      { id: 'gen_019_e', label: 'E', text: '被要求长时间照顾身体不适或行动不便的人', scoreEffects: [{ target: 'life_health', points: -8 }] },
      { id: 'gen_019_f', label: 'F', text: '被要求当众表演或展示自己的创作并接受评判', scoreEffects: [{ target: 'art_creative', points: -8 }, { target: 'aesthetic_creation', points: -6 }] },
    ]},
    { id: 'gen_020', type: 'general', title: '如果你很感兴趣的一个专业方向，有人认真跟你说"你可能不太适合学这个"，你通常会怎么想？', targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'art_creative'], priority: 20, options: [
      { id: 'gen_020_a', label: 'A', text: '先听听他的理由，但不会因为一句话就放弃', scoreEffects: [{ target: 'feedback_reflection', points: 6 }] },
      { id: 'gen_020_b', label: 'B', text: '不太在意——我觉得喜欢和愿意投入比天赋更重要', scoreEffects: [{ target: 'humanities', points: 4 }, { target: 'art_creative', points: 4 }] },
      { id: 'gen_020_c', label: 'C', text: '有点动摇——会认真想想他说的是不是有道理', scoreEffects: [{ target: 'social_science', points: 4 }, { target: 'stable_path', points: 3 }] },
      { id: 'gen_020_d', label: 'D', text: '如果很多人都这么说，我会认真考虑要不要换个方向', scoreEffects: [{ target: 'social_science', points: 4 }] },
    ]},

    // ============================================================
    // B1 人文方向分流题（10 题）
    // 覆盖：语言文学 / 历史哲学 / 新闻传播
    // ============================================================
    { id: 'br_hum_001', type: 'branch', title: '如果让你选择一个方向深入，你更接近哪种？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_001_a', label: 'A', text: '用文字表达——写文章、写故事或翻译内容，对文字本身有强烈兴趣', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 10 }] },
      { id: 'br_hum_001_b', label: 'B', text: '历史、哲学——追问"为什么"和"从哪里来"', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_hum_001_c', label: 'C', text: '新闻、传播、媒体——对讲好故事和影响公众感兴趣', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: 4 }, { target: 'interpersonal', points: 4 }] },
    ]},
    { id: 'br_hum_002', type: 'branch', title: '对待一篇文章，你更关注什么？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_002_a', label: 'A', text: '语言的美感和表达的精准——哪个词用得妙', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 8 }] },
      { id: 'br_hum_002_b', label: 'B', text: '背后的思想——作者到底想说什么，推论的逻辑', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_hum_002_c', label: 'C', text: '对读者的影响——这篇文章能不能改变什么', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: 4 }] },
    ]},
    { id: 'br_hum_003', type: 'branch', title: '如果有机会深入学习一门语言，你的动机是？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_003_a', label: 'A', text: '想读懂其他文化的作品和思维方式', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 8 }] },
      { id: 'br_hum_003_b', label: 'B', text: '想做不同文化之间的沟通和桥梁工作', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'br_hum_003_c', label: 'C', text: '纯粹喜欢语言本身的结构和表达规律', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'abstract_theory', points: 6 }, { target: 'rule_detail', points: 4 }] },
    ]},
    { id: 'br_hum_004', type: 'branch', title: '你更想研究哪个问题？', targetBuckets: ['humanities'], subDirection: 'history_philosophy', priority: 10, options: [
      { id: 'br_hum_004_a', label: 'A', text: '一个历史事件是怎么发生的，对今天意味着什么', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'br_hum_004_b', label: 'B', text: '什么是知识？什么是好的人生？——哲学的根本问题', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_hum_004_c', label: 'C', text: '不同文化背景下的人是怎么理解世界的', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: 6 }] },
    ]},
    { id: 'br_hum_005', type: 'branch', title: '写东西时，你最享受哪个环节？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_005_a', label: 'A', text: '构思框架和结构——把零散的想法组织成逻辑', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }] },
      { id: 'br_hum_005_b', label: 'B', text: '雕琢句子——反复推敲哪个词更准确、更美', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 6 }] },
      { id: 'br_hum_005_c', label: 'C', text: '收集资料和素材——知识本身让我兴奋', scoreEffects: [{ target: 'humanities', points: 6 }] },
    ]},
    { id: 'br_hum_006', type: 'branch', title: '看电影或读小说时，你最容易被什么打动？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_006_a', label: 'A', text: '人物的命运和情感——对人性的刻画', scoreEffects: [{ target: 'humanities', points: 8 }] },
      { id: 'br_hum_006_b', label: 'B', text: '时代背景和社会议题——故事折射了怎样的现实', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: 4 }] },
      { id: 'br_hum_006_c', label: 'C', text: '叙事结构和语言本身——怎么讲比讲什么更吸引我', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 4 }] },
    ]},
    { id: 'br_hum_007', type: 'branch', title: '你喜欢怎么了解这个世界正在发生的事？', targetBuckets: ['humanities'], subDirection: 'journalism', priority: 10, options: [
      { id: 'br_hum_007_a', label: 'A', text: '把一个故事讲好，让读到的人被触动', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 8 }] },
      { id: 'br_hum_007_b', label: 'B', text: '研究怎么让更多人看到和讨论有价值的东西', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'business', points: 4 }, { target: 'interpersonal', points: 4 }] },
    ]},
    { id: 'br_hum_008', type: 'branch', title: '以下哪种"安静的活动"最吸引你？', targetBuckets: ['humanities'], subDirection: 'language_literature', priority: 10, options: [
      { id: 'br_hum_008_a', label: 'A', text: '整理一本自己的读书笔记或写一篇长文章', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'reading_expression', points: 8 }] },
      { id: 'br_hum_008_b', label: 'B', text: '查阅资料，搞清楚一段历史或一个哲学概念', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'br_hum_008_c', label: 'C', text: '整理自己拍的照片或写的随笔，做成一个作品集', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'aesthetic_creation', points: 6 }] },
    ]},
    { id: 'br_hum_009', type: 'branch', title: '关于"传统"和"当下"，你更关心哪个？', targetBuckets: ['humanities'], subDirection: 'history_philosophy', priority: 10, options: [
      { id: 'br_hum_009_a', label: 'A', text: '更关心过去——传统、历史、经典文本', scoreEffects: [{ target: 'humanities', points: 8 }] },
      { id: 'br_hum_009_b', label: 'B', text: '更关心当下——正在发生的事、当下的文化、今天的表达', scoreEffects: [{ target: 'humanities', points: 8 }] },
      { id: 'br_hum_009_c', label: 'C', text: '都关心——当下的问题需要用历史来理解', scoreEffects: [{ target: 'humanities', points: 8 }] },
    ]},
    { id: 'br_hum_010', type: 'branch', title: '你觉得阅读和思考历史、文学、哲学这些东西，最大的价值在哪？', targetBuckets: ['humanities'], subDirection: 'history_philosophy', priority: 10, options: [
      { id: 'br_hum_010_a', label: 'A', text: '保存和传承人类最优秀的思考和表达', scoreEffects: [{ target: 'humanities', points: 8 }] },
      { id: 'br_hum_010_b', label: 'B', text: '培养独立思考——学会问对的问题比知道答案更重要', scoreEffects: [{ target: 'humanities', points: 8 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_hum_010_c', label: 'C', text: '让人成为更完整、更有同理心的人', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'interpersonal', points: 4 }] },
    ]},

    // ============================================================
    // B2 社科方向分流题（10 题）
    // 覆盖：法学方向 / 教育与社会 / 公共管理
    // ============================================================
    { id: 'br_soc_001', type: 'branch', title: '当你看到"不公平"的事，你的第一反应是？', targetBuckets: ['social_science'], subDirection: 'law', priority: 10, options: [
      { id: 'br_soc_001_a', label: 'A', text: '想知道法律上怎么说——有没有规则可以解决', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_soc_001_b', label: 'B', text: '想理解为什么会出现这种情况——社会结构的原因', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'br_soc_001_c', label: 'C', text: '想做点什么去改变——政策、倡导或直接帮助', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_soc_002', type: 'branch', title: '当规则和人情冲突时，你更看重什么？', targetBuckets: ['social_science'], subDirection: 'law', priority: 10, options: [
      { id: 'br_soc_002_a', label: 'A', text: '法是社会运行的骨架，我对规则的逻辑本身有兴趣', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'rule_detail', points: 8 }] },
      { id: 'br_soc_002_b', label: 'B', text: '法是解决问题和保护弱者的工具，我更看重法的社会效果', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_soc_003', type: 'branch', title: '如果让你设计一节"你希望高中生学到的课"，你会选什么主题？', targetBuckets: ['social_science'], subDirection: 'education_society', priority: 10, options: [
      { id: 'br_soc_003_a', label: 'A', text: '人与人之间的规则——权利、义务和底线', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_003_b', label: 'B', text: '怎么与人沟通、怎么理解他人——社交和情绪能力', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 8 }] },
      { id: 'br_soc_003_c', label: 'C', text: '社会是怎么运作的——从政府到社区', scoreEffects: [{ target: 'social_science', points: 8 }] },
    ]},
    { id: 'br_soc_004', type: 'branch', title: '你更愿意和"人"打交道还是和"规则/制度"打交道？', targetBuckets: ['social_science'], subDirection: 'education_society', priority: 10, options: [
      { id: 'br_soc_004_a', label: 'A', text: '和人打交道——教育、咨询、面对面帮助', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 8 }] },
      { id: 'br_soc_004_b', label: 'B', text: '和规则/制度打交道——在流程里找到逻辑，把事情办妥', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'rule_detail', points: 8 }] },
      { id: 'br_soc_004_c', label: 'C', text: '两者都要——用制度来服务人', scoreEffects: [{ target: 'social_science', points: 8 }] },
    ]},
    { id: 'br_soc_005', type: 'branch', title: '看到社会上的一些问题，你的第一反应是？', targetBuckets: ['social_science'], subDirection: 'public_admin', priority: 10, options: [
      { id: 'br_soc_005_a', label: 'A', text: '政策层面——研究什么政策更有效、更公平', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_005_b', label: 'B', text: '执行层面——把好的想法落地成实际的公共服务', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'business', points: 4 }] },
    ]},
    { id: 'br_soc_006', type: 'branch', title: '你需要做一个重要决定，你的方式是？', targetBuckets: ['social_science'], subDirection: 'law', priority: 10, options: [
      { id: 'br_soc_006_a', label: 'A', text: '查清所有相关规则和先例，确保每一步都有依据', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_soc_006_b', label: 'B', text: '听听各方的声音再做判断，不只是看规则', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_soc_007', type: 'branch', title: '你对"教育"的理解更接近？', targetBuckets: ['social_science'], subDirection: 'education_society', priority: 10, options: [
      { id: 'br_soc_007_a', label: 'A', text: '教育是传授知识和技能——老师把有价值的东西传递给学生', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_007_b', label: 'B', text: '教育是激发成长——帮每个人找到自己的方向', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_soc_008', type: 'branch', title: '面对一个有争议的社会议题，你的态度是？', targetBuckets: ['social_science'], subDirection: 'law', priority: 10, options: [
      { id: 'br_soc_008_a', label: 'A', text: '先看法律和制度能不能解决', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_008_b', label: 'B', text: '先分析背后的社会原因和不同群体的视角', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_008_c', label: 'C', text: '先想有没有可行的政策方案', scoreEffects: [{ target: 'social_science', points: 8 }] },
    ]},
    { id: 'br_soc_009', type: 'branch', title: '你对"说服别人"这件事的态度是？', targetBuckets: ['social_science'], subDirection: 'law', priority: 10, options: [
      { id: 'br_soc_009_a', label: 'A', text: '喜欢——用逻辑和证据让对方理解我的立场', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_009_b', label: 'B', text: '不太喜欢——我更愿意理解对方，未必需要说服', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_soc_010', type: 'branch', title: '如果让你为一个公益组织工作，你更想做什么？', targetBuckets: ['social_science'], subDirection: 'public_admin', priority: 10, options: [
      { id: 'br_soc_010_a', label: 'A', text: '做法律服务或权益倡导', scoreEffects: [{ target: 'social_science', points: 8 }] },
      { id: 'br_soc_010_b', label: 'B', text: '做教育项目或社区服务', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'br_soc_010_c', label: 'C', text: '做政策研究或项目规划', scoreEffects: [{ target: 'social_science', points: 8 }] },
    ]},

    // ============================================================
    // B3 商科方向分流题（10 题）
    // 覆盖：经济理论 / 金融财会 / 工商管理
    // ============================================================
    { id: 'br_biz_001', type: 'branch', title: '你对"钱"的兴趣更偏向哪个层面？', targetBuckets: ['business'], subDirection: 'finance_accounting', priority: 10, options: [
      { id: 'br_biz_001_a', label: 'A', text: '宏观经济——钱在整个社会里怎么流动', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_001_b', label: 'B', text: '微观财务——企业的钱怎么管、怎么花、怎么赚', scoreEffects: [{ target: 'business', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_biz_001_c', label: 'C', text: '商业运作——怎么把一个产品或组织做起来', scoreEffects: [{ target: 'business', points: 8 }] },
    ]},
    { id: 'br_biz_002', type: 'branch', title: '你更享受哪种"商业场景"？', targetBuckets: ['business'], subDirection: 'business_admin', priority: 10, options: [
      { id: 'br_biz_002_a', label: 'A', text: '分析数据，看财报，做出理性判断', scoreEffects: [{ target: 'business', points: 8 }, { target: 'math_logic', points: 6 }] },
      { id: 'br_biz_002_b', label: 'B', text: '和人谈判、说服、建立合作关系', scoreEffects: [{ target: 'business', points: 8 }, { target: 'interpersonal', points: 8 }] },
      { id: 'br_biz_002_c', label: 'C', text: '设想一个商业模型，从 0 到 1 让它跑起来', scoreEffects: [{ target: 'business', points: 8 }] },
    ]},
    { id: 'br_biz_003', type: 'branch', title: '你更想研究哪个问题？', targetBuckets: ['business'], subDirection: 'economics_theory', priority: 10, options: [
      { id: 'br_biz_003_a', label: 'A', text: '为什么有的国家富、有的国家穷？', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_003_b', label: 'B', text: '为什么有的公司能持续成功、有的昙花一现？', scoreEffects: [{ target: 'business', points: 8 }] },
    ]},
    { id: 'br_biz_004', type: 'branch', title: '你对"数字"在商业中的角色怎么看？', targetBuckets: ['business'], subDirection: 'finance_accounting', priority: 10, options: [
      { id: 'br_biz_004_a', label: 'A', text: '数字是真相——账目和报表最能说明问题', scoreEffects: [{ target: 'business', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_biz_004_b', label: 'B', text: '数字是工具——重要，但更要看数字背后的故事', scoreEffects: [{ target: 'business', points: 8 }] },
    ]},
    { id: 'br_biz_005', type: 'branch', title: '如果让你做一个"创业计划"，你最先想搞清楚什么？', targetBuckets: ['business'], subDirection: 'business_admin', priority: 10, options: [
      { id: 'br_biz_005_a', label: 'A', text: '市场有多大、竞争对手是谁', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_005_b', label: 'B', text: '成本结构——钱从哪来、花到哪去、多久能赚回来', scoreEffects: [{ target: 'business', points: 8 }, { target: 'math_logic', points: 6 }] },
      { id: 'br_biz_005_c', label: 'C', text: '用户到底需要什么——产品和服务的核心价值', scoreEffects: [{ target: 'business', points: 8 }, { target: 'interpersonal', points: 4 }] },
    ]},
    { id: 'br_biz_006', type: 'branch', title: '你对"管理"的理解更接近？', targetBuckets: ['business'], subDirection: 'business_admin', priority: 10, options: [
      { id: 'br_biz_006_a', label: 'A', text: '管理是科学——有理论、有模型、有最优解', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_006_b', label: 'B', text: '管理是艺术——因人而异，没有万能公式', scoreEffects: [{ target: 'business', points: 6 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_biz_007', type: 'branch', title: '你为什么要管好一笔钱？', targetBuckets: ['business'], subDirection: 'finance_accounting', priority: 10, options: [
      { id: 'br_biz_007_a', label: 'A', text: '对钱怎么流转有好奇心，不只是想赚钱', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_007_b', label: 'B', text: '想学会管好自己的钱，这是生活技能', scoreEffects: [{ target: 'business', points: 6 }, { target: 'stable_path', points: 12 }] },
    ]},
    { id: 'br_biz_008', type: 'branch', title: '你更想和哪个部门打交道？', targetBuckets: ['business'], subDirection: 'business_admin', priority: 10, options: [
      { id: 'br_biz_008_a', label: 'A', text: '和数字打交道，确保每一笔都清楚明白', scoreEffects: [{ target: 'business', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_biz_008_b', label: 'B', text: '考虑怎么让更多人知道并认可一个好东西', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_008_c', label: 'C', text: '关心团队里的人怎么配合得更好', scoreEffects: [{ target: 'business', points: 6 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_biz_009', type: 'branch', title: '你对"规则"在商业中作用的看法？', targetBuckets: ['business'], subDirection: 'economics_theory', priority: 10, options: [
      { id: 'br_biz_009_a', label: 'A', text: '市场应该有明确的规则——没有规则就没有公平', scoreEffects: [{ target: 'business', points: 8 }, { target: 'rule_detail', points: 6 }] },
      { id: 'br_biz_009_b', label: 'B', text: '规则太细会绑住手脚——市场需要灵活性', scoreEffects: [{ target: 'business', points: 6 }] },
    ]},
    { id: 'br_biz_010', type: 'branch', title: '在团队里做事，你最喜欢扮演什么角色？', targetBuckets: ['business'], subDirection: 'business_admin', priority: 10, options: [
      { id: 'br_biz_010_a', label: 'A', text: '用数据和逻辑帮团队看清方向', scoreEffects: [{ target: 'business', points: 8 }, { target: 'math_logic', points: 6 }] },
      { id: 'br_biz_010_b', label: 'B', text: '站出来定方向，带着大家把事做成', scoreEffects: [{ target: 'business', points: 8 }] },
      { id: 'br_biz_010_c', label: 'C', text: '找到资源和合适的人，撮合大家把事情做好', scoreEffects: [{ target: 'business', points: 8 }, { target: 'interpersonal', points: 6 }] },
    ]},

    // ============================================================
    // B4 理工方向分流题（12 题）
    // 覆盖：理学基础 / 计算机与信息 / 工程与制造
    // ============================================================
    { id: 'br_stem_001', type: 'branch', title: '你更喜欢创造"看得见摸得着的东西"还是"在计算机里运转的系统"？', targetBuckets: ['stem'], subDirection: 'cs_info', priority: 10, options: [
      { id: 'br_stem_001_a', label: 'A', text: '更偏好在计算机里构建系统——写代码、做网站、分析数据', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 10 }] },
      { id: 'br_stem_001_b', label: 'B', text: '更喜欢物理世界的创造——设计机械、搭电路、造实物', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 10 }] },
      { id: 'br_stem_001_c', label: 'C', text: '更享受从理论出发推演规律——公式、模型、数学证明', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 10 }, { target: 'abstract_theory', points: 6 }] },
    ]},
    { id: 'br_stem_002', type: 'branch', title: '你对哪个层面的"为什么"更感兴趣？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 10, options: [
      { id: 'br_stem_002_a', label: 'A', text: '为什么物质是这样构成的？——物质科学和自然规律的底层原理', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'abstract_theory', points: 6 }] },
      { id: 'br_stem_002_b', label: 'B', text: '为什么计算机能"思考"？——算法和智能的本质', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'br_stem_002_c', label: 'C', text: '为什么这个东西能工作？——工程设计背后的原理', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
    ]},
    { id: 'br_stem_003', type: 'branch', title: '解决问题时，你的风格是？', targetBuckets: ['stem'], subDirection: 'cs_info', priority: 10, options: [
      { id: 'br_stem_003_a', label: 'A', text: '先建模型——把问题抽象成数学或逻辑形式', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 8 }] },
      { id: 'br_stem_003_b', label: 'B', text: '先写代码——让计算机帮我跑一遍看看', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 8 }] },
      { id: 'br_stem_003_c', label: 'C', text: '先动手试——搭原型、做实验、看现象', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 8 }] },
    ]},
    { id: 'br_stem_004', type: 'branch', title: '对于数字、公式和逻辑推理，你的感受更接近？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 10, options: [
      { id: 'br_stem_004_a', label: 'A', text: '数学本身很美，我对它的结构和证明感兴趣', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 8 }] },
      { id: 'br_stem_004_b', label: 'B', text: '数学是工具——我需要它来解决实际问题', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'br_stem_004_c', label: 'C', text: '不太喜欢纯数学，我更喜欢能直接看到结果的', scoreEffects: [{ target: 'stem', points: 4 }] },
    ]},
    { id: 'br_stem_005', type: 'branch', title: '如果让你捣鼓一个技术项目，你最想从哪入手？', targetBuckets: ['stem'], subDirection: 'cs_info', priority: 10, options: [
      { id: 'br_stem_005_a', label: 'A', text: '为什么能算这么快、这么准——背后的逻辑和原理让我着迷', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'br_stem_005_b', label: 'B', text: '做一个能让人真正用起来的东西——不管是什么形式', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'br_stem_005_c', label: 'C', text: '从零部件开始，让一堆金属和电信号活起来', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
    ]},
    { id: 'br_stem_006', type: 'branch', title: '你对"动手做东西"的态度？', targetBuckets: ['stem'], subDirection: 'engineering_manufacturing', priority: 10, options: [
      { id: 'br_stem_006_a', label: 'A', text: '非常喜欢——我最享受从零件变成成品的过程', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 8 }] },
      { id: 'br_stem_006_b', label: 'B', text: '还行——动手是手段，不是目的', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'engineering_practice', points: 4 }] },
      { id: 'br_stem_006_c', label: 'C', text: '不太喜欢——我更愿意在纸上或屏幕上解决问题', scoreEffects: [{ target: 'stem', points: 4 }] },
    ]},
    { id: 'br_stem_007', type: 'branch', title: '你更想解决哪类问题？', targetBuckets: ['stem'], subDirection: 'cs_info', priority: 10, options: [
      { id: 'br_stem_007_a', label: 'A', text: '一个纯技术难题——比如让算法更快、让芯片更强', scoreEffects: [{ target: 'stem', points: 8 }] },
      { id: 'br_stem_007_b', label: 'B', text: '一个实用需求——比如做一个 App 帮人解决实际问题', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'br_stem_007_c', label: 'C', text: '一个科学问题——比如这个物理现象背后的规律是什么', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'abstract_theory', points: 6 }] },
    ]},
    { id: 'br_stem_008', type: 'branch', title: '学东西的时候，哪种内容让你觉得最费劲？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 10, options: [
      { id: 'br_stem_008_a', label: 'A', text: '理论和推理类——我更喜欢看得见摸得着的东西', scoreEffects: [{ target: 'cs_info', points: 4 }] },
      { id: 'br_stem_008_b', label: 'B', text: '记忆和操作类——我不喜欢大量记背和重复操作', scoreEffects: [{ target: 'engineering_manufacturing', points: 4 }] },
      { id: 'br_stem_008_c', label: 'C', text: '都还好，没有特别费劲的——理科对我来说都挺有意思', scoreEffects: [{ target: 'stem', points: 6 }] },
    ]},
    { id: 'br_stem_009', type: 'branch', title: '你更喜欢哪种"创造"？', targetBuckets: ['stem'], subDirection: 'engineering_manufacturing', priority: 10, options: [
      { id: 'br_stem_009_a', label: 'A', text: '创造无形的——算法、软件、数据结构', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'br_stem_009_b', label: 'B', text: '创造有形的——机器、电路、建筑、产品', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
    ]},
    { id: 'br_stem_010', type: 'branch', title: '有人在实验室推公式推了十年才出成果，你对这种研究方式怎么看？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 10, options: [
      { id: 'br_stem_010_a', label: 'A', text: '很向往——探索未知的最深处', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_stem_010_b', label: 'B', text: '尊重但不适合我——我更想把理论变成实际', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'engineering_practice', points: 6 }] },
    ]},
    { id: 'br_stem_011', type: 'branch', title: '你更喜欢和什么"对话"？', targetBuckets: ['stem'], subDirection: 'engineering_manufacturing', priority: 10, options: [
      { id: 'br_stem_011_a', label: 'A', text: '和机器/电路对话——让硬件按你的指令工作', scoreEffects: [{ target: 'stem', points: 8 }] },
      { id: 'br_stem_011_b', label: 'B', text: '和代码/数据对话——在数字世界里构建逻辑', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
    ]},
    { id: 'br_stem_012', type: 'branch', title: '你更被哪种成就打动？', targetBuckets: ['stem'], subDirection: 'cs_info', priority: 10, options: [
      { id: 'br_stem_012_a', label: 'A', text: '发了一篇论文、证明了一个定理', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'math_logic', points: 6 }] },
      { id: 'br_stem_012_b', label: 'B', text: '写了一个开源项目被很多人使用', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'info_systems', points: 6 }] },
      { id: 'br_stem_012_c', label: 'C', text: '设计的产品被生产出来，人们在使用它', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'engineering_practice', points: 6 }] },
    ]},

    // ============================================================
    // B4 补充：冷门/小众理工方向探测（7 题）
    // 覆盖：天文/地质/海洋/大气/矿业/核/交叉工程
    // ============================================================
    { id: 'br_stem_013', type: 'branch', title: '仰望星空的时候，你在想什么？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_013_a', label: 'A', text: '宇宙到底有多大、黑洞里面是什么——我想探索最根本的物理规律', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'abstract_theory', points: 8 }] },
      { id: 'br_stem_013_b', label: 'B', text: '挺好看的，但没想过把它当专业——我更喜欢脚踏实地的方向', scoreEffects: [{ target: 'stem', points: 2 }] },
      { id: 'br_stem_013_c', label: 'C', text: '如果我们能去其他星球、开发太空资源——那会是人类的下一个篇章', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'info_systems', points: 4 }] },
    ]},
    { id: 'br_stem_014', type: 'branch', title: '你喜欢在户外、和大自然亲近的场景吗？', targetBuckets: ['stem', 'life_health'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_014_a', label: 'A', text: '非常喜欢——观察石头、采集标本、在野外工作对我来说是享受', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'life_health_interest', points: 6 }] },
      { id: 'br_stem_014_b', label: 'B', text: '偶尔可以，但长时间户外、恶劣天气就受不了了', scoreEffects: [{ target: 'stem', points: 3 }] },
      { id: 'br_stem_014_c', label: 'C', text: '不太喜欢——我更喜欢在室内、实验室或电脑前工作', scoreEffects: [{ target: 'stem', points: 3 }, { target: 'info_systems', points: 4 }] },
    ]},
    { id: 'br_stem_015', type: 'branch', title: '对于地球上的自然资源，你的态度是？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_015_a', label: 'A', text: '怎么更高效、更安全地开采和利用——这是一门技术活', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'stable_path', points: 4 }] },
      { id: 'br_stem_015_b', label: 'B', text: '怎么合理保护地球，减少资源消耗——我更关注可持续', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'life_health_interest', points: 6 }] },
      { id: 'br_stem_015_c', label: 'C', text: '没太想过这个问题', scoreEffects: [{ target: 'stem', points: 1 }] },
    ]},
    { id: 'br_stem_016', type: 'branch', title: '你对天气预报、气候变化、大气现象好奇吗？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_016_a', label: 'A', text: '很着迷——天气系统的复杂性和预报的挑战性很吸引我', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'abstract_theory', points: 6 }, { target: 'info_systems', points: 4 }] },
      { id: 'br_stem_016_b', label: 'B', text: '有用但不会作为专业方向', scoreEffects: [{ target: 'stem', points: 2 }] },
    ]},
    { id: 'br_stem_017', type: 'branch', title: '海洋对你来说意味着什么？', targetBuckets: ['stem', 'life_health'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_017_a', label: 'A', text: '一个巨大的未知世界——深海探测、海洋生物、海洋资源都很吸引我', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'life_health_interest', points: 6 }] },
      { id: 'br_stem_017_b', label: 'B', text: '造船、海上平台、海洋工程——我更关注怎么在上面造东西', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'engineering_practice', points: 6 }] },
      { id: 'br_stem_017_c', label: 'C', text: '没太多感觉——我的兴趣不在海洋', scoreEffects: [{ target: 'stem', points: 1 }] },
    ]},
    { id: 'br_stem_018', type: 'branch', title: '提到"核"这个字，你的感觉是？', targetBuckets: ['stem'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_018_a', label: 'A', text: '核能发电、核技术应用——这是一个高技术壁垒的方向，很酷', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'stable_path', points: 4 }] },
      { id: 'br_stem_018_b', label: 'B', text: '有点怕——安全和辐射的问题让我不太想碰', scoreEffects: [{ target: 'stem', points: 1 }] },
      { id: 'br_stem_018_c', label: 'C', text: '基础科学层面挺有意思的——原子核物理、粒子物理', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'abstract_theory', points: 8 }] },
    ]},
    { id: 'br_stem_019', type: 'branch', title: '你更愿意选"很多人都在学"的专业，还是"很少人但很特别"的方向？', targetBuckets: ['stem', 'humanities', 'social_science'], subDirection: 'science_basic', priority: 8, options: [
      { id: 'br_stem_019_a', label: 'A', text: '多人学的路更宽、更安全，我倾向于主流方向', scoreEffects: [{ target: 'stem', points: 4 }, { target: 'stable_path', points: 6 }] },
      { id: 'br_stem_019_b', label: 'B', text: '我想做点不一样的——小众但独特的领域可能更适合我', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'abstract_theory', points: 4 }] },
      { id: 'br_stem_019_c', label: 'C', text: '我不在乎人多不多——我只在乎我自己是不是真的感兴趣', scoreEffects: [{ target: 'stem', points: 5 }, { target: 'humanities', points: 3 }] },
    ]},

    // ============================================================
    // B5 生命健康方向分流题（8 题）
    // 覆盖：临床医学 / 药学与健康 / 农学与生态
    // ============================================================
    { id: 'br_med_001', type: 'branch', title: '你对"生命健康"的兴趣，更偏向哪个层面？', targetBuckets: ['life_health'], subDirection: 'clinical_medicine', priority: 10, options: [
      { id: 'br_med_001_a', label: 'A', text: '直接和病人打交道，诊断、治疗、手术——临床一线', scoreEffects: [{ target: 'life_health', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'br_med_001_b', label: 'B', text: '药物研发、公共卫生、健康管理——在更大范围影响健康', scoreEffects: [{ target: 'life_health', points: 8 }, { target: 'stem', points: 4 }] },
      { id: 'br_med_001_c', label: 'C', text: '动物健康、生态保护、农业与环境——生命不只是人的事', scoreEffects: [{ target: 'life_health', points: 8 }, { target: 'hands_on_aversion', points: -2 }] },
    ]},
    { id: 'br_med_002', type: 'branch', title: '有些需要和人打交道的专业，学习周期特别长（5–8 年），你对此怎么看？', targetBuckets: ['life_health'], subDirection: 'clinical_medicine', priority: 10, options: [
      { id: 'br_med_002_a', label: 'A', text: '我已经了解，可以接受——值得投入的方向值得漫长等待', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_002_b', label: 'B', text: '有点犹豫，但还不确定——需要再了解一下', scoreEffects: [{ target: 'life_health', points: 4 }] },
      { id: 'br_med_002_c', label: 'C', text: '太长了——我可能更想走周期较短的方向', scoreEffects: [{ target: 'life_health', points: 6 }] },
    ]},
    { id: 'br_med_003', type: 'branch', title: '在实验室里长时间做实验，你的感受是？', targetBuckets: ['life_health'], subDirection: 'pharmacy_health', priority: 10, options: [
      { id: 'br_med_003_a', label: 'A', text: '可以接受——耐心做实验、等结果，是科学的一部分', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_003_b', label: 'B', text: '不太行——我更需要和人互动，不能一直对仪器', scoreEffects: [{ target: 'life_health', points: 4 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_med_004', type: 'branch', title: '对于「食物怎么生产、环境怎么保护」这类话题，你的态度是？', targetBuckets: ['life_health'], subDirection: 'agriculture_ecology', priority: 10, options: [
      { id: 'br_med_004_a', label: 'A', text: '想从科学角度理解——它们到底怎么影响环境和健康', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_004_b', label: 'B', text: '情感上比较排斥——我希望食物和环境是纯天然的', scoreEffects: [{ target: 'life_health', points: 4 }] },
    ]},
    { id: 'br_med_005', type: 'branch', title: '你更想做哪种"帮助"？', targetBuckets: ['life_health'], subDirection: 'clinical_medicine', priority: 10, options: [
      { id: 'br_med_005_a', label: 'A', text: '一对一的帮助——治好一个病人、护理一个老人', scoreEffects: [{ target: 'life_health', points: 8 }, { target: 'interpersonal', points: 6 }] },
      { id: 'br_med_005_b', label: 'B', text: '群体层面的帮助——让一大群人的健康得到改善', scoreEffects: [{ target: 'life_health', points: 8 }] },
    ]},
    { id: 'br_med_006', type: 'branch', title: '你对"户外和自然"的热爱程度？', targetBuckets: ['life_health'], subDirection: 'agriculture_ecology', priority: 10, options: [
      { id: 'br_med_006_a', label: 'A', text: '非常热爱——我愿意未来工作的大部分时间在户外', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_006_b', label: 'B', text: '喜欢户外，但工作是工作，不一定非要和户外绑定', scoreEffects: [{ target: 'life_health', points: 6 }] },
      { id: 'br_med_006_c', label: 'C', text: '更喜欢室内和实验室环境', scoreEffects: [{ target: 'life_health', points: 4 }] },
    ]},
    { id: 'br_med_007', type: 'branch', title: '面对需要近距离照顾他人身体的工作场景，你的接受程度是？', targetBuckets: ['life_health'], subDirection: 'clinical_medicine', priority: 10, options: [
      { id: 'br_med_007_a', label: 'A', text: '完全能接受——这是我选择医学的原因之一', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_007_b', label: 'B', text: '有点紧张但我愿意克服', scoreEffects: [{ target: 'life_health', points: 6 }] },
      { id: 'br_med_007_c', label: 'C', text: '有点抗拒——我可能更适合做幕后研究或健康管理', scoreEffects: [{ target: 'life_health', points: 6 }] },
    ]},
    { id: 'br_med_008', type: 'branch', title: '你觉得"健康"更接近什么？', targetBuckets: ['life_health'], subDirection: 'pharmacy_health', priority: 10, options: [
      { id: 'br_med_008_a', label: 'A', text: '健康是科学——可以被测量、预测和干预', scoreEffects: [{ target: 'life_health', points: 8 }] },
      { id: 'br_med_008_b', label: 'B', text: '健康是生活方式——和饮食、运动、心态、环境都有关', scoreEffects: [{ target: 'life_health', points: 8 }] },
    ]},

    // ============================================================
    // B6 艺术创作方向分流题（8 题）
    // 覆盖：美术与设计 / 音乐舞蹈 / 戏剧影视
    // ============================================================
    { id: 'br_art_001', type: 'branch', title: '你更喜欢哪种创作？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_001_a', label: 'A', text: '视觉创作——画画、摄影、设计、平面', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 8 }] },
      { id: 'br_art_001_b', label: 'B', text: '听觉/身体创作——音乐、舞蹈、表演', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'br_art_001_c', label: 'C', text: '叙事创作——编剧、导演、影视制作', scoreEffects: [{ target: 'art_creative', points: 8 }] },
    ]},
    { id: 'br_art_002', type: 'branch', title: '创作时，你更在乎什么？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_002_a', label: 'A', text: '作品好看/好听/打动观众——传播和共鸣', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 8 }] },
      { id: 'br_art_002_b', label: 'B', text: '作品有功能性——设计一个好用又好看的界面/产品', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'engineering_practice', points: 4 }] },
    ]},
    { id: 'br_art_003', type: 'branch', title: '你对"艺术创作"的理解更接近？', targetBuckets: ['art_creative'], subDirection: 'music_dance', priority: 10, options: [
      { id: 'br_art_003_a', label: 'A', text: '艺术是表达——把自己内在的东西外化', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'br_art_003_b', label: 'B', text: '艺术是技艺——需要大量训练和技巧积累', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'engineering_practice', points: 4 }] },
      { id: 'br_art_003_c', label: 'C', text: '艺术是对话——和观众、和社会、和时代的交流', scoreEffects: [{ target: 'art_creative', points: 8 }] },
    ]},
    { id: 'br_art_004', type: 'branch', title: '你对"数字艺术/设计"的态度？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_004_a', label: 'A', text: '很感兴趣——数字工具让创作有更多可能', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'info_systems', points: 4 }] },
      { id: 'br_art_004_b', label: 'B', text: '更喜欢传统媒介——笔、纸、颜料、乐器', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 8 }] },
    ]},
    { id: 'br_art_005', type: 'branch', title: '如果有机会，你更想参与哪种项目？', targetBuckets: ['art_creative'], subDirection: 'drama_film', priority: 10, options: [
      { id: 'br_art_005_a', label: 'A', text: '设计一整套视觉风格/品牌/UI', scoreEffects: [{ target: 'art_creative', points: 8 }] },
      { id: 'br_art_005_b', label: 'B', text: '编排一场演出/音乐会/舞蹈', scoreEffects: [{ target: 'art_creative', points: 8 }] },
      { id: 'br_art_005_c', label: 'C', text: '拍一部短片或做一个视频系列', scoreEffects: [{ target: 'art_creative', points: 8 }] },
    ]},
    { id: 'br_art_006', type: 'branch', title: '你觉得艺术创作中，哪个阶段最让你享受？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_006_a', label: 'A', text: '构思和灵感——想出一个好点子的那一刻', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
      { id: 'br_art_006_b', label: 'B', text: '打磨和执行——一点点把想法变成现实', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'engineering_practice', points: 4 }] },
      { id: 'br_art_006_c', label: 'C', text: '展示和反馈——看到别人的反应', scoreEffects: [{ target: 'art_creative', points: 6 }, { target: 'interpersonal', points: 6 }] },
    ]},
    { id: 'br_art_007', type: 'branch', title: '如果选择一条不太常规、需要创作和表达的路，你最担心什么？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_007_a', label: 'A', text: '不太担心——创意和审美能力在越来越多行业被重视', scoreEffects: [{ target: 'art_creative', points: 6 }] },
      { id: 'br_art_007_b', label: 'B', text: '有点担心——但我愿意承担这个风险', scoreEffects: [{ target: 'art_creative', points: 8 }] },
      { id: 'br_art_007_c', label: 'C', text: '比较担心——所以可能会选一个更"稳"的方向', scoreEffects: [{ target: 'art_creative', points: 4 }, { target: 'stable_path', points: 12 }] },
    ]},
    { id: 'br_art_008', type: 'branch', title: '同样是创作东西，有的解决实际问题，有的纯粹表达自我——你更认同哪种？', targetBuckets: ['art_creative'], subDirection: 'fine_art_design', priority: 10, options: [
      { id: 'br_art_008_a', label: 'A', text: '设计是解决问题，纯艺术是提出问题', scoreEffects: [{ target: 'art_creative', points: 8 }] },
      { id: 'br_art_008_b', label: 'B', text: '设计面向用户，纯艺术面向自己', scoreEffects: [{ target: 'art_creative', points: 8 }, { target: 'aesthetic_creation', points: 6 }] },
    ]},

    // ============================================================
    // 相邻校验题（cross_check × 13）
    // 覆盖 ALGORITHM_SPEC v0.3 §2.3 全部相邻桶对
    // ============================================================
    { id: 'cc_biz_stem_001', type: 'cross_check', title: '商科和理工有一个交叉地带——"用数据来决策"。你对这个地带的感觉是？', targetBuckets: ['business', 'stem'], primaryBucket: 'business', priority: 15, options: [
      { id: 'cc_biz_stem_001_a', label: 'A', text: '很感兴趣——数据+商业判断正是我想做的', scoreEffects: [{ target: 'business', points: 4 }, { target: 'stem', points: 4 }, { target: 'math_logic', points: 6 }] },
      { id: 'cc_biz_stem_001_b', label: 'B', text: '有点兴趣，但不想太深入技术层面', scoreEffects: [{ target: 'business', points: 6 }, { target: 'stem', points: -2 }] },
      { id: 'cc_biz_stem_001_c', label: 'C', text: '不太感冒——我更想纯粹做商业和管理', scoreEffects: [{ target: 'business', points: 8 }, { target: 'stem', points: -6 }] },
    ]},
    // B1↔B2 人文↔社科
    { id: 'cc_hum_soc_001', type: 'cross_check', title: '人文和社会科学有一个交叉地带——"理解人和社会是怎么运作的"。你对这个地带的感觉是？', targetBuckets: ['humanities', 'social_science'], primaryBucket: 'humanities', priority: 15, options: [
      { id: 'cc_hum_soc_001_a', label: 'A', text: '很有兴趣——既喜欢思辨的深度，也在意社会现实', scoreEffects: [{ target: 'humanities', points: 4 }, { target: 'social_science', points: 4 }] },
      { id: 'cc_hum_soc_001_b', label: 'B', text: '更偏人文思辨——我关注的是个体的思考和表达，不关心制度运作', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'social_science', points: -2 }] },
    ]},
    { id: 'cc_hum_soc_002', type: 'cross_check', title: '法律、教育和文化之间有很多交集。你对"用规则来保护文化价值"怎么看？', targetBuckets: ['humanities', 'social_science'], primaryBucket: 'social_science', priority: 15, options: [
      { id: 'cc_hum_soc_002_a', label: 'A', text: '有意义——规则和制度对文化传承很重要', scoreEffects: [{ target: 'humanities', points: 4 }, { target: 'social_science', points: 4 }] },
      { id: 'cc_hum_soc_002_b', label: 'B', text: '我更想专注做其中一个，不太想跨', scoreEffects: [{ target: 'humanities', points: 2 }, { target: 'social_science', points: 2 }] },
    ]},
    // B2↔B3 社科↔商科
    { id: 'cc_soc_biz_001', type: 'cross_check', title: '法学和商科也有交集——公司法、知识产权、国际贸易规则。你对这个交叉地带感兴趣吗？', targetBuckets: ['social_science', 'business'], primaryBucket: 'social_science', priority: 15, options: [
      { id: 'cc_soc_biz_001_a', label: 'A', text: '有——规则和经济活动的关系让我觉得有意思', scoreEffects: [{ target: 'social_science', points: 4 }, { target: 'business', points: 4 }] },
      { id: 'cc_soc_biz_001_b', label: 'B', text: '不太感冒——我更关注法律本身而不是商业', scoreEffects: [{ target: 'social_science', points: 6 }, { target: 'business', points: -3 }] },
    ]},
    { id: 'cc_soc_biz_002', type: 'cross_check', title: '公共管理和商业管理有不少共同点——都是组织人、资源、目标。你怎么看？', targetBuckets: ['social_science', 'business'], primaryBucket: 'business', priority: 15, options: [
      { id: 'cc_soc_biz_002_a', label: 'A', text: '工具是相通的，只是目标不同——公共和商业我都有兴趣', scoreEffects: [{ target: 'social_science', points: 4 }, { target: 'business', points: 4 }] },
      { id: 'cc_soc_biz_002_b', label: 'B', text: '我更想在商业领域——效率和利润驱动让我更有动力', scoreEffects: [{ target: 'business', points: 8 }, { target: 'social_science', points: -2 }] },
      { id: 'cc_soc_biz_002_c', label: 'C', text: '我更想做公共事业——服务大众比追求利润更有意义', scoreEffects: [{ target: 'social_science', points: 8 }, { target: 'business', points: -2 }] },
    ]},
    // B3↔B4 商科↔理工（补充 1 道）
    { id: 'cc_biz_stem_002', type: 'cross_check', title: '很多理工科背景的人后来去做产品经理、技术管理者。你对"技术+商业"这个组合怎么看？', targetBuckets: ['business', 'stem'], primaryBucket: 'stem', priority: 15, options: [
      { id: 'cc_biz_stem_002_a', label: 'A', text: '这是我的理想方向——既懂技术又懂商业', scoreEffects: [{ target: 'stem', points: 4 }, { target: 'business', points: 4 }] },
      { id: 'cc_biz_stem_002_b', label: 'B', text: '我更想做纯技术——不想被商业的事情分心', scoreEffects: [{ target: 'stem', points: 8 }, { target: 'business', points: -3 }] },
    ]},
    // B4↔B5 理工↔生命健康
    { id: 'cc_stem_med_001', type: 'cross_check', title: '生物医学工程、基因测序、AI 诊断——理工和医学的交叉正在爆发。你对这个方向？', targetBuckets: ['stem', 'life_health'], primaryBucket: 'stem', priority: 15, options: [
      { id: 'cc_stem_med_001_a', label: 'A', text: '非常感兴趣——用技术推动医学正是我想做的', scoreEffects: [{ target: 'stem', points: 4 }, { target: 'life_health', points: 4 }] },
      { id: 'cc_stem_med_001_b', label: 'B', text: '有点兴趣，但我更想在纯技术或纯医学中选一个', scoreEffects: [{ target: 'stem', points: 2 }, { target: 'life_health', points: 2 }] },
      { id: 'cc_stem_med_001_c', label: 'C', text: '不太感兴趣——两个领域都太深了，交叉领域更不敢碰', scoreEffects: [] },
    ]},
    { id: 'cc_stem_med_002', type: 'cross_check', title: '医学越来越依赖设备和数据分析——CT、MRI、心电图。你愿意从"技术"端进入医疗吗？', targetBuckets: ['stem', 'life_health'], primaryBucket: 'life_health', priority: 15, options: [
      { id: 'cc_stem_med_002_a', label: 'A', text: '愿意——制造医疗设备比直接面对病人更适合我', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'life_health', points: 4 }] },
      { id: 'cc_stem_med_002_b', label: 'B', text: '我更想做临床——直接面对病人、诊断和治疗', scoreEffects: [{ target: 'life_health', points: 6 }, { target: 'stem', points: 2 }] },
    ]},
    // B2↔B5 社科↔生命健康（公共卫生）
    { id: 'cc_soc_med_001', type: 'cross_check', title: '公共卫生是社科和医学的交叉——疫情、医保、健康政策都归这里。你对这个交叉方向？', targetBuckets: ['social_science', 'life_health'], primaryBucket: 'social_science', priority: 15, options: [
      { id: 'cc_soc_med_001_a', label: 'A', text: '很感兴趣——公共政策+健康，正是我关注的事情', scoreEffects: [{ target: 'social_science', points: 4 }, { target: 'life_health', points: 4 }] },
      { id: 'cc_soc_med_001_b', label: 'B', text: '不太感冒——我更想做直接和人打交道的服务工作', scoreEffects: [{ target: 'social_science', points: 4 }] },
    ]},
    // B1↔B6 人文↔艺术
    { id: 'cc_hum_art_001', type: 'cross_check', title: '文学、哲学和艺术创作常常互相滋养。你对"用创作来表达思想"这件事？', targetBuckets: ['humanities', 'art_creative'], primaryBucket: 'humanities', priority: 15, options: [
      { id: 'cc_hum_art_001_a', label: 'A', text: '这是我的理想方式——思考和创作不分家', scoreEffects: [{ target: 'humanities', points: 4 }, { target: 'art_creative', points: 4 }] },
      { id: 'cc_hum_art_001_b', label: 'B', text: '我更喜欢纯粹的文字和思考，不太需要视觉表达', scoreEffects: [{ target: 'humanities', points: 6 }, { target: 'art_creative', points: -2 }] },
    ]},
    { id: 'cc_hum_art_002', type: 'cross_check', title: '艺术评论、策展、文化传播——这些领域需要人文功底也需要艺术眼光。你感兴趣吗？', targetBuckets: ['humanities', 'art_creative'], primaryBucket: 'art_creative', priority: 15, options: [
      { id: 'cc_hum_art_002_a', label: 'A', text: '很有兴趣——这正是我想做的', scoreEffects: [{ target: 'humanities', points: 4 }, { target: 'art_creative', points: 4 }] },
      { id: 'cc_hum_art_002_b', label: 'B', text: '我更想专注在创作本身，不太关心评论和策展', scoreEffects: [{ target: 'art_creative', points: 6 }, { target: 'humanities', points: -2 }] },
    ]},
    // B4↔B6 理工↔艺术（数字媒体/工业设计）
    { id: 'cc_stem_art_001', type: 'cross_check', title: '数字媒体、游戏设计、交互设计——这些领域技术+艺术缺一不可。你对这个交叉地带？', targetBuckets: ['stem', 'art_creative'], primaryBucket: 'stem', priority: 15, options: [
      { id: 'cc_stem_art_001_a', label: 'A', text: '非常憧憬——我既喜欢技术又喜欢创作', scoreEffects: [{ target: 'stem', points: 4 }, { target: 'art_creative', points: 4 }] },
      { id: 'cc_stem_art_001_b', label: 'B', text: '有点兴趣但更偏向技术实现，设计让专业的人做', scoreEffects: [{ target: 'stem', points: 6 }, { target: 'art_creative', points: 2 }] },
      { id: 'cc_stem_art_001_c', label: 'C', text: '更偏向纯艺术——技术只是工具，表达才是核心', scoreEffects: [{ target: 'art_creative', points: 6 }, { target: 'stem', points: 2 }] },
    ]},
    // B5↔B6 生命健康↔艺术
    { id: 'cc_med_art_001', type: 'cross_check', title: '艺术治疗是一个有趣的交叉——用创作帮助人的身心健康。你对这样的小众交叉感兴趣吗？', targetBuckets: ['life_health', 'art_creative'], primaryBucket: 'life_health', priority: 15, options: [
      { id: 'cc_med_art_001_a', label: 'A', text: '很有意思——用艺术帮助人正是我的理想', scoreEffects: [{ target: 'life_health', points: 4 }, { target: 'art_creative', points: 4 }] },
      { id: 'cc_med_art_001_b', label: 'B', text: '不太感冒——这两个领域我更喜欢专注其中一边', scoreEffects: [] },
    ]},

    // ============================================================
    // 避坑风险题（8 题）
    // 三大避坑类别：热门跟风 / 学习方式排斥 / 方向误解
    // ============================================================
    { id: 'risk_001', type: 'risk', title: '如果身边很多人都在说"某某专业好、工资高"，你会怎么想？', targetBuckets: ['stem', 'business', 'life_health'], priority: 20, options: [
      { id: 'risk_001_a', label: 'A', text: '我会自己去查这个专业到底学什么，再判断适不适合我', scoreEffects: [{ target: 'stable_path', points: 12 }], riskTags: [] },
      { id: 'risk_001_b', label: 'B', text: '热门+高薪，那肯定值得优先考虑', scoreEffects: [], riskTags: ['trend_chasing', 'salary_misconception'] },
      { id: 'risk_001_c', label: 'C', text: '我主要听家长和老师的建议，他们比我知道得多', scoreEffects: [], riskTags: ['trend_chasing', 'surface_interest'] },
      { id: 'risk_001_d', label: 'D', text: '我对"热门"本身有戒心，更愿意看自己真正感兴趣的', scoreEffects: [{ target: 'stable_path', points: 8 }], riskTags: [] },
    ]},
    { id: 'risk_002', type: 'risk', title: '你喜欢一个事物，主要是因为？', targetBuckets: ['stem', 'business', 'art_creative'], priority: 20, options: [
      { id: 'risk_002_a', label: 'A', text: '自己尝试过、觉得有意思', scoreEffects: [], riskTags: [] },
      { id: 'risk_002_b', label: 'B', text: '看到这个领域的人很厉害、很酷', scoreEffects: [], riskTags: ['surface_interest'] },
      { id: 'risk_002_c', label: 'C', text: '身边很多人都在说好', scoreEffects: [], riskTags: ['trend_chasing'] },
    ]},
    { id: 'risk_003', type: 'risk', title: '如果有人告诉你选某个方向"没前途"，你的反应是？', targetBuckets: ['humanities', 'social_science', 'art_creative'], priority: 20, options: [
      { id: 'risk_003_a', label: 'A', text: '我会自己去了解再做判断，不盲从', scoreEffects: [{ target: 'stable_path', points: 12 }], riskTags: [] },
      { id: 'risk_003_b', label: 'B', text: '可能会动摇——毕竟大家说没前途应该有道理', scoreEffects: [], riskTags: ['surface_interest'] },
    ]},
    { id: 'risk_004', type: 'risk', title: '你对"长期做同样的事"的态度是？', targetBuckets: ['stem', 'business', 'social_science'], priority: 20, options: [
      { id: 'risk_004_a', label: 'A', text: '只要我热爱，长期没问题', scoreEffects: [], riskTags: [] },
      { id: 'risk_004_b', label: 'B', text: '不太能接受——我需要变化和新挑战', scoreEffects: [], riskTags: ['rule_detail_aversion'] },
    ]},
    { id: 'risk_005', type: 'risk', title: '以下哪种情况最让你有压力？', targetBuckets: ['stem', 'humanities', 'social_science', 'life_health', 'business'], priority: 20, options: [
      { id: 'risk_005_a', label: 'A', text: '每天要处理大量文字和文档', scoreEffects: [], riskTags: ['reading_writing_aversion'] },
      { id: 'risk_005_b', label: 'B', text: '天天和陌生人打交道，需要快速建立信任', scoreEffects: [], riskTags: [] },
      { id: 'risk_005_c', label: 'C', text: '需要非常小心不出错，一出错后果严重', scoreEffects: [], riskTags: ['rule_detail_aversion'] },
      { id: 'risk_005_d', label: 'D', text: '长时间待在实验室或车间，没有太多和人交流', scoreEffects: [], riskTags: ['hands_on_aversion'] },
    ]},
    { id: 'risk_006', type: 'risk', title: '你有没有过"以为自己喜欢某件事，真做了才发现不太对"的经历？', targetBuckets: ['stem', 'business', 'humanities', 'life_health'], priority: 20, options: [
      { id: 'risk_006_a', label: 'A', text: '有过——所以现在会更谨慎地了解之后再下判断', scoreEffects: [{ target: 'stable_path', points: 12 }], riskTags: [] },
      { id: 'risk_006_b', label: 'B', text: '没太注意——很多时候还是凭直觉选', scoreEffects: [], riskTags: ['surface_interest'] },
    ]},
    { id: 'risk_007', type: 'risk', title: '选专业这件事，你觉得自己了解多少？', targetBuckets: ['stem', 'business', 'life_health', 'humanities'], priority: 20, options: [
      { id: 'risk_007_a', label: 'A', text: '只了解一两个热门专业，其他基本不清楚', scoreEffects: [], riskTags: ['info_bubble', 'name_misconception'] },
      { id: 'risk_007_b', label: 'B', text: '了解的不多，但正在努力查资料', scoreEffects: [], riskTags: [] },
      { id: 'risk_007_c', label: 'C', text: '已经主动了解了多个方向，有一定的判断框架', scoreEffects: [{ target: 'stable_path', points: 12 }], riskTags: [] },
    ]},
    { id: 'risk_008', type: 'risk', title: '如果你选了某个专业后发现和想象中完全不一样，你会？', targetBuckets: ['stem', 'business', 'life_health'], priority: 20, options: [
      { id: 'risk_008_a', label: 'A', text: '及时调整——换方向或者继续深入了解再说', scoreEffects: [{ target: 'stable_path', points: 8 }], riskTags: [] },
      { id: 'risk_008_b', label: 'B', text: '咬着牙坚持——都已经选了，后悔也没用', scoreEffects: [], riskTags: ['surface_interest'] },
    ]},

    // ============================================================
    // 主观开放题（4 题）
    // 测试结束时随机抽取 1-2 题，自由文本输入
    // 无 scoreEffects——纯开放式问题，不参与评分
    // ============================================================

    { id: 'subj_001', type: 'subjective', title: '你目前心里有没有特别想了解的专业方向？随便说说就行', targetBuckets: [], priority: 30, options: [] },
    { id: 'subj_002', type: 'subjective', title: '你对未来的大学生活或者工作，最在意什么？', targetBuckets: [], priority: 30, options: [] },
    { id: 'subj_003', type: 'subjective', title: '有没有什么事情是你特别不想做的？比如特别讨厌的科目、排斥的工作方式', targetBuckets: [], priority: 30, options: [] },
    { id: 'subj_004', type: 'subjective', title: '还有什么想补充的吗？任何关于选专业的想法都可以写下来', targetBuckets: [], priority: 30, options: [] },
  ],
};

export default questionBank;
