import { TeamShowcase } from "@/components/home/TeamShowcase";
import { Seo } from "@/components/seo/Seo";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo/site";

const LESLIE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leslie",
  jobTitle: "Co-founder",
  worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  image: absoluteUrl("/Leslie.png"),
  url: absoluteUrl("/team"),
};

const GIFT_ASOR_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gift Asor",
  jobTitle: "Co-founder",
  worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  image: absoluteUrl("/Tsukimi.png"),
  url: absoluteUrl("/team"),
};

const TEAM_ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  founder: [
    { "@type": "Person", name: "Leslie" },
    { "@type": "Person", name: "Gift Asor" },
  ],
  employee: [
    { "@type": "Person", name: "Leslie" },
    { "@type": "Person", name: "Gift Asor" },
  ],
};

const TeamPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Seo
        title="Our team — Wafrivet"
        description="Meet the Wafrivet team: co-founders Leslie and Gift Asor, plus the unofficial team members who visit the office every day."
        keywords={[
          "Wafrivet team",
          "Wafrivet founders",
          "Leslie Wafrivet",
          "Gift Asor",
          "Africa agritech founders",
        ]}
        path="/team"
        jsonLd={[LESLIE_JSON_LD, GIFT_ASOR_JSON_LD, TEAM_ORG_JSON_LD]}
      />
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-[1280px] mx-auto text-center mb-12 md:mb-14">
          <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Our team
          </h1>
          <p className="text-[#111811]/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the founders and the unofficial team members who visit the office every day.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto">
          <TeamShowcase showBios nameHeadingLevel={2} />
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
