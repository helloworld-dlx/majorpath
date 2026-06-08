/**
 * SearchBox — 专业/方向模糊搜索组件
 *
 * 使用方式：
 *   <SearchBox variant="hero" />   (首页 Hero 内嵌，大尺寸)
 *   <SearchBox variant="compact" /> (目录页/其他页面，紧凑型)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SearchEntry } from '../utils/searchIndex';

/* ── 匹配高亮 ── */
function highlightText(text: string, query: string): React.ReactNode[] {
  if (!query || !text) return [text];
  const q = query.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
  if (!q) return [text];
  const parts: React.ReactNode[] = [];
  const lower = text.toLowerCase();
  let lastIdx = 0;
  let idx = lower.indexOf(q);
  while (idx !== -1) {
    if (idx > lastIdx) parts.push(text.slice(lastIdx, idx));
    parts.push(
      <mark key={idx} className="bg-amber-100 text-amber-800 rounded-sm px-0.5 font-medium">
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    lastIdx = idx + q.length;
    idx = lower.indexOf(q, lastIdx);
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

/* ── 状态徽章 ── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; dot: string; bg: string; text: string }> = {
    completed: { label: '已完善', dot: 'bg-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    building:  { label: '建设中', dot: 'bg-amber-400',   bg: 'bg-amber-50',   text: 'text-amber-700' },
    todo:      { label: '待补充', dot: 'bg-slate-300',    bg: 'bg-slate-50',   text: 'text-slate-500' },
  };
  const m = map[status] ?? map.todo;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

/* ── 门类图标颜色映射 ── */
const gateColors: Record<string, string> = {
  philosophy:       'bg-violet-100 text-violet-600',
  economics:        'bg-amber-100 text-amber-600',
  law:              'bg-rose-100 text-rose-600',
  pedagogy:         'bg-orange-100 text-orange-600',
  literature:       'bg-pink-100 text-pink-600',
  history:          'bg-stone-100 text-stone-600',
  science:          'bg-blue-100 text-blue-600',
  engineering:      'bg-cyan-100 text-cyan-600',
  agriculture:      'bg-green-100 text-green-600',
  medicine:         'bg-red-100 text-red-600',
  management:       'bg-indigo-100 text-indigo-600',
  art:              'bg-fuchsia-100 text-fuchsia-600',
  interdisciplinary:'bg-teal-100 text-teal-600',
};

function GateIcon({ gateSlug }: { gateSlug: string }) {
  const cls = gateColors[gateSlug] ?? 'bg-slate-100 text-slate-500';
  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${cls}`}>
      {gateSlug.charAt(0).toUpperCase()}
    </div>
  );
}

/* ── 结果卡片 ── */
function ResultCard({ entry, compact, query }: { entry: SearchEntry; compact?: boolean; query?: string }) {
  return (
    <a
      href={entry.path}
      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50/80 transition-colors no-underline group"
    >
      <GateIcon gateSlug={entry.gateSlug} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-primary transition-colors">
            {query ? highlightText(entry.name, query) : entry.name}
          </span>
          <StatusBadge status={entry.status} />
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
          {entry.gateName} · {entry.categoryName}
        </div>
        {!compact && entry.shortDescription && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
            {query ? highlightText(entry.shortDescription, query) : entry.shortDescription}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all mt-0.5">
        <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

/* ── 换个思路建议 ── */
const SUGGESTIONS: Record<string, string[]> = {
  '代码': ['计算机', '软件'], '编程': ['计算机', '软件'], '写代码': ['计算机'],
  '电路': ['电子信息', '集成电路'], '信号': ['电子信息', '通信'], '芯片': ['集成电路'],
  '稳定': ['会计', '师范'], '财务': ['会计', '金融'], '钱': ['金融', '会计'],
  '治病': ['临床医学', '口腔'], '医生': ['临床医学'], '看病': ['临床医学'],
  '画画': ['设计', '美术'], '设计': ['设计学'], '画画设计': ['设计学'],
  '数学': ['数学', '统计'], '物理': ['物理学', '电子信息'], '化学': ['化学', '化工'],
  '人工智能': ['计算机', '人工智能'], 'AI': ['计算机', '人工智能'],
  '法律': ['法学'], '律师': ['法学'], '教书': ['教育学', '师范'],
  '建筑': ['建筑学', '土木'], '机器': ['机械', '自动化'],
};

function getSuggestions(query: string): string[] {
  const q = query.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
  if (!q) return [];
  // 直接匹配
  if (SUGGESTIONS[q]) return SUGGESTIONS[q];
  // 包含匹配
  for (const [key, vals] of Object.entries(SUGGESTIONS)) {
    if (key.includes(q) || q.includes(key)) return vals;
  }
  return [];
}

/* ── 空状态 ── */
function EmptyState({ query }: { query?: string }) {
  const suggestions = query ? getSuggestions(query) : [];
  return (
    <div className="text-center py-10 px-6">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-600 mb-1">暂时没找到相关专业</p>
      {suggestions.length > 0 ? (
        <div className="mt-3 mb-4">
          <p className="text-xs text-slate-400 mb-2">换个思路，你是不是想找：</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((s) => (
              <span key={s} className="px-3 py-1 text-xs text-slate-600 bg-slate-50 rounded-full border border-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400 mb-5">
          换个关键词试试，比如"电路""稳定""数学少一点"
        </p>
      )}
      <a
        href="/majors"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary bg-primary-light rounded-lg hover:bg-blue-100 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        查看全部专业目录
      </a>
    </div>
  );
}

/* ── 主组件 ── */
interface SearchBoxProps {
  variant?: 'hero' | 'compact';
  placeholder?: string;
}

export default function SearchBox({ variant = 'hero', placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchFnRef = useRef<((q: string, n?: number) => SearchEntry[]) | null>(null);

  useEffect(() => {
    import('../utils/searchIndex').then((m) => {
      searchFnRef.current = m.searchMajors;
    });
  }, []);

  const doSearch = useCallback((q: string) => {
    const fn = searchFnRef.current;
    if (!fn || !q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const res = fn(q, 6);
    setResults(res);
    setOpen(true);
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (!val.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }
      timerRef.current = setTimeout(() => doSearch(val), 200);
    },
    [doSearch]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── 搜索输入框 ── */}
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isHero ? 'pl-5' : 'pl-4'}`}>
          <svg
            className={`transition-colors ${isHero ? 'w-5 h-5' : 'w-4 h-4'} ${open ? 'text-primary' : 'text-slate-400 group-focus-within:text-primary'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setOpen(true)}
          placeholder={placeholder ?? (isHero ? '输入专业名或关键词，比如：计算机、电路、代码、稳定、会计' : '输入专业名或关键词搜索')}
          className={`w-full bg-white border transition-all duration-200
            placeholder:text-slate-400 focus:outline-none
            ${isHero
              ? 'pl-12 pr-12 py-4 text-base rounded-2xl border-slate-200 shadow-md focus:shadow-lg focus:border-primary focus:ring-4 focus:ring-primary/10'
              : 'pl-10 pr-10 py-2.5 text-sm rounded-xl border-slate-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/10'
            }`}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setOpen(false);
              inputRef.current?.focus();
            }}
            className={`absolute inset-y-0 right-0 flex items-center text-slate-400 hover:text-slate-600 transition-colors ${isHero ? 'pr-5' : 'pr-4'}`}
          >
            <svg className={isHero ? 'w-5 h-5' : 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── 下拉结果面板 ── */}
      {open && (
        <>
          {/* 透明遮罩：点击页面其他区域关闭下拉 */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setOpen(false)}
          />
          <div className={`absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-xl z-[9999] overflow-hidden
            ${isHero ? 'rounded-2xl' : 'rounded-xl'}`}
          >
          {results.length > 0 ? (
            <>
              <div className="px-4 pt-3 pb-2">
                <span className="text-[11px] text-slate-400 font-medium">
                  找到 {results.length} 个相关专业
                </span>
              </div>
              <div className="border-t border-slate-100">
                {results.map((entry) => (
                  <div key={`${entry.path}-${entry.name}`} className="border-b border-slate-50 last:border-b-0">
                    <ResultCard entry={entry} compact={!isHero} query={query} />
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-slate-50/60 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  输入更多关键词可以找到更精准的结果
                </span>
              </div>
            </>
          ) : (
            <EmptyState query={query} />
          )}
          </div>
        </>
      )}
    </div>
  );
}
