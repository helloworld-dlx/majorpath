# 模拟器 & 调参工具 —— AI 使用指南

> 写给接手的 AI / 开发者：拿到这个项目后，如何用模拟器和调参工具来验证和优化推荐系统。

---

## 文件地图

| 文件 | 角色 |
|------|------|
| `src/lib/recommendationEngine.ts` | 纯函数推荐引擎 `calculateRecommendation(answers, options)` |
| `src/data/testQuestions.ts` | 题库入口（从 `questionBank.ts` 重导出，99 题） |
| `src/data/majorProfiles.ts` | 45 个专业类画像 + Golden Case 条件 |
| `scripts/simulateTests.ts` | 批量模拟：虚拟用户 → 答案 → 推荐 → 统计报告 |
| `scripts/evolveRecommendationParams.ts` | 遗传算法：搜索最佳参数组合 |
| `simulation-results/` | 输出目录（运行时生成，不提交 Git） |

---

## 快速上手

### 1. 跑一次基础模拟
```bash
npm run simulate -- --runs 100 --seed 2026
```
输出：
- `simulation-results/results.json` — 每个虚拟用户的完整推荐
- `simulation-results/results.csv` — 表格格式
- `simulation-results/summary.md` — 人类可读报告

### 2. 跑一次自动调参
```bash
npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100 --seed 2026
```
输出：
- `simulation-results/best-params-candidate.json` — 最佳候选参数
- `simulation-results/evolution-report.md` — 进化过程报告

### 3. 控制 API 调用
```bash
# 默认不调 API（安全、免费）
npm run simulate -- --runs 100 --use-api false

# 开启 API（需先设置环境变量 DEEPSEEK_API_KEY）
npm run simulate -- --runs 30 --use-api true
```
如果 `--use-api true` 但未检测到 API Key，脚本会自动跳过并提示。

---

## 关键命令参考

```bash
npm run simulate -- --runs 10                          # 10 个用户，随机种子
npm run simulate -- --runs 100                         # 100 个用户
npm run simulate -- --runs 500 --seed 2025             # 500 用户，固定种子（可复现）
npm run simulate -- --runs 100 --use-api false         # 纯本地
npm run simulate -- --runs 30 --use-api true           # 抽样 API 评价

npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100
npm run evolve -- --generations 10 --population 20 --runs-per-candidate 50 --use-api false
```

---

## 架构说明

### 推荐管线（纯函数，复用线上逻辑）
```
虚拟用户画像 → 生成答案 → computeBucketScores → normalizeScores
→ determineUserType → checkHumanitiesProtection → collectRiskTags
→ generateResult → RecommendationResult
```

### 评分函数（0-100 分）
评分维度：
1. **Golden Cases 命中率**（30 分）— 预设的标准测试用例是否通过
2. **分布多样性**（20 分）— 专业推荐是否覆盖足够多的专业类
3. **逻辑一致性**（20 分）— 低数学用户是否被正确排除 STEM 推荐
4. **异常惩罚**（-15 分）— 重叠、矛盾、过度集中
5. **用户兴趣匹配**（15 分）— 虚拟用户感兴趣的专业是否被推荐

### 虚拟用户画像（15 个）
定义在 `VIRTUAL_PROFILES` 数组中，每个包含：
- `dimBiases` — 11 个维度的偏好（-100~+100）
- `bucketBiases` — 6 个桶的偏好
- `interestSlugs` — 期望被推荐的专业类 slug

### Golden Cases（预设测试用例）
定义在 `src/data/majorProfiles.ts` 中每个专业类的 `goldenConditions`，例如：
```yaml
'喜欢电路+能接受抽象 → 推荐电子信息':
  highDimensions: [math_logic, engineering_practice]
  mustHitBuckets: [stem]
  expectedTier: recommended
```

---

## 何时运行

| 场景 | 命令 |
|------|------|
| 新增/修改了题库中的题目 | `npm run simulate -- --runs 200` |
| 调整了 `recommendationWeights.ts` 的权重 | `npm run simulate -- --runs 200` |
| 新增了专业类详情页 | 先在 `majorProfiles.ts` 加 profile，再 `simulate --runs 200` |
| 定期检查推荐质量 | `npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100` |
| 发布前 regression test | `npm run simulate -- --runs 500 --seed 2026` |

---

## 红线（不能做的事）

1. ❌ **不要直接修改 `recommendationWeights.ts`** 基于模拟结果——模拟结果只能生成候选参数，最终由 D老师 人工审核后手动应用。
2. ❌ **不要 `--use-api true` 滥用 API**——API 仅用于抽样评价，默认 `apiSampleLimit=10`。
3. ❌ **模拟输出不要提交到 Git**——`.gitignore` 应忽略 `simulation-results/*`（除 `.gitkeep`）。
4. ❌ **不要将模拟结果作为上线依据**——模拟器无法完全模拟真实高中生的行为，内测反馈才是最终判断标准。

---

## 常见问题

**Q: 为什么只有 45 个专业类有 profile？**
A: `MAJOR_PROFILES` 覆盖了推荐引擎实际会用到的专业类。92 个专业类中部分过于细分或冷门，在推荐中几乎不会出现。如需添加新专业类：
1. 在 `majorProfiles.ts` 中添加该专业类的 profile
2. 在 `recommendationWeights.ts` 中确认门类→专业类映射权重
3. 运行 `npm run simulate -- --runs 200` 验证新增后的分布

**Q: 调参结果不满意怎么办？**
A: 增加代数和种群规模：`--generations 50 --population 50 --runs-per-candidate 200`。更多模拟=更稳定结果。

**Q: 模拟结果和线上不一致？**
A: 模拟器用自己的融合公式（`rawWeight`/`dimWeight`），而线上走 `scoring.ts` 的 `computeRefinedBucketScores`。差异是故意的——模拟器同时测试了新的融合参数空间。
