# CURRENT_STATUS.md — 当前开发状态

> 用途：记录项目当前所处的版本、已完成和正在进行的工作。
> 维护规则：每次 AI 工作会话结束时更新。

---

## 版本信息

- **当前版本**：v0.18.0（算法引擎升级至 v0.5：93类权重3-22 + 7非权重字段 + 小众探索层 + 选科硬关卡 + 6桶门类映射补全 + 报告页选科受限模块）
- **更新日期**：2026-06-06 22:15

---

## 整体进度

| 阶段 | 目标日期 | 状态 |
|------|----------|------|
| 雏形版 | 2026-06-10 | ✅ 已完成 |
| 测试版 | 2026-06-15 | 🔄 进行中 |
| 优化版 | 高考出分前 | ⬜ 未开始 |

---

## 模块进度

| 模块 | 状态 | 备注 |
|------|------|------|
| 项目文档初始化 | ✅ 已完成 | 9 份核心文档已创建（共 1116 行） |
| 项目脚手架搭建 | ✅ 已完成 | Astro + React + Tailwind + TypeScript，27 个页面构建成功 |
| 全站布局和视觉风格 | ✅ 已完成 | Layout 重构 + Footer 三栏 + 移动端菜单 + 公益说明 |
| 通用 UI 组件 | ✅ 已完成 | Button / Card / Section 三个组件 |
| 首页 | ✅ 已完成 | Hero + 双入口 Card + 2×2 功能网格 + 公益说明 + 免责 |
| 本科专业目录框架 | ✅ 已完成 | 三级路由 + 13 门类 + 92 专业类骨架 + 建设中状态 |
| 本科专业目录数据结构 | ✅ 已完成 | src/types/catalog.ts + src/data/catalog.ts，13 门类 + 92 专业类 + 40+ 重点专业 |
| 页面接入 catalog 数据源 | ✅ 已完成 | 3 个 majors 页面全部重构为 catalog 数据驱动，111 页面自动生成 |
| StatusBadge 状态徽章组件 | ✅ 已完成 | 三色（绿 completed / 黄 building / 灰 todo），sm/md 尺寸 |
| 学科门类页 | ✅ 已完成 | 13 个门类动态生成，自动纳入交叉学科 |
| 专业类页 | ✅ 已完成 | 92 个专业类全部自动生成，有专业列表 + 状态徽章 + 标签 |
| 专业详情页 | ✅ 已完成 | 统一 11 模块模板 + 计算机类 + 电子信息类 + 集成电路类 + 机械类（4/92，其余待补充） |
| 详情内容模板 | ✅ 已完成 | src/types/major-detail.ts + src/data/major-details.ts + src/components/ui/MajorDetailTemplate.astro |
| 目录实现审计 | ✅ 已完成 | 6 项检查通过，修复 4 处问题（数字诚实度/跨门类引用/手工计数vs自动计数） |
| 方向测试页 | ✅ 已完成 | 纯原生 JS（public/scripts/test-flow.js），零框架，秒加载 |
| 测试报告页 | ✅ 已完成 | 纯原生 JS 引擎，10 模块完整渲染（画像/门类/专业类/避坑/建议/反馈/免责），无 AI API |
| 题库数据结构 | ✅ 已完成 | src/types/test.ts + src/data/questionBank.ts（99 题：20+58+13+8） |
| 题库内容填充 | ✅ 已完成 | 全部达到 ALGORITHM_SPEC v0.3 库存要求 |
| 推荐引擎 | ✅ 已完成 | 纯函数封装 src/lib/recommendationEngine.ts（可复用模拟器&页面） |
| 模拟器 & 调参工具 | ✅ 已完成 | scripts/simulateTests.ts + evolveRecommendationParams.ts，15 虚拟画像，遗传算法 |
| 数学保护规则 | ✅ 已完成 | scoring.ts 新增：低数学（<20）→ STEM 减 60%，<35 减 30% |
| 权重调优 | ✅ 已完成 | 数学类 25→6，电气类 6→10，航空航天 4→14，土木类 5→2，新增仪器 6，能源动力 7 |
| 专业画像扩展 | ✅ 已完成 | majorProfiles.ts 39→61（新增 22 个冷门/细分专业类） |
| oneLiner 风格恢复 | ✅ 已完成 | p 段落 → h1 标题（20-40 字短句） |
| 自适应抽题引擎 | ✅ 已完成 | src/utils/adaptiveQuestioning.ts（9 函数 + AdaptiveConfig + 文科保护） |
| 选科硬关卡 | ✅ 已完成 | 测试页第0步 + SUBJECT_REQUIREMENTS(93类) + checkSubjectEligibility + renderSubjectBlocked |
| 小众探索层 | ✅ 已完成 | computeNicheExplorations + renderNicheExploration（v0.5） |
| 93类权重 v0.4 | ✅ 已完成 | 权重3-22 + 7非权重字段 + CATEGORY_FIELDS |
| 共建入口 | ✅ 已完成 | 三个共建入口（补充内容/纠错/题目优化）+ 隐私声明 + 审核说明 |
| 反馈入口 | ✅ 已完成 | 报告页底部独立隐私声明 + 外部问卷链接跳转 + 问卷链接占位符 |
| AI 报告解释 | ✅ 已完成 | src/pages/api/explain.ts（DeepSeek Flash）+ 服务端安全调用 + 模板回退 + 限流 |
| 关于项目页 | ✅ 已完成 | 公益说明 + 免责声明 + 红线边界 |
| 部署上线 | ✅ 已完成 | EdgeOne Pages 已部署，域名已绑定，DEEPSEEK_API_KEY 已配置，国内访问已验证，线上全流程跑通 |

---

## 已创建的文档（13 份）

| 文件 | 用途 |
|------|------|
| PROJECT_BRIEF.md | 项目定位、目标用户、核心边界、公益属性（3 分钟看懂项目） |
| TECH_DECISIONS.md | 8 项技术选型决策 + 原因 + 备选方案 + 调整时机 |
| CURRENT_STATUS.md | 当前版本 v0.16.1 + 所有模块进度矩阵 |
| TODO.md | 三阶段待办清单（雏形版 6.10 / 测试版 6.15 / 优化版出分前） |
| AI_WORKLOG.md | AI 工作记录模板 + 每次会话的工作日志 |
| CATALOG_STATUS.md | 13 学科门类 + 10 个优先专业类 + 交叉学科专区的内容建设状态追踪 |
| ALGORITHM_SPEC.md | 8 通道 × 11 维度 × 自适应抽题 × 避坑规则 × 参数总表（v0.3 重构为 6 桶体系） |
| MODEL_HANDOFF.md | 模型切换必读清单 + 工作结束检查表 |
| PROMPT_LIBRARY.md | 7 类 Prompt 模板（脚手架/页面/数据结构/算法/内容/报告/协作） |
| MAINTENANCE.md | 日常维护操作流程指南（新建/修改/审核/部署/三级路由） |
| REVIEW_CHECKLIST.md | 专业详情内容审核检查清单 |
| README.md | 项目简介（GitHub 入口） |
| SIMULATOR_USAGE_FOR_AI.md | 模拟器&调参工具 AI 使用指南 |

## 阻塞项

暂无。

---

## 最近更新记录

| 日期 | 更新内容 |
|------|----------|
| 2026-06-07 14:26 | **v0.18.0** 算法引擎升级至 v0.5。报告页完成：93类权重3-22 + 7非权重字段(CATEGORY_FIELDS) + 小众探索引擎(computeNicheExplorations/renderNicheExploration) + 选科硬关卡(SUBJECT_REQUIREMENTS/checkSubjectEligibility/renderSubjectBlocked) + 6桶门类映射补全(gate14/social→07/life→04) + 测试页第0步选科选择(renderSubjectSelection) + dimScore计算 + 方向题最后按钮修复(isLastAdaptive) + 小众入口阈值收紧(weight≤5→≤3) + 局部评分公式修复(baseScore/gateMaxWeight回归) |
| 2026-06-07 10:00 | **v0.17.1** GATE_PRIORITY_CATEGORIES 扩展至 93 专业类全覆盖（48→93，+45）。新增 CATEGORY_WEIGHTS.md 全量权重文档。新增专业类：财政学/民族学/马理论/公安学/天文/地理/大气/海洋/地球物理/地质/心理/力学/仪器/能源动力/水利/测绘/化工制药/地质工程/矿业/纺织/轻工/交通/海洋工程/兵器/核工程/农业工程/林业工程/环境/食品/安全/生物工程/公安技术/林学/水产/草学/基础医学/中医/中西医/中药学/法医/农经/图情档/物流/工业工程/艺术学理论。权重分级：热门≥15(18类) / 常规8-14(40类) / 冷门4-7(22类) / 极冷1-3(13类) |
| 2026-06-07 09:51 | **v0.17.0** 问卷链接互换（补充内容↔纠错）；通用题最后按钮修复（"查看结果"→"下一题"）；理学类权重调整（数学25→10 物理20→8 化学15→6）；ALGORITHM_SPEC.md v0.3.2 新增参数附录（桶→门类权重表 + 门类→专业类权重表 + 避坑惩罚表 + slug中文映射） |
| 2026-06-06 22:15 | **v0.16.7–v0.16.9** 基础科学降权(物理16→13 化学15→12 生物20→14)；维度匹配修复(系数2.5→2 权重0.4→0.6)；热门跟风penalty 30；分支题补abstract_theory×3；test-flow.js参数全同步；避坑文案修正 |
| 2026-06-06 19:44 | **v0.16.5–v0.16.6** 评分公式bug修复(weight归一化)；维度匹配表(DIM_MATCH)首次上线；避坑题 scoreEffects 2→12；evolve调参应用；test-flow参数同步；文案修正 |
| 2026-06-06 14:00 | **v0.16.1–v0.16.4** 推荐引擎修复：低数学STEM保护；权重调优6处(数学25→6 电气6→10 航空4→14 土木5→2 新增仪器6能源动力7)；专业画像39→61；模拟器/调参工具全套上线；oneLiner风格修复；权重表全覆盖93/93；备份 v0.16.4 |
| 2026-06-06 12:57 | **v0.16.0** 模拟器&调参工具：scripts/simulateTests.ts + evolveRecommendationParams.ts，15 虚拟画像库，遗传算法 12 参数空间；SIMULATOR_USAGE_FOR_AI.md；package.json 脚本更新；tsx 依赖 |
| 2026-06-06 11:30 | **v0.15.0** 线上全流程验证通过。土木类打开（9专业+给排水已有人共建）、能源动力类打开（6专业）。 |
| 2026-06-06 11:20 | **v0.14.4** oneLiner 风格回退：p 段落→h1 标题；集成电路/机械 oneLiner 精简；部署标记完成 |
| 2026-06-05 18:25 | 报告空白修复（el() 数组子节点）+ 选项随机逻辑修正（label 固定/内容随机）+ 上一题功能 + 题库表达优化（11 题干/15 选项去学科标签），npm run build ✅ + Git推送 ✅ |
| 2026-06-05 11:40 | 4 个占位符问卷链接全部替换为真实问卷星链接（报告页匿名反馈 + 共建页补充内容/纠错/题目优化）。npm run build ✅ 通过 |
| 2026-06-05 07:42 | 匿名反馈入口完成：报告页底部独立隐私声明 + 外部匿名问卷跳转（占位链接待替换）+ 绿色隐私提示框。共建页重构为三类共建入口（补充内容/纠错/题目优化），各含飞书表单链接 + 隐私声明 + 审核说明，npm run build ✅ 通过（112 页面） |
| 2026-06-04 23:11 | 详情页新增视频模块 + 贡献人模块。npm run build ✅ 通过 |
| 2026-06-04 22:35 | 规则推荐引擎完成：维度→桶→门类→专业类→避坑→置信度→输出，npm run build ✅ 通过（112 页面） |
| 2026-06-04 22:28 | 测试页面 UI 完成：React 两阶段交互 + 报告页占位，npm run build ✅ 通过（112 页面） |
| 2026-06-04 22:23 | 自适应抽题引擎完成 + cross_check 扩充至 13 题（题库 87→99）。npm run build ✅ 通过 |
| 2026-06-04 22:16 | 题库全面扩充至 87 题：通用 20 + 方向 58（B1-B6 各 8-12）+ 校验 1 + 避坑 8。npm run build ✅ 通过 |
| 2026-06-04 22:05 | 题库数据结构设计完成：src/types/test.ts（11 类型 + 2 辅助）+ src/data/questionBank.ts。npm run build ✅ 通过 |
| 2026-06-04 22:00 | ALGORITHM_SPEC.md 重构为 v0.3：6 桶粗筛 + 相邻桶校验 + 文科保护硬规则 + 三层推荐输出 + 三大避坑类别。npm run build ✅ 通过 |
| 2026-06-04 21:54 | 电子信息类详情内容完成（11 模块 draft），npm run build ✅ 通过（111 页面）。当前 2/92 有完整详情 |
| 2026-06-04 21:50 | 目录页面实现审计：6 项检查通过，修复首页/门类/专业类页数字诚实度（官方总数 vs 本站收录），RelatedMajorDiff 支持跨门类引用。npm run build ✅ 通过（111 页面） |
| 2026-06-04 21:43 | 专业详情内容模板设计完成：11 模块 schema + MajorDetailTemplate 组件 + 计算机类完整示例。npm run build ✅ 通过（111 页面） |
| 2026-06-04 21:36 | 页面全面重构：3 个 majors 页面接入 catalog 数据源，新增 StatusBadge 组件，npm run build ✅ 通过（111 页面）。交叉学科自动纳入全部路由 |
| 2026-06-04 21:30 | 专业目录数据结构设计完成：13 门类 + 92 专业类骨架 + 40+ 重点专业数据。修正 12→13 门类（新增交叉学科），npm run build ✅ 通过 |
| 2026-06-04 21:21 | 全站文本「说人话」→「说大白话」替换完成（7 处），npm run build ✅ 通过 |
| 2026-06-04 21:18 | 确认全站布局优化（21:14）文档已更新：版本 v0.1.1，npm run build ✅ 通过（27 页面）。TODO.md 和 CURRENT_STATUS.md 同步 |
| 2026-06-04 21:14 | 全站布局和视觉风格优化完成：Layout 重构 + Footer 三栏 + 移动端菜单 + 新建 Button/Card/Section 组件 + 首页优化 + 公益说明 |
| 2026-06-04 21:10 | 更新 TODO.md：从第一阶段勾除已完成事项 |
| 2026-06-04 21:01 | 项目脚手架搭建完成：27 个页面构建成功，可运行 npm run dev 和 npm run build |
| 2026-06-04 20:45 | 项目文档初始化完成：9 份核心文档全部创建完毕（共 1116 行） |
| 2026-06-04 20:40 | 初始化项目文档，创建 PROJECT_BRIEF / TECH_DECISIONS / CURRENT_STATUS / TODO / AI_WORKLOG / CATALOG_STATUS / ALGORITHM_SPEC / MODEL_HANDOFF / PROMPT_LIBRARY |