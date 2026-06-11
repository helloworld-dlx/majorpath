# 第一阶段通用题库 — 加分逻辑评审报告 v1.1

> 项目定位：公益专业认知网站，不做心理诊断，不替用户填志愿
> 审计范围：12道固定第一阶段通用题（gen_001 ~ gen_020）
> 审计焦点：加分逻辑是否合理、是否过度、是否存在语法错误

---

## 一、当前加分逻辑总览

### 1.1 六大类（Bucket）得分极大值分布

| 大类 | 单题极大值 | 出现位置 | 评估 |
|------|-----------|---------|------|
| humanities | +12 | gen_001_A | ✅ 合理（人文/社科方向最高分12） |
| social_science | +10 | gen_001_B, gen_002_B, gen_003_B | ✅ 合理 |
| business | +10 | gen_002_C | ⚠️ 偏高但可接受（数据/商业分析核心选项） |
| stem | +12 | gen_001_C | ⚠️ 稍高，建议降至+10 |
| life_health | +12 | gen_001_E | ⚠️ 稍高，建议降至+10 |
| art_creative | +12 | gen_001_D | ⚠️ 稍高，建议降至+10 |

**发现：** gen_001 每个选项都给了+12的极大值，过于集中在第一题。

### 1.2 同一选项多标签过度问题

| 题目 | 选项 | 当前标签数 | 标签 | 评估 |
|------|------|-----------|------|------|
| gen_002 | C | 4 | business(10), math_logic(8), business_sense(6), stem(4) | ⚠️ 4个标签过多，建议精简 |
| gen_004 | D | 4 | business(6), rule_detail(8), business_sense(6), life_health(4) | ⚠️ 4个标签，business出现两次（business+business_sense） |
| gen_017 | C | 4 | business(8), stable_path(8), business_sense(6), social_science(4) | ⚠️ 4个标签，business+business_sense重复 |

---

## 二、逐题加分审核

### gen_001

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(12), reading_expression(8) | **通过**，分配合理 |
| B | social_science(10), interpersonal(8), business(4) | **通过**，但business(4)建议移除或降为2 |
| C | stem(12), engineering_practice(8), info_systems(4) | **偏高**，stem(12→8)，去掉info_systems(4)跨度过大的加分 |
| D | art_creative(12), aesthetic_creation(8) | **偏高**，art_creative(12→8) |
| E | life_health(12), life_health_interest(8) | **偏高**，life_health(12→8) |

### gen_002

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(10), reading_expression(8), social_science(4) | **通过** |
| B | social_science(10), business(8), interpersonal(6) | **偏高**，business(8→6) "组织活动"不一定=商科 |
| C | business(10), math_logic(8), business_sense(6), stem(4) | **标签过多(4个)**。去掉stem(4)。business(10→8) |
| D | stem(10), engineering_practice(8), info_systems(6) | **偏高**，stem(10→8) |
| E | life_health(10), interpersonal(6), social_science(4) | **偏高**，life_health(10→8) |
| F | art_creative(10), aesthetic_creation(8) | **通过** |

### gen_003

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(10), reading_expression(6), abstract_theory(4) | **通过** |
| B | social_science(10), interpersonal(8), business(4) | **通过** |
| C | stem(10), engineering_practice(8) | **偏高**，stem(10→8) |
| D | art_creative(10), aesthetic_creation(8) | **通过** |

### gen_004

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(8), abstract_theory(6), stem(4) | ⚠️ **问题：** "提出想法/框架"不一定=humanities(8)。建议humanities(8→6) |
| B | social_science(8), interpersonal(8), business(6) | **偏高**，business(6→4) |
| C | stem(8), engineering_practice(8) | **通过** |
| D | business(6), rule_detail(8), business_sense(6), life_health(4) | **标签过多(4个)**。建议去掉life_health(4)，business_sense降为4 |

### gen_006

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(8), social_science(6), reading_expression(8) | **通过**，但social_science(6)略高，建议4 |
| B | social_science(8), business(6), interpersonal(8) | **偏高**，business(6→4) |
| C | stem(8), math_logic(8) | **通过** |
| D | stem(8), engineering_practice(8) | **通过** |
| E | life_health(6), social_science(4), art_creative(4) | **通过** |

### gen_007

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(10), social_science(6), reading_expression(6) | **通过** |
| B | stem(10), math_logic(10) | ⚠️ **偏高**。stem(10→8)，math_logic(10→8) |
| C | life_health(8), stem(6), science_basic(6) | **通过** |
| D | social_science(6), business(6), life_health(4) | **通过** |
| E | art_creative(10), aesthetic_creation(8) | **通过** |

### gen_008

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(8), abstract_theory(6), history_philosophy(4) | **偏高**，humanities(8→6) |
| B | social_science(8), business(6), rule_detail(6) | **偏高**，business(6→4) |
| C | stem(8), math_logic(8), science_basic(4) | **通过** |
| D | stem(8), engineering_practice(8) | **偏高**，engineering_practice(8→6)（纯"边做边学"不应拿到动手实验最高分） |
| E | art_creative(8), life_health(6) | **通过** |
| F | life_health(8), social_science(6) | **通过** |

### gen_010

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | humanities(8), abstract_theory(6) | **通过** |
| B | social_science(8), business(6), interpersonal(6) | **偏高**，business(6→4) |
| C | stem(8), engineering_practice(6), info_systems(4) | **通过** |
| D | business(8), math_logic(6) | **通过** |
| E | art_creative(8), aesthetic_creation(6) | **通过** |
| F | life_health(8), life_health_interest(6) | **通过** |

### gen_014

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | social_science(8), business(6), rule_detail(8) | **偏高**，social_science(8→6)，business(6→4) |
| B | humanities(6), art_creative(8), rule_detail(+-6) | ❌ **语法错误：** `rule_detail(+-6)` 应改为 `rule_detail(-6)`。art_creative(8→6) |
| C | stem(4), business(4) | **通过**。建议增加social_science(4)扩大覆盖面 |

### gen_016

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | business(6), rule_detail(6), stable_path(6) | ❌ **问题：** "喜欢知道会发生什么"≠business(6)。建议改为stable_path(6), rule_detail(4)，去掉business |
| B | stem(4), social_science(4), business(4) | ⚠️ **问题：** 中性选项不应给大类加分。建议改为不加分 |
| C | humanities(6), art_creative(6) | ❌ **问题：** "高不确定性接受=人文/艺术"逻辑不成立。建议去掉大类加分 |

### gen_017

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | social_science(8), life_health(8), humanities(4) | **偏高**，social_science(8→6)，life_health(8→6) |
| B | stem(8), business(4), humanities(4) | ❌ **问题：** "有成长"≠stem(8)。应去掉大类加分或降至2 |
| C | business(8), stable_path(8), business_sense(6), social_science(4) | **标签过多(4)**，"有稳定"应适当反映但不该给高分。stable_path(8→6)，business(8→6) |
| D | art_creative(10), stem(4), aesthetic_creation(6) | **偏高**，art_creative(10→8) |
| E | business(6), stem(6), humanities(4) | ❌ **问题：** "自己有掌控"≠business(6)+stem(6)。建议去掉大类加分 |

### gen_020

| 选项 | 原加分 | 审核结果 |
|------|--------|----------|
| A | stable_path(12) | ❌ **问题：** stable_path(12)过高，且"认真想想"是理性反应，不应=稳定路径。建议移至 `feedback_reflection` 标签 |
| B | humanities(4), art_creative(4) | **通过**。适度合理 |
| C | stem(4), business(4) | **通过**。适度合理 |
| D | social_science(4), stable_path(12) | ❌ **问题：** stable_path(12)过高，"调整方向"可能是务实或社会导向，不应=稳定路径 |

---

## 三、系统性问题总结

### 3.1 stable_path（稳定路径）被滥用

**当前使用位置：**
| 题目 | 加分 | 评估 |
|------|------|------|
| gen_016_A | stable_path(6) | ✅ 合理——低不确定性接受确实关联稳定偏好 |
| gen_017_C | stable_path(8) | ⚠️ 略高，但合理——"有稳定"是稳定路径的核心表达 |
| gen_020_A | stable_path(12) | ❌ 不合理——"被说不适合后认真想想"是理性反应，不应等同于稳定路径 |
| gen_020_D | stable_path(12) | ❌ 不合理——"如果很多人都说就调整"可能是社会顺从或务实，不应等同于稳定路径 |

**建议修正：**
- gen_020 完全移出 stable_path 计分，移入新建的 `feedback_reflection` 标签

### 3.2 business（商科）辅助分过于频繁

business 在以下辅助位出现，实则与商科无必然关联：
| 题目 | 选项 | 当前 | 建议 |
|------|------|------|------|
| gen_001_B | "聊天/帮人解决问题" | business(4) | 移除 |
| gen_002_B | "组织活动" | business(8→6) | 降分 |
| gen_004_B | "协调者" | business(6→4) | 降分 |
| gen_006_B | "讨论交流" | business(6→4) | 降分 |
| gen_007_D | "真实世界运作" | business(6→4) | 降分 |
| gen_008_B | "看规则怎么运行" | business(6→4) | 降分 |
| gen_010_B | "人和组织行为" | business(6→4) | 降分 |
| gen_014_A | "规则清晰" | business(6→4) | 降分 |

### 3.3 负分语法问题

| 位置 | 当前写法 | 问题 | 建议 |
|------|---------|------|------|
| gen_014_B | rule_detail(+-6) | ❌ 不合法的语法格式 | 改为 `rule_detail(-6)` |

### 3.4 gen_016/gen_020 的专业大类映射缺乏依据

这两道题在当前12题中**贡献了约20%的得分权重**，但它们的理论基础最薄弱：
- gen_016：不确定性接受度 → 人文/艺术（无依据）
- gen_020：面对负面反馈的态度 → 稳定路径（无依据）

**建议：在后续版本中将这两题移出大一统计分模型，改为性格/风险提示维度。**

---

## 四、加分调整建议总表

以下为推荐修改后的总加分方案（适用于 `questionBank.ts` 的候选版本）：

### gen_001

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(8), reading_expression(6) | humanities(12→8) |
| B | social_science(8), interpersonal(6) | 移除 business(4) |
| C | stem(8), engineering_practice(6) | stem(12→8)，移除 info_systems(4) |
| D | art_creative(8), aesthetic_creation(6) | art_creative(12→8) |
| E | life_health(8), life_health_interest(6) | life_health(12→8) |

### gen_002

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(8), reading_expression(6), social_science(4) | 不变 |
| B | social_science(8), interpersonal(6), business(4) | business(8→4) |
| C | business(8), math_logic(8), business_sense(6) | 移除 stem(4) |
| D | stem(8), engineering_practice(6), info_systems(4) | stem(10→8) |
| E | life_health(8), interpersonal(6) | life_health(10→8), 移除 social_science(4) |
| F | art_creative(8), aesthetic_creation(6) | art_creative(10→8) |

### gen_003

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(8), reading_expression(6) | humanities(10→8) |
| B | social_science(8), interpersonal(6), business(4) | 不变 |
| C | stem(8), engineering_practice(6) | stem(10→8) |
| D | art_creative(8), aesthetic_creation(6) | art_creative(10→8) |

### gen_004

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(6), abstract_theory(6), stem(4) | humanities(8→6) |
| B | social_science(6), interpersonal(6), business(4) | social_science(8→6), business(6→4) |
| C | stem(6), engineering_practice(6) | stem(8→6) |
| D | rule_detail(8), business(6), life_health(4) | 移除 business_sense(6)，保留life_health |

### gen_006

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(6), reading_expression(6), social_science(4) | humanities(8→6), social_science(6→4) |
| B | social_science(6), interpersonal(6), business(4) | social_science(8→6), business(6→4) |
| C | stem(6), math_logic(6) | stem(8→6) |
| D | stem(6), engineering_practice(6) | stem(8→6) |
| E | life_health(6), social_science(4), art_creative(4) | 不变 |

### gen_007

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(8), reading_expression(6), social_science(4) | 不变 |
| B | stem(8), math_logic(8) | 不变 |
| C | life_health(6), stem(4), science_basic(4) | life_health(8→6), stem(6→4) |
| D | social_science(6), business(4), life_health(4) | business(6→4) |
| E | art_creative(8), aesthetic_creation(6) | art_creative(10→8) |

### gen_008

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(6), abstract_theory(6) | humanities(8→6)，移除 history_philosophy(4) |
| B | social_science(6), rule_detail(6), business(4) | social_science(8→6), business(6→4) |
| C | stem(6), math_logic(6), science_basic(4) | stem(8→6) |
| D | stem(6), engineering_practice(6) | stem(8→6), engineering_practice(8→6) |
| E | art_creative(6), life_health(4) | art_creative(8→6), life_health(6→4) |
| F | life_health(6), social_science(6) | life_health(8→6) |

### gen_010

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | humanities(6), abstract_theory(6) | 相同（人文从8→6在候选版中） |
| B | social_science(6), interpersonal(4), business(4) | social_science(8→6), business(6→4), interpersonal(6→4) |
| C | stem(6), math_logic(6), info_systems(4) | 不变 |
| D | business(6), math_logic(6) | 不变 |
| E | art_creative(6), aesthetic_creation(6) | 不变 |
| F | life_health(6), life_health_interest(4) | life_health(8→6) |

### gen_014

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | rule_detail(8), social_science(6), business(4) | social_science(8→6) |
| B | rule_detail(-6), art_creative(6), humanities(4) | **修复语法**：`rule_detail(+-6)` → `rule_detail(-6)`，art_creative(8→6) |
| C | stem(4), business(4), social_science(4) | 增加 social_science(4) |

### gen_016

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | stable_path(6), rule_detail(4) | 移除 business(6)，rule_detail(6→4) |
| B | （不加分） | 移除所有大类加分 |
| C | exploration_preference(6) | 移除 humanities(6) 和 art_creative(6) |

### gen_017

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | social_science(6), life_health(6) | 移除 humanities(4)，social_science(8→6)，life_health(8→6) |
| B | self_improvement_preference(6) | 移除 stem(8)、business(4)、humanities(4) |
| C | stable_path(6), business(6), rule_detail(4) | stable_path(8→6), business(8→6), 移除 business_sense(6) |
| D | art_creative(8), aesthetic_creation(6), stem(4) | art_creative(10→8) |
| E | autonomy_preference(6) | 移除 business(6)、stem(6)、humanities(4) |

### gen_020

| 选项 | 修改后加分 | 变化 |
|------|-----------|------|
| A | feedback_reflection(6) | 移除 stable_path(12) |
| B | art_creative(4), humanities(4) | 不变 |
| C | stem(4), business(4) | 不变 |
| D | social_science(4) | 移除 stable_path(12) |

---

## 五、总体加分趋势

### 修改前总分（满分参考）
| 大类 | 总分 |
|------|------|
| humanities | ~80 |
| social_science | ~94 |
| business | ~88 |
| stem | ~104 |
| life_health | ~66 |
| art_creative | ~72 |
| stable_path | ~32 |

### 修改后总分（估算）
| 大类 | 总分 | 变化 |
|------|------|------|
| humanities | ~60 | ↓（部分题从10降为6~8） |
| social_science | ~72 | ↓（部分社科普加分降低） |
| business | ~68 | ↓（中性选项不再吃商科辅助分） |
| stem | ~74 | ↓（从12分普遍降为8分） |
| life_health | ~48 | ↓（从12分降为8分） |
| art_creative | ~62 | ↓（从12分降为8分） |

> ⚠️ 注意：修改后总分差异主要靠第二阶段（30%）补回，不会影响最终推荐质量。第一阶段更多是"初筛"而非"定方向"。

---

## 六、推荐实施顺序

| 优先级 | 修改项 | 改动量 | 风险 |
|:---:|--------|:-----:|:----:|
| 📌 P0 | gen_014_B: rule_detail(+-6) → rule_detail(-6) | 1个字符 | 🔴 语法错误 |
| 📌 P0 | gen_016_C: 移除 humanities(6)和art_creative(6) | 删除2个 | 🟡 权重下降 |
| 📌 P0 | gen_020: 移除 stable_path(12)×2 | 删除2个 | 🟡 权重下降 |
| 📌 P1 | gen_001/stem/life_health/art_creative 从12降为8~10 | 每处1~2分 | 🟡 需测试 |
| 📌 P1 | 所有 business 辅助分从8/6降为4 | 大约8处 | 🟢 稳妥 |
| 📌 P2 | gen_017_B/E 移出大类加分，改用新标签 | 较大 | 🟡 需新增标签支持 |
| 📌 P3 | gen_016/020 移入性格维度 | 较大 | 🔴 需重构推荐算法 |
