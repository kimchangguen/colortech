import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Services from "@/components/Services/Services";
import ProductsSection from "@/components/Products/ProductsSection";
import FaqSection from "@/components/FAQ/FaqSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow w-full">
        <HeroSlider />
        <Services />
        <ProductsSection />
        <FaqSection />
      </main>
    </div>
  );
}
