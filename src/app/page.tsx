import CategoryRow from "@/Components/CategoryRow";
import HeroSection from "@/Components/HeroSection";
import ProductGrid from "@/Components/ProductGrid";
import PromoBanner from "@/Components/PromoBanner";
import WhyChooseUs from "@/Components/WhyChooseUs";


export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
       <CategoryRow />
      <ProductGrid></ProductGrid>
       <PromoBanner />
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
