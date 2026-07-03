import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Services from "@/components/Services/Services";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow w-full">
        <HeroSlider />
        <Services />
      </main>
    </div>
  );
}
