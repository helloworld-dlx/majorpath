/**
 * 01 哲学 — 学科门类数据
 */

import type { Gate } from '../../types/catalog';

export const philosophyGate: Gate = {
      code: '01',
      name: '哲学',
      slug: 'philosophy',
      icon: '💡',
      status: 'todo',
      categoryCount: 1,
      majorCount: 4,
      description: '研究世界观、人生观、价值观，培养逻辑思辨和追问根本问题的能力',
      categories: [
        {
          code: '0101',
          name: '哲学类',
          slug: 'philosophy-class',
          status: 'building',
          majorCount: 4,
          description: '探讨世界的本质、知识的边界、人生的意义',
          majors: [
            { code: '010101', name: '哲学', slug: 'philosophy-major', status: 'todo', tags: ['核心'], summary: '重新思考一切——不是学什么，而是学怎么思考' },
            { code: '010102', name: '逻辑学', slug: 'logic', status: 'todo', tags: ['偏理'], summary: '推理的规则和形式——数学家和律师都需要' },
            { code: '010103K', name: '宗教学', slug: 'religious-studies', status: 'todo', tags: ['国控'], summary: '研究宗教现象——不是信教，是理解信仰' },
            { code: '010104T', name: '伦理学', slug: 'ethics', status: 'todo', tags: ['特设'], summary: '什么是对错——AI时代更需要伦理思辨' },
          ],
        },
      ],
    };

export default philosophyGate;
