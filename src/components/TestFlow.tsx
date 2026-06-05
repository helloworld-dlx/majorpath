import { useState, useCallback, useMemo } from 'react';
import { questionBank } from '../data/questionBank';
import {
  selectGeneralQuestions, computeBucketScores, normalizeScores,
  buildAdaptivePhase, collectRiskTags,
  type UserResponses, type BucketScore, type TestQuestion, type UserType,
} from '../utils/adaptiveQuestioning';

type Phase = 'start' | 'general' | 'adaptive' | 'done';

export default function TestFlow() {
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState<UserResponses>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [generalQ, setGeneralQ] = useState<TestQuestion[]>([]);
  const [adaptiveQ, setAdaptiveQ] = useState<TestQuestion[]>([]);
  const [bucketScores, setBucketScores] = useState<BucketScore | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [humanitiesProtected, setHumanitiesProtected] = useState(false);

  const allQuestions = useMemo(() => [...generalQ, ...adaptiveQ], [generalQ, adaptiveQ]);
  const currentQ = allQuestions[currentIdx] ?? null;
  const total = allQuestions.length;
  const progress = total > 0 ? Math.round((currentIdx / total) * 100) : 0;
  const isInGeneral = phase === 'general' || (phase === 'adaptive' && currentIdx < generalQ.length);

  const handleStart = useCallback(() => {
    const qs = selectGeneralQuestions(questionBank);
    setGeneralQ(qs.map((q, i) => ({ question: q, phase: 'general' as const, order: i + 1 })));
    setPhase('general'); setCurrentIdx(0); setResponses({}); setSelected(null);
  }, []);

  const handleSelect = useCallback((qId: string, optId: string) => {
    setResponses(p => ({ ...p, [qId]: optId })); setSelected(optId);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentQ || !responses[currentQ.question.id]) return;
    const isLastGen = phase === 'general' && currentIdx === generalQ.length - 1;
    if (isLastGen) {
      const raw = computeBucketScores(questionBank, responses);
      const norm = normalizeScores(raw);
      const usedIds = new Set(generalQ.map(q => q.question.id));
      const adp = buildAdaptivePhase(questionBank, raw, norm, undefined, usedIds);
      const items: TestQuestion[] = [];
      let o = generalQ.length + 1;
      for (const it of adp.allAdaptive) items.push({ ...it, order: o++ });
      setBucketScores(raw); setUserType(adp.userType); setHumanitiesProtected(adp.humanitiesProtected);
      setAdaptiveQ(items); setPhase('adaptive'); setCurrentIdx(p => p + 1); setSelected(null);
      return;
    }
    const isLastAll = phase === 'adaptive' && currentIdx === allQuestions.length - 1;
    if (isLastAll) {
      const tags = collectRiskTags(questionBank, responses);
      const payload = { bucketScores: bucketScores ?? computeBucketScores(questionBank, responses), userType: userType ?? 'exploratory', humanitiesProtected, riskTags: tags, responses, generalCount: generalQ.length, totalCount: allQuestions.length };
      try { sessionStorage.setItem('majorpath_test_results', JSON.stringify(payload)); } catch {}
      setPhase('done'); window.location.href = '/report'; return;
    }
    setCurrentIdx(p => p + 1); setSelected(null);
  }, [currentQ, phase, currentIdx, generalQ, allQuestions, responses, bucketScores, userType, humanitiesProtected]);

  if (phase === 'done') return null;

  if (phase === 'start') {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">专业倾向小测试</h1>
          <p className="text-slate-500 text-sm mb-2">帮你从兴趣和思维方式出发，发现可能适合的专业方向</p>
          <p className="text-xs text-slate-400 mb-8">共 8 道通用题 + 约 8 道方向题，大约 5 分钟</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-left max-w-sm mx-auto">
            <p className="text-xs text-amber-700 leading-relaxed">⚠️ 本测试仅供参考，不构成志愿填报建议。最终选择请结合分数、位次、院校、家庭情况综合判断。</p>
          </div>
          <button onClick={handleStart} className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm">开始测试<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></button>
          <p className="text-xs text-slate-400 mt-6">不需要注册，结果仅在当前浏览器中保存</p>
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return <div className="max-w-xl mx-auto px-4 py-16 text-center"><p className="text-slate-400">加载题目中…</p></div>;
  }

  const ansId = responses[currentQ.question.id];
  const isLast = currentIdx === allQuestions.length - 1;
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{isInGeneral ? '第 1 步：通用题' : '第 2 步：方向题'}</span>
          <span>{currentIdx + 1} / {total}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: progress + '%' }} />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
        {currentQ.question.description && <p className="text-xs text-slate-400 mb-2">{currentQ.question.description}</p>}
        <h2 className="text-base font-medium text-slate-800 leading-relaxed">{currentQ.question.title}</h2>
      </div>
      <div className="space-y-2 mb-6">
        {currentQ.question.options.map(opt => {
          const isThis = ansId === opt.id, locked = !!ansId;
          return <button key={opt.id} onClick={() => !locked && handleSelect(currentQ.question.id, opt.id)} disabled={locked}
            className={`w-full text-left p-4 rounded-xl border transition-all ${locked && isThis ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : locked ? 'border-slate-100 bg-slate-50 opacity-40' : 'border-slate-200 bg-white hover:border-primary/30 hover:bg-slate-50'}`}>
            <div className="flex items-start gap-3">
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${locked && isThis ? 'bg-primary text-white border-primary' : 'border-slate-300 text-slate-500'}`}>{opt.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed pt-0.5">{opt.text}</span>
            </div>
          </button>;
        })}
      </div>
      <div className="flex justify-end">
        <button onClick={handleNext} disabled={!ansId}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${ansId ? 'bg-primary text-white hover:bg-primary/90 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
          {isLast ? '查看结果' : '下一题'}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      {phase === 'adaptive' && currentIdx === generalQ.length && <div className="mt-4 text-center"><p className="text-xs text-slate-400">接下来会问你一些更具体的问题，帮你缩小方向</p></div>}
    </div>
  );
}
