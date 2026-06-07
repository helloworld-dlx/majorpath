# 模拟器 & 调参工具 —— AI 使用指南

> 写给接手的 AI / 开发者：拿到这个项目后，如何用模拟器和调参工具来验证和优化推荐系统。
> 更新：2026-06-07 v0.5 — 新增 3 模式 + 小众探索层 + 审计工具

---

## 文件地图

| 文件 | 角色 |
|------|------|
| `src/lib/recommendationEngine.ts` | 纯函数推荐引擎 `calculateRecommendation(answers, options)` |
| `src/lib/nicheExploration.ts` | v0.5 小众探索评分引擎 `evaluateNicheExploration(input)` |
| `src/lib/recommendationDiagnostics.ts` | v0.5 推荐诊断：分类未覆盖原因 |
| `src/data/questionBank.ts` | 题库入口（99 题） |
| `src/data/categoryDimProfiles.ts` | v0.5 93 类维度画像（positiveDims/negativeDims/gateBypassDims） |
| `src/data/categoryRiskProfiles.ts` | v0.4 93 类风险画像（resourceDependency/blindChoiceRisk等7字段） |
| `src/data/majorPersonaLibrary.ts` | v0.5 193 虚拟画像库（覆盖全部 93 专业类，含 samplingWeight） |
| `scripts/simulateTests.ts` | v0.3 批量模拟：虚拟用户 → 答案 → 推荐 → 统计报告 |
| `scripts/simulate_v05.ts` | **v0.5 3模式模拟器**（推荐使用） |
| `scripts/enhanced_audit.ts` | v0.5 增强审计：逐类诊断未覆盖原因 |
| `scripts/evolveRecommendationParams.ts` | 遗传算法：搜索最佳参数组合 |
| `simulation-results/` | 输出目录（运行时生成，不提交 Git） |

---

## 推荐流程

模拟时遵循 **推荐管线**（纯函数，复用线上逻辑）：
```
虚拟用户画像 → 答案 → computeBucketScores → normalizeScores
→ determineUserType → checkHumanitiesProtection → collectRiskTags
→ generateResult → RecommendationResult
```

评分维度：
1. **Golden Cases 命中率**（30 分）— 预设的标准测试用例是否通过
2. **分布多样性**（20 分）— 专业推荐是否覆盖足够多的专业类
3. **逻辑一致性**（20 分）— 低数学用户是否被正确排除 STEM 推荐
4. **异常惩罚**（-15 分）— 重叠、矛盾、过度集中
5. **用户兴趣匹配**（15 分）— 虚拟用户感兴趣的专业是否被推荐

---

## v0.5 3 模式模拟器（推荐使用）

v0.5 模拟器加载 `majorPersonaLibrary.ts` 的 193 个虚拟画像，支持三种运行模式。

### 模式 1：realistic — 模拟真实用户

```bash
npx tsx scripts/simulate_v05.ts --runs 500 --seed 606 --mode realistic
```

按画像库均匀抽样，输出：
- `simulation-results/summary_v05_realistic.md` — 主推荐覆盖率、Top20 排名、热门检查
- 回答：推荐系统对真实用户群体的推荐分布是否健康？

### 模式 2：coverage-audit — 覆盖体检

```bash
npx tsx scripts/enhanced_audit.ts
```

每个专业类用其专属 persona 跑一次，逐类诊断：
- 能否进入主推荐？能否进入小众探索？
- 若不能 → 输出 bucketMatch / dimScore / interestScore / gateScore / 分类原因
- 输出 `simulation-results/enhanced_audit_baseline.md` — 完整诊断表
- 回答：算法有没有永久封死某些专业类？

### 模式 3：niche-probe — 冷门探针

```bash
npx tsx scripts/simulate_v05.ts --mode niche-probe
```

专门检测 highInterestOnly + 低权重（≤5）+ requiresSpecialCondition 专业：
- 哪些能通过强信号门槛进入小众探索？
- 哪些被 dim/interest 信号不足阻挡？
- 输出 `simulation-results/summary_v05_niche.md`

---

## 小众探索层（v0.5 新增）

v0.5 新增 `nicheExplorationMajors` 推荐输出层，位于主推荐之后。

**公式**：nicheScore = bucketMatch × 0.30 + dimMatch × 0.45 + interestSignal × 0.20 + weightNorm × 0.05 - mismatchPenalty

**候选条件**：
- 不在主推荐、不在谨慎了解
- 属于 `recommendedOnlyIfHighInterest` 或 `baseWeight ≤ 5` 或 `requiresSpecialCondition`
- 强信号：dimMatch ≥ 68 或 interestSignal ≥ 70 或 bucketMatch ≥ 75
- mismatchPenalty < 15 且 nicheScore ≥ 52
- 每报告最多展示 2 个

**报告文案**：
> 你也可以顺手了解这些小众方向：这些方向不是主推荐，只是因为你某些兴趣维度上有信号。它们通常更小众，建议先看专业介绍，不要直接作为报考结论。

---

## 审计未覆盖原因分类

audit 模式输出的分类体系：

| 分类 | 含义 | 处理方式 |
|------|------|----------|
| A_CROWDED | 高匹配(score≥55)但被同门类对手挤出Top5 | 无须处理，换方向画像自然出现 |
| A_GATE_BLOCKED | 门类得分不足，且无强dim绕过 | 补 gateBypassDims 映射 |
| A_WEAK_SIGNAL | bucket或dim信号过弱 | 补 persona 的 sixBucketAffinity |
| B_REASONABLE_COLD | 极冷门+信号合理不足 | 设计意图，保持 |
| ✅_MAIN | 在主推荐中 | 正常 |
| 🟡_NICHE | 在小众探索中 | 正常 |

---

## 旧版模拟器（v0.3）

### 基础模拟
```bash
npm run simulate -- --runs 100 --seed 2026
```

### 自动调参
```bash
npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100 --seed 2026
```

---

## 何时运行

| 场景 | 命令 |
|------|------|
| 新增/修改题库 | `npx tsx scripts/simulate_v05.ts --runs 200 --mode realistic` |
| 调整权重 | `npx tsx scripts/simulate_v05.ts --runs 200 --mode realistic` |
| 检查是否有专业被永久封死 | `npx tsx scripts/enhanced_audit.ts` |
| 检查冷门可见性 | `npx tsx scripts/simulate_v05.ts --mode niche-probe` |
| 定期检查推荐质量 | `npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100` |
| 发布前 regression test | `npx tsx scripts/simulate_v05.ts --runs 500 --mode realistic` |

---

## 红线（不能做的事）

1. ❌ **不要直接修改权重** 基于模拟结果——模拟结果只能生成候选参数，最终由 D老师 人工审核后手动应用。
2. ❌ **不要 `--use-api true` 滥用 API**——API 仅用于抽样评价，默认 `apiSampleLimit=10`。
3. ❌ **模拟输出不要提交到 Git**——`.gitignore` 应忽略 `simulation-results/*`（除 `.gitkeep`）。
4. ❌ **不要将模拟结果作为上线依据**——模拟器无法完全模拟真实高中生的行为，内测反馈才是最终判断标准。
5. ❌ **不要让主推荐阈值全局降低** 来追求覆盖率——覆盖率提升应通过小众探索层而非主推荐泛化。
6. ❌ **不要为覆盖率强行推荐弱相关专业**——audit 模式中的 A_CROWDED 是正常竞争淘汰，无需处理。

---

## v0.5 当前基线（2026-06-07）

| 指标 | 值 |
|------|:--:|
| realistic 100 主推荐覆盖 | 34/93 (37%) |
| realistic 500 主推荐覆盖 | 36/93 (39%) |
| audit 主推荐 | 29/93 (31%) |
| audit niche 探索 | 21 类 |
| audit 主+探索总覆盖 | 50/93 (54%) |
| A_CROWDED（竞争出局，正常） | 34 类 |
| 需人工复核 | 6 类 |
