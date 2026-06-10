# Changelog

所有重大变更按时间倒序记录。

---

## v1.1 — 2026-06-10 — 稳定性专项修复

### 变更级别：重大

### 修复目标
解决"同一用户三次测试出现商科/社科/理工大幅漂移"的核心问题。

---

### A1 — 第一阶段题目固定化 ✅

**问题**：第一阶段通用题随机抽取 9 道，每次测试题目不同，导致得分桶不稳定。

**修复**：
- 将 9 道随机抽取改为 12 道固定选取（FIRST_STAGE_QUESTION_IDS）
- 定义版本常量 `FIRST_STAGE_VERSION = "v1.0"` 标识固定题库
- 第一阶段 12 题 ID：`gen_001, gen_002, gen_003, gen_004, gen_006, gen_007, gen_008, gen_010, gen_014, gen_016, gen_017, gen_020`
- 题目集合固定，但题目顺序随机（消除位置疲劳偏差）
- 选科信息不再影响第一阶段题目选取，仅在推荐阶段过滤

**涉及文件**：
- `public/scripts/test-flow.js` — startTest() 中改为固定 ID 选取
- `src/utils/adaptiveQuestioning.ts` — selectGeneralQuestions 改为确定性

### A2 — 第一阶段题目数量 9→12 ✅

**修复**：增加 3 道题，缩小单题权重，降低抽样偏差影响。

### B1 — 固定选项排列顺序 ✅

**问题**：选项 shuffle 造成排列偏差（primacy bias）。

**修复**：取消选项 shuffle，保持题库中定义的原始顺序。

**涉及文件**：`public/scripts/test-flow.js`

### B2 — 统一两套代码的参数（midThreshold） ✅

**问题**：`test-flow.js` 的 `determineUserType` 中 `midThreshold=55`，`adaptiveQuestioning.ts` 中 `midThreshold=66`，导致线上更容易把人标为 "dual"。

**修复**：`test-flow.js` 的阈值与 `adaptiveQuestioning.ts` 对齐：
- single 判定：top >= 68（不变）
- exploratory 判定：top < 58（不变）
- dual 判定：top >= 66 && second >= 66 && top - second < 6（原为 55/55/8）

**涉及文件**：`public/scripts/test-flow.js`

### B3 — 补充 business_sense 维度数据点 ✅

**问题**：20 道通用题中 business_sense 维度无法得分。

**修复**：在以下选项增加 `{target:'business_sense', points:6}`：
- `gen_002_c`（组织一场活动）
- `gen_004_d`（执行计划）
- `gen_017_c`（有稳定）

**涉及文件**：`src/data/questionBank.ts`

### C1 — 第二阶段分支题确定性选取 ✅

**问题**：第二阶段分支题/cross_check/risk 题随机抽取。

**修复**：全部改为确定性选取（按 ID 字母序取前 N 道）。

**涉及文件**：
- `public/scripts/test-flow.js` — handleNext() 中分支题选取
- `src/utils/adaptiveQuestioning.ts` — 所有 pool.sort().slice() 改为确定性

### D1 — 70/30 加权混合 ✅

**问题**：第一阶段和第二阶段得分混合比例不明确。

**修复**：
- 公式：`finalBucket[key] = genRefined[key] * 0.7 + allRefined[key] * 0.3`
- 第一阶段占 70%（主导），第二阶段占 30%（辅助微调）
- 归一化后进行推荐排序

**涉及文件**：
- `src/utils/scoring.ts` — computeRefinedBucketScores 新增 70/30 加权
- `public/scripts/report.js` — boot() 传递 genOnlyBucketScores

### D2 — 选科惩罚机制 ✅

**问题**：未考虑选科对方向推荐的影响。

**修复**：在 computeRefinedBucketScores 中增加选科惩罚参数：
- 未选物理 → STEM × 0.6
- 未选化学 → STEM × 0.85
- 未选生物 → life_health × 0.7
- 未选历史+政治 → humanities × 0.75 / social_science × 0.85

**涉及文件**：`src/utils/scoring.ts` — filterGeneralResponses 辅助函数

### E1 — 稳定性验收脚本 ✅

**新增文件**：
- `scripts/stability_audit.ts` — 稳定性验收脚本（6画像×10次）
- `scripts/stability_test.ts` — 快速稳定性测试脚本（5画像×10次+100随机）

**验收结果**（v1.1 发布前验证）：
| 指标 | 目标 | 实际 |
|------|:--:|:--:|
| firstStageScoreVariance | 0 | 0 ✅ |
| topCategoryChangeCount | 0 | 0 ✅ |
| majorCategoryDriftCount | 0 | 0 ✅ |
| 随机抽题 | 无 | 无 ✅ |
| AI参与打分 | 无 | 无 ✅ |

6 个固定画像 × 10 次重复测试，topCategory 全部稳定一致。

---

## v1.0 — 2026-06-08 — 初始版本

### 发布内容
- 11维度体系（humanities / social_science / business / stem / life_health / art_creative）
- 110 道题库（20 通用 + 90 分支）
- 两阶段测试流程（通用题 → 分支题 → 推荐报告）
- 动态题目抽取（随机9 道通用题）
- 归一化评分 + 门类推荐算法

---

### 已知遗留问题（暂不修复）
- 医学/生命科学维度仅 2 道题支撑（刚好踩线）
- 维度覆盖不均衡（部分维度 7+ 题，部分仅 2-3 题）
- 选科惩罚参数（0.6/0.85/0.7/0.75）为初始猜测，待真实用户反馈调优