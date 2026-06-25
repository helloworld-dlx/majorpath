# AI_WORKLOG.md — AI 工作记录

> 用途：记录每次 AI 工作会话的内容，确保多模型协作时有连续上下文。
> 维护规则：每次 AI 工作会话结束前必须追加一条记录。

---

## 工作记录模板

每次 AI 完成一个任务或会话结束时，按以下格式追加记录：

```markdown
---
### [日期] [时间] — [会话主题]

- **使用模型**：[模型名称]
- **任务类型**：[开发 / 文档 / 审查 / 调试 / 内容 / 其他]
- **完成内容**：
  - [具体完成的事项 1]
  - [具体完成的事项 2]
- **修改的文件**：
  - [文件路径 1]
  - [文件路径 2]
- **关键决策**：[本次做的关键决策]
- **遗留问题**：[需要后续处理的问题]
- **下次建议**：[给下一个接手的 AI 或开发者的建议]
- **当前版本状态**：[v0.x — 更新了哪些模块]
```

---

## 实际工作记录

### 2026-06-04 20:40 — 项目文档初始化

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：文档
- **完成内容**：
  - 读取并理解三份项目源文档（计划书、技术方案书、算法说明 v0.2）
  - 创建项目根目录 `/home/xyzlh/majorpath`
  - 初始化 9 个核心项目文档
- **修改的文件**：
  - `/home/xyzlh/majorpath/PROJECT_BRIEF.md` — 新建
  - `/home/xyzlh/majorpath/TECH_DECISIONS.md` — 新建
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 新建
  - `/home/xyzlh/majorpath/TODO.md` — 新建
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 新建
  - `/home/xyzlh/majorpath/CATALOG_STATUS.md` — 新建
  - `/home/xyzlh/majorpath/ALGORITHM_SPEC.md` — 新建
  - `/home/xyzlh/majorpath/MODEL_HANDOFF.md` — 新建
  - `/home/xyzlh/majorpath/PROMPT_LIBRARY.md` — 新建
- **关键决策**：无（文档初始化阶段，按既定方案执行）
- **遗留问题**：无
- **下次建议**：下一步可以搭建 Astro 项目脚手架，开始实现首页和目录框架。
- **当前版本状态**：v0.0 — 项目文档初始化完成，尚未开始编码。

---

### 2026-06-04 20:45 — 文档初始化收尾与状态更新

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：文档
- **完成内容**：
  - 更新 CURRENT_STATUS.md：将「项目文档初始化」标记为已完成，追加 9 份文档用途表
  - 更新 AI_WORKLOG.md：追加本次收尾记录
  - 补充文档间引用关系和下一步建议
- **修改的文件**：
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 状态更新
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：无
- **遗留问题**：无
- **下次建议**：搭建 Astro 项目脚手架（TODO.md 第一阶段第一项）。初始化后应立即：配置 TypeScript + Tailwind + React 集成，然后创建基础布局组件（Header/Footer/Layout），再实现首页双入口。
- **当前版本状态**：v0.0 — 项目记忆体系建立完毕，随时可启动编码。

---

### 2026-06-04 21:01 — Astro 项目脚手架搭建完成

- **使用模型**：MiniMax M2.7
- **任务类型**：开发
- **完成内容**：
  - 读取全部 5 份核心项目文档（PROJECT_BRIEF / TECH_DECISIONS / CURRENT_STATUS / TODO / MODEL_HANDOFF）
  - 在 `/home/xyzlh/majorpath` 目录初始化 Astro 项目（minimal 模板 + TypeScript strict）
  - 安装依赖：`@astrojs/react` `react` `react-dom` `@tailwindcss/vite`
  - 配置 `astro.config.mjs`：集成 React + Tailwind CSS（使用 @tailwindcss/vite）
  - 创建全局样式 `src/styles/global.css`（Tailwind @import "tailwindcss" + 主题变量）
  - 创建基础布局 `src/layouts/Layout.astro`（Header + 导航 + Footer + 全局样式引入）
  - 创建首页 `src/pages/index.astro`（Hero + 双入口卡片 + 功能说明 + 免责文案）
  - 创建专业目录页 `src/pages/majors/index.astro`（12 学科门类网格）
  - 创建学科门类页 `src/pages/majors/[gate].astro`（含 getStaticPaths，工学/理学有专业类数据）
  - 创建专业详情页 `src/pages/majors/[gate]/[category].astro`（含 getStaticPaths，计算机类有完整内容）
  - 创建测试页占位 `src/pages/test.astro`
  - 创建关于项目页 `src/pages/about.astro`
  - 创建共建入口页 `src/pages/contribute.astro`
  - 修复动态路由 import 路径问题
  - 构建验证：`npm run build` 成功，27 个页面输出到 `/dist`
  - 开发验证：`npm run dev` 启动成功（localhost:4321）
- **修改的文件**：
  - `/home/xyzlh/majorpath/astro.config.mjs` — 新建
  - `/home/xyzlh/majorpath/src/styles/global.css` — 新建
  - `/home/xyzlh/majorpath/src/layouts/Layout.astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/index.astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/majors/index.astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/majors/[gate].astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/majors/[gate]/[category].astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/test.astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/about.astro` — 新建
  - `/home/xyzlh/majorpath/src/pages/contribute.astro` — 新建
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新进度
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 使用 `@tailwindcss/vite` 替代 `@astrojs/tailwind`（Astro 6.x 兼容性问题）
  - 动态路由使用硬编码 `getStaticPaths` 而非数据文件（快速出雏形）
  - 专业详情页仅计算机类有真实内容，其他专业类均为「建设中」占位
- **遗留问题**：
  - 方向测试页仅占位，交互功能待开发
  - 共建入口功能待开发
  - 专业目录数据仅工学/理学有专业类，其他门类为空
  - 部署尚未配置
- **下次建议**：
  1. 完善专业目录数据（补全其他门类的专业类列表）
  2. 开发方向测试页交互（React 组件 + 自适应抽题）
  3. 配置 EdgeOne Pages 部署
  4. 完善更多专业详情页内容
- **当前版本状态**：v0.1 — 脚手架完成，雏形版进行中

---

### 2026-06-04 21:14 — 全站布局和视觉风格优化

- **使用模型**：MiniMax M2.7
- **任务类型**：开发
- **完成内容**：
  - 优化全局样式 `src/styles/global.css`：重构主题变量，添加 Inter 字体、selection 样式、focus-visible 无障碍样式
  - 新建通用 UI 组件：
    - `src/components/ui/Button.astro`（primary/secondary/outline/ghost 变体，sm/md/lg 尺寸）
    - `src/components/ui/Card.astro`（default/primary/accent 变体，hover 效果）
    - `src/components/ui/Section.astro`（spacing/background 变体，统一 container 宽度）
  - 优化 `src/layouts/Layout.astro`：
    - Logo + 导航重构，增加 hover 状态和移动端菜单（JS toggle）
    - Footer 改为三栏布局（品牌说明 / 快速入口 / 法律声明）
    - Footer 底部明确写入「本站不提供录取概率预测，不替代正式志愿填报建议」
    - 引入 Google Fonts Inter
  - 优化 `src/pages/index.astro`：
    - 使用 Section 组件重构各区块
    - Hero 增加 badge，双入口改为 Card 变体，hover scale 效果
    - 「能做什么」改为 2×2 网格卡片布局
    - 新增公益说明区块（暖色背景）
    - 底部免责文案保留
  - `npm run build` ✅ 通过，27 个页面
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/styles/global.css` — 重构
  - `/home/xyzlh/majorpath/src/components/ui/Button.astro` — 新建
  - `/home/xyzlh/majorpath/src/components/ui/Card.astro` — 新建
  - `/home/xyzlh/majorpath/src/components/ui/Section.astro` — 新建
  - `/home/xyzlh/majorpath/src/layouts/Layout.astro` — 优化 Header/Nav/Footer + 移动端菜单
  - `/home/xyzlh/majorpath/src/pages/index.astro` — 优化布局和视觉
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 公益说明用暖色（#fefcf8）而非焦虑色，营造安心氛围
  - Footer 法律声明明确写出「不替代正式志愿填报建议」
  - 移动端使用原生 JS toggle，不引入第三方库
- **遗留问题**：
  - 其他页面（majors、test、about、contribute）尚未统一使用新 UI 组件
  - 移动端菜单仅在 Layout，尚未在其他页面测试
- **下次建议**：
  1. 将新 UI 组件应用到 majors、about、contribute 等页面
  2. 开发方向测试页交互（React 组件）
  3. 配置 EdgeOne Pages 部署
- **当前版本状态**：v0.1.1 — 布局优化完成，视觉风格统一进行中

---

### 2026-06-04 21:18 — 文档同步确认

- **使用模型**：MiniMax M2.7
- **任务类型**：文档
- **完成内容**：
  - 确认 `npm run build` ✅ 通过（27 页面）
  - 同步更新 CURRENT_STATUS.md（版本 v0.1.1）
  - 确认 TODO.md 已在 21:10 勾除完成事项
  - AI_WORKLOG.md 已有完整记录（21:01 脚手架 + 21:14 视觉优化）
- **修改的文件**：
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新
- **关键决策**：无
- **遗留问题**：沿用 21:14 遗留问题
- **下次建议**：沿用 21:14 下次建议
- **当前版本状态**：v0.1.1 — 布局优化完成

---

### 2026-06-04 21:21 — 文本替换「说人话」→「说大白话」

- **使用模型**：MiniMax M2.7
- **任务类型**：内容
- **完成内容**：
  - 将全站所有「说人话」替换为「说大白话」
  - 涉及文件：Layout.astro、index.astro、about.astro、PROJECT_BRIEF.md、PROMPT_LIBRARY.md、ALGORITHM_SPEC.md（共 7 处）
  - `npm run build` ✅ 通过（27 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/layouts/Layout.astro` — 2 处替换
  - `/home/xyzlh/majorpath/src/pages/index.astro` — 2 处替换
  - `/home/xyzlh/majorpath/src/pages/about.astro` — 1 处替换
  - `/home/xyzlh/majorpath/PROJECT_BRIEF.md` — 1 处替换
  - `/home/xyzlh/majorpath/PROMPT_LIBRARY.md` — 1 处替换
  - `/home/xyzlh/majorpath/ALGORITHM_SPEC.md` — 1 处替换
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：无
- **遗留问题**：沿用 21:14 遗留问题
- **下次建议**：沿用 21:14 下次建议
- **当前版本状态**：v0.1.1 — 布局优化完成

---

### 2026-06-04 21:29 — 专业目录数据结构设计 + 13 门类修正

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发 / 数据
- **完成内容**：
  - 搜索确认 2026 年目录为 13 门类（新增交叉学科），修正此前 12 门类的错误
  - 创建 `src/types/catalog.ts`：定义 ContentStatus / Major / Category / Gate / Catalog / CatalogStats 类型 + computeCatalogStats 辅助函数
  - 创建 `src/data/catalog.ts`：完整 13 门类 + 92 专业类骨架数据
    - 全部 13 个学科门类包含完整 metadata（code / name / slug / icon / description / status）
    - 全部 92 个专业类包含 code + name + slug + majorCount + status
    - 重点专业类（P0/P1）已填充约 40 个具体专业数据（含 code / name / slug / tags / summary）
    - 非重点专业类 majors 为空数组，status=todo
    - 交叉学科门类首批 15 个专业全部列入（含 6 个有完整信息）
  - 更新 CATALOG_STATUS.md：12→13 门类，新增交叉学科专区，更新统计和建设清单
  - `npm run build` ✅ 通过（27 页面，新数据文件不影响现有页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/catalog.ts` — 新建（类型定义 + 辅助函数）
  - `/home/xyzlh/majorpath/src/data/catalog.ts` — 新建（约 500 行，完整骨架数据）
  - `/home/xyzlh/majorpath/CATALOG_STATUS.md` — 重写（13 门类 + 交叉学科专区 + 建设清单更新）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
  - `/home/xyzlh/majorpath/TODO.md` — 更新
- **关键决策**：
  1. 数据结构采用三层嵌套（Gate → Category → Major[]），每层独立 status 字段，支持渐进填充
  2. Major 的 detailSlug 可选，默认路由规则为 /majors/{gate}/{category}/{major}
  3. 数据版本标注为'2026'，与教育部目录年份对齐
  4. 交叉学科归类为第 13 门类（code='14'），暂用单一专业类结构
  5. 当前 883 个专业中仅约 40 个有基本信息，其余如实标注为 todo
- **遗留问题**：
  - 现有 Astro 页面仍使用硬编码数据，尚未切换到 `src/data/catalog.ts`
  - 交叉学科页面路由尚未创建（/majors/interdisciplinary）
  - 详情页 slug 统一规则尚未在页面中实现
- **下次建议**：
  1. 重构 majors 页面，从硬编码数据切换到 `catalog` 数据源
  2. 添加交叉学科门类页面路由
  3. 实现内容状态徽章组件（根据 ContentStatus 显示不同样式）
  4. 继续补充 P0/P1 专业类的详情页内容
- **当前版本状态**：v0.2 — 数据结构建立，13 门类骨架完成

---

### 2026-06-04 21:36 — 页面重构：接入 catalog 数据源 + 全目录自动生成

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 新建 StatusBadge 组件（`src/components/ui/StatusBadge.astro`）：根据 ContentStatus 显示不同颜色和文字
  - 重构 `/majors` 首页：从硬编码 12 门类数组 → 从 `catalog.gates` 动态渲染，自动显示 13 门类 + 交叉学科「2026 新增」标签
  - 重构 `/majors/[gate]` 门类页：`getStaticPaths` 从 `catalog.gates` 动态生成（13 个门类全部覆盖），各门类展示其下所有专业类 + 状态徽章
  - 重构 `/majors/[gate]/[category]` 专业类详情页：`getStaticPaths` 遍历全部 gate×category 组合（92 个专业类全部覆盖），展示专业列表 + 状态徽章 + 标签 + 简介；计算机类保留完整详情模板
  - 交叉学科门类自动纳入全部路由（`/majors/interdisciplinary` + 专业类页）
  - `npm run build` ✅ 通过：**111 个页面**（从 27 跃升到 111）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/ui/StatusBadge.astro` — 新建（completed→绿/building→黄/todo→灰）
  - `/home/xyzlh/majorpath/src/pages/majors/index.astro` — 重写（接入 catalog 数据源）
  - `/home/xyzlh/majorpath/src/pages/majors/[gate].astro` — 重写（接入 catalog 数据源）
  - `/home/xyzlh/majorpath/src/pages/majors/[gate]/[category].astro` — 重写（接入 catalog 数据源）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
  - `/home/xyzlh/majorpath/TODO.md` — 更新
- **关键决策**：
  1. 页面重构彻底消灭硬编码数据，所有 majors 页面数据取自 `catalog` 单一数据源
  2. 交叉学科门类已自动纳入全部路由，无需额外特殊处理
  3. 专业类详情页仅计算机类保留完整 8 模块详情模板，其余显示专业列表 + 「建设中/待补充」占位
  4. StatusBadge 三个状态分别用绿/黄/灰色系，`md` 尺寸用于页面标题，`sm` 用于列表项
- **遗留问题**：
  - 仅计算机类有完整详情内容，其他 91 个专业类仅有专业列表（其中仅 ~40 个专业有基本信息）
  - `/majors` 首页缺少门类数量统计图表（对比 12→13 的历史变化）
  - 专业类详情页中点击具体专业目前无路由（需后续建设 /majors/{gate}/{category}/{major} 三级路由）
- **下次建议**：
  1. 补充 P0/P1 专业类的详情内容（工商管理类、电子信息类、法学类、临床医学类…）
  2. 按优先级逐步填充 majors 数组（先从有数据的约 40 个扩展到 100+ 个有基本信息）
  3. 优化详情页的「具体专业」列表：支持展开/收起、点击跳转
  4. 配置 EdgeOne Pages 部署
- **当前版本状态**：v0.3 — 页面全面接入 catalog 数据源，111 页面自动生成

---

### 2026-06-04 21:43 — 专业详情内容模板设计 + 计算机类完整示例

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发 / 内容
- **完成内容**：
  - 设计统一详情内容 schema：`src/types/major-detail.ts`（11 个必含模块 + 元信息字段）
  - 创建内容数据文件：`src/data/major-details.ts`（计算机类完整示例，11 模块全覆盖）
  - 创建可复用模板组件：`src/components/ui/MajorDetailTemplate.astro`（9 个内容卡片 + 共建纠错入口 + draft 审核标识）
  - 重构详情页 `[gate]/[category].astro`：接入 `majorDetails` 数据源 + `MajorDetailTemplate` 模板组件；有详情内容时渲染完整模板，无内容时保留专业列表 + 占位
  - `npm run build` ✅ 通过（111 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/major-detail.ts` — 新建（MajorDetailContent / RelatedMajorDiff / MajorDetailMap）
  - `/home/xyzlh/majorpath/src/data/major-details.ts` — 新建（计算机类完整示例，11 模块全）
  - `/home/xyzlh/majorpath/src/components/ui/MajorDetailTemplate.astro` — 新建（9 内容卡片 + 头部 + 共建入口）
  - `/home/xyzlh/majorpath/src/pages/majors/[gate]/[category].astro` — 重写（接入模板组件，消除硬编码详情内容）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
  - `/home/xyzlh/majorpath/TODO.md` — 更新
- **关键决策**：
  1. 详情内容和数据结构分离：catalog.ts 管"目录骨架"，major-details.ts 管"深度解读"，互不耦合
  2. 模板组件采用 9 色卡片体系：白底=常规信息，绿底=适合，红底=不适合，灰底=误解，琥珀=避坑，蓝底=相关专业
  3. "不太适合"和"常见误解"用温和边界设计——浅色背景 + "不是劝退，只是提前让你知道"引导文案
  4. 所有内容标记 `draft`，详情页头部显示「内容为初稿，待人工审核后发布」
  5. "共建与纠错入口"作为模板固有 footer，引导至 `/contribute`
  6. 相关专业列表支持交叉链接（若 slug 存在则生成可点击链接）
- **遗留问题**：
  - 仅计算机类有完整详情内容（11 模块全），其余 91 个专业类待补充
  - 具体专业（三级路由 /majors/{gate}/{category}/{major}）尚未建设
  - 模板组件当前仅接收 MajorDetailContent，未来可考虑支持 Partial 渲染（只渲染已有模块）
- **下次建议**：
  1. 按优先级补充详情内容：工商管理类 P0 → 电子信息类/法学类/临床医学类/中国语言文学类/经济学类 P1
  2. 每新增一个专业类详情内容即更新 CATALOG_STATUS.md 对应条目
  3. 为 futurePaths 中的跨界方向考虑增加内部链接
  4. 部署 EdgeOne Pages
- **当前版本状态**：v0.4.1 — 审计修复完成（see below）

---

### 2026-06-04 21:50 — 目录页面实现审计 + 修复

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：审查 / 修复
- **发现的问题**：
  1. 🔴 首页「883 个专业」数字来自官方目录，但本站实际仅有 23 条 Major 数据，未区分
  2. 🔴 门类页显示「260 个专业」等官方数字，未标注本站实际收录数
  3. 🔴 专业类页同问题（如 CS 官方 18 个，只列了 8 个）
  4. 🟡 RelatedMajorDiff 假设所有相关专业在同一门类下，不支持跨门类引用
- **修复内容**：
  - types/catalog.ts：新增 `countActualMajors()` + `countActualMajorsInGate()` 辅助函数
  - majors/index.astro：首页改为「官方目录共 X 个 · 本站已收录 Y 个（持续建设中）」
  - majors/[gate].astro：门类页显示「官方 X 个（本站已收录 Y 个）」
  - majors/[gate]/[category].astro：专业类页同逻辑，仅当实际数 < 官方数时显示差异
  - types/major-detail.ts：RelatedMajorDiff 新增可选 `gateSlug` 字段
  - components/ui/MajorDetailTemplate.astro：跨门类引用支持 `related.gateSlug ?? c.gateSlug`
  - npm run build ✅ 通过（111 页面）
- **审计结论**：6 项检查全部通过（数据结构 ✅ / 诚实度 ✅ / 路由 ✅ / 可维护性 ✅ / 公益边界 ✅ / 构建 ✅），仅上述 4 项做了必要修复
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/catalog.ts` — +2 辅助函数
  - `/home/xyzlh/majorpath/src/types/major-detail.ts` — RelatedMajorDiff +gateSlug
  - `/home/xyzlh/majorpath/src/pages/majors/index.astro` — 双数字显示
  - `/home/xyzlh/majorpath/src/pages/majors/[gate].astro` — 双数字显示
  - `/home/xyzlh/majorpath/src/pages/majors/[gate]/[category].astro` — 双数字显示
  - `/home/xyzlh/majorpath/src/components/ui/MajorDetailTemplate.astro` — 跨门类引用
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **当前版本状态**：v0.4.1 — 审计修复完成

---

### 2026-06-04 21:54 — 电子信息类详情内容

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：内容
- **完成内容**：
  - 为电子信息类（P1）编写 11 模块完整 draft 内容
  - 亮点：用"手机怎么收到信号""WiFi 怎么传数据"等日常问题引入，降低理解门槛
  - 重点澄清"和计算机类的区别"（最常见混淆），覆盖通信/芯片/嵌入式三个主要方向
  - 对数学要求做了诚实说明（比计算机类更高，但不吓人）
  - 四个相关专业对比全部带交叉链接（计算机类、通信工程、自动化类、电气类）
  - `npm run build` ✅ 通过（111 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/major-details.ts` — 新增 engineering/electronic-information 条目（9×whatYouLearn + 4×suitableFor + 4×notSuitableFor + 4×misconceptions + 5×realScenes + 7×futurePaths + 4×pitfalls + 4×relatedMajors）
  - `/home/xyzlh/majorpath/CATALOG_STATUS.md` — 电子信息类 🏗️→🟡 待审核
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
- **当前版本状态**：v0.4.2 — 电子信息类 draft 内容完成，当前共 2/92 专业类有完整详情（计算机类 + 电子信息类）

---

### 2026-06-04 22:00 — ALGORITHM_SPEC.md v0.3 重构

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：文档 / 算法设计
- **完成内容**：
  - 将 ALGORITHM_SPEC.md 从 v0.2（8 通道 + 11 维度）重构为 v0.3（6 桶两阶段 + 三层推荐输出）
  - 核心变更：
    1. 粗筛从 8 通道简化为 **6 桶**（人文/社科/商科/理工/生命健康/艺术创作）
    2. 桶内保留细分方向，粗筛结束后才进入细化抽题
    3. 新增**相邻桶定义表**——只有相邻桶之间才抽校验题，非相邻桶严格隔离
    4. 新增**文科保护硬规则**：人文/社科命中 + 理工 < 55 → 工科题数归零，计算机/电子信息/自动化/电气/机械/土木不进推荐
    5. 推荐输出明确为**三层结构**：优先了解（3-5）→ 可以了解（2-4）→ 谨慎了解（2-4）+ 避坑标签
    6. 避坑规则重构为**三大类别**：热门跟风风险 / 学习方式排斥 / 方向误解，每类有具体标签和触发条件
    7. 简化阈值体系为 6 个关键参数（HIGH/MID/LOW/领先差/探索上限/选科惩罚）
    8. 新增调参节奏（内测→公测→稳定三阶段）
  - `npm run build` ✅ 通过（111 页面，纯文档变更）
- **修改的文件**：
  - `/home/xyzlh/majorpath/ALGORITHM_SPEC.md` — 重写（v0.2→v0.3，8 通道→6 桶）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **当前版本状态**：v0.5 — 算法规格 v0.3 完成，6 桶两阶段体系就绪

---

### 2026-06-04 22:05 — 题库数据结构 + 示例题库

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 创建 `src/types/test.ts`：DirectionBucket / SubDirection / QuestionType / RiskTag / Dimension / ScoreEffect / Option / Question / QuestionBank 完整类型体系 + filterQuestions / countByBucket 辅助函数
  - 创建 `src/data/questionBank.ts`：9 道示例题（4 general + 3 branch + 1 cross_check + 1 risk）
  - 类型设计对齐 ALGORITHM_SPEC v0.3 的 6 桶体系，支持 scoreEffects 同时影响桶/维度/专业类标签
  - 示例题覆盖了所有 4 种题目类型和全部 6 个桶
  - `npm run build` ✅ 通过（111 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/test.ts` — 新建（11 个类型 + 2 个辅助函数）
  - `/home/xyzlh/majorpath/src/data/questionBank.ts` — 新建（9 道示例题，含完整 scoreEffects 和 riskTags）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
- **关键决策**：
  1. ScoreEffect.target 用联合类型（DirectionBucket | Dimension | string），第三个为专业类 slug，兼顾精准和灵活
  2. 每个选项可携带多个 scoreEffects——一次选择可能同时影响桶得分+维度得分+专业类标签
  3. riskTags 仅 risk 题携带，避坑标签不在普通题上出现——保持语义清晰
  4. 通用题 targetBuckets 覆盖全部 6 桶，branch 题只覆盖目标桶——抽题时按此字段过滤即可
  5. 题目 ID 命名规则固定（gen_xxx / br_xxx / cc_xxx / risk_xxx），便于按前缀过滤
- **遗留问题**：
  - 当前仅 9 道示例题，正式题库需补齐至 50-60 道
  - 具体专业类标签（如 cs_info）的 scoreEffects 尚未与 catalog 数据联动
  - 抽题引擎代码待实现（按规则从 bank 中筛选）
- **下次建议**：
  1. 补齐通用题库至 20 题（当前仅 4 题示例），覆盖 ALGORITHM_SPEC §3.1 列出的 6 种题型分布
  2. 实现抽题引擎（根据用户第 1 步得分，从 bank 中按 type+targetBuckets 筛选）
  3. 开发方向测试页 UI（Astro 页面 + React 交互组件）
- **当前版本状态**：v0.6 — 题库类型体系 + 示例题库完成

---

### 2026-06-04 22:16 — 题库全面扩充至 87 题

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：内容
- **完成内容**：
  - 题库从 9 题示例扩充至 **87 题**（通用 20 + 方向 58 + 校验 1 + 避坑 8）
  - 通用题（20/20）：gen_001-020，覆盖 6 种题型（任务场景 5 + 学科偏好 5 + 人与事 3 + 抽象具体 3 + 职业期待 2 + 排斥 2）
  - 方向题（58/58）：B1 人文 10 / B2 社科 10 / B3 商科 10 / B4 理工 12 / B5 生命健康 8 / B6 艺术 8
  - 避坑题（8/8）：risk_001-008，覆盖三大类别（热门跟风/学习方式排斥/方向误解）
  - `npm run build` ✅ 通过（111 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/questionBank.ts` — 重写（9→87 题，65000+ 字节）
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 更新
  - `/home/xyzlh/majorpath/TODO.md` — 更新
- **当前版本状态**：v0.7 — 题库 87 题完成，达到正式运行所需最低库存

---

### 2026-06-04 22:23 — 自适应抽题引擎 + cross_check 扩充

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 扩充 cross_check 题：1 → **13 题**，覆盖 ALGORITHM_SPEC §2.3 的全部 8 对相邻桶
  - 创建 `src/utils/adaptiveQuestioning.ts`：
    - `selectGeneralQuestions()` — 按 priority 抽 8 道通用题
    - `computeBucketScores()` / `normalizeScores()` — 根据答案计算/标准化 6 桶得分
    - `determineUserType()` — 单桶/双桶/探索型判断
    - `checkHumanitiesProtection()` — 文科保护硬规则
    - `selectBranchQuestions()` — 按用户类型从匹配桶抽方向题
    - `selectCrossCheckQuestions()` — 仅从活跃相邻桶抽校验题
    - `selectRiskQuestions()` / `collectRiskTags()` — 避坑题抽取 + 标签收集
    - `buildTestSequence()` / `buildAdaptivePhase()` / `fullBuildTestSession()` — 三步主流程
  - 题库：87 → **99 题**（20+58+13+8）
  - `npm run build` ✅ 通过
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/utils/adaptiveQuestioning.ts` — 新建（9 导出函数 + 类型 + 配置）
  - `/home/xyzlh/majorpath/src/data/questionBank.ts` — +12 道 cross_check 题
  - 文档：AI_WORKLOG / CURRENT_STATUS / TODO
- **关键决策**：Fisher-Yates shuffle + priority 排序 + usedIds 去重贯穿全流程，纯函数零依赖可单测
- **遗留问题**：抽题无 seed（随机），校验题每对 1-2 题可满足
- **下次建议**：实现方向测试页 UI + 推荐结果输出 + 部署
- **当前版本状态**：v0.8 — 自适应抽题引擎完成，99 题库就绪

---

### 2026-06-04 22:28 — 测试页面 UI + 报告页

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 创建 `src/components/TestFlow.tsx` React 交互组件：两阶段测试（8 通用 → 自适应），每次一题+进度条，选中锁定，sessionStorage 传结果
  - 更新 `src/pages/test.astro` 挂载 React island（client:load）
  - 新建 `src/pages/report.astro` 报告页占位（建设中 + 重新测试/浏览目录入口）
  - `npm run build` ✅ 通过（112 页面，+1 /report），零警告
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/TestFlow.tsx` — 新建
  - `/home/xyzlh/majorpath/src/pages/test.astro` — 重写
  - `/home/xyzlh/majorpath/src/pages/report.astro` — 新建
  - 文档：AI_WORKLOG / CURRENT_STATUS / TODO
- **关键决策**：单向流程无后退，sessionStorage 传结果，报告页先占位保证流程可走通
- **遗留问题**：报告页未展示得分和三层推荐，无移动端键盘适配
- **下次建议**：实现报告页（读取 sessionStorage 展示方向画像+三层推荐），工商管理类详情，部署
- **当前版本状态**：v0.9 — 测试页面 UI 完成，端到端流程可走通

---

### 2026-06-04 22:35 — 规则推荐引擎

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 创建 `src/types/result.ts`：RecommendationResult / DisciplineRecommendation / CategoryRecommendation / RiskResult / DimensionProfile / ConfidenceLevel
  - 创建 `src/data/recommendationWeights.ts`：桶→门类映射 + 维度→桶矩阵 + 门类→专业类权重 + 避坑处罚规则 + 画像模板
  - 创建 `src/utils/scoring.ts`：
    - `computeDimensionScores()` — 从答案统计 11 维度得分
    - `computeRefinedBucketScores()` — raw×0.4 + dim-matrix×0.6 融合桶得分
    - `generateDisciplineRecommendations()` — 桶→门类映射 + 排序
    - `generateCategoryRecommendations()` — 门类内专业类加权 + 避坑降级分级
    - `generateRiskResults()` — 风险标签→受影响专业类
    - `determineConfidenceLevel()` — high/medium/low 三级置信度
    - `generateResult()` — 主流程：维度→桶→门类→专业类→避坑→置信度→画像→输出
  - `npm run build` ✅ 通过（112 页面），零错误零警告
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/result.ts` — 新建（7 类型）
  - `/home/xyzlh/majorpath/src/data/recommendationWeights.ts` — 新建（5 个映射表）
  - `/home/xyzlh/majorpath/src/utils/scoring.ts` — 新建（9 导出函数 + 3 映射表）
  - 文档：AI_WORKLOG / CURRENT_STATUS / TODO
- **关键决策**：
  1. 桶得分 = raw(0.4) + dimensionMatrix(0.6)——维度矩阵提供更细粒度的调参空间
  2. 避坑在专业类层面实施，不影响桶/门类得分——用户画像保持诚实
  3. 置信度三级：high（单桶明确+差距大）/ medium（双桶）/ low（探索型）
  4. 权重全部集中在 recommendationWeights.ts，调参只改此文件
  5. AI 完全不参与：generateResult() 是纯函数，输入 responses→输出 Result
- **遗留问题**：权重为初始 guess，需内测反馈后才能调优
- **下次建议**：实现报告页展示（接入 generateResult），工商管理类详情，部署
- **当前版本状态**：v0.10 — 规则推荐引擎完成，端到端可走通

---

### 2026-06-04 22:53 — 测试页改为纯客户端挂载

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：修复
- **问题**：Astro `client:load` / `client:only` island + React 19 导致 hydration 失败白屏
- **修复**：
  - 新建 `src/entrypoints/major-test.tsx` — 纯客户端入口（createRoot + import React + 防重复挂载）
  - 重写 `src/pages/test.astro` — 静态壳 `<div id="major-test-root">` + `<script> import '../entrypoints/major-test'`
  - 简化 `src/components/TestFlow.tsx` — 移除 mounted/useEffect hydration 兼容代码
  - 删除 `src/components/PingTest.tsx` — 调试临时文件
- **架构变化**：
  - 测试页：Astro island → 纯客户端 createRoot（零 SSR/零 hydration）
  - 首页/目录页/详情页：保持 Astro 静态渲染不变
  - `npm run build` ✅ 112 页面，测试页无 astro-island
- **验证清单**：0 island ✓ / major-test-root ✓ / 首屏占位 ✓ / 无 client:load ✓ / 首页静态不变 ✓
- **当前版本状态**：v0.10.1 — 测试页白屏修复

---

### 2026-06-04 23:11 — 详情页新增视频模块 + 贡献人模块

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - types/major-detail.ts：新增 VideoInfo / ContributorInfo 类型 + MajorDetailContent.videos? / .contributors? 字段
  - data/major-details.ts：两个现有条目（CS + 电子信息）各加空 videos[] + 佚名贡献者默认值
  - MajorDetailTemplate.astro：
    - 新增「🎬 相关介绍视频」模块（有视频→卡片列表+外链按钮 / 无视频→“待补充”占位）
    - 新增「内容贡献人」模块（低调灰色，放在 footer 上方）
    - 视频外链含 `target="_blank" rel="noopener noreferrer nofollow"` 安全属性
    - footer 改为 left-aligned 布局（贡献人信息在上，纠错入口在下）
  - `npm run build` ✅ 112 页面
- **修改的文件**：
  - `src/types/major-detail.ts` — +VideoInfo / +ContributorInfo / MajorDetailContent +2 字段
  - `src/data/major-details.ts` — 2 条目 +videos[] +contributors[]
  - `src/components/ui/MajorDetailTemplate.astro` — +2 模块（视频 + 贡献人）
  - AI_WORKLOG / CURRENT_STATUS
- **当前版本状态**：v0.10.2 — 详情页视频 + 贡献人模块完成，样式已优化

---

### 2026-06-04 23:14 — 视频模块 + 贡献人样式优化

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：样式
- **完成内容**：
  - 视频模块：
    - 卡片改为 grid 2 列布局（sm+），移动端单列
    - 整卡可点击（a 标签包裹），不再用分离的"去看看"按钮，更像内容推荐而非广告
    - 每卡内含播放图标 title + 导语，hover 整卡变色
  - 贡献人模块：
    - 改为单行内联信息条（flex-wrap），极度低调
    - 文字用 text-slate-300/400/500 浅色系，字号 xs
    - 不再用分隔线和"内容贡献人"独立标题，改为"内容贡献"小标签
    - note 在移动端隐藏（hidden sm:inline）
  - 空视频状态：虚线边框 (border-dashed) + "推荐优质内容"链接
  - `npm run build` ✅ 112 页面
- **修改的文件**：
  - `src/components/ui/MajorDetailTemplate.astro` — 重写视频+贡献人模块样式
  - AI_WORKLOG / CURRENT_STATUS / TODO
- **当前版本状态**：v0.10.3 — 视频+贡献人样式优化完成

---

### 2026-06-04 23:22 — 测试页改为纯原生 JS（去 React）

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：修复 / 重构
- **完成内容**：
  - 创建 `public/scripts/test-flow.js` — 纯原生 JS 测试引擎（~340 行，零框架）
    - 自包含：全部逻辑（抽题、评分、自适应、DOM 渲染）内联
    - 从 `window.__QUESTION_BANK__` 读取题库（Astro 通过 `define:vars` 注入）
    - Fisher-Yates shuffle + priority 排序 + 文科保护 + 相邻桶校验
    - 两阶段测试：general 8 题 → computeBucketScores → buildAdaptivePhase
    - 全部 DOM 手动 createElement/事件绑定，无虚拟 DOM
  - 重写 `test.astro`：data injection via `define:vars` + `is:inline` 加载外部脚本
  - 删除 `src/entrypoints/major-test.tsx` — React 入口已不需要
  - 保留 `src/components/TestFlow.tsx` — 暂不删除（后续若需要 React 版本可恢复）
  - `npm run build` ✅ 112 页面
- **架构对比**：
  - 之前：Astro → React island → hydration 兼容问题 → 白屏
  - 之后：Astro → JSON 注入 → 原生 JS 直接 DOM 渲染 → 秒加载，零框架
- **验证**：React 0 / 题库注入 ✅ / test-flow.js ✅ / 首屏 ✅
- **修改的文件**：
  - `public/scripts/test-flow.js` — 新建
  - `src/pages/test.astro` — 重写
  - `src/entrypoints/major-test.tsx` — 删除
  - AI_WORKLOG / CURRENT_STATUS
- **当前版本状态**：v0.11 — 测试页去 React 化，纯原生 JS

### 2026-06-05 07:44 — 题库质量整改 + 匿名反馈入口 + 共建页三类入口

- **使用模型**：MiniMax M2.7
- **任务类型**：修复 / 开发 / 内容
- **完成内容**：
  - **题库整改**：
    1. 选项随机化：`public/scripts/test-flow.js` 的 `renderQuestion()` 增加 `shuffle()` 随机排列选项再渲染
    2. 选项覆盖补全：`gen_008` 原只覆盖 4 桶→补全为 6 桶（新增 E/F 选项）；`gen_010` 原只覆盖 4 桶→补全为 6 桶（新增 E 选项）
    3. 学科暴露修复（15+ 处），将显式学科名称替换为中性描述：
       - `gen_007_a` "语文、历史、政治" → "文字、阅读与写作"
       - `gen_007_b` "数学、物理" → "逻辑推演与证明"
       - `gen_007_c` "化学、生物" → "实验与观察"
       - `gen_007_e` "美术、音乐、体育" → "创作与表达——画画、设计或跳舞"
       - `gen_019_c/d/e` 去除"数学题""实验室""血液/伤口"等暴露描述
       - `br_hum_001_a` "文学创作、语言研究、翻译" → "用文字表达——写文章、写故事或翻译内容"
       - `br_hum_003_a/b/c` 去除"翻译""跨文化交流""语言结构"等暴露外语学科的描述
       - `br_med_007_a/c` 去除"医学的一部分"等临床医学暴露描述
       - `br_stem_002_a` "物理和化学的底层原理" → "物质科学和自然规律的底层原理"
       - `br_stem_008` 题目标题改为"高中阶段，你觉得哪类课程学起来最吃力？"（去除物理化学生物）
       - `cc_hum_soc_001_b/cc_hum_soc_002_a` 去除"社会制度""法律和教育"的直接暴露
  - **匿名反馈入口（报告页）**：
    1. 重构 `public/scripts/report.js` 的 `renderFeedback()` 函数
    2. 新增绿色隐私声明框（4 项承诺）
    3. 主 CTA 按钮「匿名提交这次结果，帮助我们改进」，点击跳转外部问卷链接
    4. 问卷链接占位符：`https://wjgmltqm.feishu.cn/mr/xxxxxxxxxxxx`（需替换为真实飞书表单）
    5. 按钮不点击不保存任何数据
  - **共建页重构**：
    1. `src/pages/contribute.astro` 从"还在建设中"占位页重构为三类共建入口：
       - 📝 我想补充专业内容 → 飞书内容共建表单（占位链接）
       - ✏️ 我想纠错 → 飞书纠错表单（占位链接）
       - 🧪 我想参与测试题优化 → 飞书题目反馈表单（占位链接）
    2. 新增"内容审核说明"区块（3 条审核规则）
    3. 新增绿色"隐私安全"声明框
  - `npm run build` ✅ 通过（112 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/public/scripts/test-flow.js` — 选项 shuffle() + renderQuestion()
  - `/home/xyzlh/majorpath/src/data/questionBank.ts` — 15+ 处学科暴露修复 + gen_008/gen_010 选项补全
  - `/home/xyzlh/majorpath/public/scripts/report.js` — renderFeedback() 重构
  - `/home/xyzlh/majorpath/src/pages/contribute.astro` — 重构为三类共建入口
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本 v0.13
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加本条记录
- **关键决策**：
  1. 选项随机化用 shuffle() 不影响 scoreEffects 语义（A-F 顺序不影响计分逻辑）
  2. 问卷链接统一占位格式，创建飞书表单后替换即可
  3. 反馈默认不保存任何数据，只有用户主动点击按钮跳转才算"用户主动提交"
- **遗留问题**：
  - 三个外部问卷链接均为占位符，需创建飞书表单后替换真实链接
  - 题库整改后需内测验证随机化和学科隐蔽性效果
- **下次建议**：
  1. 创建三个飞书表单，替换占位链接
  2. 内测题库：确认随机化生效、学科隐蔽性达标
  3. 推进第二阶段剩余项：AI 报告解释、EdgeOne Pages 部署
- **当前版本状态**：v0.13 — 题库质量整改 + 匿名反馈入口 + 共建页三类共建入口完成

### 2026-06-05 07:55 — 题库审计与修复

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：审查 + 开发
- **完成内容**：
  - 审计通用题库三大问题：选项随机排列、选项覆盖漏缺、学科显式展示
  - 修复 4 处选项覆盖漏缺（gen_002 缺 art_creative / gen_010 缺 life_health / gen_011 缺 humanities / gen_019 缺 art_creative 排斥）
  - 修复 3 处「写代码」→ 中性表述（gen_001_c、gen_006_d、gen_011_e）
  - 确认 test-flow.js 已实现 Fisher-Yates 选项随机排列
- **修改的文件**：
  - `src/data/questionBank.ts` — 5 处选项增补 + 3 处文本替换
- **关键决策**：通用题选项严格禁用任何学科/专业名称（「计算机」「代码」等），B4 分支题保留「写代码」作为子方向区分信号
- **遗留问题**：无
- **下次建议**：后续新增题目时参照本次修复模式检查覆盖和学科暴露
- **当前版本状态**：v0.14 — 题库审计完成

### 2026-06-05 08:00 — DeepSeek Flash 报告解释接入

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：开发
- **完成内容**：
  - 创建服务端 API 端点 `src/pages/api/explain.ts`（限流/校验/DeepSeek Flash 调用/模板回退）
  - 报告页新增「🤖 大白话说说你的方向」区域（loading 态 → AI 解释 / 模板兜底）
  - 九条 AI 使用红线全部通过系统提示词约束
  - 三层回退机制：服务端 try/catch → 客户端 fetch catch → 硬编码兜底文案
  - 安全措施：限流（5req/min/IP）+ 防重复点击 + 12s 超时 + 输入校验
- **修改的文件**：
  - `src/pages/api/explain.ts` — 新建
  - `.env.example` — 新建
  - `public/scripts/report.js` — AI 解释区域 + fetch + 防重复点击
  - `astro.config.mjs` — 新增 `@astrojs/cloudflare` 适配器
- **关键决策**：AI 仅接收规则系统结果包，不接收用户原始答案；无 API Key 时直接回退模板
- **遗留问题**：主观补充输入 UI 暂未实现（前端可传主观笔记但尚无输入框）
- **下次建议**：部署后在 EdgeOne 配置 DEEPSEEK_API_KEY 环境变量
- **当前版本状态**：v0.14 — AI 报告解释上线

### 2026-06-05 08:10 — 部署就绪检查

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：审查 + 文档
- **完成内容**：
  - 6 项部署就绪检查全部通过（scripts/构建命令/输出目录/静态兼容/API Key 暴露/Node.js API 兼容）
  - 验证 API Key 零泄漏（client bundle、public/、dist/client/ 均无 DEEPSEEK_API_KEY）
  - 重写 README.md（从 Astro 默认模板 → 项目专属，含简介/技术栈/本地运行/部署/项目结构）
  - 细化 TECH_DECISIONS.md 部署方案（构建配置/环境变量/备选方案）
  - 更新 CURRENT_STATUS.md（v0.14.1，部署→就绪）
  - 修复 .gitignore（追加 .wrangler/）
- **修改的文件**：
  - `README.md` — 重写
  - `TECH_DECISIONS.md` — 决策 4 细化
  - `CURRENT_STATUS.md` — 版本 + 部署状态更新
  - `.gitignore` — 追加 .wrangler/
- **关键决策**：EdgeOne Pages 对中国大陆访问延迟最优；@astrojs/cloudflare 适配器输出标准 Workers
- **遗留问题**：实际部署需在 GitHub 创建仓库并配置 EdgeOne Pages
- **下次建议**：推送后在 EdgeOne 控制台完成部署配置
- **当前版本状态**：v0.14.1 — 部署就绪

### 2026-06-05 08:14 — Git 仓库初始化

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：操作
- **完成内容**：
  - `git init` + 分支改为 `main`
  - 初始提交：49 个文件（15,951 行新增）
  - 排除 .wrangler/ 本地开发缓存
  - 向用户说明 GitHub 创建仓库 + EdgeOne Pages 部署的完整操作清单
- **修改的文件**：
  - 无代码变更（仅 git 操作）
- **关键决策**：main 分支，Public 仓库（公益项目），待用户创建 GitHub 仓库后 push
- **遗留问题**：尚未 push 到 GitHub（需用户创建远程仓库）
- **下次建议**：用户创建 GitHub 仓库后执行 `git remote add origin ... && git push -u origin main`
- **当前版本状态**：v0.14.1 — 已提交，待推送

### 2026-06-05 11:38 — 反馈问卷链接替换

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：配置
- **完成内容**：
  - 替换 4 处占位符问卷链接为真实问卷（问卷星 wjx.cn）
  - 报告页匿名反馈 → `wFFJa5x.aspx`
  - 共建页·补充专业内容 → `wFaDlmJ.aspx`
  - 共建页·我要纠错 → `eot33he.aspx`
  - 共建页·测试题优化 → `mXrf117.aspx`
  - 生成 4 份问卷设计提示词供后续参考
- **修改的文件**：
  - `public/scripts/report.js` — 1 处 URL 替换
  - `src/pages/contribute.astro` — 3 处 URL 替换
- **关键决策**：问卷星替代飞书问卷（外部平台，匿名，不收集敏感信息）
- **遗留问题**：无
- **下次建议**：部署后走一遍完整流程，验证 4 个问卷跳转是否正常
- **当前版本状态**：v0.14.2 — 反馈链接全部替换

---

### 2026-06-05 18:00 — 报告空白修复 + 选项随机逻辑修正 + 上一题功能 + 题库表达优化

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：Bug 修复 + 功能开发 + 内容优化
- **完成内容**：
  - **报告空白修复**：根因是 `report.js` 的 `el()` 函数不支持数组子节点——`renderFeedback()` 把 `map` 生成的 `privacyLines` 数组直接当孩子传入，内部 `appendChild(Array)` 抛异常 → 整页空白。修复：`el()` 增加 `Array.isArray(arg)` 展开逻辑。额外加固：`boot()` 加 `try-catch` + 空 responses 检查
  - **选项随机逻辑修正**：原 `shuffle()` 整行打乱（label+内容一起）。改为 label（A/B/C/D/E）固定顺序，仅内容随机排列。加入 `shuffledOptionsCache` 确保每题仅打乱一次，不会每次点击重新洗牌
  - **「上一题」功能**：在选择题和主观题按钮区增加「上一题」按钮（左箭头 + 灰底），`idx === 0` 时隐藏。点上一题 → `idx--` → `renderQuestion()`，选项映射从缓存取不重新打乱，跨阶段（通用题↔方向题↔主观题）自然支持
  - **题库表达优化（questionBank.ts）**：
    - 修复 br_stem_009 标题泄露代码 ID 括号（`(br_stem_009)` 移除）
    - 11 道题干去学科标签：如"新闻传播"→"了解世界正在发生的事"、"数学"→"数字/公式/逻辑推理"、"医学本科 5 年"→"学习周期长（5-8 年）"、"动手术/看血"→"近距离照顾他人身体"、"艺术能否养活自己"→"选择不太常规的路"等
    - 15 处选项去职业/学科暗示：如"分析师"→"用数据帮团队看清方向"、"操盘者"→"站出来定方向"、"芯片/电路"→"让金属和电信号活起来"、"财务/审计"→"和数字打交道"、"市场/营销"→"让更多人认可好东西"等
  - **主观题→AI 解释问题排查**：确认 `functions/api/explain.js` 是 EdgeOne Pages Function，本地 `npm run dev` 无 Edge Function 运行时，`/api/explain` 请求必然 404 → 模板兜底。部署到 EdgeOne + 配好 `DEEPSEEK_API_KEY` 环境变量后即正常
  - `npm run build` ✅ 通过（112 页面）
  - Git 提交并推送 ✅
- **修改的文件**：
  - `/home/xyzlh/majorpath/public/scripts/report.js` — `el()` 数组展开 + `boot()` try-catch 兜底 + 空 responses 检查
  - `/home/xyzlh/majorpath/public/scripts/test-flow.js` — 选项随机逻辑（label 固定 + 内容随机 + 缓存）+ 上一题按钮（UI + 事件）
  - `/home/xyzlh/majorpath/src/data/questionBank.ts` — 12 题干 + 15 选项表达优化 + br_stem_009 标题修复
- **关键决策**：
  1. 选项 label 固定 A/B/C/D/E 更符合用户直觉（常见选择题习惯），且避免"点一下选项就飞走"的困惑
  2. 题库优化原则：不改变任何 scoreEffects / id / targetBuckets，仅改题干和选项的用户可见文本，不影响算法
  3. ~~本着手重写大段渲染逻辑~~ 最小化改动——只修 bug 不全量重构
- **遗留问题**：
  - 主观题→AI 解释在本地 dev 无法工作（Edge Function 只能在云端运行），需部署后验证
  - 上一题功能在跨阶段回退时 phase 标签有微小偏差（从主观题回退到方向题时标签仍显示"第 3 步"，不影响功能）
  - 通用题（gen_001~gen_020）表述整体较好，暂未改动
- **下次建议**：
  1. 部署 EdgeOne Pages + 配置 DEEPSEEK_API_KEY 环境变量，验证 AI 解释功能
  2. 走一遍完整测试→报告流程，体验题库新表述 + 上一题 + 选项随机逻辑
  3. 继续补充 P0/P1 专业类详情内容
  4. 修复上一题跨阶段 phase 标签偏差（低优先级，仅 cosmetic）
- **当前版本状态**：v0.14.3 — 报告空白修复 + 选项随机修正 + 上一题 + 题库表达优化

---

### 2026-06-06 11:20 — oneLiner 风格回退 + 部署标记完成 + 文档同步

- **使用模型**：MiniMax M2.7
- **任务类型**：修复 / 文档
- **完成内容**：
  - oneLiner 模板从 p 段落恢复为 h1 标题（commit 6d14ca5 回退），适配 20-40 字短句
  - 集成电路设计与集成系统 oneLiner 精简：长段 → "学怎么做芯片——把手机、电脑里那些\"会计算\"的小零件，浓缩到一块指甲盖大的硅片上。"
  - 机械设计制造及其自动化 oneLiner 精简：长段 → "学怎么设计和制造一台机器——从图纸画线到零件加工，让东西能动起来、造得出来。"
  - CURRENT_STATUS.md 部署状态更新：🔄 就绪 → ✅ 已完成，版本 v0.14.3 → v0.14.4
  - TODO.md 标记完成：绑定域名 ✅ + 验证国内访问 ✅ + 配置 DEEPSEEK_API_KEY ✅
  - AI_WORKLOG.md 追加本记录
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/ui/MajorDetailTemplate.astro` — h1 风格恢复
  - `/home/xyzlh/majorpath/src/data/major-details.ts` — 集成电路/机械 oneLiner 精简
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本+部署状态+更新记录
  - `/home/xyzlh/majorpath/TODO.md` — 部署相关 4 项标记完成
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - oneLiner 定位回退为"一句话概括（h1 标题）"，配合 20-40 字约束
- **遗留问题**：无
- **下次建议**：
  1. 走一遍完整测试→报告流程，验证线上 AI 解释功能（EdgeOne Pages 环境）
  2. 补充 P0 工商管理类详情页
  3. 面向少量熟人内测
- **当前版本状态**：v0.14.4 — oneLiner 风格恢复 + 部署完成

---

### 2026-06-06 11:30 — 打开土木类 + 能源动力类 + 线上验证确认

- **使用模型**：MiniMax M2.7
- **任务类型**：数据 / 文档
- **完成内容**：
  - 土木类打开：status todo→building，9 个专业数据填充，给排水科学与工程标记 building（已有人共建），新增智能建造等新兴专业
  - 能源动力类打开：status todo→building，6 个专业数据填充（能动/新能源/储能/氢能/能源服务/环境系统）
  - 线上流程验证确认：D老师反馈线上全流程已跑通
  - TODO.md 标记 面向少量熟人内测 ✅
  - CURRENT_STATUS.md 版本 v0.14.4→v0.15.0
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/catalog.ts` — 土木类 + 能源动力类 状态+专业数据
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本+状态+更新记录
  - `/home/xyzlh/majorpath/TODO.md` — 标记内测完成
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 土木类和能源动力类同时打开，为后续共建内容做准备
  - 给排水设 building 而非 todo——提示 AI 和共建者这个专业已经在写了
- **遗留问题**：无
- **下次建议**：
  1. 补充工商管理类详情页（P0，商科方向空白）
  2. 等待给排水共建内容提交后整合
  3. 根据内测反馈继续优化题库表述
- **当前版本状态**：v0.15.0 — 土木/能源动力类打开

---

### 2026-06-06 12:57 — 模拟器 &amp; 调参工具全套上线

- **使用模型**：MiniMax M2.7
- **任务类型**：开发 / 工具
- **完成内容**：
  - 创建 src/data/testQuestions.ts（题库入口，从现有 99 题重导出）
  - 创建 src/data/majorProfiles.ts（39 个专业类画像 + 15 条 Golden Case）
  - 创建 src/lib/recommendationEngine.ts（纯函数 calculateRecommendation）
  - 创建 scripts/simulateTests.ts（15 个虚拟高中生画像 + CLI 参数解析 + 异常检测 + 题目影响力分析）
  - 创建 scripts/evolveRecommendationParams.ts（遗传算法：12 参数空间 + 交叉/变异 + 评分函数）
  - 安装 tsx 依赖，更新 package.json scripts
  - 创建 simulation-results/ 输出目录结构
  - 创建 SIMULATOR_USAGE_FOR_AI.md（AI 使用指南）
  - 创建飞书云文档（D老师使用指南）
  - npm run build ✅ 114 页面不破坏
  - Git 推送 ✅
- **关键决策**：
  - 模拟器参数空间选 12 个全局参数，不直接调单个专业类权重（需手动改）
  - 评分函数设计：Golden Cases 30% + 多样性 20% + 一致性 20% + 异常惩罚 -15% + 兴趣匹配 15%
  - evolve 工具永不直接覆盖 recommendationWeights.ts（红线）
- **遗留问题**：无
- **下次建议**：
  1. 跑 evolve 验证参数空间是否足够覆盖需求
  2. 补充工商管理类详情页
- **当前版本状态**：v0.16.0 — 模拟器&调参工具上线

---

### 2026-06-06 14:00 — 推荐修复 v0.16.1：低数学保护 + 权重调优 + 专业画像 61

- **使用模型**：MiniMax M2.7
- **任务类型**：修复 / 数据
- **完成内容**：
  - **数学保护**：scoring.ts computeRefinedBucketScores 新增，math_logic<20 → stem×0.4，<35 → ×0.7（矛盾率 24%→11%）
  - **权重调优**：recommendationWeights.ts 改 6 处——数学类 25→6、电气类 6→10、航空航天 4→14、土木类 5→2、新增仪器类 weight 6、能源动力类 weight 7
  - **专业画像**：majorProfiles.ts 从 39→61（新增能源动力、力学、仪器、化工、食品、安全、天文、地理、海洋、地质、心理、管科、电商、旅游、体育、公卫、医技、中医、动物、生态、交叉学科）
  - **oneLiner 修复**：模板 p→h1 恢复，集成电路/机械 oneLiner 精简
  - **多轮模拟验证**：种子 2027 跑 200 人（改前对照），再跑 100/200 人（改后验证）
  - **多次调参**：种子 3089 跑 5 代（+5 分），确认 evolve 不直接调权重
  - npm run build ✅ — Git 推送 ✅
- **关键决策**：
  - 数学保护放在 computeRefinedBucketScores 中而非 generateResult 中，确保所有推荐路径都生效
  - 仪器类和能源动力类不直接加入 GATE_PRIORITY_CATEGORIES 的权重表，先观察
- **遗留问题**：
  - 航空航天权重 14 下种子 3089 仍未出现，可能需进一步提权或检查算法路径
  - 机械类、材料类、生物医学工程类持续未被推荐
- **下次建议**：
  1. 如果航空航天仍不出现，检查 GATE_PRIORITY_CATEGORIES 中工学门类的路由逻辑
  2. 补充工商管理类详情页
- **当前版本状态**：v0.16.1 — 推荐修复完成

---

### 2026-06-06 22:15 — 四轮迭代：维度匹配回复/权重调优/避坑修复/多选讨论

- **使用模型**：MiniMax M2.7
- **任务类型**：修复 / 调优 / 数据
- **完成内容**：
  - **v0.16.5**: DIM_MATCH 维度匹配表上线，区分维度参与排名；避坑题 scoreEffects 4→12；DEFAULT_CONFIG 应用 evolve 调参结果
  - **v0.16.6**: DIM_MATCH 缩放系数 2.5→2，权重 0.4→0.6，+4 分
  - **v0.16.7**: trend_chasing penalty 15→30；中文学/外文学权重平调35/35
  - **v0.16.8**: 分支题补 abstract_theory 3处(+6/+6/+4)；外语 DIM_MATCH 撤回 rule_detail
  - **v0.16.9**: 基础科学降权(物理16→13 化学15→12 生物20→14)
  - test-flow.js 全量参数同步（通用9 阈值68 领先差6 分支6）
  - 主页文案「8道题」→「题目」；测试页文案「8+8道」→「自适应」
  - 避坑文案「你的方向」→「法学/文学等方向」
  - 多选讨论：建议不紧急
  - 删除临时文件 report-debug.ts
- **关键决策**：
  - 维度匹配取代主观权重调优成为主要优化手段
  - 权重调整严格控制——仅限真实用户反馈验证后
  - 放弃继续追 abstract_theory 偏低的问题（题库结构限制）
- **遗留问题**：
  - abstract_theory 在全题库仅出现 21 次，vs engineering_practice 44 次，短期内不修
  - 多选功能暂不开发
- **下次建议**：补充工商管理类详情页
- **当前版本状态**：v0.16.9 — 基础科学降权完成

---

### 2026-06-07 15:26 — 内测反馈收集 & 第二阶段收尾

- **使用模型**：MiniMax M2.7
- **任务类型**：反馈收集 / 文档更新
- **完成内容**：
  - 收集 D老师本人内测反馈（无外部用户提供）
  - **反馈要点**：
    1. **选科题目**：需加入选科相关题目，优化选科设置逻辑
    2. **文科保护**：选文科的用户不应推荐理工科相关题目（已实现硬关卡）
    3. **避坑提醒表述优化**：文案需要更温和、更精准（已在 v0.18.x 系列优化）
    4. **算法版本**：从 v0.2 优化到 v0.5（根据专业人数和热度动态调整权重）
  - 更新 TODO.md：第二阶段「收集反馈并记录到 AI_WORKLOG.md」标记完成 ✅
  - 同步更新 AI_WORKLOG.md：追加本次记录
- **修改的文件**：
  - `/home/xyzlh/majorpath/TODO.md` — 标记内测反馈完成
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 内测反馈以 D老师 为主，无需外部用户也可收尾
  - 专业内容共建：暂时找不到人，第二阶段暂不要求
- **遗留问题**：
  - 工商管理类详情页未完成（第一阶段遗留）
  - 其他 P1 专业类（法学/临床医学/中国语言文学/经济学）内容建设待补
  - evolve 调参为持续性任务，无完成节点
- **下次建议**：
  1. 后续如有外部用户内测反馈，及时补充到 AI_WORKLOG.md
  2. 找人补充工商管理类或其他 P1 专业类详情内容
  3. 第二阶段整体可标记为接近完成（95%+）
- **当前版本状态**：v0.18.5 — 第二阶段内测反馈收集完成，第一阶段仅余工商管理类详情未完成


---

### 2026-06-07 18:06 — 第三阶段启动：P2专业类 majors 数组补全

- **使用模型**：MiniMax M2.7
- **任务类型**：数据填充
- **完成内容**：
  - 设计学类（1305）：14个专业全部填充 majors 数组（130501~130514T）
  - 新闻传播学类（0503）：5个专业全部填充（050301~050305T）
  - 教育学类（0401）：17个专业全部填充 majors 数组（040101~040203T）
  - 数学类（0701）：补齐剩余2个专业（070103 数理基础科学、070104T 数据计算及应用）
  - 能源动力类（0805）和土木类（0810）已满，无需补
  - npm run build ✅ 通过（115页面）
  - 更新 CATALOG_STATUS.md：P2四类标记为 building
  - 更新 TODO.md：注明 majors 已填充但详情页仍待建设
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/catalog.ts` — 设计学/新闻传播/教育学/数学类 majors 数组
  - `/home/xyzlh/majorpath/CATALOG_STATUS.md` — P2状态更新
  - `/home/xyzlh/majorpath/TODO.md` — 第三阶段进度更新
- **关键决策**：
  - majors 数组填充不等于详情页建设——后者需要 11 模块模板内容，优先级更低
  - 教育学类专业代码（040201T等）可能存在误差，构建通过但需后续核对官方目录
- **遗留问题**：
  - P2专业类详情页内容仍未开始（11模块模板）
  - 教育学类部分专业代码待核对
- **下次建议**：
  1. 继续补 P3 已建档专业类的 majors 数组
  2. 找人补工商管理类详情页（第一阶段遗留）
  3. 推进共建审核机制（第三阶段第3项）
- **当前版本状态**：v0.18.6 — P2 majors 数组填充完成


---

### 2026-06-07 18:18 — major-details.ts 拆分 + 文档更新

- **使用模型**：MiniMax M2.7
- **任务类型**：重构 / 文档
- **完成内容**：
  - 将 594 行的 `src/data/major-details.ts` 拆分为目录结构：
    - `src/data/major-details/index.ts` — 聚合导出
    - `src/data/major-details/engineering.ts` — 工学门类（5个详情条目）
  - 删除旧单文件，npm run build ✅ 通过
  - 更新 MAINTENANCE.md：审核/新建大修 的路径指向新目录结构
  - 更新 MODEL_HANDOFF.md：增加「重要文件结构提醒」段落，列出拆分后的目录结构
  - 飞书审核表格维护说明（问卷星收投稿→飞书表格跟踪审核状态）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/major-details/index.ts` — 新建（聚合导出）
  - `/home/xyzlh/majorpath/src/data/major-details/engineering.ts` — 新建（工学详情）
  - `/home/xyzlh/majorpath/src/data/major-details.ts` — 已删除
  - `/home/xyzlh/majorpath/MAINTENANCE.md` — 路径更新
  - `/home/xyzlh/majorpath/MODEL_HANDOFF.md` — 新增结构提醒
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 按学科门类拆分，每个文件 100-400 行，维护清晰
  - 新增门类时复制 engineering.ts 为模板，在 index.ts 合并
  - 飞书表格定位为"未来多人协作时的审核跟踪"，现阶段可选
- **遗留问题**：catalog.ts 补齐正在进行（子任务 fill_catalog_majors 运行中）
- **下次建议**：catalog.ts 补齐完成后更新 CATALOG_STATUS.md 和 CURRENT_STATUS.md
- **当前版本状态**：v0.18.6 — major-details 拆分完成，文档已适配


---

### 2026-06-07 18:35 — 目录空壳补全完成 + 收尾

- **使用模型**：DeepSeek V4 Pro（子任务填充）+ MiniMax M2.7（收尾）
- **任务类型**：数据填充 / 收尾
- **完成内容**：
  - 子任务 fill_catalog_majors：78→4 个空壳被填（15分钟超时）
  - 手动收尾最后4个艺术学门类：艺术学理论(3)、音乐舞蹈(15)、戏剧影视(13)、美术学(11)
  - 修复一个单引号导致的构建失败（铁路信号 summary）
  - npm run build ✅ 通过（115页面）
  - 最终状态：0 空壳，1740行，92/92专业类全部填满 majors 数组
  - 更新 TODO.md：第三阶段第4项标记完成 ✅
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/data/catalog.ts` — 92专业类全部填充（1740行）
  - `/home/xyzlh/majorpath/TODO.md` — 第4项勾除
- **关键决策**：
  - 艺术学类（音乐/舞蹈/戏剧/美术）专业名称部分基于教育方向推测，非100%官方确认，需后续核对
  - catalog.ts 已1740行，建议下一步拆分（已规划，等推送后执行）
- **遗留问题**：
  - catalog.ts 需拆分为按门类分文件（用户已同意）
  - 部分艺术类专业代码和名称待官方目录核对
- **下次建议**：
  1. 拆分 catalog.ts 为 `src/data/catalog/` 目录结构
  2. 更新 MODEL_HANDOFF.md 和 MAINTENANCE.md 适配新目录
  3. 推送 Git
- **当前版本状态**：v0.18.7 — 目录空壳补全完成，92/92专业类就绪

---

### 2026-06-08 19:42 — 搜索功能代码审查 + 修复

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：审查 / 修复
- **审查清单（10 项）**：
  1. ✅ 数据结构清晰：Major 已扩展 aliases/keywords，buildIndex() 遍历全量 catalog，SearchEntry 接口完备
  2. ✅ 匹配逻辑可靠：normalize+matches+scoreEntry 纯函数，得分分级合理（名称100>包含50>别名40>关键词20>门类15>简介5）
  3. ✅ TS 类型无问题
  4. 🔴 修复：pl-13 不是有效 Tailwind v4 class（→ pl-12），Placeholder 偏移
  5. 🟡 修复：tokenMatches() 函数定义但从未调用（已删除）
  6. ✅ 状态区分：SearchBox 内嵌 StatusBadge（绿/黄/灰三色+圆点），searchIndex scoreEntry 中 completed +3 / building +1
  7. ✅ 手机端：flex-col/flex-row 自适应，输入框 w-full，结果卡片 sm 以下自然换行
  8. ✅ 空状态友好：「暂时没找到相关专业」+ 建议换关键词 + 「查看全部专业目录」按钮
  9. 🔴 修复：首页搜索框下方的「热门：」标签改为「试试：」——没有搜索量追踪数据，称"热门"不诚实
  10. 🔴 修复：document mousedown 事件监听器与 fixed inset-0 overlay 点击关闭功能完全重复（已删除冗余监听器）
  - 🟡 注意：仅 5/800+ 专业有 aliases/keywords 元数据，搜索覆盖率偏低（非代码 bug，数据缺口）
  - 🟡 注意：SearchBox.tsx 内嵌的 StatusBadge 与 StatusBadge.astro 文案不一致（"已完善" vs "已完成"），建议后续统一
  - ✅ 构建通过（115 页面）
  - ✅ 不误导用户：搜索框标注「输入专业名或关键词」非"推荐"，无 AI 参与，纯前文本地匹配
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/SearchBox.tsx` — pl-13→pl-12 / 「热门」→「试试」/ 删除冗余 mousedown 监听器
  - `/home/xyzlh/majorpath/src/utils/searchIndex.ts` — 删除未使用的 tokenMatches() 函数
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新
- **关键决策**：
  1. 透明遮罩（fixed inset-0）替代 mousedown 事件监听作为唯一点击外部关闭机制，更简洁且无事件冲突
  2. "热门"→"试试" 遵循"不制造焦虑"铁律——没有数据支撑的标签不用
  3. 不扩大修改范围：搜索覆盖率是数据问题不是代码问题，不在此次改动中补齐
- **遗留问题**：
  - 仅 5 个专业有 aliases/keywords，建议后续补内容时顺手加
  - SearchBox StatusBadge "已完善" vs StatusBadge.astro "已完成" 文案不一致
- **下次建议**：
  1. 补充更多专业的 aliases/keywords（建议至少 P0/P1 专业类包含搜索元数据）
  2. 统一两处 StatusBadge 的文案
- **当前版本状态**：v0.19.1 — 搜索功能审查通过，3 处修复

---

### 2026-06-08 19:51 — 搜索假阳性 bug 修复 + 维护流程更新

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：修复 / 文档
- **完成内容**：
  - **搜索假阳性修复**：根因是 `scoreEntry()` 中的状态加分（building:+1, completed:+3）在所有内容匹配之前就加上，导致 status=building 但无任何语义匹配的条目（如哲学类）在搜索"电路"时也能以 score=1 通过 filter。修复：状态加分仅在 `s > 0`（已有内容匹配）时才生效
  - 验证：修复后搜索"电路"从 20 条假阳性结果 → 4 条精确结果（集成电路×2 + 电子信息 + 微电子）
  - 验证热门搜索词："计算机"→5条合理 / "会计"→2条合理 / "医学"→5条合理 / "设计"→5条合理
  - **维护流程更新**：MAINTENANCE.md 新增 aliases/keywords 必填说明
    - 新建专业详情（情况B）→ 第2步模板加入 aliases/keywords 字段 + 填写规范
    - 审核专业详情 → 文件表增加"检查 aliases/keywords 是否已填写"
  - `npm run build` ✅ 通过（115 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/utils/searchIndex.ts` — scoreEntry 状态加分条件化（s>0 时才加）
  - `/home/xyzlh/majorpath/MAINTENANCE.md` — 新建/审核流程加入 aliases/keywords 要求
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新
- **关键决策**：
  1. 状态加分改为 conditional 而非完全移除——保留"已完成的专业在同等匹配下优先展示"的设计意图
  2. aliases/keywords 写入 MAINTENANCE.md 作为必填项，从流程上杜绝"新建专业不可搜索"
- **遗留问题**：
  - "稳定"等泛化关键词在 summary 中匹配到的结果质量一般（如"小学教育"summary 含"稳定"），属于数据质量而非代码问题
  - MAINTENANCE.md 中部分文件路径仍引用旧结构（catalog.ts→catalog/），已顺手修正
- **下次建议**：
  1. 为热门搜索词（计算机/电路/会计等）对应的目标专业补齐 aliases/keywords
  2. 考虑为 summary 匹配设置最低分数阈值（当前+5可能太低）
- **当前版本状态**：v0.19.2 — 搜索假阳性修复 + 维护流程更新

---

### 2026-06-08 19:58 — 搜索 UI 增强：高亮匹配词 + summary 降权 + 空状态建议

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：功能开发
- **完成内容**：
  1. **匹配高亮**：SearchBox.tsx 新增 `highlightText()` 工具函数，搜索结果的名称和简介中，匹配到的关键词用琥珀色高亮标记（`<mark>`），用户一眼看到匹配原因
  2. **summary 降权**：searchIndex.ts `scoreEntry()` 简介匹配从 +5 降到 +2，泛化词（如"稳定"匹配到核工程类的"需求稳定"）权重更低，减少低质量结果
  3. **空状态建议**：SearchBox.tsx 新增 `SUGGESTIONS` 词典 + `getSuggestions()` 函数。无结果时显示"换个思路，你是不是想找："+ 关联建议词（如搜"代码"建议"计算机""软件"，搜"电路"建议"电子信息""集成电路"）。无匹配建议时保留原提示文案
  - `npm run build` ✅ 通过（115 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/SearchBox.tsx` — +highlightText / +SUGGESTIONS +getSuggestions / ResultCard 加 query prop / EmptyState 加 suggestions 逻辑
  - `/home/xyzlh/majorpath/src/utils/searchIndex.ts` — 简介匹配 +5→+2
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新
- **关键决策**：
  1. 高亮用琥珀色（amber-100/800）而非蓝色，避免和链接/状态色混淆
  2. SUGGESTIONS 词典用手工维护（非动态生成），确保建议质量可控
  3. summary 降权到 +2 保留（非移除），因为有时 summary 匹配仍有价值（如搜"芯片"匹配到"芯片设计全流程"的 summary）
- **遗留问题**：
  - 高亮仅在 hero 模式下有效（compact 模式不显示简介，仅名称高亮）
  - SUGGESTIONS 词典覆盖有限，冷门词（如"书法"）无建议
- **当前版本状态**：v0.19.3 — 搜索 UI 增强完成

---

### 2026-06-08 21:41 — Header 搜索居中 + Hero 文案优化

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：UI 调整 / 文案
- **完成内容**：
  - **Header 重构**：搜索框从右侧移至居中（absolute + left-1/2 + translate-x），四个导航链接全部移至右侧，Logo 在左侧。桌面端 `w-72` 搜索框，移动端搜索图标+汉堡菜单在右侧
  - **HeaderSearch 组件**：新建 `src/components/HeaderSearch.tsx`，搜索图标按钮（胶囊形，桌面端显示“搜索”文字）+ 点击展开搜索面板（全宽下拉，紧贴 Header 下方），`client:idle` 加载不阻塞首屏
  - **首页 Hero 搜索框移除**：搜索框从 Hero 区域移出收进 Header，Hero 只保留标题+副标题+免责
  - **Hero 文案优化**：
    - 副标题：“用说大白话的方式，帮你搞清楚：” → “来自在读生和毕业生的真实介绍：”（去除 AI 文案腔，强调内容来源）
    - 免责：“不是志愿填报工具，不预测录取概率，不替代正式建议” → “在填报志愿之前，你总得知道专业是干什么的”（正向表达，不强调“不做什么”）
  - **Footer 快速入口**：移动端改为 2 列网格（grid-cols-2），桌面端恢复单列
  - `npm run build` ✅ 通过（115 页面）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/components/HeaderSearch.tsx` — 新建
  - `/home/xyzlh/majorpath/src/layouts/Layout.astro` — Header 重构（搜索居中+导航分两侧）
  - `/home/xyzlh/majorpath/src/pages/index.astro` — Hero 文案优化+搜索框移除
  - `/home/xyzlh/majorpath/src/components/SearchBox.tsx` — placeholder 统一缩短
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新
- **关键决策**：
  1. 搜索用 `client:idle` 而非 `client:load`，避免阻塞首屏渲染
  2. Header 搜索面板用 `fixed left-0 right-0 top-16` 全宽，而非绝对定位在 Header 内部，保证结果面板不被裁切
  3. Hero 文案改为正向表达，遵循用户反馈“只需要强调网站作用是什么”
- **遗留问题**：无
- **当前版本状态**：v0.19.4 — Header 搜索居中 + Hero 文案优化

---

### 2026-06-08 16:18 — 专业/方向模糊搜索功能开发

- **使用模型**：MiniMax M2.7
- **任务类型**：功能开发
- **完成内容**：
  - 扩展 `src/types/catalog.ts` 的 `Major` 接口，新增 `aliases` 和 `keywords` 可选字段
  - 为 5 个重点专业添加搜索元数据：
    - 计算机科学与技术（building）：aliases=[计算机, CS, 计科, 计算机技术]，keywords=[代码, 编程, 算法, 软件, 互联网...]
    - 电子信息工程（building）：aliases=[电子信息, 电信]，keywords=[电路, 信号, 通信, 硬件, 芯片...]
    - 集成电路设计与集成系统（completed）：aliases=[集成电路, IC设计, 芯片设计]，keywords=[芯片, 晶体管, 半导体, EDA, Verilog]
    - 机械设计制造及其自动化（building）：aliases=[机械设计, 机械制造, 机电一体化]，keywords=[机器, 设计, 制造, 自动化...]
    - 给排水科学与工程（building）：aliases=[给排水, 市政给排水, 水处理]，keywords=[水, 管道, 市政, 建筑...]
  - 创建 `src/utils/searchIndex.ts`：搜索索引构建工具，含 normalize/tokenize/matches/scoreEntry/buildIndex/searchMajors
  - 创建 `src/components/SearchBox.tsx`：React 搜索组件，含实时防抖（250ms）、结果卡片、空状态、点击外部关闭、Escape 关闭
  - 首页 `index.astro`：在 hero 下方新增搜索入口 Section（`client:load`）
  - 目录页 `majors/index.astro`：在顶部标题区新增搜索框
  - `npm run build` ✅ 通过（115 页面）
  - 局域网预览已启动：`http://192.168.31.138:4321/`
  - 更新 CURRENT_STATUS.md（v0.18.8 → v0.19.0）
- **修改的文件**：
  - `/home/xyzlh/majorpath/src/types/catalog.ts` — Major 接口扩展 aliases/keywords
  - `/home/xyzlh/majorpath/src/data/catalog/engineering.ts` — 5个重点专业添加搜索元数据
  - `/home/xyzlh/majorpath/src/utils/searchIndex.ts` — 新建（搜索索引+搜索函数）
  - `/home/xyzlh/majorpath/src/components/SearchBox.tsx` — 新建（React 搜索组件）
  - `/home/xyzlh/majorpath/src/pages/index.astro` — 新增搜索入口
  - `/home/xyzlh/majorpath/src/pages/majors/index.astro` — 新增搜索框
  - `/home/xyzlh/majorpath/CURRENT_STATUS.md` — 版本更新+模块记录
  - `/home/xyzlh/majorpath/AI_WORKLOG.md` — 追加记录
- **关键决策**：
  - 搜索索引数据直接构建自 catalog（不额外请求 API），纯前端计算
  - 得分排序：名称完全匹配(100) > 名称包含(50) > 别名精确(40) > 别名包含(30) > 关键词(20) > 门类/专业类名(15/10) > 简介(5)
  - 搜索同时覆盖专业类（一级分类）和具体专业（二级叶子节点），路径分别为 /majors/{gate}/{cat} 和 /majors/{gate}/{cat}/{major}
  - 使用 `client:load` 让 SearchBox 在页面加载时立即可用
  - 搜索函数通过动态 import 懒加载，避免影响首屏性能
- **遗留问题**：
  - 大部分专业尚未添加 aliases/keywords，搜索覆盖面有限（仅5个专业有完整搜索元数据）
  - 未推送 Git
- **下次建议**：
  1. 后续补充专业详情内容时，同步添加 aliases 和 keywords 字段
  2. 考虑为更多 building/completed 状态的专业补充搜索元数据
  3. 推送代码到 GitHub
- **当前版本状态**：v0.19.0 — 专业/方向模糊搜索功能完成

---

### 2026-06-09 22:56 — v0.19.5 checkpoint：算法保护规则 + 前后端规则对齐

- **使用模型**：DeepSeek V4 Pro
- **任务类型**：修复 / 同步
- **完成内容**：
  - **数学保护修复**：低数学（<20）→ STEM ×0.5（有编程/工程信号 ×0.75），<35 → ×0.85
  - **生命健康保护**：低 life_health（<20）→ life_health ×0.3
  - **门类阈值**：20 → 8
  - **临床医学惩罚**：×0.65，不轻易进 recommended
  - **口腔医学惩罚**：×0.70
  - **热门跟风替代惩罚**：缺乏编程/工程信号时，高强工科（机械/电气/土木/自动化/能源动力）额外 penalty 25
  - **CS 降级保护**：有编程兴趣（info_systems ≥40）时 penalty 25→15
  - **商科恢复**：移除 finance/business-admin 的热门跟风惩罚 + 新增 accounting(13)/financial-management(12)/auditing(10) + 三类画像
  - **去重逻辑**：seenSlugs Set，同一专业类只属于一个层级
  - **领域感知 fallback**：getCategoryDomain + inferPrimaryDomain，推荐为空时从同领域可选项中提升
  - **report.js 同步**：+116 行，与 scoring.ts 全部规则对齐
  - `npm run build` ✅ 115 页面
  - 100 用户模拟验收：空推荐 0%，overlapCount 0，趋势冲突 0，商科恢复，临床医学不被强推，领域感知 fallback 生效
- **修改的文件**：
  - `public/scripts/report.js` — +116 行（规则同步）
  - `src/utils/scoring.ts` — +156 行（数学/生命健康保护 + 领域感知 fallback）
  - `src/data/recommendationWeights.ts` — +7/-2（商科恢复 + 新增 3 类）
  - `src/data/categoryDimProfiles.ts` — +42 行（accounting/financial-management/auditing 画像）
  - `scripts/simulate_v05.ts` — +32 行（模拟器同步新规则）
  - `simulation-results/v04_weights_raw.json` — +3 商科权重
  - `simulation-results/v04_fields.json` — +27 商科风险字段
  - `simulation-results/summary_v05_audit.md` — 更新
  - `simulation-results/summary_v05_realistic.md` — 更新
  - `CURRENT_STATUS.md` — v0.19.4→0.19.5
  - `AI_WORKLOG.md` — 追加记录
- **关键决策**：
  1. 数学保护从直接砍 STEM（×0.4）改为分级降权（×0.5 / ×0.75 / ×0.85），保留编程/工程信号用户的机会
  2. 热门跟风惩罚只保留 computer-science + electronic-information，金融/工商管理恢复自由竞争
  3. 临床医学/口腔医学不通过权重调整，而是在评分阶段乘 0.65/0.70，确保不会被轻易强推但保留医学兴趣用户的通道
  4. 领域感知 fallback 解决探索型用户推荐为空的问题：从同领域可选类别中至少提升一个
- **遗留问题**：无
- **下次建议**：
  1. 合并 rescue-2026-06-09 → main
  2. 推送 GitHub
  3. EdgeOne Pages 部署新版本
  4. 如有条件，真人走一遍测试→报告流程验证前端 report.js 行为
- **当前版本状态**：v0.19.5 — 算法保护规则 + 前后端规则对齐完成


### 2026-06-11 11:59 — 机械设计内容替换 + 给排水页面路由修复

- **使用模型**：MiniMax M2.7
- **任务类型**：内容 / 修复
- **完成内容**：
  - 读取用户 Word 文档（`新建_Microsoft_Word_文档---70f6978b-4074-4012-aec3-e39c2be7e015.docx`）
  - 完整替换机械设计制造及其自动化专业详情（`engineering/mechanical/mechanical-design`）
  - 更新 oneLiner、whatYouLearn、vsHighSchool、suitableFor、notSuitableFor、commonMisconceptions、realScenes、futurePaths、pitfalls、relatedMajors（7个专业对比，均含 slug 链接）
  - reviewStatus 改为 draft，updatedAt 改为 2026-06-11
  - 构建验证通过（115 页面）✅
  - **修复给排水页面无法访问**：
    1. `major-details/engineering.ts`：key 修复（`engineering/water-supply` → `engineering/civil-engineering/water-supply`）
    2. 新建 `[major].astro` 路由页面（三级路由：门类→专业类→具体专业），解决具体专业详情页从未生成的问题
    3. 导入路径：`../../../../layouts`（深度4）
    4. 构建：116 → **782 页面**，所有 catalog 中有 majors 数组的具体专业全部生成静态页面
- **修改的文件**：
  - `src/data/major-details/engineering.ts` — 机械设计内容替换 + water-supply key 修复
  - `src/pages/majors/[gate]/[category]/[major].astro` — 新建（具体专业详情页路由）
- **关键决策**：
  - major-detail key 结构：`${gate}/${category}/${major}` = `engineering/civil-engineering/water-supply`
  - [major].astro 必须用 `../../../../` 而非 `../../../`（深度4 vs 深度3）
- **遗留问题**：无
- **下次建议**：暂无（已正常）
- **当前版本状态**：v0.19.6 — 机械设计内容替换 + 给排水页面修复，782 页面构建通过

### 2026-06-11 14:01 — 修复 [major].astro 页面数暴涨问题（782→116）

- **使用模型**：MiniMax M2.7
- **任务类型**：修复
- **完成内容**：
  - 发现页面数从 116 暴涨到 782 的原因：修复给排水时误删了 `getStaticPaths` 中的 `majorDetails[key]` 条件判断，导致所有 660+ 具体专业无差别生成页面
  - 恢复过滤逻辑：只有 majorDetails 中有对应 key 的专业才生成静态页
  - 构建：782 → **116 页面**，回到正常
- **修改的文件**：
  - `src/pages/majors/[gate]/[category]/[major].astro` — 恢复 `if (majorDetails[key])` 过滤条件
- **关键决策**：
  - 之前集成电路详情页能访问是因为它的 key 存在且被这个条件判断保护
  - 无差别生成所有专业会让构建产物膨胀，且大量空壳页对用户无意义
- **遗留问题**：无
- **下次建议**：无
- **当前版本状态**：v0.19.7 — 页面数恢复正常（116），给排水页面正常访问

---
### 2026-06-12 21:55 — 题库评分引擎审计修复

- **使用模型**：opencode-go/qwen3.7-max
- **任务类型**：审查 + 开发
- **完成内容**：
  - 完成「题目 → 标签/维度 → 分数 → 推荐桶 → 报告」全链路审计
  - 发现 22 个 score target 为死代码（4 新标签 + 18 SubDirection），被评分引擎 hasOwnProperty 静默丢弃
  - 清理 165 个 SubDirection 死代码条目（从 scoreEffects 中移除，保留 Question.subDirection 元数据）
  - gen_019（唯一通用排斥题）替换 gen_003 进入固定 12 题列表，用户可表达负向偏好
  - 4 个新标签（exploration_preference / self_improvement_preference / autonomy_preference / feedback_reflection）作为「性格特质」展示在报告页
  - gen_016_B 空 scoreEffects 修复（[] → stable_path(3)）
  - gen_010/016/017 三道题场景化改写，更贴近高中生生活
- **修改的文件**：
  - `src/data/questionBank.ts` — 清理 SubDirection 死代码 + gen_016_B 修复 + gen_010/016/017 改写
  - `public/scripts/test-flow.js` — FIRST_STAGE_QUESTION_IDS: gen_003 → gen_019
  - `src/utils/adaptiveQuestioning.ts` — FIXED_IDS: gen_003 → gen_019
  - `public/scripts/report.js` — 新增 collectPersonalityTags + renderPersonalityHints + PERSONALITY_HINTS
- **关键决策**：
  - 4 个新标签作为「报告解释标签」而非「正式评分维度」，不参与推荐排序，只在报告页展示性格提示
  - gen_019 替换 gen_003（而非新增为第 13 题），因为 gen_003 与 gen_001/002 高度同质
  - SubDirection target 保留在 Question.subDirection 字段作为元数据，仅从 scoreEffects 中移除
- **遗留问题**：
  - P3: 4 个新标签未正式加入 Dimension 类型和评分引擎（当前仅作为报告展示标签）
  - gen_004（小组角色）/gen_008（学新东西）/gen_014（规则态度）表述仍可优化
- **下次建议**：
  - 跑一轮 200 人模拟验证 gen_019 纳入后的推荐结果变化
  - 考虑将 gen_018（职业期待）替换 gen_003（已不在测试流中）或加入题库轮换池
- **当前版本状态**：v0.20.0 — 题库评分引擎审计修复完成，构建 116 页面通过

---
### 2026-06-12 22:05 — 第二轮场景化改写

- **使用模型**：opencode-go/qwen3.7-max
- **任务类型**：开发
- **完成内容**：
  - gen_002 场景化改写：「负责一件小但完整的事」→「班上组织活动（毕业旅行/主题班会），你更想管哪块？」，6 个选项全部匹配新场景
  - gen_020 修复：补充上下文「你感兴趣的专业方向」+ 消除 A/C 选项重叠（原 C「自己找机会试一下」与 A「先听理由」逻辑重叠，改为「有点动摇，认真想想他说的有没有道理」）
  - gen_008 选项 C/E 表述优化：去掉抽象用语，改为更直白的表达
  - gen_014 场景化改写：加入「做一件重要的事（比如考试复习或组织活动）」锚定场景
  - gen_007 选项 E 表述优化：「你把一种感觉做出来了」→「做了一个东西（画、视频、音乐、手工都行），别人看到后说"我懂你想表达什么"」
- **修改的文件**：
  - `src/data/questionBank.ts` — gen_002/007/008/014/020 改写
  - `CURRENT_STATUS.md` — 版本更新至 v0.20.1
- **关键决策**：
  - gen_020 原选项 C「自己找机会试一下」改为「有点动摇」，拉开与选项 A 的区分度
- **遗留问题**：无
- **下次建议**：跑一轮 200 人模拟验证改写后的题目对推荐结果的影响
- **当前版本状态**：v0.20.1 — 第二轮场景化改写完成，构建 116 页面通过

---
### 2026-06-12 22:55 — 模拟器固定12题 + 报告页雷达图 + 性格能力合并

- **使用模型**：opencode-go/qwen3.7-max
- **任务类型**：开发
- **完成内容**：
  - 模拟器改造：`generateAnswers` 和 `generateAnswersFromPersona` 改用前端固定 12 通用题 FIXED_GENERAL_IDS，不再随机抽 8 道。200 人固定题模拟完成（seed 613，覆盖率 26/96，异常率 10%）
  - 报告页雷达图：新增 `drawRadarChart()` 纯 SVG 函数，11 维分数可视化（320×320 viewBox，3 层网格环 + 渐近数据多边形 + 数据点 + 全标签）
  - 报告页能力维度重构：`renderDimensionProfile` 合并性格特质（`renderPersonalityHints` 删除独立卡片），新标题「性格与能力画像」，雷达图 + 分数条形图（top 8）+ 性格标签带描述文字
  - 分数条形图标签从 `w-14` 加宽为 `w-20`，修复 4 字中文折行问题
  - 雷达图标签不再截断（移除 `.substring(0,3)`），SVG 扩大至 320×320 + 标签偏移 +26
  - 学科门类 `renderDisciplines` 保持两列卡片格布局，恢复原因说明文字
- **修改的文件**：
  - `scripts/simulate.ts` — FIXED_GENERAL_IDS + generateAnswers/generateAnswersFromPersona 改用固定题
  - `public/scripts/report.js` — 新增 drawRadarChart + 重写 renderDimensionProfile + 恢复 renderDisciplines 两列卡片 + 移除独立 renderPersonalityHints 卡片渲染
- **关键决策**：
  - 雷达图为纯 SVG + 原生 JS，零外部依赖，移动端以分数字条形图兜底
  - 性格特质不删，改为一卡双区（维度分 + 性格标签），减少区块数从 19→16
  - 学科门类保留两列卡片（用户偏好），不做纯药丸标签
- **遗留问题**：
  - 教育学类在 200 人模拟中仍占 37%（#1），需检查维度映射是否过于宽泛
  - `scripts/simulate.ts` 批量模式 audit.md 引用了旧版 v04_weights_raw.json slug 集，与当前 catalog slugs 不匹配，全部显示 0%
- **下次建议**：
  - 补充专业介绍内容（P1 众包模式）
  - 教育学类推荐偏高排查
  - 修 audit 模式的 slug 数据源
- **当前版本状态**：v0.20.2 — 报告页视觉升级完成，构建 116 页面通过

---
### 2026-06-14 20:20 — 谨慎区改名"需要重点确认" + 4层分级逻辑

- **使用模型**：opencode-go/deepseek-v4-flash
- **任务类型**：开发
- **完成内容**：
  - 谨慎区改名："建议谨慎了解"→"需要重点确认"，副标题改为"不是说你不适合，也不是建议你不要报，而是这些方向存在一些容易被忽略的学习方式或职业特点"
  - 分层从 3 层改为 4 层：matched≥55+penalty→cautious（而非有罚则就进），matched<55+penalty→optional/lowPriority
  - 新增 `lowPriorityCategories` 到 RecommendationResult 类型和 scoring.ts/report.js
  - PROFILE_TEMPLATES 去具体专业名（"法学、教育、公共管理"→"社会制度与人际关系类方向"）
  - RISK_CATEGORY_PENALTIES 修正：`rule_detail_aversion` 去"诊疗规范"
  - 谨慎卡片三区结构：📌你为什么会感兴趣 + ⚠️需要重点确认 + 👉如果还感兴趣
  - 新增 `renderLowPriority` 折叠区函数
  - buildNextSteps 文案更新
- **修改的文件**：
  - `src/types/result.ts` — 新增 lowPriorityCategories
  - `src/data/recommendationWeights.ts` — PROFILE_TEMPLATES/RISK_CATEGORY_PENALTIES 文案修正
  - `src/utils/scoring.ts` — 4层分级逻辑 + generateResult 新增 lowPriority
  - `public/scripts/report.js` — 全同步 + 文案重命名 + 卡片三区 + lowPriority 折叠
- **关键决策**：
  - cautious 不再是有罚则就进，而是只有匹配分高(≥55)但有风险时才进
  - 低匹配(调整后分<35)进 lowPriority 折叠区，避免报告过长
- **遗留问题**：
  - 教育学类 500 人模拟仍占 34%（#1），需进一步排查
  - 临床医学类覆盖率 0%（0.65 乘法惩罚 + long_cycle -20 使其到不了推荐阈值）
- **下次建议**：
  - 真实用户测试
  - 教育学类偏高修复
  - 修复 audit 模式 slug 数据源不匹配问题
- **当前版本状态**：v0.21.0 — 谨慎区重命名 + 4层分级完成，构建 116 页面通过

---
### 2026-06-14 21:15 — 15个新画像 + 模拟噪声降低 + 报告折叠 + 小众隐藏

- **使用模型**：opencode-go/deepseek-v4-flash
- **任务类型**：开发
- **完成内容**：
  - 新增 15 个虚拟画像覆盖 business/art/life_health/humanities/social_science（14→29）
  - 模拟选项噪声从 ±20 降低到 ±8（信号:噪声比大幅改善）
  - 500 人模拟覆盖率 33.3%（+2%），金融学类 4%（+3%），异常率 9.2%
  - 维度卡片：雷达图默认展示，分数条和性格特质折叠在"查看详细数据 ▼"按钮后
  - 小众探索：未触发时完全隐藏（之前是占位提示框）
  - 小众探索门槛放宽：dimScore 68→50，interestSignal 70→50，bucketMatch 75→60，ns 45→38
  - 下载文本增加各专业类推荐原因（💡）和谨慎区提醒（⚠️）
- **修改的文件**：
  - `scripts/simulate.ts` — 15个新画像 + gaussian(0,20)→gaussian(0,8)
  - `public/scripts/report.js` — 维度卡片折叠 + 小众隐藏 + 下载文本原因 + 小众门槛降低
- **关键决策**：
  - 维度详细数据默认收起，减少首次阅读负担
  - 小众探索彻底隐藏（不显示占位提示），避免"空鼓励"
- **遗留问题**：
  - 网页版推荐/可选卡片推荐原因与维度标签信息重复，待确认是否移除
  - 临床医学/金融学仍覆盖率低
- **下次建议**：
  - 更新说明文档
- **当前版本状态**：v0.21.1 — 模拟器升级 + 报告折叠 + 小众修复完成，构建 116 页面通过

---
### 2026-06-14 23:00 — 草稿简介系统上线（30个专业类接入）

- **使用模型**：opencode-go/deepseek-v4-flash
- **任务类型**：开发
- **完成内容**：
  - 草稿简介系统设计：三级内容优先级（完整 11 模块 > 草稿 5 模块 > 🚧 建设中）
  - 新增 `MajorDraftContent` 类型（MajorDraftMap，5 内容字段 + 草稿提示）
  - 新增 `src/data/major-drafts.ts`：30 条草稿数据，通过 `catalog` 反向映射到 gateSlug/categorySlug
  - 新增 `MajorDraftTemplate.astro`：⚠️ 草稿提示横幅 + 一句话看懂 + 学什么 + 高中关系 + 适合谁 + 注意 + 共建入口
  - 修改 `[category].astro`：内容优先级 full > draft > building，30 个专业类从 🚧 变为可读状态
  - 审稿 30 条草稿：全部可用，仅微调化工与制药类/仪器类 oneLine 和工商管理类 learns
- **修改的文件**：
  - `src/types/major-draft.ts` — **新建** MajorDraftContent 类型
  - `src/data/major-drafts.ts` — **新建** 30 条草稿数据
  - `src/components/ui/MajorDraftTemplate.astro` — **新建** 草稿渲染组件
  - `src/pages/majors/[gate]/[category].astro` — 三级优先级变更
- **关键决策**：
  - 不修改 `ContentStatus` 类型和 `catalog` 状态字段，草稿是独立数据层
  - 草稿不覆盖完整内容（已有 11 模块的专业优先展示完整内容）
  - 不修改已有的 6 个完整专业内容
- **遗留问题**：
  - 剩余 56 个专业类无任何内容（草稿或完整）
  - 审计模式 slug 数据源不匹配问题仍未修复
- **下次建议**：
  - 生成剩余 56 个专业类草稿（优先高频方向）
  - 真实用户测试
- **当前版本状态**：v0.22.0 — 草稿简介系统上线，30 个专业类可读，构建 116 页面通过

---

### 2026-06-24 23:15 — 食品科学与工程类草稿 + slug 问题记录

- **使用模型**：opencode-go/deepseek-v4-flash
- **任务类型**：开发 / 内容
- **完成内容**：
  - 新增食品科学与工程类草稿简介（5 模块），对齐现有 30 条风格
  - 更新 CURRENT_STATUS.md 至 v0.22.1
  - 记录 slug 数据源不匹配问题（审计模式遗留），暂不修复
- **修改的文件**：
  - `src/data/major-drafts.ts` — 追加食品科学与工程类条目
  - `CURRENT_STATUS.md` — v0.22.0→v0.22.1
  - `AI_WORKLOG.md` — 追加本记录
- **关键决策**：
  - 具体专业（食品科学与工程等 10 个子专业）暂不写内容，分类草稿已够理解方向
  - slug 问题只记录不修复，不影响线上用户
- **遗留问题**：
  - 剩余 55 个专业类无任何内容（草稿或完整）
  - 审计模式 slug 数据源不匹配问题仍未修复
- **下次建议**：
  - 用户朋友完成测试后收集反馈
  - 继续补充高频专业类草稿
- **当前版本状态**：v0.22.1 — 食品科学与工程类草稿上线，构建 116 页面通过

---
### 2026-06-25 09:55 — 维度覆盖修复：life_health_interest + business_sense

- **使用模型**：opencode-go/deepseek-v4-flash
- **任务类型**：开发 / 修复
- **完成内容**：
  - **审计发现**：`life_health_interest` 维度仅38分/7选项，`business_sense` 维度0分/0选项——两类专业被系统性低估
  - **life_health_interest 修复**：固定12题3处（gen_007_c/+6, gen_008_f/+6, gen_017_a/+4）+ B5方向题6处 = 总分84（较改前+121%）
  - **business_sense 修复**：固定12题5处 + B3方向题12处 = 总分80（较改前从0恢复）
  - **食品科学 weight 6→8**：与仪器类同档，非盲目加权重
  - **可选溢出降级**：scoring.ts + report.js 同步修复，≥35分但排不进前4可选的类别降级到低优先区而非静默丢弃
  - 模拟验证：食品科学p01/p2均出现在可选列表，商科画像前5全为商科类
  - 50人批量回归：覆盖率32.3%→35.4%，无新增异常
  - 全维度审计结论：无第三个0分维度，rule_detail(84)属偏弱但非断裂
- **修改的文件**：
  - `src/data/questionBank.ts` — 9处life_health_interest + 17处business_sense scoreEffects
  - `src/data/recommendationWeights.ts` — food-science weight 6→8
  - `src/utils/scoring.ts` — 可选溢出降级逻辑
  - `public/scripts/report.js` — 同步权重+溢出逻辑
  - `CURRENT_STATUS.md` — v0.22.2
  - `AI_WORKLOG.md` — 追加记录
- **关键决策**：
  1. 不降 engineering_practice（削长板不是方案，补短板才是）
  2. 不拉平各维度总分（多层归一化已稀释差异，拉平需要重写大部分题目）
  3. rule_detail 不补（84分与life_health一致，影响类别多有故意惩罚，属优化项非修复项）
- **遗留问题**：
  - rule_detail 84分偏弱但不影响功能
  - 临床医学类×0.65故意惩罚不调整
- **下次建议**：
  - D老师朋友可实地做一次测试验证食品科学推荐效果
  - 考虑为br_med_004做场景化改写
- **当前版本状态**：v0.22.2 — 维度覆盖修复完成，构建116页面通过
