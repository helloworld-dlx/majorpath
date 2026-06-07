/**
 * 14 交叉学科（2026 年新增） — 学科门类数据
 */

import type { Gate } from '../../types/catalog';

export const interdisciplinaryGate: Gate = {
  code: '14',
  name: '交叉学科',
  slug: 'interdisciplinary',
  icon: '🔗',
  status: 'building',
  categoryCount: 1,
  majorCount: 6,
  description: '2026 年首次设立的学科门类，面向国家战略急需，融合多学科前沿',
  categories: [
    {
      code: '1401',
      name: '交叉学科类',
      slug: 'interdisciplinary-class',
      status: 'building',
      majorCount: 15,
      description: '打破传统学科壁垒，培养国家急需的复合型人才',
      majors: [
        { code: '140101TK', name: '未来机器人', slug: 'future-robotics', status: 'todo', tags: ['新专业', '国控', '特设'], summary: '融合机械、电子、AI 的下一代机器人' },
        { code: '140102TK', name: '交叉工程', slug: 'cross-engineering', status: 'todo', tags: ['新专业', '国控', '特设'] },
        { code: '140103TK', name: '低空技术与工程', slug: 'low-altitude-tech', status: 'todo', tags: ['新专业', '国控', '特设'], summary: '面向无人机和低空经济的技术方向' },
        { code: '140104TK', name: '集成电路科学与工程', slug: 'ic-science', status: 'todo', tags: ['新专业', '国控', '特设'], summary: '芯片设计与制造，国家急需' },
        { code: '140108TK', name: '具身智能', slug: 'embodied-intelligence', status: 'todo', tags: ['新专业', '国控', '特设'], summary: '让 AI 有身体、能动起来' },
        { code: '140109TK', name: '脑机科学与技术', slug: 'brain-computer', status: 'todo', tags: ['新专业', '国控', '特设'], summary: '大脑和机器的直接交互' },
      ],
    },
  ],
};

export default interdisciplinaryGate;
