# MAINTENANCE.md — AI 维护操作手册

> 用途：给接手的 AI（或开发者）看的后期维护指南。
> 原则：每一步都说清楚改哪个文件、怎么改、改完做什么。
> 触发方式：用户说「审核计算机」「新建 XX 专业」「调算法阈值」「加几道题」等。

---

## 目录

1. [审核专业详情](#1-审核专业详情)
2. [新建专业详情](#2-新建专业详情)
3. [修改专业详情](#3-修改专业详情)
4. [调整算法参数](#4-调整算法参数)
5. [题库维护](#5-题库维护)
6. [修改代码后必做](#6-修改代码后必做)
7. [部署上线](#7-部署上线)
8. [文案规范](#8-文案规范)

---

## 1. 审核专业详情

**触发语**：「审核计算机类」「审核 XX 专业」

### 流程

```
1. 打开 src/data/major-details.ts，找到对应 entry
2. 打开 REVIEW_CHECKLIST.md，逐条对照
3. 有问题就改内容，没问题就改 reviewStatus
4. npm run build → 通过 → git commit
```

### 文件

| 文件 | 改什么 |
|------|--------|
| `src/data/major-details.ts` | 修改内容 + 改 `reviewStatus: 'draft'` → `'reviewed'` |
| `src/data/catalog.ts` | 如果该专业类所有 major 都审核完，改 status |
| `CATALOG_STATUS.md` | 更新对应条目状态 |

### 示例：用户说「审核计算机类」

```bash
# 1. 找到 entry
grep -n "engineering/computer-science" src/data/major-details.ts

# 2. 读 REVIEW_CHECKLIST.md 的初审 8 条 + 复审 6 条
# 3. 逐条检查内容
# 4. 改 reviewStatus
# 5. npm run build && git commit -m "✅ 计算机类审核通过"

# 同步更新 CATALOG_STATUS.md
# 计算机类：🟡 待审核 → ✅ 已完成
```

### 如果审核不通过

- 直接在 `major-details.ts` 里改内容
- 保持 `reviewStatus: 'draft'`
- commit 信息写清楚改了什么、为什么

---

## 2. 新建专业详情

**触发语**：「我想写 XX 专业」「新建 XX 专业详情」

### 先检查

```bash
# 这个专业在目录里吗？
grep "专业名" src/data/catalog.ts
```

### 情况 A：专业已存在于目录（但无详情）

直接跳到「写详情内容」。

### 情况 B：专业不存在于目录

**第 1 步：确定放在哪个专业类下**

查看 `src/data/catalog.ts`，找到对应的门类和专业类。参考教育部目录。

**第 2 步：添加到目录数据**

编辑 `src/data/catalog.ts`，在对应专业类的 `majors` 数组里插入：

```typescript
{
  code: '08xxxx',          // 教育部专业代码
  name: '专业名称',
  slug: 'english-slug',   // 英文短横线命名
  status: 'building',     // 新建内容→building；仅骨架→todo
  tags: ['标签'],
  summary: '一句话解释（面向高中生）',
}
```

命名规则：
- `slug`：英文小写 + 短横线，如 `ic-design`、`artificial-intelligence`
- `status`：`'building'` = 内容已开始写；`'todo'` = 仅有骨架；`'completed'` = 已审核上线
- 如果专业类是全新的，也需要在专业类列表里加

**第 3 步：写详情内容**

编辑 `src/data/major-details.ts`，在 `majorDetails` 对象里新增一个 entry。key 格式：

```
'{门类slug}/{专业类slug}'
```

如：
```
'engineering/ic-design'       // 工学 > 集成电路设计与集成系统
'engineering/computer-science' // 工学 > 计算机类
```

完整模板（复制以下结构，把 `// TODO` 替换成真实内容）：

```typescript
'engineering/你的slug': {
  categorySlug: '你的slug',
  gateSlug: 'engineering',  // 门类 slug

  // 1. 一句话解释（面向高中生，说大白话，可适当展开但不建议超过200字）
  oneLiner: 'TODO',

  // 2. 学什么（7-10 条，每条 20-40 字）
  whatYouLearn: [
    'TODO',
  ],

  // 3. 与高中不同（4-6 条）
  vsHighSchool: [
    'TODO',
  ],

  // 4. 适合谁（4-6 条，温和表述）
  suitableFor: [
    'TODO',
  ],

  // 5. 不适合谁（3-5 条，用"建议先看清楚"而非否定）
  notSuitableFor: [
    'TODO',
  ],

  // 6. 常见误解（3-6 条，每条先写误解再纠正）
  commonMisconceptions: [
    'TODO',
  ],

  // 7. 学习场景（3-5 条，真实不美化）
  realScenes: [
    'TODO',
  ],

  // 8. 未来方向（3-6 条，不夸大薪资和前景）
  futurePaths: [
    'TODO',
  ],

  // 9. 避坑提醒（3-5 条，具体可行动）
  pitfalls: [
    'TODO',
  ],

  // 10. 相关专业区别（2-4 条，vs 容易混淆的专业）
  relatedMajors: [
    { name: '对比专业名', slug: 'slug', diff: '一句话说明区别' },
  ],

  updatedAt: '2026-06-05',
  reviewStatus: 'draft',  // 始终从 draft 开始
  videos: [],
  contributors: [{ name: '提交者名称', role: '内容贡献者' }],
},
```

**第 4 步：更新文档**

- `CATALOG_STATUS.md`：更新对应条目状态
- `CURRENT_STATUS.md`：追加更新记录

**第 5 步：构建 + 提交**

```bash
npm run build
git add -A
git commit -m "📝 新增 XX 专业详情（draft）"
```

### 内容写作原则

| ❌ 不要写 | ✅ 应该写 |
|-----------|----------|
| 「毕业后薪资丰厚」 | 「这个方向对持续学习要求很高」 |
| 「你最适合这个专业」 | 「如果你的兴趣在 XX，可以了解一下」 |
| 「千万别选」 | 「建议先看清楚 X 方面再做决定」 |
| 堆砌培养方案术语 | 用大白话描述真实场景 |
| 「女生不适合工科」 | 不提及性别、地域、家庭背景等标签 |

---

## 2.5. 新建具体专业详情（三级路由）

**触发语**：「集成电路这个专业要建单独的页面」「为 XX 专业建详情页」

⚠️ **重要区分**：
- **专业类页（Category）**：`/majors/{gate}/{category}` — 例如计算机类、电子信息类
- **具体专业页（Major）**：`/majors/{gate}/{category}/{major}` — 例如集成电路设计与集成系统

具体专业必须放在所属专业类下面，不要新建独立专业类！

### 前置条件

1. 该专业已在 `src/data/catalog.ts` 中作为某个专业类的 `major` 存在
2. 该专业所属的专业类状态至少为 `building`

如果专业不存在于目录中，先用「新建专业详情 → 情况 B」添加到目录。

### 流程

**第 1 步：确认路由**

找到专业的所属门类 slug（如 `engineering`）和所属专业类 slug（如 `electronic-information`），路由固定为：

```
/majors/{gateSlug}/{categorySlug}/{majorSlug}
```

示例：集成电路设计与集成系统 → `/majors/engineering/electronic-information/ic-design`

**第 2 步：写入详情内容**

编辑 `src/data/major-details.ts`，使用三级 key 格式：

```typescript
'{gate}/{category}/{major}': {
  categorySlug: 'majorSlug',
  gateSlug: 'gate',
  oneLiner: '一句话解释（可稍长，但不能太长）',
  whatYouLearn: [...],
  vsHighSchool: [...],
  suitableFor: [...],
  notSuitableFor: [...],
  commonMisconceptions: [...],
  realScenes: [...],
  futurePaths: [...],
  pitfalls: [...],
  relatedMajors: [{ name: '对比专业名', slug: 'slug', diff: '区别说明' }],
  updatedAt: '2026-06-05',
  reviewStatus: 'draft',
  videos: [],
  contributors: [{ name: '贡献者名', role: 'XX专业学生 · 内容共建' }],
}
```

⚠️ **字段易错点**：
- 字段名是 `pitfalls` 不是 `avoidTraps`
- 字段名是 `relatedMajors` 不是 `relatedMajorDiff`，且格式是 `[{ name, slug?, diff }]` 对象数组，不是字符串数组
- key 格式必须是 `'{gate}/{category}/{major}'` 三级

**第 3 步：更新专业状态**

编辑 `src/data/catalog.ts`：
- 将对应 major 的 `status` 改为 `'completed'`（或保持 `'building'` 如果还在写）

**第 4 步：审核后上线**

内容确认无误后，改 `reviewStatus: 'draft'` → `'reviewed'`

**第 5 步：构建 + 提交**

```bash
npm run build          # 验证通过
git add -A
git commit -m "📝 新增 XX 专业详情（draft/reviewed）"
git push
```

### 检查清单

- [ ] 路由是三级格式 `/majors/{gate}/{category}/{major}`
- [ ] major-details.ts 的 key 是 `'{gate}/{category}/{major}'`
- [ ] 字段名是 `pitfalls` 和 `relatedMajors`（不是 `avoidTraps` / `relatedMajorDiff`）
- [ ] `relatedMajors` 是对象数组 `[{ name, diff }]`，不是字符串数组
- [ ] catalog.ts 中该 major 的 status 已更新
- [ ] `npm run build` 通过

---

## 3. 修改专业详情

**触发语**：「修改 XX 专业的 XX 部分」「XX 专业的误解写错了」

### 流程

```
1. 打开 src/data/major-details.ts
2. 找到对应 entry → 对应字段
3. 修改内容
4. 如果改的是已审核内容 → 改 reviewStatus 回 'draft'（待重新审核）
5. 更新 updatedAt 日期
6. npm run build → git commit
```

### 注意

- 如果只是修错别字/措辞，不改 reviewStatus
- 如果改的是事实性内容（课程、场景、方向），改回 `'draft'` 等待重新审核
- commit 信息写清楚改了什么

---

## 4. 调整算法参数

**触发语**：「调高 XX 阈值」「放宽探索型」「改权重」

### 参数总表

所有可调参数在两个文件里：

| 文件 | 内容 |
|------|------|
| `src/utils/adaptiveQuestioning.ts` | 自适应抽题参数（阈值、题数） |
| `src/data/recommendationWeights.ts` | 桶→门类→专业类权重 + 避坑惩罚 |
| `ALGORITHM_SPEC.md` | 参数文档（§6 阈值建议，§9 调参方法） |

### 常见调参操作

#### 调阈值（让更多/更少人进入推荐）

编辑 `src/utils/adaptiveQuestioning.ts` 的 `DEFAULT_CONFIG`：

```typescript
export const DEFAULT_CONFIG: AdaptiveConfig = {
  highThreshold: 62,    // 调大→更难进"优先推荐"；调小→更容易
  midThreshold: 55,     // 调大→更少桶进细化；调小→更多桶
  lowThreshold: 50,     // 调大→更少桶触发校验；调小→更多
  leadGap: 8,           // 调大→更多人归入双桶/探索；调小→更多单桶
  exploreMax: 58,       // 调大→更多人归入探索型
  // ... 其他参数
};
```

**调完必做**：
- 更新 `ALGORITHM_SPEC.md` 版本记录
- `npm run build`

#### 调整推荐权重（让某专业类更容易/更难被推荐）

编辑 `src/data/recommendationWeights.ts`：

```typescript
// 桶→门类权重
export const BUCKET_TO_DISCIPLINES = {
  stem: [
    { gateCode: '08', weight: 60 },  // 工学权重
    { gateCode: '07', weight: 40 },  // 理学权重
  ],
};

// 门类内专业类权重
export const GATE_PRIORITY_CATEGORIES = {
  '08': [
    { categorySlug: 'computer-science', buckets: ['stem'], weight: 15 },
    // 调大 weight → 更容易排前面
  ],
};

// 避坑惩罚值
export const RISK_CATEGORY_PENALTIES = {
  trend_chasing: {
    slugs: ['computer-science', 'finance'],
    penalty: 15,  // 调大→惩罚更重；调小→惩罚更轻
  },
};
```

#### 调 AI 提示词

编辑 `src/pages/api/explain.ts`：
- 系统提示词在 `messages[0].content`
- 模板解释在 `buildTemplateExplanation()`
- `max_tokens` 控制输出长度

---

## 5. 题库维护

**触发语**：「加几道题」「这道题有问题」「补 B5 方向题」

### 文件位置

| 文件 | 改什么 |
|------|--------|
| `src/types/test.ts` | 类型定义（新增题目类型才需要改） |
| `src/data/questionBank.ts` | 题目数据 |
| `ALGORITHM_SPEC.md` | 题库数量统计更新 |

### 新增题目的模板

```typescript
// 通用题（gen_xxx）
{
  id: 'gen_021',
  type: 'general',
  title: '题干（高中生能懂，无专业术语）',
  targetBuckets: ['humanities', 'social_science', 'business', 'stem', 'life_health', 'art_creative'],
  priority: 18,
  options: [
    { id: 'gen_021_a', label: 'A', text: '选项文本', scoreEffects: [
      { target: 'humanities', points: 8 },
      { target: 'reading_expression', points: 6 },
    ]},
    // ... 每个 targetBucket 至少有一个选项给分
  ],
},

// 方向分流题（br_xxx）
{
  id: 'br_stem_020',
  type: 'branch',
  title: '题干（可以出现相关学科概念）',
  targetBuckets: ['stem'],
  subDirection: 'cs_info',
  priority: 10,
  options: [
    // ...
  ],
},
```

### 命名规则

| 前缀 | 类型 | 示例 |
|------|------|------|
| `gen_` | 通用粗筛题 | `gen_021` |
| `br_hum_` | B1 人文方向题 | `br_hum_011` |
| `br_soc_` | B2 社科方向题 | `br_soc_011` |
| `br_biz_` | B3 商科方向题 | `br_biz_011` |
| `br_stem_` | B4 理工方向题 | `br_stem_020` |
| `br_life_` | B5 生命健康方向题 | `br_life_009` |
| `br_art_` | B6 艺术创作方向题 | `br_art_009` |
| `cc_` | 跨方向校验题 | `cc_014` |
| `risk_` | 避坑风险题 | `risk_009` |
| `subj_` | 主观开放题 | `subj_005` |

### 通用题选项覆盖检查

新增或修改通用题后，检查每个 `targetBuckets` 中的桶是否至少有一个选项加分：

```
以 gen_021 为例：
targetBuckets 包含 A/B/C/D/E 五个桶
→ 检查：A 有没有选项加分？B 有没有？C？D？E？
→ 缺了谁就补一个选项
```

### 通用题学科暴露检查

```bash
# 扫描通用题中是否有专业名称泄漏
grep "计算机\|法学\|医学\|代码\|编程" src/data/questionBank.ts
# 如果在 gen_ 题目中命中 → 需要替换为中性表述
```

---

## 6. 修改代码后必做

每次修改任何 `.ts` / `.astro` / `.js` 文件后：

```bash
# 1. 构建验证
npm run build          # 必须通过，0 error

# 2. 如果改了数据文件，同步更新文档
#    - 专业内容 → CATALOG_STATUS.md
#    - 算法参数 → ALGORITHM_SPEC.md
#    - 新功能/修复 → CURRENT_STATUS.md + AI_WORKLOG.md

# 3. 提交
git add -A
git commit -m "描述改动"
```

### 文档更新对应表

| 你改了什么 | 更新哪些文档 |
|-----------|-------------|
| 专业内容（新增/修改/审核） | `CATALOG_STATUS.md` + `CURRENT_STATUS.md` |
| 题库（增删改题目） | `ALGORITHM_SPEC.md`（数量统计） |
| 算法参数 | `ALGORITHM_SPEC.md`（版本记录 + 参数表） |
| 页面/组件/样式 | `CURRENT_STATUS.md` |
| 任何改动 | `AI_WORKLOG.md`（追加工作记录） |

---

## 7. 部署上线

### 推送代码

```bash
git push origin main
# EdgeOne Pages 自动触发部署
```

### 环境变量

在 EdgeOne Pages 控制台管理（不放在代码里）：

| 变量名 | 用途 | 必须？ |
|--------|------|:----:|
| `DEEPSEEK_API_KEY` | AI 报告解释 | 否（不设置则用模板） |

### 问卷链接

4 个外部问卷在以下位置：

| 用途 | 文件 | 行 |
|------|------|-----|
| 报告页反馈 | `public/scripts/report.js` | 800 |
| 共建·补充内容 | `src/pages/contribute.astro` | 57 |
| 共建·纠错 | `src/pages/contribute.astro` | 88 |
| 共建·题目优化 | `src/pages/contribute.astro` | 123 |

---

## 8. 文案规范

全站必须遵守的表达红线：

### 绝对禁止

- 「你最适合」「强烈推荐」「精准匹配」「一键选专业」
- 「决定人生」「改变命运」「千万别选错」「不看就后悔」
- 「保录取」「毕业即高薪」「包就业」
- 任何院校排名、录取概率、分数线
- 对任何专业的贬低性描述
- 性别/地域/家庭背景的刻板印象

### 正确表达

| ❌ | ✅ |
|----|----|
| 你最适合学计算机 | 如果你对逻辑和搭建系统感兴趣，计算机值得了解 |
| 千万别选这个专业 | 建议先了解清楚 X 方面再做判断 |
| 这是最好的专业 | 这是一个需求很大但学习强度也很高的方向 |
| 你不适合 | 如果你对 X 感到排斥，可能需要再想想 |

### 检查命令

```bash
# 全站危险表达扫描
grep -rni "最适合\|精准推荐\|保录取\|决定人生\|千万别选\|你不适合" src/ public/ --include="*.astro" --include="*.ts" --include="*.js" | grep -v "禁止\|不能\|不要\|不构成"
```

---

## 附录：常用命令

```bash
# 查看项目状态
npm run build              # 构建
grep -n "关键词" 文件       # 搜索
git log --oneline -10      # 最近提交

# 查找专业
grep "专业名" src/data/catalog.ts
grep "专业名" src/data/major-details.ts

# 统计
grep -c "reviewStatus: 'draft'" src/data/major-details.ts   # 几篇待审核
grep -c "reviewStatus: 'reviewed'" src/data/major-details.ts  # 几篇已审核
grep -c "id: 'gen_" src/data/questionBank.ts                  # 通用题数量
```
