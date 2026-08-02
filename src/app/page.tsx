import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Services from "@/components/Services/Services";
import ProductsSection from "@/components/Products/ProductsSection";
import FaqSection from "@/components/FAQ/FaqSection";
import InstallationSection from "@/components/Installation/InstallationSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { localBusinessSchema, organizationSchema, organizationId } from "@/lib/structuredData";

export const metadata = createPageMetadata({
  title: "칼라테크OA | 복합기·프린터 렌탈 및 유지보수 전문기업",
  description: "서울·경기 기업 고객에게 복합기와 프린터 렌탈, 설치, 소모품 관리, 정기점검 및 신속한 유지보수를 제공하며 현장 맞춤 상담까지 지원하는 칼라테크OA 공식 홈페이지입니다.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={[
        organizationSchema,
        localBusinessSchema,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: '칼라테크OA',
          inLanguage: 'ko-KR',
          publisher: { '@id': organizationId },
        },
      ]} />
      <Header />
      <main className="flex-grow w-full">
        <div id="company-info" className="scroll-mt-20"><HeroSlider /></div>
        <div id="services" className="scroll-mt-20"><Services /></div>
        <div id="products" className="scroll-mt-20"><ProductsSection /></div>
        <div id="faq" className="scroll-mt-20"><FaqSection /></div>
        <div id="installations" className="scroll-mt-20"><InstallationSection /></div>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
