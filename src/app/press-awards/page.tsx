import type { Metadata } from 'next';
import { ArrowRight, Award, Newspaper, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: '보도·수상 | 칼라테크OA',
  description: '언론에 소개된 칼라테크오에이의 소식과 주요 수상 내역을 확인하세요.',
};

const sections = [
  {
    id: 'press',
    eyebrow: 'PRESS',
    title: '언론 속 칼라테크오에이',
    description: '칼라테크오에이의 기술력과 서비스가 소개된 언론 보도와 인터뷰를 전합니다.',
    icon: Newspaper,
    emptyTitle: '새로운 보도 소식을 준비하고 있습니다',
    emptyDescription: '언론에 소개된 칼라테크오에이의 이야기를 이곳에서 순차적으로 만나보실 수 있습니다.',
  },
  {
    id: 'awards',
    eyebrow: 'AWARDS',
    title: '수상 및 인증 내역',
    description: '고객과 함께 쌓아온 신뢰를 바탕으로 인정받은 수상 및 인증 이력을 소개합니다.',
    icon: Award,
    emptyTitle: '수상 및 인증 내역을 정리하고 있습니다',
    emptyDescription: '칼라테크오에이의 공식 수상과 인증 자료를 확인 후 순차적으로 공개할 예정입니다.',
  },
];

export default function PressAwardsPage() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B1220] px-4 pb-24 pt-40 text-white md:pb-32 md:pt-48">
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#315EFB]/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#19B5A5]/15 blur-3xl" />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-blue-100">
              <Sparkles size={15} aria-hidden="true" />
              COLORTEK OA NEWSROOM
            </div>
            <h1 className="max-w-3xl text-[42px] font-bold leading-[1.15] tracking-[-0.04em] md:text-[68px]">
              신뢰로 만들어온<br />칼라테크오에이의 기록
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-slate-300 md:text-[19px]">
              언론에 소개된 주요 소식과 수상·인증 내역을 한곳에서 확인하실 수 있습니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#press" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-blue-50">언론 보도 보기</a>
              <a href="#awards" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">수상 내역 보기</a>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-gray-100 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {[
              ['PRESS', '공신력 있는 언론 보도'],
              ['AWARDS', '공식 수상 및 인증 이력'],
              ['TRUST', '검증된 기업 성장 기록'],
            ].map(([label, text]) => (
              <div key={label} className="py-8 text-center md:py-10">
                <strong className="block text-sm tracking-[0.16em] text-[#315EFB]">{label}</strong>
                <span className="mt-2 block text-[15px] text-[#555]">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className={`scroll-mt-20 px-4 py-24 md:py-32 ${index % 2 ? 'bg-[#F7F8FA]' : 'bg-white'}`}>
              <div className="mx-auto max-w-[1200px]">
                <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#315EFB] text-white shadow-[0_12px_30px_rgba(49,94,251,0.24)]">
                      <Icon size={27} aria-hidden="true" />
                    </div>
                    <span className="text-sm font-bold tracking-[0.18em] text-[#315EFB]">{section.eyebrow}</span>
                    <h2 className="mt-3 text-[30px] font-bold tracking-[-0.03em] md:text-[42px]">{section.title}</h2>
                    <p className="mt-5 text-[16px] leading-[1.8] text-[#666]">{section.description}</p>
                  </div>
                  <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-[#E5E8EF] bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
                    <div className="max-w-md">
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F4FF] text-[#315EFB]">
                        <Icon size={28} aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold">{section.emptyTitle}</h3>
                      <p className="mt-3 text-[15px] leading-[1.8] text-[#777]">{section.emptyDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-[#315EFB] px-4 py-20 text-white md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-blue-100">MEDIA CONTACT</p>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] md:text-[38px]">칼라테크오에이 관련 문의가 있으신가요?</h2>
              <p className="mt-3 text-blue-100">보도 및 기업 관련 문의를 친절하게 안내해 드립니다.</p>
            </div>
            <a href="tel:027191644" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#315EFB] transition hover:-translate-y-0.5 hover:shadow-xl">
              02-719-1644 <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
