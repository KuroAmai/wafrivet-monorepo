import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ProblemCarousel } from "@/components/home/ProblemCarousel";
import { SolutionSection } from "@/components/home/SolutionSection";
import { FarmerSection } from "@/components/home/FarmerSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { FAQSection } from "@/components/home/FAQSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { AudienceStripSection } from "@/components/home/AudienceStripSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { TeamSection } from "@/components/home/TeamSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "@/lib/scrollToHash";
import { Seo } from "@/components/seo/Seo";
import {
  ORG_JSON_LD,
  WEBSITE_JSON_LD,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_KEYWORDS,
} from "@/lib/seo/site";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToHash(hash);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Wafrivet — Livestock health OS for African farms"
        description={SITE_DEFAULT_DESCRIPTION}
        keywords={SITE_DEFAULT_KEYWORDS}
        path="/"
        jsonLd={[ORG_JSON_LD, WEBSITE_JSON_LD]}
      />
      <Hero />
      <Stats />
      <ProblemCarousel />
      <SolutionSection />
      <HowItWorksSection />
      <FarmerSection />
      <AudienceStripSection />
      <SocialProofSection />
      <TeamSection />
      <PricingSection />
      <CommunitySection />
      <FAQSection />
    </div>
  );
};

export default Index;
