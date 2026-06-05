# TECH_DECISIONS.md — 技术决策记录

> 用途：记录项目技术选型及其原因，避免后续反复争论已决定的问题。
> 维护规则：每次做技术选型决策后追加记录，注明日期和决策人。

---

## 1. 总体架构决策

### 决策 1：采用轻量内容站架构，不做全栈应用

- **日期**：2026-06-04
- **决策**：第一版以静态内容站为主，仅测试和报告模块使用前端交互组件。不做后台、不做 CMS、不做数据库。
- **原因**：
  1. 项目核心价值在内容质量和表达方式，不在复杂技术功能。
  2. 静态站部署成本低、访问速度快、维护简单。
  3. 开发时间窗口紧（雏形版约 6 天），轻量架构可快速上线。
- **后续评估时机**：内容规模明显扩大（如 50+ 专业类有详情页）、共建流程需要审核后台时。

---

## 2. 前端框架：Astro + React 小组件

- **日期**：2026-06-04
- **决策**：前端使用 Astro + React 小组件 + TypeScript + Tailwind CSS。
- **原因**：
  1. 项目本质是内容型网站，后续有大量专业类和专业详情页。
  2. Astro 原生支持 Markdown/MDX 内容管理，便于后期补充专业介绍。
  3. 测试页和报告页可通过 React 组件实现局部交互（Astro island 架构）。
  4. 静态页面产物轻，适合部署到 EdgeOne Pages。
  5. 维护者已有 Astro 建站经验，学习成本低。
- **备选方案**：Vite React（交互更灵活但内容管理不如 Astro）、Next.js（过重）。
- **后续调整时机**：如果测试交互和 AI 功能明显变复杂，再评估是否迁移到完整 React 应用。

---

## 3. 内容管理：本地文件，不做 CMS

- **日期**：2026-06-04
- **决策**：专业目录用结构化数据文件（JSON/YAML/TypeScript），专业详情用 Markdown/MDX，不做 CMS 或数据库。
- **原因**：
  1. 第一版内容量不需要 CMS。
  2. 本地文件版本可控（Git 追踪），便于多人协作和审核。
  3. Markdown 便于共建者提交内容。
- **后续调整时机**：共建人数明显增加、内容审核流程复杂化时。

---

## 4. 部署：EdgeOne Pages

### 决策 4：EdgeOne Pages + Cloudflare Workers 适配器

- **日期**：2026-06-04（初定）/ 2026-06-05（细化）
- **决策**：代码托管在 GitHub，部署到 EdgeOne Pages（中国非大陆节点），使用 `@astrojs/cloudflare` 适配器输出 Cloudflare Workers 兼容的构建产物。绑定英文/拼音域名。
- **原因**：
  1. EdgeOne Pages 中国非大陆节点可免备案，适合面向中国大陆用户的公益内容站。
  2. `@astrojs/cloudflare` 适配器生成标准 Workers 格式，EdgeOne Pages 原生兼容。
  3. 静态页面（`dist/client/`）+ 服务端 API（`dist/server/`）的混合输出天然适合 EdgeOne。
  4. 通过 GitHub 推送即可触发自动部署。
- **构建配置**：
  - 构建命令：`npm run build`
  - 输出目录：`dist`
  - Astro 配置：`output: 'static'` + `adapter: cloudflare()`
  - 静态资源：`dist/client/`（HTML/CSS/JS，112 页面）
  - 服务端函数：`dist/server/`（API 端点 `/api/explain`）
- **环境变量**（EdgeOne Pages 控制台配置）：
  - `DEEPSEEK_API_KEY`：DeepSeek Flash API Key（加密密钥类型，仅服务端）
  - 不设置时 AI 解释功能回退到模板，不影响正常使用
- **域名策略**：英文或拼音风格域名，前台继续使用中文名"专业不迷路"。
- **备选方案**：Vercel、Cloudflare Pages（功能类似，EdgeOne 对国内访问延迟更优）。

---

## 5. AI 使用边界

### 5.1 开发阶段

- **决策**：通过 OpenClaw 协调 MiniMax（快速出页面雏形）和 DeepSeek Pro（逻辑审查和代码把关）。
- **原因**：
  1. MiniMax 适合快速生成页面和组件。
  2. DeepSeek Pro 适合复杂逻辑和架构审查。
  3. 两种模型互补，提高开发效率。

### 5.2 运行阶段

- **决策**：上线后仅有测试报告解释调用 AI，使用 DeepSeek Flash。
- **原因**：
  1. 成本较低，适合公益项目。
  2. 中文表达足够满足报告生成需求。
  3. 报告生成不需要深度推理。
- **AI 红线**：
  - AI 不直接决定推荐方向。
  - AI 不替用户填志愿、不预测录取概率。
  - 专业详情内容不实时调用 AI（提前生成 + 人工审核后静态展示）。
  - 测试报告 AI 仅接收规则系统输出的结果包，不直接接收用户原始答案。

---

## 6. 多模型协作机制

- **日期**：2026-06-04
- **决策**：模型切换不依赖聊天记忆，而依赖项目文档（PROJECT_BRIEF.md、TECH_DECISIONS.md、AI_WORKLOG.md、CURRENT_STATUS.md）和 Git 记录。
- **原因**：
  1. 不同模型之间聊天上下文不互通。
  2. 项目文档是单一事实来源。
  3. 方便后续复盘、重构和排查问题。
- **详细流程**：参见 MODEL_HANDOFF.md。

---

## 7. 数据与隐私策略

- **日期**：2026-06-04
- **决策**：
  - 第一版不做登录注册。
  - 不保存用户个人身份信息（姓名、手机号、身份证、准考证号等）。
  - 测试结果默认只在当前页面展示，关闭后不承诺保存。
  - 内测反馈为自愿匿名提交。
- **原因**：
  1. 降低隐私风险和合规成本。
  2. 项目无需用户画像长期存储。
  3. 公益项目不宜收集敏感信息。

---

## 8. 技术选型总表

| 层面 | 选型 | 备选 |
|------|------|------|
| 前端框架 | Astro + React 小组件 | Vite React, Next.js |
| 样式 | Tailwind CSS | - |
| 语言 | TypeScript | JavaScript |
| 内容管理 | Markdown/MDX + 本地 JSON/YAML | CMS, 数据库 |
| 代码托管 | GitHub | - |
| 部署 | EdgeOne Pages（中国非大陆） | Vercel, Cloudflare Pages |
| AI 开发 | OpenClaw → MiniMax + DeepSeek Pro | - |
| AI 运行 | DeepSeek Flash | - |
| 域名 | 英文/拼音（免备案） | - |
