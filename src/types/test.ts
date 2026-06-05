/**
 * 方向测试题库数据类型定义
 * 对齐 ALGORITHM_SPEC.md v0.3 的 6 桶两阶段体系
 *
 * ⚠️ 本文件只定义数据结构，不包含算法逻辑。
 */

// ───── 方向桶（粗筛 6 桶） ─────

export type DirectionBucket =
  | 'humanities'       // B1 人文
  | 'social_science'   // B2 社科
  | 'business'         // B3 商科
  | 'stem'             // B4 理工
  | 'life_health'      // B5 生命健康
  | 'art_creative';    // B6 艺术创作

// ───── 桶内细分方向 ─────

export type SubDirection =
  | 'language_literature'   // B1
  | 'history_philosophy'    // B1
  | 'journalism'            // B1
  | 'law'                   // B2
  | 'education_society'     // B2
  | 'public_admin'          // B2
  | 'economics_theory'      // B3
  | 'finance_accounting'    // B3
  | 'business_admin'        // B3
  | 'science_basic'         // B4
  | 'cs_info'               // B4
  | 'engineering_manufacturing' // B4
  | 'clinical_medicine'     // B5
  | 'pharmacy_health'       // B5
  | 'agriculture_ecology'   // B5
  | 'fine_art_design'       // B6
  | 'music_dance'           // B6
  | 'drama_film';           // B6

// ───── 题目类型 ─────

export type QuestionType =
  | 'general'      // 通用粗筛题（第 1 步，8 道）
  | 'branch'       // 方向分流题（第 2 步自适应抽题）
  | 'cross_check'  // 相邻方向校验题
  | 'risk'         // 避坑风险题
  | 'subjective';  // 主观开放题（测试结束时 1-2 道，自由文本）

// ───── 避坑标签（对齐 ALGORITHM_SPEC v0.3 §8） ─────

export type RiskTag =
  | 'trend_chasing'            // 热门跟风
  | 'salary_misconception'     // 薪资预期偏差
  | 'info_bubble'              // 信息茧房
  | 'long_cycle'               // 长周期高投入
  | 'reading_writing_aversion' // 排斥大量阅读写作
  | 'rule_detail_aversion'     // 排斥规则与重复
  | 'hands_on_aversion'        // 排斥动手与实验
  | 'name_misconception'       // 名字误解
  | 'surface_interest'         // 表面兴趣
  | 'arts_science_mismatch';   // 文理认知偏差

// ───── 维度（11 维度体系） ─────

export type Dimension =
  | 'math_logic'            // D1  数理逻辑
  | 'reading_expression'    // D2  阅读表达
  | 'interpersonal'         // D3  人际沟通
  | 'business_sense'        // D4  商业规则
  | 'engineering_practice'  // D5  工程实践
  | 'info_systems'          // D6  信息系统
  | 'life_health_interest'  // D7  生命健康
  | 'aesthetic_creation'    // D8  审美创作
  | 'abstract_theory'       // D9  抽象理论
  | 'stable_path'           // D10 稳定路径
  | 'rule_detail';          // D11 规则细节

// ───── 计分效果 ─────

/** 一次计分：给某个目标（桶 / 维度 / 专业类标签）加或扣分 */
export interface ScoreEffect {
  /** 目标标识：方向桶 id / 维度 id / 专业类 slug */
  target: DirectionBucket | Dimension | string;
  /** 正向加分，负向扣分 */
  points: number;
}

// ───── 选项 ─────

export interface Option {
  /** 选项编号，如 "1a"、"1b"（题号+字母） */
  id: string;
  /** 展示标签，如 "A"、"B" */
  label: string;
  /** 选项文本 */
  text: string;
  /** 计分效果列表：可同时影响多个目标 */
  scoreEffects: ScoreEffect[];
  /** 仅 risk 题：选中此项触发的风险标签 */
  riskTags?: RiskTag[];
}

// ───── 题目 ─────

export interface Question {
  /** 唯一标识，命名规则：{type前缀}_{桶缩写}_{序号} */
  id: string;
  /** 题目类型 */
  type: QuestionType;
  /** 题干文本 */
  title: string;
  /** 可选：补充说明（场景题可加背景） */
  description?: string;
  /** 此题面向哪些方向桶（用于抽题时按桶筛选） */
  targetBuckets: DirectionBucket[];
  /** 仅 branch 题：细分到哪个子方向 */
  subDirection?: SubDirection;
  /** 选项列表 */
  options: Option[];
  /** 仅 cross_check 题：校验的主方向桶 */
  primaryBucket?: DirectionBucket;
  /** 流程中的出题优先级（0 = step0 信息收集，1-8 = 通用题，9+ = 分流/校验/避坑） */
  priority?: number;
}

// ───── 题库 ─────

export interface QuestionBank {
  /** 题库版本 */
  version: string;
  /** 更新时间 */
  updatedAt: string;
  /** 题目列表 */
  questions: Question[];
}

// ───── 抽题辅助类型 ─────

/** 按桶统计题目数 */
export function countByBucket(bank: QuestionBank, bucket: DirectionBucket): number {
  return bank.questions.filter((q) => q.targetBuckets.includes(bucket)).length;
}

/** 按类型 + 桶筛选题目 */
export function filterQuestions(
  bank: QuestionBank,
  type: QuestionType,
  buckets?: DirectionBucket[],
): Question[] {
  let result = bank.questions.filter((q) => q.type === type);
  if (buckets && buckets.length > 0) {
    result = result.filter((q) =>
      q.targetBuckets.some((b) => buckets.includes(b)),
    );
  }
  return result;
}
