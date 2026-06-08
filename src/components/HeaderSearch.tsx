/**
 * HeaderSearch — Header 内的搜索入口
 * 搜索图标按钮 + 点击展开搜索面板（全宽下拉）
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import SearchBox from './SearchBox';

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Escape 关闭
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      {/* 搜索按钮 */}
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
          open
            ? 'text-primary bg-primary-light border-primary-border'
            : 'text-slate-500 bg-slate-50 border-slate-200 hover:border-primary/40 hover:text-primary hover:bg-primary-light/50'
        }`}
        aria-label="搜索专业"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline text-xs font-medium">搜索</span>
      </button>

      {/* 搜索下拉面板 */}
      {open && (
        <div
          ref={panelRef}
          className="fixed left-0 right-0 top-16 z-[100] bg-white border-b border-slate-200 shadow-lg"
        >
          <div className="max-w-2xl mx-auto px-4 py-3">
            <SearchBox variant="compact" placeholder="输入专业名或关键词搜索" />
          </div>
        </div>
      )}
    </div>
  );
}
