import { useMemo, useState } from "react";
import { GlassSurfaceButton } from "@/components/ui/GlassSurfaceButton";

type Persona = "farmer" | "vet" | "supplier";

export const PricingSection = () => {
  const [activePersona, setActivePersona] = useState<Persona>("farmer");

  type Tier = {
    name: string;
    price: string;
    period: string;
    features: string[];
    ctaLabel: string;
    isFeatured?: boolean;
  };

  const PRICING = useMemo(() => {
    const farmer: Tier[] = [
      {
        name: "Starter",
        price: "₦5,000",
        period: "/mo",
        features: [
          "AI diagnosis (camera, call, chat)",
          "Animal profiles & basic records",
          "Order from nearby chemists",
          "USSD access",
        ],
        ctaLabel: "Start Free",
      },
      {
        name: "Growth",
        price: "₦15,000",
        period: "/mo",
        features: [
          "Everything in Starter",
          "Full health history tracking",
          "Treatment & vaccination logs",
          "Priority order matching",
          "Basic insights on herd health",
        ],
        ctaLabel: "Upgrade",
        isFeatured: true,
      },
      {
        name: "Pro",
        price: "₦20,000",
        period: "/mo",
        features: [
          "Everything in Growth",
          "Livestock valuation & credit score",
          "BNPL priority access",
          "Early disease alerts",
          "Advanced insights & reporting",
        ],
        ctaLabel: "Go Pro",
      },
    ];

    const vet: Tier[] = [
      {
        name: "Starter",
        price: "₦5,000",
        period: "/mo",
        features: ["NFC scans & animal history", "Marketplace ordering", "Basic client records", "USSD access"],
        ctaLabel: "Start Free",
      },
      {
        name: "Growth",
        price: "₦15,000",
        period: "/mo",
        features: ["Everything in Starter", "AI notes & summaries", "Team access (small clinic)", "Priority support"],
        ctaLabel: "Upgrade",
        isFeatured: true,
      },
      {
        name: "Pro",
        price: "₦20,000",
        period: "/mo",
        features: ["Everything in Growth", "Clinic analytics", "Routing & scheduling", "Advanced tools & reporting"],
        ctaLabel: "Go Pro",
      },
    ];

    const supplier: Tier[] = [
      {
        name: "Starter",
        price: "₦5,000",
        period: "/mo",
        features: ["Basic listings", "Order notifications", "Inventory tracking", "USSD access"],
        ctaLabel: "Start Free",
      },
      {
        name: "Growth",
        price: "₦15,000",
        period: "/mo",
        features: ["Everything in Starter", "Demand signals", "Distribution tools", "Priority support"],
        ctaLabel: "Upgrade",
        isFeatured: true,
      },
      {
        name: "Pro",
        price: "₦20,000",
        period: "/mo",
        features: ["Everything in Growth", "Advanced forecasting", "Partner API access", "Enterprise reporting"],
        ctaLabel: "Go Pro",
      },
    ];

    return { farmer, vet, supplier } satisfies Record<Persona, Tier[]>;
  }, []);

  const tiers = PRICING[activePersona];

  return (
    <section id="pricing" className="w-full py-16 md:py-24 bg-white scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Simple pricing.
            <br />
            Built for how you actually work.
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans">
            Start free. Pay only when you grow, sell, or scale.
            <br />
            No hidden fees, no complexity.
          </p>
        </div>

        {/* Persona Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#F2F4F2] rounded-full p-1.5 shadow-sm border border-black/[0.04]">
            {(["farmer", "vet", "supplier"] as Persona[]).map((persona) => (
              <button
                key={persona}
                onClick={() => setActivePersona(persona)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  activePersona === persona
                    ? "bg-white text-[#111811] shadow-sm transform scale-100"
                    : "text-[#111811]/50 hover:text-[#111811] hover:bg-black/5 scale-[0.98]"
                }`}
              >
                {persona === "farmer" ? "Farmers" : persona === "vet" ? "Vets" : "Suppliers"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                "rounded-[28px] bg-[#2D4D31] text-white p-8 md:p-9 font-quicksand flex flex-col",
                "shadow-[0_22px_55px_rgba(0,0,0,0.16)]",
                "min-h-[420px]",
              ].join(" ")}
            >
              <div className="text-center">
                <div className=" font-quicksand text-[1.75rem] md:text-[2rem] font-semibold tracking-wide">
                  {tier.price}
                  <span className="text-[11px] text-white/65 font-semibold align-top ml-1">{tier.period.toUpperCase()}</span>
                </div>
                <div className="mt-1 text-[13px] text-white/75 font-medium">{tier.name}</div>
              </div>

              <ul className="mt-7 space-y-3 text-sm text-white/85 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="font-quicksand flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10">
                      <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.42.004L3.29 9.16a1 1 0 1 1 1.42-1.41l3.09 3.11 6.49-6.54a1 1 0 0 1 1.414-.03Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <GlassSurfaceButton variant="dark" className="w-full mt-7">
                {tier.ctaLabel}
              </GlassSurfaceButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
