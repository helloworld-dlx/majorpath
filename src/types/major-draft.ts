/**
 * 专业类草稿简介类型定义
 *
 * 用于在完整详情页上线前，先展示轻量级草稿介绍。
 * 草稿和完整内容互斥（full > draft > building）。
 */

export interface MajorDraftContent {
  categoryName: string;
  status: 'draft';
  /** 一句话看懂 */
  oneLine: string;
  /** 大概学什么 */
  learns: string;
  /** 和高中有什么关系 */
  highSchoolConnection: string;
  /** 适合先了解的人 */
  goodFor: string;
  /** 需要提前注意 */
  watchOut: string;
  /** 草稿提示 */
  draftNotice: string;
}

export type MajorDraftMap = Record<string, MajorDraftContent>;
