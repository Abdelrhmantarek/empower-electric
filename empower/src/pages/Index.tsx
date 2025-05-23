
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import UspSection from "@/components/home/UspSection";
import CtaSection from "@/components/home/CtaSection";
import PartnersSection from "@/components/home/PartnersSection";

const Index = () => {
  return (
    <Layout transparentHeader>
      <HeroSection />
      <HighlightsSection />
      <BenefitsSection />
      <UspSection />
      <PartnersSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
