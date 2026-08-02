import type { Metadata } from 'next';
import { ArrowRight, Award, Newspaper, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import PressArchive from '@/components/PressArchive';
import JsonLd from '@/components/JsonLd';
import { pressArchive } from '@/data/pressArchive';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = createPageMetadata({
  title: '칼라테크 언론 보도·수상 및 기업 활동 아카이브',
  description: '언론에 소개된 칼라테크오에이의 기업 활동, 기술·서비스 관련 기사와 주요 수상 및 표창 기록을 공식 출처 링크와 함께 연도별 아카이브에서 확인하세요.',
  path: '/press-awards',
});

export default function PressAwardsPage() {
  const years = new Set(pressArchive.map((item) => item.year)).size;
  const awards = pressArchive.filter((item) => item.category.includes('수상') || item.category.includes('표창')).length;

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <JsonLd data={[
        breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '보도·수상', path: '/press-awards' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/press-awards#collection`,
          url: `${SITE_URL}/press-awards`,
          name: '칼라테크OA 언론 보도 및 수상 내역',
          description: metadata.description,
          inLanguage: 'ko-KR',
        },
      ]} />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B1220] px-4 pb-24 pt-40 text-white md:pb-32 md:pt-48">
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#315EFB]/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#19B5A5]/15 blur-3xl" />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-blue-100"><Sparkles size={15} aria-hidden="true" />COLORTEK OA NEWSROOM</div>
            <h1 className="max-w-3xl text-[42px] font-bold leading-[1.15] tracking-[-0.04em] md:text-[68px]">신뢰로 만들어온<br />칼라테크오에이의 기록</h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-slate-300 md:text-[19px]">2015년부터 이어진 언론 보도와 수상·표창, 사회공헌 활동을 한곳에 모았습니다.</p>
            <a href="#archive" className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#111827] transition hover:-translate-y-0.5 hover:shadow-xl">전체 기록 보기 <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-gray-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 py-9"><Newspaper className="text-[#315EFB]" size={25} /><div><strong className="block text-2xl">{pressArchive.length}</strong><span className="text-sm text-[#777]">전체 기록</span></div></div>
            <div className="flex items-center justify-center gap-4 py-9"><Award className="text-[#B7791F]" size={25} /><div><strong className="block text-2xl">{awards}</strong><span className="text-sm text-[#777]">수상·표창 기록</span></div></div>
            <div className="flex items-center justify-center gap-4 py-9"><Sparkles className="text-[#0F766E]" size={25} /><div><strong className="block text-2xl">{years}개 연도</strong><span className="text-sm text-[#777]">2015년부터 현재까지</span></div></div>
          </div>
        </section>

        <PressArchive />

        <section className="bg-[#315EFB] px-4 py-20 text-white md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><p className="text-sm font-semibold tracking-[0.16em] text-blue-100">MEDIA CONTACT</p><h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] md:text-[38px]">칼라테크오에이 관련 문의가 있으신가요?</h2><p className="mt-3 text-blue-100">보도 및 기업 관련 문의를 친절하게 안내해 드립니다.</p></div>
            <a href="tel:027191644" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#315EFB] transition hover:-translate-y-0.5 hover:shadow-xl">02-719-1644 <ArrowRight size={19} aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
