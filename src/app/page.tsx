import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Services from "@/components/Services/Services";
import ProductsSection from "@/components/Products/ProductsSection";
import FaqSection from "@/components/FAQ/FaqSection";
import InstallationSection from "@/components/Installation/InstallationSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
