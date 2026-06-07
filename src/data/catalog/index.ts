/**
 * 本科专业目录数据 — 聚合导出
 *
 * 数据来源：教育部《普通高等学校本科专业目录（2026 年）》
 * 共 13 个学科门类、92 个专业类、883 种专业
 *
 * 按学科门类拆分到独立文件：
 *   philosophy.ts / economics.ts / law.ts / pedagogy.ts / literature.ts
 *   history.ts / science.ts / engineering.ts / agronomy.ts / medicine.ts
 *   management.ts / art.ts / interdisciplinary.ts
 */

import type { Catalog } from '../../types/catalog';

import { philosophyGate } from './philosophy';
import { economicsGate } from './economics';
import { lawGate } from './law';
import { pedagogyGate } from './pedagogy';
import { literatureGate } from './literature';
import { historyGate } from './history';
import { scienceGate } from './science';
import { engineeringGate } from './engineering';
import { agronomyGate } from './agronomy';
import { medicineGate } from './medicine';
import { managementGate } from './management';
import { artGate } from './art';
import { interdisciplinaryGate } from './interdisciplinary';

const gates = [
  philosophyGate, economicsGate, lawGate, pedagogyGate,
  literatureGate, historyGate, scienceGate, engineeringGate,
  agronomyGate, medicineGate, managementGate, artGate, interdisciplinaryGate,
];

export const catalog: Catalog = {
  version: '2026',
  updatedAt: '2026-06-07',
  totalGates: 13,
  totalCategories: 92,
  totalMajors: 883,
  gates,
};
