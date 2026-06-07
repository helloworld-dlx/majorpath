# CATEGORY_WEIGHTS_V0.4_CANDIDATE.md — 推荐权重 v0.4 候选版

> ⚠️ **候选版本**，未覆盖正式上线参数。
> 权重范围压缩至 3-22，新增 7 个非权重字段。
> 生成时间：2026-06-07T02:21:43.603Z

---

## 权重分级

| 等级 | 权重范围 | 含义 |
|:----:|:--------:|------|
| 🔥 高优先 | 16-22 | 大众认知强、路径清晰、适配面广，但仍需匹配兴趣 |
| ✅ 常规 | 10-15 | 兴趣匹配即可推荐 |
| 🧊 小众 | 6-9 | 需要较高匹配度才推荐 |
| ❄️ 专门/限制 | 3-5 | 需明确兴趣、特殊条件或资源支持 |

## 新增非权重字段

| 字段 | 取值 | 含义 |
|------|------|------|
| resourceDependency | low/medium/high | 对院校平台、实验室、行业资源的依赖程度 |
| blindChoiceRisk | low/medium/high | 高中生是否容易因名字/热度/薪资想象误选 |
| requiresSpecialCondition | true/false | 是否需要艺考/体测/政审/体检等特殊招生条件 |
| recommendedOnlyIfHighInterest | true/false | 是否仅在用户兴趣维度很高时才推荐 |
| longCyclePressure | low/medium/high | 学习周期/考试周期/培养周期压力 |
| schoolTierSensitive | true/false | 对学校平台和资源是否特别敏感 |
| commonMisunderstandingRisk | low/medium/high | 高中生是否容易误解该专业 |

---

### 💡 哲学（1 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| philosophy-class | ✅ 哲学类 | 人文 | — → **11** | low | low | — | ⭐ | low | — | low |

### 📊 经济学（4 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| economics-class | 🔥 经济学类 | 商科 | — → **20** | low | medium | — | — | low | — | medium |
| finance | 🔥 金融学类 | 商科 | — → **17** | low | high | — | — | low | 🏫 | high |
| international-trade | 🧊 经济与贸易类 | 商科 | — → **8** | low | high | — | — | low | — | low |
| public-finance | 🧊 财政学类 | 商科 | — → **8** | low | low | — | — | low | — | low |

### ⚖️ 法学（6 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| law-class | 🔥 法学类 | 社科 | — → **20** | low | high | — | — | high | 🏫 | low |
| political-science | 🧊 政治学类 | 社科 | — → **8** | low | medium | — | — | low | — | low |
| sociology | 🧊 社会学类 | 社科 | — → **8** | low | medium | — | — | low | — | medium |
| marxism | 🧊 马克思主义理论类 | 社科 | — → **7** | low | low | — | ⭐ | low | — | low |
| public-security | ❄️ 公安学类 | 社科 | — → **4** | low | low | ⚠️ | — | low | — | low |
| ethnology | ❄️ 民族学类 | 社科 | — → **3** | low | low | — | ⭐ | low | — | low |

### 📚 教育学（2 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| education | 🔥 教育学类 | 社科 | — → **20** | low | low | — | — | medium | — | low |
| physical-education | 🧊 体育学类 | 社科 | — → **7** | low | low | ⚠️ | — | low | — | low |

### ✍️ 文学（3 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| chinese-literature | 🔥 中国语言文学类 | 人文 | — → **19** | low | medium | — | — | low | — | low |
| foreign-languages | ✅ 外国语言文学类 | 人文 | — → **15** | low | low | — | — | low | — | low |
| journalism | ✅ 新闻传播学类 | 人文+社科 | — → **13** | low | high | — | — | low | 🏫 | high |

### 🏛️ 历史学（1 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| history-class | ✅ 历史学类 | 人文 | — → **11** | low | low | — | ⭐ | low | — | low |

### 🔬 理学（12 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| mathematics | 🧊 数学类 | 理工 | — → **9** | medium | low | — | — | low | — | low |
| physics | 🧊 物理学类 | 理工 | — → **7** | medium | low | — | — | low | — | low |
| chemistry | 🧊 化学类 | 理工 | — → **6** | medium | low | — | — | low | — | low |
| biology | ✅ 生物科学类 | 理工+生命健康 | — → **12** | medium | low | — | — | low | — | low |
| statistics | ✅ 统计学类 | 理工+商科 | — → **12** | medium | medium | — | — | low | — | medium |
| psychology | ✅ 心理学类 | 理工+社科 | — → **11** | medium | high | — | — | medium | 🏫 | high |
| geography | 🧊 地理科学类 | 理工 | — → **7** | medium | low | — | — | low | — | low |
| astronomy | ❄️ 天文学类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| atmospheric-science | ❄️ 大气科学类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| ocean-science | ❄️ 海洋科学类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| geophysics | ❄️ 地球物理学类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| geology | ❄️ 地质学类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |

### 🔧 工学（31 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| computer-science | ✅ 计算机类 | 理工 | — → **15** | high | high | — | — | low | 🏫 | high |
| electronic-information | ✅ 电子信息类 | 理工 | — → **14** | high | high | — | — | low | 🏫 | high |
| energy-power | ✅ 能源动力类 | 理工 | — → **11** | medium | medium | — | — | low | — | medium |
| automation | ✅ 自动化类 | 理工 | — → **11** | medium | medium | — | — | low | — | high |
| instrumentation | 🧊 仪器类 | 理工 | — → **8** | medium | low | — | — | low | — | low |
| mechanical | ✅ 机械类 | 理工 | — → **10** | medium | medium | — | — | low | — | high |
| chemical-pharma | 🧊 化工与制药类 | 理工 | — → **7** | medium | low | — | — | low | — | low |
| transportation | 🧊 交通运输类 | 理工 | — → **7** | medium | low | — | — | low | — | low |
| environmental | 🧊 环境科学与工程类 | 理工+生命健康 | — → **7** | medium | medium | — | — | low | — | high |
| bioengineering | 🧊 生物工程类 | 理工+生命健康 | — → **7** | medium | medium | — | — | low | — | high |
| food-science | 🧊 食品科学与工程类 | 理工+生命健康 | — → **6** | medium | medium | — | — | low | — | medium |
| electrical | ✅ 电气类 | 理工 | — → **11** | medium | medium | — | — | low | — | medium |
| water-resources | ❄️ 水利类 | 理工 | — → **5** | medium | low | — | — | low | — | low |
| civil-engineering | 🧊 土木类 | 理工 | — → **7** | medium | medium | — | — | low | — | low |
| materials | 🧊 材料类 | 理工 | — → **7** | medium | medium | — | — | low | — | low |
| architecture | 🧊 建筑类 | 理工+艺术创作 | — → **6** | high | medium | — | — | medium | 🏫 | medium |
| aerospace | ❄️ 航空航天类 | 理工 | — → **5** | high | low | — | — | low | 🏫 | low |
| biomedical-eng | 🧊 生物医学工程类 | 理工+生命健康 | — → **6** | high | low | — | — | low | 🏫 | low |
| mechanics | ❄️ 力学类 | 理工 | — → **4** | medium | low | — | ⭐ | low | — | low |
| surveying | ❄️ 测绘类 | 理工 | — → **4** | medium | low | — | ⭐ | low | — | low |
| safety-eng | ❄️ 安全科学与工程类 | 理工 | — → **4** | medium | low | — | ⭐ | low | — | low |
| geological-eng | ❄️ 地质类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| nuclear | ❄️ 核工程类 | 理工 | — → **3** | high | low | ⚠️ | ⭐ | low | 🏫 | low |
| ocean-engineering | ❄️ 海洋工程类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| agricultural-eng | ❄️ 农业工程类 | 理工 | — → **3** | medium | low | — | ⭐ | low | — | low |
| light-industry | ❄️ 轻工类 | 理工 | — → **3** | medium | low | — | ⭐ | low | — | low |
| public-security-tech | ❄️ 公安技术类 | 理工 | — → **3** | low | low | ⚠️ | — | low | — | low |
| mining | ❄️ 矿业类 | 理工 | — → **3** | high | low | — | ⭐ | low | — | low |
| textile | ❄️ 纺织类 | 理工 | — → **3** | medium | low | — | ⭐ | low | — | low |
| ordnance | ❄️ 兵器类 | 理工 | — → **3** | high | low | ⚠️ | ⭐ | low | 🏫 | low |
| forestry-eng | ❄️ 林业工程类 | 理工 | — → **3** | medium | low | — | ⭐ | low | — | low |

### 🌾 农学（33 专业类）

| slug | 名称 | 命中桶 | 旧权重 → 新权重 | RD | BCR | SC | RH | LCP | STS | CMR |
|------|------|--------|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
| plant-production | ✅ 植物生产类 | 生命健康 | — → **10** | medium | low | — | — | low | — | low |
| environmental-ecology | 🧊 自然保护与环境生态类 | 生命健康+理工 | — → **9** | low | low | — | — | low | — | low |
| veterinary | ✅ 动物医学类 | 生命健康 | — → **14** | medium | low | — | — | medium | — | low |
| animal-production | 🧊 动物生产类 | 生命健康 | — → **9** | medium | low | — | — | low | — | low |
| forestry | ❄️ 林学类 | 生命健康 | — → **5** | medium | low | — | ⭐ | low | — | low |
| aquaculture | ❄️ 水产类 | 生命健康 | — → **3** | medium | low | — | ⭐ | low | — | low |
| grassland-science | ❄️ 草学类 | 生命健康 | — → **3** | medium | low | — | ⭐ | low | — | low |
| clinical-medicine | 🔥 临床医学类 | 生命健康 | — → **20** | high | high | — | — | high | 🏫 | medium |
| pharmacy | ✅ 药学类 | 生命健康 | — → **10** | high | medium | — | — | high | — | medium |
| tcm | ✅ 中医学类 | 生命健康 | — → **11** | medium | medium | — | — | high | — | medium |
| nursing | ✅ 护理学类 | 生命健康 | — → **10** | medium | medium | — | — | medium | — | medium |
| public-health | 🧊 公共卫生与预防医学类 | 生命健康+社科 | — → **9** | medium | low | — | — | low | — | low |
| stomatology | ✅ 口腔医学类 | 生命健康 | — → **14** | high | high | — | — | high | 🏫 | low |
| integrated-medicine | 🧊 中西医结合类 | 生命健康 | — → **7** | medium | low | — | — | high | — | low |
| chinese-pharmacy | 🧊 中药学类 | 生命健康 | — → **7** | medium | low | — | — | high | — | low |
| medical-technology | 🧊 医学技术类 | 生命健康+理工 | — → **8** | medium | low | — | — | medium | — | low |
| basic-medicine | 🧊 基础医学类 | 生命健康 | — → **6** | medium | low | — | ⭐ | high | — | low |
| forensic-medicine | ❄️ 法医学类 | 生命健康 | — → **5** | medium | low | — | ⭐ | medium | — | low |
| business-administration | ✅ 工商管理类 | 商科 | — → **14** | low | high | — | — | low | 🏫 | high |
| public-administration | ✅ 公共管理类 | 商科+社科 | — → **10** | low | high | — | — | low | — | high |
| management-science | 🧊 管理科学与工程类 | 商科+理工 | — → **9** | low | high | — | — | low | — | medium |
| e-commerce | 🧊 电子商务类 | 商科 | — → **9** | low | high | — | — | low | — | high |
| tourism-management | 🧊 旅游管理类 | 商科 | — → **8** | medium | low | — | — | low | — | medium |
| logistics | 🧊 物流管理与工程类 | 商科+理工 | — → **7** | low | low | — | — | low | — | low |
| industrial-engineering | 🧊 工业工程类 | 商科+理工 | — → **7** | low | low | — | — | low | — | low |
| library-science | ❄️ 图书情报与档案管理类 | 商科+社科 | — → **5** | low | low | — | ⭐ | low | — | low |
| agri-economics | ❄️ 农业经济管理类 | 商科 | — → **3** | low | low | — | ⭐ | low | — | low |
| design | ✅ 设计学类 | 艺术创作+理工 | — → **11** | medium | medium | ⚠️ | — | low | — | medium |
| fine-arts | 🧊 美术学类 | 艺术创作 | — → **9** | medium | low | ⚠️ | — | low | — | low |
| drama-film | 🧊 戏剧与影视学类 | 艺术创作 | — → **8** | medium | low | ⚠️ | — | low | — | low |
| music-dance | 🧊 音乐与舞蹈学类 | 艺术创作 | — → **9** | medium | low | ⚠️ | — | low | — | low |
| art-theory | ❄️ 艺术学理论类 | 艺术创作 | — → **4** | low | low | — | ⭐ | low | — | low |
| interdisciplinary-class | 🧊 交叉学科类 | 理工+生命健康 | — → **6** | high | low | — | — | low | 🏫 | low |

---

## 统计

| 指标 | 数值 |
|------|:----:|
| 总专业类数 | 93 |
| 🔥 高优先（16-22） | 6 |
| ✅ 常规（10-15） | 22 |
| 🧊 小众（6-9） | 36 |
| ❄️ 专门/限制（3-5） | 29 |

### 字段分布

| resourceDependency | high: 19 / medium: 46 / low: 28 |
| blindChoiceRisk | high: 13 / medium: 19 / low: 61 |
| requiresSpecialCondition | true: 9 / false: 84 |
| recommendedOnlyIfHighInterest | true: 29 / false: 64 |
| longCyclePressure | high: 8 / medium: 7 / low: 78 |
| schoolTierSensitive | true: 15 / false: 78 |
| commonMisunderstandingRisk | high: 12 / medium: 14 / low: 67 |

---

## 🔄 与 v0.3（当前）的主要差异

1. **权重范围压缩**：1-100 → 3-22，消除极端值（100/60/50 全部降级）
2. **门类单一入口不再暴权**：哲学 100→11、历史 100→11、交叉学科 100→6、教育学 60→20
3. **新增 7 个非权重字段**：让推荐不再仅靠一个数字
4. **热门不再过度放大**：金融 30→17、计算机 15→15（持平）、临床 30→20
5. **冷门不再彻底消失**：最低权重从 1 提升到 3，配合 highInterestOnly 字段，高匹配时仍可出现
6. **门槛标签替代权重压低**：艺术/体育/公安/军工不靠低权重压制，靠 requiresSpecialCondition 等字段自然过滤

## ⚠️ 待人工复核

- 权重 16-22 的高优先级是否合理（目前仅 6 个：中文/临床/经济/教育/金融/法学）
- 资源依赖 high 的判定是否准确
- 盲选风险 high 的判定是否引发不必要的恐慌
- highInterestOnly 标记是否过于严格
