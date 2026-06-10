# 模拟器 — AI 使用指南

> 写给接手的 AI / 开发者：如何用模拟器验证和优化推荐系统。
> 更新：2026-06-10 — 统一模拟器，4 种模式

---

## 文件地图

| 文件 | 角色 |
|------|------|
| `scripts/simulate.ts` | **统一模拟器**（4 种模式：single / batch / audit / niche） |
| `scripts/evolveRecommendationParams.ts` | 遗传算法自动调参 |
| `src/lib/recommendationEngine.ts` | 纯函数推荐引擎 `calculateRecommendation(answers, options)` |
| `src/utils/scoring.ts` | 核心评分算法 `generateResult()` |
| `src/data/questionBank.ts` | 题库入口（99 题） |
| `src/data/majorPersonaLibrary.ts` | 193 虚拟画像库 |
| `simulation-results/v04_weights_raw.json` | 93 类专业权重数据 |
| `simulation-results/v04_fields.json` | 93 类风险字段数据 |

---

## 命令速查

### 单次模拟

```bash
npx tsx scripts/simulate.ts --mode single --profile stem_nerd
npx tsx scripts/simulate.ts --mode single --profile med_aspirant
```

输出到 `simulation-results/single/YYYYMMDD-HHMMSS/`：
- `input.json` — 输入画像 + 答案
- `dimension-scores.json` — 11 维度得分
- `bucket-scores.json` — 6 桶得分
- `category-scores.json` — 全部专业类得分明细（含推荐/可选/谨慎三层）
- `recommendation.json` — 完整推荐结果 + 置信度 + 下一步建议
- `avoidance.json` — 避坑标签 + 触发条件 + 受影响专业
- `niche.json` — 小众探索结果
- `summary.md` — 人类可读摘要

### 批量模拟

```bash
npx tsx scripts/simulate.ts --mode batch --runs 200 --seed 606
```

输出到 `simulation-results/batch/YYYYMMDD-HHMMSS/`：
- `config.json` — 运行参数
- `results.json` — 全部单次结果（含详细 breakdown）
- `results.csv` — 扁平化 CSV
- `summary.md` — 汇总报告（覆盖率 + Top20 + 热门检查 + 异常统计）
- `audit.md` — 全部 93 类推荐次数表

### 覆盖率审计

```bash
npx tsx scripts/simulate.ts --mode audit
```

输出到 `simulation-results/audit/YYYYMMDD-HHMMSS/`：
- `audit.md` — 逐类诊断（主推荐/可选/谨慎/未出现）
- `entries.json` — 结构化数据

### 冷门探针

```bash
npx tsx scripts/simulate.ts --mode niche
```

输出到 `simulation-results/niche/YYYYMMDD-HHMMSS/`：
- `niche.md` — 冷门专业可见性报告
- `results.json` — 结构化数据

### 自动调参

```bash
npm run evolve -- --generations 20 --population 30 --runs-per-candidate 100
```

---

## 内置画像（15 个）

| ID | 说明 |
|----|------|
| `stem_nerd` | 数学好·喜欢电路·能接受抽象 |
| `humanities_lover` | 喜欢沟通表达·不喜欢数学 |
| `business_minded` | 对商业·管理·财务感兴趣 |
| `med_aspirant` | 对医学/生命科学感兴趣 |
| `engineering_hands` | 喜欢机械结构·工程实践 |
| `artist` | 喜欢设计·审美·创作 |
| `low_math_creative` | 数学弱·抗压弱·希望轻松 |
| `math_pure` | 数学强·愿长期自学·愿读研 |
| `popular_chaser` | 热门跟风·想选计算机 |
| `balanced` | 各方面都比较中立 |
| `social_care` | 喜欢帮助他人·关注社会 |
| `rule_lover` | 偏稳定和规则·不喜欢冒险 |
| `tech_creative` | 喜欢编程+设计交叉 |
| `nature_lover` | 喜欢大自然·生物·环境 |
| `data_geek` | 喜欢数据·编程·逻辑推理 |

单次模式也可使用 `majorPersonaLibrary` 中的画像 ID。

---

## 何时运行

| 场景 | 命令 |
|------|------|
| 新增/修改题库 | `--mode batch --runs 200` |
| 调整权重 | `--mode batch --runs 200` |
| 检查覆盖率 | `--mode audit` |
| 检查冷门可见性 | `--mode niche` |
| 调试单个用户 | `--mode single --profile <id>` |
| 发布前回归测试 | `--mode batch --runs 500` |
| 自动调参 | `npm run evolve` |

---

## 红线（不能做的事）

1. ❌ **不要直接修改权重** 基于模拟结果——只能生成候选参数，由 D老师 人工审核后手动应用。
2. ❌ **模拟输出不要提交到 Git**——`.gitignore` 已配置忽略。
3. ❌ **不要将模拟结果作为上线依据**——内测反馈才是最终判断标准。
4. ❌ **不要改 `src/utils/scoring.ts` 或 `public/scripts/report.js`**——这是线上算法。

---

## 旧版模拟器

旧版脚本已移至 `scripts/_archive/`：
- `simulateTests.ts` — v0.3 原始版
- `simulate_v04.ts` ~ `simulate_v04r5.ts` — v0.4 系列迭代
- `simulate_v05.ts` — v0.5 三模式版
- `enhanced_audit.ts` — v0.5 增强审计

这些脚本保留供参考，但不再使用。统一模拟器已合并其功能。
