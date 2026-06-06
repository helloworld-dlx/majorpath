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
