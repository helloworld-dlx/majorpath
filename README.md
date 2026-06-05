# 专业不迷路（MajorNav）

用说大白话的方式，帮高中生看懂大学专业、找到方向。

---

## 项目简介

**专业不迷路**是一个公益型专业认知小站，帮助高中生从 800+ 个本科专业中缩小范围，建立对专业学习内容的真实认知。

- ✅ 专业目录浏览：13 个学科门类 → 92 个专业类 → 具体专业详情
- ✅ 方向小测试：8 道通用题 + 自适应抽题 → 三层推荐报告
- ✅ AI 报告解释：DeepSeek Flash 把推荐结果翻译成大白话
- ✅ 避坑提醒：温和提示可能的误解和不适合的情况

> ⚠️ 本网站不提供院校推荐、分数位次分析、录取概率预测和志愿填报建议。

---

## 技术栈

| 层面 | 选型 |
|------|------|
| 框架 | [Astro](https://astro.build) 6.x + React 小组件 |
| 样式 | Tailwind CSS 4 |
| 语言 | TypeScript |
| 部署 | EdgeOne Pages（中国非大陆） |
| 服务端 | Cloudflare Workers（`@astrojs/cloudflare` 适配器） |
| AI | DeepSeek Flash（报告解释，可选） |

---

## 本地运行

### 环境要求

- Node.js ≥ 22.12.0
- npm ≥ 10

### 快速开始

```bash
# 1. 克隆仓库
git clone <repo-url> majornav
cd majornav

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# → 浏览器访问 http://localhost:4321
```

### AI 报告解释（可选）

报告解释功能依赖 DeepSeek Flash API。不配置也能正常使用（自动回退到模板解释）。

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env，填入你的 API Key
# DEEPSEEK_API_KEY=sk-xxx…xxxx
```

> API Key 仅存在于服务端环境变量中，**永远不会暴露到前端代码**。

---

## 构建与部署

### 构建

```bash
npm run build
# → 输出到 dist/ 目录
#   dist/client/  → 静态资源（HTML/CSS/JS）
#   dist/server/  → Cloudflare Worker（API 端点）
```

### 部署到 EdgeOne Pages

1. 将代码推送到 GitHub 仓库。
2. 在 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages) 中导入该项目。
3. 配置构建参数：
   - **构建命令**：`npm run build`
   - **输出目录**：`dist`
   - **框架**：Astro（自动检测）
4. **（如需 AI 解释功能）** 在 EdgeOne Pages 控制台添加环境变量：
   - 变量名：`DEEPSEEK_API_KEY`
   - 变量值：你的 DeepSeek API Key
   - ⚠️ 设为「加密/密钥」类型，不要明文写在配置文件中
5. 触发部署。

> EdgeOne Pages 兼容 Cloudflare Workers 运行时，`@astrojs/cloudflare` 适配器生成的 Worker 可直接运行。

### 本地预览生产构建

```bash
npm run build
npm run preview
# → 浏览器访问 http://localhost:4321（含 API 端点）
```

---

## 项目结构

```
majornav/
├── public/
│   └── scripts/
│       ├── test-flow.js    # 测试引擎（纯原生 JS，零框架）
│       └── report.js       # 报告引擎（含 AI 解释调用）
├── src/
│   ├── components/          # 通用 UI 组件
│   ├── data/                # 题库、专业目录、推荐权重
│   ├── layouts/             # 页面布局
│   ├── pages/
│   │   ├── api/
│   │   │   └── explain.ts   # DeepSeek Flash API 端点
│   │   ├── index.astro      # 首页
│   │   ├── test.astro       # 测试页
│   │   ├── report.astro     # 报告页
│   │   ├── about.astro      # 关于项目
│   │   ├── contribute.astro # 共建入口
│   │   └── majors/          # 专业目录（三级路由）
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 评分引擎、抽题引擎
├── astro.config.mjs         # Astro 配置
├── package.json
├── tsconfig.json
├── .env.example             # 环境变量模板（不要提交 .env）
└── README.md
```

### 关键数据文件

| 文件 | 内容 |
|------|------|
| `src/data/questionBank.ts` | 99 道测试题（通用 20 + 方向 58 + 校验 13 + 避坑 8） |
| `src/data/catalog.ts` | 13 门类、92 专业类、40+ 重点专业数据 |
| `src/data/recommendationWeights.ts` | 桶→门类→专业类权重映射 + 避坑规则 |
| `src/types/result.ts` | 推荐结果类型定义 |
| `src/types/test.ts` | 题库类型定义 |

---

## 核心文档

| 文档 | 用途 |
|------|------|
| `PROJECT_BRIEF.md` | 项目定位、目标用户、核心边界 |
| `TECH_DECISIONS.md` | 技术选型与决策记录 |
| `CURRENT_STATUS.md` | 当前开发状态与模块进度 |
| `ALGORITHM_SPEC.md` | 测试推荐算法规格说明 |
| `TODO.md` | 待办清单 |

---

## 公益声明

- 核心功能永久免费，不设会员门槛。
- 不通过焦虑营销或信息差盈利。
- 不提供院校推荐、分数位次分析和录取概率预测。
- 运营成本通过自愿捐赠、透明成本说明、共建合作等方式覆盖。

---

## License

MIT
