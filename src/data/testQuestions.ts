/**
 * 测试题库 —— 模拟器专用入口
 *
 * 从现有题库重导出，保持接口兼容。
 * 实际数据源：src/data/questionBank.ts（99 题）
 */

import { questionBank } from './questionBank';
export default questionBank;

// 单独导出题目数组
export const questions = questionBank.questions;
export const questionBankVersion = questionBank.version;
export const questionBankUpdatedAt = questionBank.updatedAt;
