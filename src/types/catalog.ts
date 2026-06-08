/**
 * 本科专业目录数据类型定义
 * 数据来源：教育部《普通高等学校本科专业目录（2026年）》
 * 共 13 个学科门类、92 个专业类、883 种专业
 */

/**
 * 内容建设状态
 * - completed: 详情页已上线，内容经人工审核
 * - building: 已开始编写但尚未完成
 * - todo: 待补充，仅创建了目录占位
 */
export type ContentStatus = 'completed' | 'building' | 'todo';

/**
 * 具体专业（三级节点：叶子层）
 */
export interface Major {
  /** 专业代码，如 "080901" */
  code: string;
  /** 专业名称，如 "计算机科学与技术" */
  name: string;
  /** URL slug，用于生成详情页路由 */
  slug: string;
  /** 内容建设状态 */
  status: ContentStatus;
  /** 标签，如 ["热门", "理学可报", "新工科"] */
  tags?: string[];
  /** 详情页路径（可选，默认为 /majors/{gate}/{category}/{slug}） */
  detailSlug?: string;
  /** 一句话简介（待建设时可留空） */
  summary?: string;
  /** 搜索别名，如 ["计算机", "CS", "计科"] */
  aliases?: string[];
  /** 搜索关键词，如 ["代码", "编程", "算法", "软件"] */
  keywords?: string[];
}

/**
 * 专业类（二级节点：分类层）
 */
export interface Category {
  /** 专业类代码，如 "0809" */
  code: string;
  /** 专业类名称，如 "计算机类" */
  name: string;
  /** URL slug */
  slug: string;
  /** 内容建设状态 */
  status: ContentStatus;
  /** 该专业类下具体专业数量 */
  majorCount: number;
  /** 一句话简介 */
  description?: string;
  /** 关联的详情页 slug（可选） */
  detailSlug?: string;
  /** 该专业类下的具体专业列表 */
  majors: Major[];
}

/**
 * 学科门类（一级节点：顶层）
 */
export interface Gate {
  /** 门类代码，如 "08" */
  code: string;
  /** 门类名称，如 "工学" */
  name: string;
  /** URL slug，用于路由 /majors/{slug} */
  slug: string;
  /** 展示用 emoji 图标 */
  icon: string;
  /** 内容建设状态（门类整体） */
  status: ContentStatus;
  /** 该门类下专业类数量 */
  categoryCount: number;
  /** 该门类下具体专业总数 */
  majorCount: number;
  /** 一句话简介 */
  description?: string;
  /** 该门类下的专业类列表 */
  categories: Category[];
}

/**
 * 完整目录
 */
export interface Catalog {
  /** 目录数据版本（对应教育部目录年份） */
  version: string;
  /** 更新时间 */
  updatedAt: string;
  /** 学科门类总数 */
  totalGates: number;
  /** 专业类总数 */
  totalCategories: number;
  /** 具体专业总数 */
  totalMajors: number;
  /** 学科门类列表 */
  gates: Gate[];
}

/** 辅助：按状态统计数据 */
export interface CatalogStats {
  completedGates: number;
  buildingGates: number;
  todoGates: number;
  completedCategories: number;
  buildingCategories: number;
  todoCategories: number;
  completedMajors: number;
  buildingMajors: number;
  todoMajors: number;
}

/** 计算目录建设统计 */
export function computeCatalogStats(catalog: Catalog): CatalogStats {
  const stats: CatalogStats = {
    completedGates: 0, buildingGates: 0, todoGates: 0,
    completedCategories: 0, buildingCategories: 0, todoCategories: 0,
    completedMajors: 0, buildingMajors: 0, todoMajors: 0,
  };

  for (const gate of catalog.gates) {
    stats[`${gate.status}Gates` as keyof Pick<CatalogStats, 'completedGates' | 'buildingGates' | 'todoGates'>]++;
    for (const cat of gate.categories) {
      stats[`${cat.status}Categories` as keyof Pick<CatalogStats, 'completedCategories' | 'buildingCategories' | 'todoCategories'>]++;
      for (const major of cat.majors) {
        stats[`${major.status}Majors` as keyof Pick<CatalogStats, 'completedMajors' | 'buildingMajors' | 'todoMajors'>]++;
      }
    }
  }

  return stats;
}

/** 统计目录中实际有数据（majors 数组非空）的专业条目数 */
export function countActualMajors(catalog: Catalog): number {
  let count = 0;
  for (const gate of catalog.gates) {
    for (const cat of gate.categories) {
      count += cat.majors.length;
    }
  }
  return count;
}

/** 统计某个门类中实际有数据（majors 数组非空）的专业条目数 */
export function countActualMajorsInGate(gate: Gate): number {
  let count = 0;
  for (const cat of gate.categories) {
    count += cat.majors.length;
  }
  return count;
}
