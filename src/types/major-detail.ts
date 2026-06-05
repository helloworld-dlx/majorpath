/**
 * 专业详情页内容类型定义
 */

/** 相关专业区别 */
export interface RelatedMajorDiff {
  name: string;
  slug?: string;
  gateSlug?: string;
  diff: string;
}

/** 一条介绍视频 */
export interface VideoInfo {
  title: string;
  url: string;
  intro: string;
}

/** 一位内容贡献人 */
export interface ContributorInfo {
  name: string;
  role?: string;
  note?: string;
}

/** 专业类详情内容 */
export interface MajorDetailContent {
  categorySlug: string;
  gateSlug: string;

  // ───── 10 个内容模块 ─────
  oneLiner: string;
  whatYouLearn: string[];
  vsHighSchool: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  commonMisconceptions: string[];
  realScenes: string[];
  futurePaths: string[];
  pitfalls: string[];
  relatedMajors: RelatedMajorDiff[];

  // ───── 视频（可选） ─────
  videos?: VideoInfo[];

  // ───── 贡献人（可选，默认佚名贡献者） ─────
  contributors?: ContributorInfo[];

  // ───── 元信息 ─────
  updatedAt?: string;
  reviewStatus?: 'draft' | 'reviewed';
}

export type MajorDetailMap = Record<string, MajorDetailContent>;
