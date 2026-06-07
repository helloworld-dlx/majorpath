/**
 * 02 经济学 — 学科门类数据
 */

import type { Gate } from '../../types/catalog';

export const economicsGate: Gate = {
      code: '02',
      name: '经济学',
      slug: 'economics',
      icon: '📊',
      status: 'building',
      categoryCount: 4,
      majorCount: 31,
      description: '研究资源分配与社会经济运行规律，文理交叉特征明显',
      categories: [
        {
          code: '0201',
          name: '经济学类',
          slug: 'economics-class',
          status: 'building',
          majorCount: 11,
          description: '经济学是文理交叉的典型学科，需要数学思维也能发挥文科优势',
          majors: [
            { code: '020101', name: '经济学', slug: 'economics', status: 'todo', tags: ['文理兼收'], summary: '研究社会如何分配稀缺资源' },
            { code: '020102', name: '经济统计学', slug: 'economic-statistics', status: 'todo', tags: ['偏理科'], summary: '用数据量化经济规律' },
            { code: '020103T', name: '国民经济管理', slug: 'national-economy', status: 'todo' },
            { code: '020109T', name: '数字经济', slug: 'digital-economy', status: 'todo', tags: ['新专业'] },
          ],
        },
        {
          code: '0202',
          name: '财政学类',
          slug: 'public-finance',
          status: 'building',
          majorCount: 3,
          description: '研究政府怎么收钱和花钱——税收、财政支出和公共预算',
          majors: [
            { code: '020201K', name: '财政学', slug: 'public-finance-major', status: 'todo', tags: ['国控'], summary: '政府收支管理——税收、国债、财政政策的学问' },
            { code: '020202', name: '税收学', slug: 'taxation', status: 'todo', tags: ['务实'], summary: '研究各种税怎么征——企业和个人都要交的税' },
            { code: '020203T', name: '国际税收', slug: 'international-tax', status: 'todo', tags: ['特设', '国际'], summary: '跨国企业的税务处理——苹果谷歌怎么交税的' },
          ],
        },
        {
          code: '0203',
          name: '金融学类',
          slug: 'finance',
          status: 'building',
          majorCount: 11,
          description: '高考最热门的专业类之一——但别以为金融就是华尔街精英',
          majors: [
            { code: '020301K', name: '金融学', slug: 'finance-major', status: 'todo', tags: ['国控', '热门'], summary: '银行、证券、保险——金融体系的核心' },
            { code: '020302', name: '金融工程', slug: 'financial-engineering', status: 'todo', tags: ['偏理'], summary: '用数学模型设计金融产品——量大化的金融' },
            { code: '020303', name: '保险学', slug: 'insurance', status: 'todo', tags: ['行业'], summary: '风险的定价和管理——从车险到寿险的运作' },
            { code: '020304', name: '投资学', slug: 'investment', status: 'todo', tags: ['热门'], summary: '股票、债券、基金怎么投——资产增值的学问' },
            { code: '020305T', name: '金融数学', slug: 'financial-math', status: 'todo', tags: ['偏理', '特设'], summary: '数学原理在金融中的应用——随机过程、衍生品定价' },
            { code: '020306T', name: '信用管理', slug: 'credit-management', status: 'todo', tags: ['特设'], summary: '企业和个人信用评估——是个人都能借钱，但能还吗' },
            { code: '020307T', name: '经济与金融', slug: 'economics-finance', status: 'todo', tags: ['特设'], summary: '经济学理论与金融市场结合——懂经济才能懂金融' },
            { code: '020308T', name: '精算学', slug: 'actuarial-science', status: 'todo', tags: ['特设', '高薪'], summary: '用概率统计计算保费和风险——保险公司最值钱的人' },
            { code: '020309T', name: '金融科技', slug: 'fintech', status: 'todo', tags: ['新兴', '热门', '特设'], summary: '科技+金融——区块链、数字货币、智能投顾' },
            { code: '020310T', name: '互联网金融', slug: 'internet-finance', status: 'todo', tags: ['新兴', '特设'], summary: '支付宝、微信支付背后的金融——线上金融新模式' },
            { code: '020311T', name: '碳金融', slug: 'carbon-finance', status: 'todo', tags: ['前沿', '特设'], summary: '碳交易、绿色金融——让减排也能赚钱' },
          ],
        },
        {
          code: '0204',
          name: '经济与贸易类',
          slug: 'international-trade',
          status: 'building',
          majorCount: 6,
          description: '国际贸易和商务——从进出口到跨国投资，全球化的经济纽带',
          majors: [
            { code: '020401', name: '国际经济与贸易', slug: 'intl-trade', status: 'todo', tags: ['核心'], summary: '进出口贸易理论和实务——国与国之间怎么做生意' },
            { code: '020402', name: '贸易经济', slug: 'trade-economics', status: 'todo', tags: ['基础'], summary: '国内贸易的经济规律——批发、零售、流通的经济学' },
            { code: '020403T', name: '国际经济发展合作', slug: 'intl-dev-cooperation-eco', status: 'todo', tags: ['特设'], summary: '国际援助与开发合作——帮助发展中国家发展' },
            { code: '020404T', name: '国际商务', slug: 'international-business', status: 'todo', tags: ['特设'], summary: '跨国公司的经营管理——在全球化中做生意' },
            { code: '020405T', name: '数字经济', slug: 'digital-economy-major', status: 'todo', tags: ['新兴', '热门', '特设'], summary: '平台经济、数据经济——数字化时代的商业逻辑' },
            { code: '020406T', name: '商务经济学', slug: 'business-economics', status: 'todo', tags: ['特设'], summary: '经济分析在商业决策中的应用——用经济学做商业判断' },
          ],
        },
      ],
    };

export default economicsGate;
