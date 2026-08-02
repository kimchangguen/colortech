import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import InstallationGrid from '@/components/Installation/InstallationGrid';
import JsonLd from '@/components/JsonLd';
import { getPosts } from '@/lib/wordpress';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema, organizationId } from '@/lib/structuredData';

export const metadata: Metadata = createPageMetadata({
  title: '기업용 복합기·프린터 렌탈 설치 및 유지보수 사례',
  description: '사무실, 병원, 법률·설계사무소 등 다양한 기업 현장에 맞춘 복합기와 프린터 렌탈 설치 과정, 장비 구성, 출력 환경 개선 및 유지보수 사례를 자세히 확인하세요.',
  path: '/installations',
});

export default async function InstallationsPage() {
  const posts = await getPosts(100);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${SITE_URL}/installations#service`,
          name: '기업용 복합기·프린터 렌탈 및 유지보수',
          serviceType: '복합기·프린터 렌탈, 설치 및 유지보수',
          url: `${SITE_URL}/installations`,
          provider: { '@id': organizationId },
          areaServed: ['서울특별시', '경기도'],
          description: metadata.description,
        },
        breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '설치사례', path: '/installations' },
        ]),
      ]} />
      <Header />
      <main className="pt-20">
        <section className="bg-[#F7F8FA] px-4 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px] text-center">
            <span className="text-sm font-bold tracking-[0.18em] text-[#315EFB]">INSTALLATION CASE</span>
            <h1 className="mt-4 text-[38px] font-bold tracking-[-0.04em] md:text-[58px]">칼라테크OA 설치사례</h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-[#666] md:text-[18px]">
              다양한 기업 현장의 복합기·프린터 설치와 서비스 사례를 확인해 보세요.
            </p>
          </div>
        </section>
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            {posts.length > 0 ? (
              <InstallationGrid posts={posts} />
            ) : (
              <p className="py-20 text-center text-[#777]">설치사례를 준비하고 있습니다.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
