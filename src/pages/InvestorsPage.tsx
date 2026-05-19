import { CorporatePageLayout } from "@/components/layout/CorporatePageLayout";
import { Seo } from "@/components/seo/Seo";

const InvestorsPage = () => {
  return (
    <>
    <Seo
      title="Investor relations — Wafrivet"
      description="Wafrivet combines smart hardware, AI, and a verified B2B veterinary marketplace into one platform upgrading livestock health outcomes across Africa — with a defensible data moat."
      keywords={[
        "Wafrivet investors",
        "Africa agritech",
        "livestock health investment",
        "veterinary platform funding",
        "AI animal health",
        "agritech series A",
      ]}
      path="/investors"
    />
    <CorporatePageLayout
      title="Investor Relations"
      subtitle="Wafrivet combines hardware, AI, and a B2B marketplace into a single platform that can upgrade livestock health outcomes across Africa and beyond — while creating a defensible data moat."
      heroImageUrl="https://media.istockphoto.com/id/956944426/photo/black-and-white-cows-in-green-grassy-meadow-under-blue-sky-near-amersfoort-in-holland.jpg?s=612x612&w=0&k=20&c=TaRru05qmnGUJkkoRKN7LgJbYu8Iig4y1FTisgziSWU="
      sections={[
        {
          id: "problem",
          label: "The problem",
          content: (
            <ul className="space-y-3 list-disc pl-5">
              <li>Livestock diseases quietly destroy farmer income and food security every year.</li>
              <li>Most farms operate without continuous health data or reliable access to quality veterinary supplies.</li>
              <li>Existing tools are either software-only, built for Western infrastructure, or ignore feature-phone and offline realities.</li>
            </ul>
          ),
        },
        {
          id: "solution",
          label: "Our solution",
          content: (
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong className="text-[#111811]">Hardware:</strong> sensor-embedded tags, collars, and environmental nodes tuned to African disease burdens and farm realities.
              </li>
              <li>
                <strong className="text-[#111811]">Software:</strong> a multilingual AI layer for diagnostics, operations, and clinical support.
              </li>
              <li>
                <strong className="text-[#111811]">Marketplace:</strong> a verified supply chain for veterinary drugs, vaccines, and equipment.
              </li>
              <li>
                <strong className="text-[#111811]">Access:</strong> channels that work for everyone — web, app, WhatsApp, USSD, and normal phone calls.
              </li>
            </ul>
          ),
        },
        {
          id: "traction",
          label: "Traction",
          content: (
            <div className="space-y-3">
              <p>We’re growing through pilots and partner networks.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Animals monitored across pilot farms (2026): 3,842+</li>
                <li>Farmers and herders reached: 2,000+</li>
                <li>Agro‑vet outlets connected: 50+</li>
                <li>Veterinarians onboarded: 20+</li>
              </ul>
            </div>
          ),
        },
        {
          id: "model",
          label: "Business model",
          content: (
            <p>
              Hardware + subscription tiers by animal count and feature set; take-rate on marketplace transactions; premium
              analytics and integration fees for enterprise and institutional partners.
            </p>
          ),
        },
        {
          id: "why-now",
          label: "Why now",
          content: (
            <p>
              Rising protein demand across Africa, governments and multilaterals prioritising animal health and traceability,
              and hardware costs that make continent-scale deployments viable.
            </p>
          ),
        },
        {
          id: "defensibility",
          label: "Defensibility",
          content: (
            <p>
              First-mover advantage combining hardware, AI, and marketplace for African livestock; proprietary structured
              disease data that compounds with every new farm; deep language and offline support difficult to replicate.
            </p>
          ),
        },
        {
          id: "cta",
          label: "Request the deck",
          content: (
            <div className="rounded-2xl border border-black/[0.08] bg-[#FAFBFA] p-6 md:p-8">
              <p className="mb-5">
                We’re assembling long-term partners who understand that fixing livestock health is both a massive impact
                opportunity and a serious business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@wafrivet.com?subject=Investor%20deck%20request"
                  className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
                >
                  Request the full deck
                </a>
                <a
                  href="mailto:hello@wafrivet.com?subject=Hello%20from%20investor"
                  className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 text-[#111811] px-6 py-2.5 text-[15px] font-semibold hover:border-[#2D4D31]/45 transition-colors"
                >
                  Email the founders
                </a>
              </div>
            </div>
          ),
        },
      ]}
    />
    </>
  );
};

export default InvestorsPage;
