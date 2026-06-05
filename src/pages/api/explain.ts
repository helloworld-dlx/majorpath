/**
 * /api/explain — DeepSeek Flash 报告解释
 *
 * 安全边界：
 *  - API Key 仅存于环境变量，绝不暴露到前端
 *  - 仅接收规则系统已算出的结果包，不接收用户原始答案
 *  - AI 不得修改推荐方向、不得提供院校/志愿/录取建议
 *  - API 失败 → 回退到模板解释
 *  - 基础调用限制：每 IP 每分钟最多 5 次
 */

import type { APIRoute } from 'astro';

// 声明为服务端路由（不在构建时预渲染）
export const prerender = false;

// ─── 限流（简单内存计数，EdgeOne 冷启动重置可接受） ───

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 分钟
const RATE_LIMIT_MAX = 5;            // 每分钟最多 5 次

interface RateEntry {
  count: number;
  resetAt: number;
}
const rateMap = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// ─── 模板解释（API 失败时的回退） ───

function buildTemplateExplanation(result: any): string {
  const prof = result.profileName || '多元探索型';
  const topBuckets = (result.topBuckets || []).slice(0, 2).map((b: any) => b.label).join('和');
  const recCats = (result.recommendedCategories || []).slice(0, 3).map((c: any) => c.name).join('、');
  const optCats = (result.optionalCategories || []).slice(0, 2).map((c: any) => c.name).join('、');
  const cautCats = (result.cautiousCategories || []).slice(0, 2).map((c: any) => c.name).join('、');
  const riskText = (result.riskTags || []).slice(0, 2).map((r: any) => r.description).join('；');
  const conf = result.confidenceNote || '结果仅供参考';

  let text = '';
  text += `根据你的答题，你的方向画像偏向「${prof}」，主要兴趣集中在${topBuckets}领域。`;
  text += `从结果来看，你的「阅读表达」「数理逻辑」等维度各有特点，不同维度的组合指向了不同的专业方向。`;

  if (recCats) {
    text += `建议优先了解以下几个方向：${recCats}。这些专业类与你的兴趣倾向匹配度较高，从这里开始了解会比较有针对性。`;
  }
  if (optCats) {
    text += `另外，${optCats}也值得顺手看看——有时候兴趣恰好藏在那些你还没注意到的地方。`;
  }
  if (cautCats) {
    text += `有几个方向放进了「谨慎了解」区：${cautCats}。不是说不能选，而是这些方向有一些容易误解的地方，建议你点进去看看详情页的「常见误解」部分，了解清楚再做判断。`;
  }
  if (riskText) {
    text += `测试还发现了一些值得留意的信号：${riskText}。这些不是否定——只是提醒你在做选择前多了解实际情况，避免因为表面印象而选错了方向。`;
  }
  text += `${conf}。本测试只是帮你缩小了解范围的认知工具，最终选哪个专业，还需要你结合自己的高考分数、位次、目标院校和家庭情况综合判断。`;
  text += `建议你把这里的推荐当作探索起点：挑 2-3 个感兴趣的专业类，点进详情页看看大学到底学什么、未来可能做什么。`;

  return text;
}

// ─── 构建发送给 AI 的结构化结果摘要（不含原始答案） ───

function buildAIPrompt(result: any, subjectiveNotes?: string): string {
  const topBuckets = (result.topBuckets || [])
    .map((b: any) => `  - ${b.label}: ${b.score} 分`)
    .join('\n');

  const topDisciplines = (result.topDisciplines || []).slice(0, 5)
    .map((d: any) => `  - ${d.name}（${d.score} 分）：${d.reason}`)
    .join('\n');

  const recommended = (result.recommendedCategories || [])
    .map((c: any) => `  - ${c.name}（${c.score} 分）—— 关联维度：${(c.topDimensions || []).join('、')}`)
    .join('\n');

  const optional = (result.optionalCategories || [])
    .map((c: any) => `  - ${c.name}（${c.score} 分）`)
    .join('\n');

  const cautious = (result.cautiousCategories || [])
    .map((c: any) => {
      const cautions = (c.cautions || []).join('；');
      return `  - ${c.name} —— 注意：${cautions || '建议先看清楚再决定'}`;
    })
    .join('\n');

  const risks = (result.riskTags || [])
    .map((r: any) => `  - ${r.label}：${r.description}`)
    .join('\n');

  const suggestions = (result.nextStepSuggestions || [])
    .map((s: string) => `  - ${s}`)
    .join('\n');

  const dimHigh = (result.dimensions || [])
    .filter((d: any) => d.level === 'high')
    .map((d: any) => d.label)
    .join('、');

  return `以下是测试系统为一位高中生计算出的推荐结果（由规则系统生成，不是原始答案）：

▎方向画像：${result.profileName}
${result.profileSummary}

▎兴趣桶得分：
${topBuckets}

▎突出的能力倾向：${dimHigh || '无明显突出项'}

▎推荐学科门类：
${topDisciplines}

▎优先了解的专业类：
${recommended}

▎可以继续看看：
${optional || '无'}

▎谨慎了解：
${cautious || '无'}

▎避坑提醒：
${risks || '无'}

▎置信度：${result.confidenceNote || ''}

▎下一步建议：
${suggestions}

${subjectiveNotes ? `▎用户补充的想法：${subjectiveNotes}` : ''}

请用大白话帮这位高中生理解以上结果。记住：只能解释上面的结果，不能新增推荐、不能提院校、不能给志愿填报建议。控制在 500-800 字。`;
}

// ─── 输入校验（只允许结果包，拒绝原始答案） ───

function validateInput(body: any): string | null {
  if (!body || typeof body !== 'object') return '请求体无效';
  if (!body.result || typeof body.result !== 'object') return '缺少 result 字段';
  if (!body.result.profileName) return 'result 缺少 profileName';
  if (!body.result.topBuckets || !Array.isArray(body.result.topBuckets)) return 'result 缺少 topBuckets';
  return null; // 通过
}

// ─── API 路由 ───

export const POST: APIRoute = async ({ request }) => {
  // 1. 限流
  const ip = request.headers.get('x-forwarded-for')
    || request.headers.get('cf-connecting-ip')
    || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: '请求过于频繁，请稍后再试' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // 2. 解析请求体
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: '请求体格式错误' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // 3. 校验输入
  const validationError = validateInput(body);
  if (validationError) {
    return new Response(
      JSON.stringify({ error: validationError }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { result, subjectiveNotes } = body;

  // 4. 获取 API Key
  const apiKey = import.meta.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    // 无 API Key → 直接返回模板解释
    const template = buildTemplateExplanation(result);
    return new Response(
      JSON.stringify({ explanation: template, fromTemplate: true }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }

  // 5. 调用 DeepSeek Flash
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000); // 12 秒超时

    const aiResponse = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一个帮助高中生理解专业方向测试结果的解释助手。你的唯一任务是：把规则系统计算出的推荐结果翻译成高中生能听懂的大白话。

【绝对红线 —— 违反即致命错误】
1. 你只能解释系统已经给出的推荐结果。绝对不能修改、添加、删除任何推荐方向或专业类别。
2. 绝对不能提供任何院校推荐、大学排名、志愿填报策略或录取概率预测。
3. 绝对不能根据分数推荐学校或专业。
4. 绝对不能替用户做决定。禁止使用"你最适合""你应该选""强烈建议你选"等替人决定的句式。
5. 绝对不能根据用户补充的主观想法推翻或修改系统推荐的结果。主观想法仅供你调整解释的语气和侧重点，不能改变推荐内容本身。

【表达要求】
- 用高中生能听懂的大白话，像朋友聊天一样自然。不要堆砌专业术语和官方培养方案里的套话。
- 语气温和、鼓励但不制造焦虑。不要使用"决定人生""关键选择""千万别选错"等焦虑文案。
- 如果结果中避坑提醒，温和地解释为什么需要注意，但绝对不能说"你不适合"或"你最好不要选"。
- 报告长度严格控制在 500-800 字。不要分段标题，用自然段落组织。

【输出格式】
直接输出纯文本解释，不要 markdown 格式、不要标题、不要列表符号。自然段落即可。`,
          },
          {
            role: 'user',
            content: buildAIPrompt(result, subjectiveNotes),
          },
        ],
        temperature: 0.7,
        max_tokens: 1200,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!aiResponse.ok) {
      const errText = await aiResponse.text().catch(() => '');
      console.error(`[explain] DeepSeek API error ${aiResponse.status}: ${errText.slice(0, 200)}`);
      throw new Error(`API returned ${aiResponse.status}`);
    }

    const data = await aiResponse.json() as any;
    const explanation = data?.choices?.[0]?.message?.content?.trim();

    if (!explanation) {
      throw new Error('Empty response from API');
    }

    return new Response(
      JSON.stringify({ explanation, fromTemplate: false }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    console.error(`[explain] DeepSeek call failed: ${err.message || err}`);

    // 6. 回退到模板
    const template = buildTemplateExplanation(result);
    return new Response(
      JSON.stringify({ explanation: template, fromTemplate: true }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
};
