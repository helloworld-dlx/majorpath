/**
 * 06 历史学 — 学科门类数据
 */

import type { Gate } from '../../types/catalog';

export const historyGate: Gate = {
      code: '06',
      name: '历史学',
      slug: 'history',
      icon: '🏛️',
      status: 'todo',
      categoryCount: 1,
      majorCount: 9,
      description: '研究人类社会的发展变迁，培养史料分析和批判性思维能力',
      categories: [
        {
          code: '0601',
          name: '历史学类',
          slug: 'history-class',
          status: 'building',
          majorCount: 9,
          description: '读懂过去才能看清未来——历史不背书，而是培养洞察力',
          majors: [
            { code: '060101', name: '历史学', slug: 'history-major', status: 'todo', tags: ['核心'], summary: '从原始社会到近代——人类历史的整体脉络' },
            { code: '060102', name: '世界史', slug: 'world-history', status: 'todo', tags: ['国际'], summary: '全球视野下的历史——不同的文明怎么走到今天' },
            { code: '060103', name: '考古学', slug: 'archaeology', status: 'todo', tags: ['实践'], summary: '挖土不是重点——从地下文物还原古代生活' },
            { code: '060104', name: '文物与博物馆学', slug: 'museology', status: 'todo', tags: ['应用'], summary: '博物馆怎么策展、文物怎么保护——让历史活起来' },
            { code: '060105T', name: '文物保护技术', slug: 'artifact-conservation', status: 'todo', tags: ['特设', '交叉'], summary: '用科技手段保护文物——化学、物理在文物修复中的应用' },
            { code: '060106T', name: '外国语言与外国历史', slug: 'foreign-lang-history', status: 'todo', tags: ['特设'], summary: '语言+历史——需要用外语研究他国历史' },
            { code: '060107T', name: '文化遗产', slug: 'cultural-heritage', status: 'todo', tags: ['新兴', '特设'], summary: '非遗保护、世界遗产管理——让文化传承下去' },
            { code: '060108T', name: '古文字学', slug: 'paleography', status: 'todo', tags: ['小众', '特设'], summary: '甲骨文、金文、简帛——认别人不认识的字' },
            { code: '060109T', name: '科学史', slug: 'history-of-science', status: 'todo', tags: ['交叉', '特设'], summary: '为什么人类有了科学——科学技术发展历程' },
          ],
        },
      ],
    };

export default historyGate;
