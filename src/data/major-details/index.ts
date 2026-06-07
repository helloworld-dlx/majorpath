/**
 * 专业类详情内容 — 聚合导出
 *
 * 按学科门类拆分到独立文件：
 *   engineering.ts  — 工学
 *   （后续按需添加：science.ts / management.ts / medicine.ts 等）
 *
 * 内容原则：说大白话，面向高中生，不堆术语，不夸大不贬低
 */

import type { MajorDetailMap } from '../../types/major-detail';
import { engineeringDetails } from './engineering';

/**
 * 所有专业类详情内容的聚合 Map。
 * 新增门类时在此合并即可。
 */
export const majorDetails: MajorDetailMap = {
  ...engineeringDetails,
};

export default majorDetails;
