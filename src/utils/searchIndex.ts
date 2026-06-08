/**
 * 专业/方向搜索索引
 *
 * 从 catalog 数据构建前端搜索索引，支持：
 * - 专业名称精确/模糊搜索
 * - 别名搜索
 * - 关键词搜索
 * - 分类/门类名称搜索
 * - 一句话简介搜索
 *
 * 所有搜索在前端本地完成，不请求 API。
 */

import { catalog } from '../data/catalog';
import type { ContentStatus } from '../types/catalog';

/** 搜索结果条目 */
export interface SearchEntry {
  /** 显示名称（专业名或专业类名） */
  name: string;
  /** 别名/简称 */
  aliases?: string[];
  /** 搜索关键词 */
  keywords?: string[];
  /** 一句话简介 */
  shortDescription: string;
  /** 内容状态 */
  status: ContentStatus;
  /** 详情页路径 */
  path: string;
  /** 所属学科门类 */
  gateName: string;
  /** 所属门类 slug */
  gateSlug: string;
  /** 所属专业类 */
  categoryName: string;
  /** 所属专业类 slug */
  categorySlug: string;
  /** 是否为专业类（一级分类）而非具体专业 */
  isCategory: boolean;
}

/** 带得分的搜索结果 */
export interface ScoredEntry extends SearchEntry {
  score: number;
}

/** 规范化文本：转小写 + 去除特殊字符 */
function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
}

/** 切分中文文本为可搜索词元 */
function tokenize(text: string): string[] {
  return text.split(/[\s\-_,，。、、\-–—]/).filter(Boolean);
}

/** 判断 query 是否匹配 target（规范化后包含匹配） */
function matches(target: string, query: string): boolean {
  if (!query || !target) return false;
  const t = normalize(target);
  const q = normalize(query);
  if (t.includes(q)) return true;
  // 中文词元匹配
  const tokens = tokenize(target);
  return tokens.some((tok) => normalize(tok).includes(q));
}

/** 为单个条目计算匹配得分 */
function scoreEntry(entry: SearchEntry, query: string): number {
  if (!query) return 0;
  const q = normalize(query);

  let s = 0;

  // 1. 专业名称完全匹配（忽略大小写）→ 最高
  if (normalize(entry.name) === q) s += 100;

  // 2. 专业名称包含 query
  if (matches(entry.name, query)) s += 50;

  // 3. 别名精确匹配
  if (entry.aliases?.some((a) => normalize(a) === q)) s += 40;

  // 4. 别名包含匹配
  if (entry.aliases?.some((a) => matches(a, query))) s += 30;

  // 5. 关键词匹配
  if (entry.keywords?.some((k) => matches(k, query))) s += 20;

  // 6. 词元级别命中（ category name / gate name 匹配）
  if (matches(entry.categoryName, query)) s += 15;
  if (matches(entry.gateName, query)) s += 10;

  // 7. 简介匹配（泛化词质量低，降权）
  if (matches(entry.shortDescription, query)) s += 2;

  // 8. 状态优先级：completed > building > todo
  //    仅当已有内容匹配时才加分，避免不相关条目仅凭状态冒出来
  if (s > 0) {
    if (entry.status === 'completed') s += 3;
    else if (entry.status === 'building') s += 1;
  }

  return s;
}

/** 构建完整搜索索引 */
function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const gate of catalog.gates) {
    for (const cat of gate.categories) {
      // 如果专业类有 description，也把它作为 category 条目加入索引
      // （便于搜索 "计算机类"、"电子信息" 等专业类名）
      const categoryEntry: SearchEntry = {
        name: cat.name,
        aliases: [],
        keywords: cat.description ? tokenize(cat.description).slice(0, 6) : [],
        shortDescription: cat.description ?? `${gate.name}下的专业类，共${cat.majorCount}个专业`,
        status: cat.status,
        path: `/majors/${gate.slug}/${cat.slug}`,
        gateName: gate.name,
        gateSlug: gate.slug,
        categoryName: cat.name,
        categorySlug: cat.slug,
        isCategory: true,
      };
      entries.push(categoryEntry);

      // 具体专业条目
      for (const major of cat.majors) {
        const majorEntry: SearchEntry = {
          name: major.name,
          aliases: major.aliases ?? [],
          keywords: major.keywords ?? (major.tags ?? []),
          shortDescription: major.summary ?? `${cat.name}下的专业`,
          status: major.status,
          path: `/majors/${gate.slug}/${cat.slug}/${major.slug}`,
          gateName: gate.name,
          gateSlug: gate.slug,
          categoryName: cat.name,
          categorySlug: cat.slug,
          isCategory: false,
        };
        entries.push(majorEntry);
      }
    }
  }

  return entries;
}

//懒初始化索引
let _index: SearchEntry[] | null = null;

function getIndex(): SearchEntry[] {
  if (!_index) _index = buildIndex();
  return _index;
}

/**
 * 搜索专业/方向
 * @param query搜索词
 * @param limit 返回结果上限，默认 8
 * @returns 按相关性排序的搜索结果
 */
export function searchMajors(query: string, limit = 8): SearchEntry[] {
  if (!query || query.trim().length < 1) return [];

  const index = getIndex();
  const q = query.trim();

  const scored = index
    .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
    .filter(({ score }) => score > 0);

  // 降序排序：得分高的排前面
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => entry);
}