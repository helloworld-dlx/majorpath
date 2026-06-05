/**
 * EdgeOne Pages Function — /api/explain
 *
 * 独立于 Astro 构建，作为 Edge Function 部署。
 * 仅在 EdgeOne Pages 上运行，本地 dev 不生效。
 *
 * DeepSeek API Key 从 EdgeOne 环境变量 DEEPSEEK_API_KEY 读取。
 * 失败时返回模板解释。
 */

// ─── 限流 ───
const RATE_WINDOW = 60_000;
const RATE_MAX = 5;
const rateMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_MAX;
}

// ─── 模板解释 ───
function buildTemplateExplanation(result) {
  const prof = result.profileName || '多元探索型';
  const recCats = (result.recommendedCategories || []).slice(0, 3).map(c => c.name).join('、');
  const cautCats = (result.cautiousCategories || []).slice(0, 2).map(c => c.name).join('、');
  const riskText = (result.riskTags || []).slice(0, 2).map(r => r.description).join('；');
  const conf = result.confidenceNote || '';

  let text = `根据你的答题，你的方向画像偏向「${prof}」。`;
  if (recCats) text += `建议优先了解：${recCats}。这些专业类与你的兴趣倾向匹配度较高。`;
  if (cautCats) text += `有 ${cautCats} 在谨慎了解区，不是说不能选，而是建议先看清楚再决定。`;
  if (riskText) text += `测试还发现：${riskText}。这些不是否定，只是提醒你多了解实际情况。`;
  text += `${conf}。本测试只是认知工具，最终选择还需结合高考分数、位次和家庭情况综合判断。`;
  return text;
}

// ─── 构建 AI Prompt ───
function buildAIPrompt(result, subjectiveNotes) {
  const topBuckets = (result.topBuckets || []).map(b => `- ${b.label}: ${b.score}分`).join('\n');
  const recommended = (result.recommendedCategories || []).map(c => `- ${c.name}（${c.score}分）关联：${(c.topDimensions || []).join('、')}`).join('\n');
  const optional = (result.optionalCategories || []).map(c => `- ${c.name}`).join('\n');
  const cautious = (result.cautiousCategories || []).map(c => {
    const cautions = (c.cautions || []).join('；');
    return `- ${c.name} 注意：${cautions || '建议先看清楚'}`;
  }).join('\n');
  const risks = (result.riskTags || []).map(r => `- ${r.label}：${r.description}`).join('\n');
  const suggestions = (result.nextStepSuggestions || []).map(s => `- ${s}`).join('\n');
  const dimHigh = (result.dimensions || []).filter(d => d.level === 'high').map(d => d.label).join('、');

  return `以下是测试系统为一位高中生计算出的推荐结果（由规则系统生成，不是原始答案）：

▎方向画像：${result.profileName}
${result.profileSummary}

▎兴趣桶得分：
${topBuckets}

▎突出的能力倾向：${dimHigh || '无明显突出项'}

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

请用大白话帮这位高中生理解以上结果。只能解释上面的结果，不能新增推荐、不能提院校、不能给志愿填报建议。控制在500-800字。`;
}

// ─── 主处理函数（仅处理 POST） ───
export async function onRequestPost(context) {
  const { request, env } = context;

  // 限流
  const ip = request.headers.get('x-forwarded-for')
    || request.headers.get('cf-connecting-ip')
    || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: '请求过于频繁' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 解析请求体
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: '请求体格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body || !body.result || !body.result.profileName) {
    return new Response(JSON.stringify({ error: '缺少 result' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { result, subjectiveNotes } = body;
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({
      explanation: buildTemplateExplanation(result),
      fromTemplate: true,
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

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
            content: `你是一个帮助高中生理解专业方向测试结果的解释助手。你的唯一任务是把规则系统计算出的推荐结果翻译成高中生能听懂的大白话。

【绝对红线】
1. 你只能解释系统已经给出的推荐结果。绝对不能修改、添加、删除任何推荐方向或专业类别。
2. 绝对不能提供任何院校推荐、大学排名、志愿填报策略或录取概率预测。
3. 绝对不能根据分数推荐学校或专业。
4. 绝对不能替用户做决定。禁止使用"你最适合""你应该选""强烈建议你选"等句式。
5. 绝对不能根据用户补充的主观想法推翻系统推荐结果。主观想法仅供调整解释的语气和侧重点。

【表达要求】
- 用高中生能听懂的大白话，像朋友聊天一样自然。不堆专业术语。
- 语气温和、鼓励但不制造焦虑。不用"决定人生""千万别选错"等焦虑文案。
- 如果结果中有避坑提醒，温和解释但绝对不说"你不适合"。
- 避免负面评价学生的能力倾向。不说"没有突出项""能力不强""没有强项""比较弱"等。确实没有高分维度时，用"比较均衡""各方面发展得挺平均"代替。千万别让一个高中生觉得自己"平庸"。
- 报告长度严格控制在 500-800 字。自然段落，不要标题和列表符号。

直接输出纯文本解释。`,
          },
          { role: 'user', content: buildAIPrompt(result, subjectiveNotes) },
        ],
        temperature: 0.7,
        max_tokens: 1200,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!aiResponse.ok) {
      throw new Error(`API returned ${aiResponse.status}`);
    }

    const data = await aiResponse.json();
    const explanation = data?.choices?.[0]?.message?.content?.trim();

    if (!explanation) throw new Error('Empty response');

    return new Response(JSON.stringify({ explanation, fromTemplate: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      explanation: buildTemplateExplanation(result),
      fromTemplate: true,
    }), { headers: { 'Content-Type': 'application/json' } });
  }
}
