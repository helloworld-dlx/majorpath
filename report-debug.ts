import fs from "fs";
const results = JSON.parse(fs.readFileSync("simulation-results/results.json","utf-8"));

console.log("=".repeat(72));
console.log("🧪 专业推荐测试模拟 · 详细报告");
console.log("   100 用户 | 种子 4023");
console.log("=".repeat(72));

// 1. 全局排名
console.log("\n## 1. 全局推荐排名");
const g: Record<string,number> = {};
for (const u of results) for (const c of u.recommendedCategories) g[c]=(g[c]??0)+1;
const gRank = Object.entries(g).sort((a,b)=>b[1]-a[1]);
gRank.forEach(([n,c],i) => console.log(`  ${String(i+1).padStart(2)}  ${n.padEnd(28)} ${String(c).padStart(3)}  ${Math.round(c/results.length*100)}%`));

// 2. 谨慎排名
console.log("\n## 2. 谨慎了解 TOP 10");
const cau: Record<string,number> = {};
for (const u of results) for (const c of u.cautiousCategories) cau[c]=(cau[c]??0)+1;
Object.entries(cau).sort((a,b)=>b[1]-a[1]).slice(0,10).forEach(([n,c]) => console.log(`  ${n.padEnd(28)} ${String(c).padStart(3)}  ${Math.round(c/results.length*100)}%`));

// 3. 按画像分组
console.log("\n## 3. 按用户画像分组");
const profiles = [
  "数学好·喜欢电路","力学一般·对电学和电子产品感兴趣","不喜欢编程·偏稳定和规则",
  "喜欢动手实验·不喜欢纯理论","喜欢沟通表达·不喜欢数学","热门跟风·想选计算机",
  "喜欢机械结构·工程实践","对医学/生命科学感兴趣","对商业·管理·财务感兴趣",
  "无明显兴趣·重视就业","数学弱·抗压弱·希望轻松","数学强·愿长期自学·愿读研",
  "喜欢写作·表达·阅读","喜欢设计·审美·创作","各方面都比较中立"
];
const labels: Record<string,string> = {
  math_logic:"数学",reading_expression:"读写",interpersonal:"沟通",
  business_sense:"商业",engineering_practice:"动手",info_systems:"信息",
  life_health_interest:"生命",aesthetic_creation:"审美",abstract_theory:"抽象",
  stable_path:"稳定",rule_detail:"规则"
};

for (const pn of profiles) {
  const users = results.filter(u => u.profileName === pn);
  const n = users.length;
  const recs: Record<string,number> = {};
  for (const u of users) for (const c of u.recommendedCategories) recs[c]=(recs[c]??0)+1;
  const top = Object.entries(recs).sort((a,b)=>b[1]-a[1]).slice(0,4);
  
  // 维度特征
  const dimAvg: Record<string,number> = {};
  for (const u of users) for (const [k,v] of Object.entries(u.dimensionScores)) dimAvg[k]=(dimAvg[k]??0)+(v as number);
  for (const k of Object.keys(dimAvg)) dimAvg[k] = Math.round(dimAvg[k]/n);
  const topDims = Object.entries(dimAvg).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>=5).slice(0,3);
  const dimStr = topDims.map(([k,v]) => `${labels[k]??k}+${v}`).join(" ");
  
  console.log(`\n👤 ${pn}`);
  console.log(`   维度: ${dimStr || "(均衡)"}`);
  console.log(`   推荐: ${top.map(([n,c]) => `${n} ${Math.round(c/n*100)}%`).join("  ")}`);
}

// 4. 异常
console.log("\n## 4. 异常统计");
let totalAnomalies = 0;
for (const u of results) totalAnomalies += u.anomalies.length;
console.log(`  总异常数: ${totalAnomalies}`);

const contradictionUsers = results.filter(u => {
  const stemRec = u.recommendedCategories.some(c => 
    ["计算机类","电子信息类","自动化类","机械类","电气类","土木类"].includes(c));
  return stemRec && (u.dimensionScores["math_logic"] ?? 0) < 15;
});
console.log(`  低数学→STEM矛盾: ${contradictionUsers.length}/${results.length} (${Math.round(contradictionUsers.length/results.length*100)}%)`);
const top5 = gRank.slice(0,5);
const spread = top5.length >= 5 ? Math.round(top5[0][1]/results.length*100) - Math.round(top5[4][1]/results.length*100) : 0;
console.log(`  分布跨度(TOP1-TOP5): ${spread}pp`);
console.log(`  被推荐专业类数: ${gRank.length}/93 (${Math.round(gRank.length/93*100)}%)`);
