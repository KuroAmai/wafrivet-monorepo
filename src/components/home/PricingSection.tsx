import { useMemo, useState } from "react";
import { Check } from "lucide-react";

type Persona = "farmer" | "vet" | "supplier";
type Billing = "monthly" | "annual";

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

type Tier = {
  tierLabel: string;
  name: string;
  description: string;
  monthlyAmount: number;
  features: string[];
  ctaLabel: string;
  isFeatured?: boolean;
};

export const PricingSection = () => {
  const [activePersona, setActivePersona] = useState<Persona>("farmer");
  const [billing, setBilling] = useState<Billing>("monthly");

  const PRICING = useMemo(() => {
    const farmer: Tier[] = [
      {
        tierLabel: "Launch",
        name: "Starter",
        description: "AI-powered care, records, and local ordering for your herd.",
        monthlyAmount: 5000,
        features: [
          "AI diagnosis (camera, call, chat)",
          "Animal profiles & basic records",
          "Order from nearby chemists",
          "USSD access",
        ],
        ctaLabel: "Start Free",
      },
      {
        tierLabel: "Growth",
        name: "Growth",
        description: "Full history, treatments, and health insights as you expand.",
        monthlyAmount: 15000,
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
        tierLabel: "Scale",
        name: "Pro",
        description: "Valuation, BNPL, alerts, and reporting for serious operations.",
        monthlyAmount: 20000,
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
        tierLabel: "Launch",
        name: "Starter",
        description: "NFC workflows, ordering, and client records from day one.",
        monthlyAmount: 5000,
        features: ["NFC scans & animal history", "Marketplace ordering", "Basic client records", "USSD access"],
        ctaLabel: "Start Free",
      },
      {
        tierLabel: "Growth",
        name: "Growth",
        description: "AI notes, small-team access, and priority support.",
        monthlyAmount: 15000,
        features: ["Everything in Starter", "AI notes & summaries", "Team access (small clinic)", "Priority support"],
        ctaLabel: "Upgrade",
        isFeatured: true,
      },
      {
        tierLabel: "Scale",
        name: "Pro",
        description: "Analytics, scheduling, and advanced clinic tooling.",
        monthlyAmount: 20000,
        features: ["Everything in Growth", "Clinic analytics", "Routing & scheduling", "Advanced tools & reporting"],
        ctaLabel: "Go Pro",
      },
    ];

    const supplier: Tier[] = [
      {
        tierLabel: "Launch",
        name: "Starter",
        description: "List products, get orders, and track inventory simply.",
        monthlyAmount: 5000,
        features: ["Basic listings", "Order notifications", "Inventory tracking", "USSD access"],
        ctaLabel: "Start Free",
      },
      {
        tierLabel: "Growth",
        name: "Growth",
        description: "Demand signals, distribution tools, and faster fulfillment.",
        monthlyAmount: 15000,
        features: ["Everything in Starter", "Demand signals", "Distribution tools", "Priority support"],
        ctaLabel: "Upgrade",
        isFeatured: true,
      },
      {
        tierLabel: "Scale",
        name: "Pro",
        description: "Forecasting, APIs, and enterprise-grade reporting.",
        monthlyAmount: 20000,
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
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#111811]/45 mb-3">Plans & pricing</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-6">
            Simple pricing.
            <br />
            Built for how you actually work.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {(["farmer", "vet", "supplier"] as Persona[]).map((persona) => (
              <button
                key={persona}
                type="button"
                onClick={() => setActivePersona(persona)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activePersona === persona
                    ? "bg-[#2D4D31]/12 text-[#2D4D31]"
                    : "text-[#111811]/50 hover:text-[#111811]/75 hover:bg-black/[0.04]"
                }`}
              >
                {persona === "farmer" ? "Farmers" : persona === "vet" ? "Vets" : "Suppliers"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-10 md:mb-12">
          <div
            className="inline-flex rounded-full border border-[#111811]/12 bg-[#F2F4F2] p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-white text-[#111811] shadow-sm ring-1 ring-black/[0.06]"
                  : "text-[#111811]/55 hover:text-[#111811]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                billing === "annual"
                  ? "bg-white text-[#111811] shadow-sm ring-1 ring-black/[0.06]"
                  : "text-[#111811]/55 hover:text-[#111811]"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {tiers.map((tier) => {
            const annualTotal = tier.monthlyAmount * 10;
            const showMonthly = billing === "monthly";
            const priceDisplay = showMonthly ? formatNaira(tier.monthlyAmount) : formatNaira(annualTotal);
            const periodSuffix = showMonthly ? "/month" : "/year";
            const billingNote = showMonthly ? "BILLED MONTHLY" : "BILLED ANNUALLY";

            return (
              <div
                key={`${activePersona}-${tier.name}`}
                className={[
                  "relative flex flex-col rounded-2xl border bg-white p-8 md:p-9 font-sans",
                  tier.isFeatured
                    ? "border-[#2D4D31]/35 shadow-lg ring-2 ring-[#2D4D31]/25 md:scale-[1.02] md:z-[1]"
                    : "border-black/[0.08] shadow-sm",
                ].join(" ")}
              >
                {tier.isFeatured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-[#2D4D31] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  </div>
                ) : null}

                <p className="text-[11px] font-bold uppercase tracking-wider text-[#111811]/45">{tier.tierLabel}</p>
                <h3 className="mt-2 text-xl font-bold text-[#111811] md:text-2xl">{tier.name}</h3>
                <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-[#111811]/55">{tier.description}</p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-1 gap-y-0">
                  <span className="text-3xl font-semibold tracking-tight text-[#111811] md:text-4xl">{priceDisplay}</span>
                  <span className="text-sm font-medium text-[#111811]/50">{periodSuffix}</span>
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#111811]/40">{billingNote}</p>

                <ul className="mt-8 flex-1 space-y-3 text-sm text-[#111811]/80">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2D4D31]/10 text-[#2D4D31]">
                        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={[
                    "mt-8 w-full rounded-xl py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4D31]/40 focus-visible:ring-offset-2",
                    tier.isFeatured
                      ? "bg-[#2D4D31] text-white hover:bg-[#243f28]"
                      : "border-2 border-[#2D4D31]/25 bg-transparent text-[#2D4D31] hover:bg-[#2D4D31]/5",
                  ].join(" ")}
                >
                  {tier.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
