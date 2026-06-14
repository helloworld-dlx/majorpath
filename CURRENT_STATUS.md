# CURRENT_STATUS.md — 当前开发状态

> 用途：记录项目当前所处的版本、已完成和正在进行的工作。
> 维护规则：每次 AI 工作会话结束时更新。

---

## 版本信息

- **当前版本**：v0.21.1（谨慎区重命名 + 4层分级逻辑 + 模拟器29画像 + 报告折叠 + 小众隐藏）
- **更新日期**：2026-06-14 21:15

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
| 专业/方向模糊搜索 | ✅ 已完成 | src/utils/searchIndex.ts + SearchBox.tsx，首页+目录页双入口，前端本地实时搜索（最多返回8条）|

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

暂无。v0.19.7 正常。

---

## v0.21.1 模块变更

| 模块 | 变更 |
|------|------|
| scripts/simulate.ts | 新增 15 个虚拟画像覆盖 business/art/life_health/humanities/social_science（14→29），调整选项噪声 gaussian(0,20)→gaussian(0,8)，500 人模拟覆盖率 33.3%（+2%） |
| public/scripts/report.js | 维度卡片雷达图默认展示，分数条和性格特质折叠在「查看详细数据 ▼」按钮后 |
| public/scripts/report.js | 小众探索未触发时完全隐藏（之前是占位提示框）；门槛从 dimScore≥68→50，interestSignal≥70→50，bucketMatch≥75→60，ns≥45→38 |
| public/scripts/report.js | 下载文本增加各专业类推荐原因（💡）和谨慎区提醒（⚠️） |

## v0.21.0 模块变更

| 模块 | 变更 |
|------|------|
| src/types/result.ts | 新增 `lowPriorityCategories: CategoryRecommendation[]` |
| src/data/recommendationWeights.ts | social_science 画像去具体专业名（"法学、教育、公共管理可能是你的菜"→"社会制度与人际关系类方向值得深入了解"）；`rule_detail_aversion` 去"诊疗规范" |
| src/utils/scoring.ts | 分层逻辑从 3 层改为 4 层：匹配分≥55 且有罚则→cautious（需要重点确认，非劝退），匹配分<55+罚则→optional/lowPriority；recommended≥55/optional≥35 阈值不变 |
| public/scripts/report.js | `TXT.cautiousTitle`→"需要重点确认"；`TXT.cautiousSub` 加解释文案；新增 `cautiousIntrestLabel/ConfirmLabel/NextLabel`；`buildCatCard` 谨慎卡片三区结构（📌你为什么会感兴趣 / ⚠️需要重点确认 / 👉如果还感兴趣） |
| public/scripts/report.js | 同步 4 层分级逻辑；新增 `renderLowPriority` 折叠函数；`renderFullReport` 加入低优先区；`PROFILE_TEMPLATES` 同步去具体专业名；`buildNextSteps` 文案更新 |

## v0.20.2 模块变更

| 模块 | 变更 |
|------|------|
| scripts/simulate.ts | 模拟器改用前端固定 12 题 FIXED_GENERAL_IDS（gen_001/002/019/004/006/007/008/010/014/016/017/020），`generateAnswers` 和 `generateAnswersFromPersona` 统一用固定题替代随机抽 8 道 |
| report.js | 新增 `drawRadarChart()` SVG 雷达图：11 维分数可视化（纯 SVG，零外部依赖） |
| report.js | `renderDimensionProfile` 重构：雷达图 + 分数字条形图（top 8）+ 标签加宽 w-20 + 性格特质合并入卡片底部（带描述文字） |
| report.js | 独立的 `renderPersonalityHints` 删除，内容合并到「性格与能力画像」卡片 |
| report.js | `renderDisciplines` 保持两列卡片格布局，优先门类高亮 + 原因说明 |
| report.js | 标题更新：`TXT.dimensionTitle` →「性格与能力画像」，`TXT.dimensionSub` 加说明文字 |

## v0.20.1 模块变更

| 模块 | 变更 |
|------|------|
| questionBank.ts | gen_002 场景化改写：「负责一件小但完整的事」→「班上组织活动（毕业旅行/主题班会），你更想管哪块？」 |
| questionBank.ts | gen_020 修复：补充上下文「你感兴趣的专业方向」+ 消除 A/C 选项重叠（C 改为「有点动摇，认真想想他说的有没有道理」） |
| questionBank.ts | gen_008 选项 C/E 表述优化：「先找底层关键点」→「先搞清楚最基本的几条规则或原理」；「先感受它给人的体验」→「先亲自体验一下，看看感觉对不对」 |
| questionBank.ts | gen_014 场景化改写：「你对规则和流程的感觉」→「做一件重要的事（比如考试复习或组织活动），你对规则和计划的态度」 |
| questionBank.ts | gen_007 选项 E 表述优化：「你把一种感觉做出来了」→「做了一个东西（画、视频、音乐、手工都行），别人看到后说"我懂你想表达什么"」 |

## v0.20.0 模块变更

| 模块 | 变更 |
|------|------|
| questionBank.ts | 清理 165 个 SubDirection 死代码（scoreEffects 中 18 种 SubDirection target 被评分引擎静默丢弃，已从 scoreEffects 中移除，保留 Question.subDirection 元数据字段） |
| test-flow.js | gen_019（排斥题）替换 gen_003 进入固定 12 题列表，用户可表达负向偏好 |
| adaptiveQuestioning.ts | 同步更新 FIXED_IDS 列表（gen_003 → gen_019） |
| report.js | 新增 collectPersonalityTags + renderPersonalityHints，4 个新标签（exploration_preference / self_improvement_preference / autonomy_preference / feedback_reflection）作为「性格特质」展示在报告页 |
| questionBank.ts | gen_016_B 空 scoreEffects 修复（[] → stable_path(3)） |
| questionBank.ts | gen_010 场景化改写：「你平时更容易被哪种问题勾住？」→「刷手机时，哪种内容最容易让你停下来看？」 |
| questionBank.ts | gen_016 场景化改写：「面对不确定的事情」→「开学前不知道新老师是谁、课程怎么安排」 |
| questionBank.ts | gen_017 场景化改写：「想象以后工作很多年，你最怕哪种状态？」→「如果暑假去做一个月的兼职或实习，你最不想遇到哪种情况？」 |

## v0.19.7 模块变更

| 模块 | 变更 |
|------|------|
| [major].astro | 恢复 `if (majorDetails[key])` 过滤条件，修复页面数 782→116，避免无差别生成所有专业 |

## v0.19.6 模块变更

| 模块 | 变更 |
|------|------|
| 机械设计制造及其自动化 | 用户 Word 内容完整替换 |
| 给排水详情 key | engineering/water-supply → engineering/civil-engineering/water-supply |
| [major].astro | 新建路由页面（三级路由，../../../../ 导入） |
| 构建 | 116 → 782（初版，后回退） |

## v0.19.5 模块变更

| 模块 | 变更 |
|------|------|
| 数学保护 | 低数学（<20）→ STEM ×0.5（有编程/工程信号 ×0.75），<35 → ×0.85 |
| 生命健康保护 | 低 life_health（<20）→ life_health ×0.3 |
| 门类阈值 | 20 → 8 |
| 临床医学惩罚 | ×0.65 乘法惩罚，不轻易进 recommended |
| 口腔医学惩罚 | ×0.70 乘法惩罚 |
| 热门跟风替代惩罚 | 缺乏编程/工程信号时，高强工科不得作为计算机降级后的替代 |
| CS 降级保护 | 有编程兴趣时 penalty 25 → 15 |
| 商科恢复 | 移除 finance/business-admin 热门跟风惩罚，新增 accounting/financial-management/auditing |
| 去重逻辑 | 同一专业类只能属于一个层级（recommended > optional > cautious） |
| 领域感知 fallback | inferPrimaryDomain + getCategoryDomain，推荐为空时从同领域可选项中提升 |
| report.js 同步 | 116 行新增，与 scoring.ts 全部规则对齐 |

---

## 最近更新记录

| 日期 | 更新内容 |
|------|----------|
| 2026-06-14 21:15 | **v0.21.1** 15个新画像（14→29）覆盖business/art短板 + 模拟噪声−60%（±20→±8）+ 维度卡片折叠 + 小众探索未触发隐藏 + 下载报告加推荐原因。npm run build ✅ 116 页面 |
| 2026-06-14 20:20 | **v0.21.0** 谨慎区改名"需要重点确认" + 4层分级（cautious仅限高分+risk）+ 画像模板去具体专业名 + 罚则文案去"诊疗规范" + 谨慎卡片三区结构。npm run build ✅ 116 页面 |
| 2026-06-12 22:55 | **v0.20.2** 模拟器固定12题 + 报告页雷达图SVG + 性格能力合并为一张卡片 + 学科门类恢复两列卡片 + 分数字条标签加宽。200人固定题模拟通过（覆盖率26/96，异常率10%）。npm run build ✅ 116 页面 |
| 2026-06-12 22:05 | **v0.20.1** 第二轮场景化改写：gen_002/007/008/014/020 表述优化。npm run build ✅ 116 页面 |
| 2026-06-12 21:55 | **v0.20.0** 题库评分引擎审计修复：清理 165 个 SubDirection 死代码 + gen_019 排斥题替换 gen_003 进入测试流 + 4 个新标签作为「性格特质」展示在报告 + gen_016_B 空 scoreEffects 修复 + gen_010/016/017 场景化改写。npm run build ✅ 116 页面 |
| 2026-06-11 14:01 | **v0.19.7** 修复页面数暴涨：恢复 majorDetails 过滤条件，782→116 页面 |
| 2026-06-11 11:59 | **v0.19.6** 机械设计内容用户 Word 替换 + 给排水详情 key 修复 + 新建 [major].astro 路由页面（116→782 后回退） |
| 2026-06-09 23:15 | **v0.19.5** 数学/生命健康保护 + 门类阈值 20→8 + 临床医学/口腔医学乘法惩罚 + 热门跟风替代惩罚 + CS 降级保护 + 商科恢复 + 去重逻辑 + 领域感知 fallback + report.js 与 scoring.ts 全规则对齐。100 用户模拟验收：空推荐 0%，overlap 0，趋势冲突 0。npm run build ✅ 115 页面 |
| 2026-06-08 21:41 | **v0.19.4** Header 搜索居中（w-72）+ 四个导航链接移至右侧 + Hero 文案正向化（"来自在读生和毕业生的真实介绍" + "在填报志愿之前，你总得知道专业是干什么的"） + HeaderSearch 组件（client:idle） + Footer 移动端双列 |
| 2026-06-08 19:58 | **v0.19.3** 搜索 UI 增强：匹配词高亮（琥珀色 <mark>）、summary 匹配权重 +5→+2、空状态"换个思路"建议（代码→计算机/软件等） |
| 2026-06-08 19:51 | **v0.19.2** 搜索假阳性修复：状态加分条件化（"电路"搜出哲学→已修复）；MAINTENANCE.md 加入 aliases/keywords 必填规范 |
| 2026-06-08 19:42 | **v0.19.1** 搜索功能代码审查：修复 pl-13→pl-12（无效 Tailwind class）、删除未使用的 tokenMatches()、"热门"→"试试"（诚实标签）、删除冗余 mousedown 监听器。审查 10 项全部通过 ✅ |
| 2026-06-08 16:18 | **v0.19.0** 新增专业/方向模糊搜索功能：SearchBox.tsx + searchIndex.ts，首页+目录页双入口，5个重点专业添加搜索元数据，构建115页面通过 |
| 2026-06-07 14:53 | **v0.18.5** 选科数量限制：3+3最多3项, 3+1+2再选最多2项 |
| 2026-06-07 14:44 | **v0.18.4** 文科branch题过滤：历史轨道过滤所有含stem桶的题（不再区分单桶/交叉） + 3+3选科UI修复（hidden类+display双清） |
| 2026-06-07 14:40 | **v0.18.3** 选科桶惩罚：未选物理→STEM-40, 未选化学→STEM-15, 未选生物→生命健康-20, 未选历史→人文-30。niche入口分52→45 |
| 2026-06-07 14:38 | **v0.18.2** 选科过滤branch题：历史轨道(无物理)过滤纯STEM题，交叉方向保留 |
| 2026-06-07 14:36 | **v0.18.1** 避坑过滤优化：genRiskResults只显示与推荐方向相关的风险 + 文案精确化 + 标签温和化 + niche槽位2→3 + hiOnly优先 + 题库+7冷门STEM题 |
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