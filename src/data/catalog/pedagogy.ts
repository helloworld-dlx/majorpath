/**
 * 04 教育学 — 学科门类数据
 */

import type { Gate } from '../../types/catalog';

export const pedagogyGate: Gate = {
      code: '04',
      name: '教育学',
      slug: 'pedagogy',
      icon: '📚',
      status: 'todo',
      categoryCount: 2,
      majorCount: 30,
      description: '研究教育规律和人才培养方法，不只是当老师这一条路',
      categories: [
        {
          code: '0401',
          name: '教育学类',
          slug: 'education',
          status: 'building',
          majorCount: 14,
          description: '研究怎么教、怎么育——从幼儿园到大学，从学校教育到终身学习，教育学关注人成长的规律',
          majors: [
            { code: '040101', name: '教育学', slug: 'pedagogy-study', status: 'todo', tags: ['核心', '理论'], summary: '教育基本理论、课程教学论、教育心理学——教育学的基础学科' },
            { code: '040102', name: '科学教育', slug: 'science-education', status: 'todo', tags: ['交叉', '实践'], summary: '自然科学教学法、科普教育、科学课程设计——教学生爱上科学' },
            { code: '040103', name: '人文教育', slug: 'humanities-education', status: 'todo', tags: ['综合', '文科'], summary: '语文、历史、地理等人文社科教学——培养人文素养' },
            { code: '040104', name: '教育技术学', slug: 'educational-tech', status: 'todo', tags: ['技术', '交叉'], summary: '教育软件开发、在线课程设计、教育AI——技术改变教育' },
            { code: '040105', name: '艺术教育', slug: 'art-education', status: 'todo', tags: ['艺术', '教学'], summary: '音乐、美术、舞蹈教学法——培养艺术老师' },
            { code: '040106', name: '学前教育', slug: 'preschool-education', status: 'todo', tags: ['实践强', '需求大'], summary: '幼儿发展、幼儿园课程、游戏设计——跟小孩子打交道' },
            { code: '040107', name: '小学教育', slug: 'primary-education', status: 'todo', tags: ['稳定', '编制多'], summary: '小学生各科教学、班级管理、儿童心理——打基础的关键阶段' },
            { code: '040108', name: '特殊教育', slug: 'special-education', status: 'todo', tags: ['专业', '公益'], summary: '残障儿童教育、融合教育、特殊儿童心理——需要耐心和专业' },
            { code: '040109', name: '华文教育', slug: 'chinese-education-overseas', status: 'todo', tags: ['语言', '海外'], summary: '海外华文教学、汉语国际教育——让中文走向世界' },
            { code: '040110T', name: '教育康复学', slug: 'edu-rehabilitation', status: 'todo', tags: ['交叉', '专业'], summary: '特殊儿童康复、教育治疗、语言训练——帮助有障碍的孩子' },
            { code: '040111T', name: '家政学', slug: 'home-economics', status: 'todo', tags: ['生活', '应用'], summary: '家庭生活管理、营养学、儿童保护——生活里的学问' },
            { code: '040112T', name: '劳动教育', slug: 'labor-education', status: 'todo', tags: ['新兴', '政策'], summary: '劳动课程设计、职业技能培训——从劳动教育到职业素养' },
            { code: '040113T', name: '融合教育', slug: 'inclusive-education', status: 'todo', tags: ['交叉', '前沿'], summary: '普特融合、随班就读、无障碍教育——让每个孩子在一起学习' },
            { code: '040114T', name: '跨境中医药文化传播', slug: 'tcm-cultural-exchange', status: 'todo', tags: ['新兴', '交叉'], summary: '中医药文化国际传播、中医教育海外推广——中医走向世界' },
            { code: '040201T', name: '政治教育', slug: 'political-education', status: 'todo', tags: ['思政', '稳定'], summary: '思想政治教育、公民教育——培养正确价值观' },
            { code: '040202T', name: '心理学（教育学院）', slug: 'edu-psychology', status: 'todo', tags: ['交叉', '应用'], summary: '教育心理学、发展心理学、学校心理辅导——了解孩子在想什么' },
            { code: '040203T', name: '教育社会学', slug: 'edu-sociology', status: 'todo', tags: ['理论', '研究'], summary: '教育公平、社会分层、学校文化——从社会角度看教育' },
          ],
        },
        {
          code: '0402',
          name: '体育学类',
          slug: 'physical-education',
          status: 'building',
          majorCount: 13,
          description: '不只是体育课——运动科学、体育产业、体育教育',
          majors: [
            { code: '040201', name: '体育教育', slug: 'physical-edu-major', status: 'todo', tags: ['核心'], summary: '培养体育老师——不只教运动，还教怎么教' },
            { code: '040202K', name: '运动训练', slug: 'sports-training', status: 'todo', tags: ['国控'], summary: '运动员的科学训练——怎么练得更好更快更强' },
            { code: '040203', name: '社会体育指导与管理', slug: 'social-sports', status: 'todo', tags: ['应用'], summary: '大众健身指导——让普通人科学锻炼' },
            { code: '040204K', name: '武术与民族传统体育', slug: 'wushu', status: 'todo', tags: ['国控'], summary: '武术、传统体育项目——不只是套路表演' },
            { code: '040205', name: '运动人体科学', slug: 'sports-science', status: 'todo', tags: ['偏理'], summary: '运动生理学、运动生物力学——用科学解释运动' },
            { code: '040206T', name: '运动康复', slug: 'sports-rehab', status: 'todo', tags: ['特设'], summary: '运动损伤的治疗和康复——运动员的物理治疗师' },
            { code: '040207T', name: '休闲体育', slug: 'leisure-sports', status: 'todo', tags: ['特设'], summary: '户外运动、攀岩、皮划艇——把运动和休闲结合起来' },
            { code: '040208T', name: '体能训练', slug: 'strength-conditioning', status: 'todo', tags: ['特设'], summary: '专业体能训练师——研究怎么科学提升身体素质' },
            { code: '040209T', name: '冰雪运动', slug: 'winter-sports', status: 'todo', tags: ['新兴', '特设'], summary: '滑雪、滑冰等冰雪运动——冬奥会带火的方向' },
            { code: '040210T', name: '电子竞技运动与管理', slug: 'esports', status: 'todo', tags: ['新兴', '特设'], summary: '电竞的运营和管理——不只是打游戏' },
            { code: '040211T', name: '体育旅游', slug: 'sports-tourism', status: 'todo', tags: ['新兴', '特设'], summary: '体育赛事旅游、户外探险——边运动边旅行' },
            { code: '040212T', name: '智能体育工程', slug: 'smart-sports', status: 'todo', tags: ['前沿', '特设'], summary: '可穿戴设备、运动数据分析——科技让运动更科学' },
            { code: '040213T', name: '体育经济与管理', slug: 'sports-management', status: 'todo', tags: ['特设'], summary: '体育赛事运营和营销——NBA、中超背后的商业' },
          ],
        },
      ],
    };

export default pedagogyGate;
