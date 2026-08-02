'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Award, Building2, HeartHandshake, Newspaper } from 'lucide-react';
import { pressArchive, type PressArchiveItem } from '@/data/pressArchive';

type Filter = '전체' | '언론보도' | '수상·표창' | '사회공헌';

const filters: Filter[] = ['전체', '언론보도', '수상·표창', '사회공헌'];

function getType(item: PressArchiveItem): Exclude<Filter, '전체'> {
  if (item.category.includes('수상') || item.category.includes('표창')) return '수상·표창';
  if (item.category.includes('사회공헌')) return '사회공헌';
  return '언론보도';
}

const typeStyle = {
  언론보도: { icon: Newspaper, gradient: 'from-[#172554] via-[#1D4ED8] to-[#60A5FA]', badge: 'MEDIA' },
  '수상·표창': { icon: Award, gradient: 'from-[#3F2D0B] via-[#B7791F] to-[#F6D365]', badge: 'AWARD' },
  사회공헌: { icon: HeartHandshake, gradient: 'from-[#0F3D35] via-[#0F766E] to-[#5EEAD4]', badge: 'CSR' },
};

function ArchiveCard({ item }: { item: PressArchiveItem }) {
  const type = getType(item);
  const style = typeStyle[type];
  const Icon = style.icon;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]">
      <div className={`relative flex h-[190px] flex-col justify-between overflow-hidden bg-gradient-to-br ${style.gradient} p-6 text-white`}>
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[28px] border-white/10" />
        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/10 blur-sm" />
        <div className="relative flex items-start justify-between">
          <span className="rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] backdrop-blur-sm">{style.badge}</span>
          <Icon size={27} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <div className="relative">
          <p className="text-[42px] font-bold leading-none tracking-[-0.05em]">{item.year}</p>
          <p className="mt-2 truncate text-sm font-medium text-white/80">{item.source}</p>
        </div>
      </div>
      <div className="flex min-h-[220px] flex-col p-6">
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="font-semibold text-[#315EFB]">{item.category}</span>
          <span className="text-[#999]">{item.date}</span>
        </div>
        <h3 className="mt-4 line-clamp-2 text-[18px] font-bold leading-[1.5] tracking-[-0.02em] text-[#111827] group-hover:text-[#315EFB]">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-[14px] leading-[1.7] text-[#6B7280]">{item.summary}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#EEF0F3] pt-4 text-sm font-semibold text-[#374151]">
          <span className="truncate pr-3">{item.source}</span>
          <ArrowUpRight size={17} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </div>
    </a>
  );
}

export default function PressArchive() {
  const [activeFilter, setActiveFilter] = useState<Filter>('전체');
  const [activeYear, setActiveYear] = useState('전체');
  const years = useMemo(() => [...new Set(pressArchive.map((item) => item.year))].sort((a, b) => Number(b) - Number(a)), []);
  const items = useMemo(() => pressArchive.filter((item) => (activeFilter === '전체' || getType(item) === activeFilter) && (activeYear === '전체' || item.year === activeYear)).sort((a, b) => b.id - a.id), [activeFilter, activeYear]);
  const grouped = useMemo(() => years.map((year) => ({ year, items: items.filter((item) => item.year === year) })).filter((group) => group.items.length), [items, years]);

  return (
    <section id="archive" className="scroll-mt-20 bg-[#F7F8FA] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm font-bold tracking-[0.18em] text-[#315EFB]">FULL ARCHIVE</span>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] md:text-[48px]">연도별 보도·수상 기록</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-[#666]">2015년부터 현재까지 언론 보도, 수상·표창, 사회공헌 기록을 연도별로 정리했습니다. 카드를 누르면 원문 페이지로 이동합니다.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#666]"><Building2 size={18} aria-hidden="true" /><strong className="text-[#111]">{items.length}건</strong>의 기록</div>
        </div>

        <div className="mt-12 rounded-[24px] border border-[#E5E7EB] bg-white p-4 md:p-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeFilter === filter ? 'bg-[#111827] text-white' : 'bg-[#F3F4F6] text-[#555] hover:bg-[#E8EBF0]'}`}>{filter}</button>)}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {['전체', ...years].map((year) => <button key={year} type="button" onClick={() => setActiveYear(year)} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${activeYear === year ? 'border-[#315EFB] bg-[#EEF3FF] font-bold text-[#315EFB]' : 'border-[#E5E7EB] text-[#777] hover:border-[#9CA3AF]'}`}>{year === '전체' ? '전체 연도' : `${year}년`}</button>)}
          </div>
        </div>

        <div className="mt-16 space-y-20">
          {grouped.map((group) => (
            <div key={group.year}>
              <div className="mb-7 flex items-center gap-5">
                <h3 className="text-[30px] font-bold tracking-[-0.04em] md:text-[38px]">{group.year}</h3>
                <span className="rounded-full bg-[#E9EEFF] px-3 py-1 text-xs font-bold text-[#315EFB]">{group.items.length}건</span>
                <div className="h-px flex-1 bg-[#DDE1E8]" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => <ArchiveCard key={item.id} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
