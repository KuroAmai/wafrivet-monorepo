import { Link } from "react-router-dom";
import { BarChart3, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const CARDS = [
  {
    icon: BarChart3,
    title: "Visibility into real demand",
    body: "See which regions and species are driving alerts and orders — so you allocate stock where it's truly needed.",
  },
  {
    icon: BadgeCheck,
    title: "Verified buying network",
    body: "Sell to vetted farmers, clinics, and agro-vet outlets, not anonymous accounts.",
  },
  {
    icon: ShieldCheck,
    title: "Counterfeit protection",
    body: "Use Wafrivet as an official digital channel, with traceability from batch to animal, to combat substandard and fake products.",
  },
  {
    icon: Truck,
    title: "Logistics that actually reach farms",
    body: "Collaborate with Wafrivet rider and logistics partners who understand rural deliveries.",
  },
] as const;

const SuppliersPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-[2.75rem] font-sans font-medium text-[#111811] leading-[1.1] mb-6">
            Reach real livestock demand — not just shelves.
          </h1>
          <p className="text-lg text-[#111811]/70 mb-10 leading-relaxed">
            Wafrivet connects your products to verified farms, vets, and agro-vet outlets with real-time disease and usage
            data, so you can ship smarter and protect your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@wafrivet.com?subject=Supplier%20partnership"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Become a supplier partner
            </a>
            <Link
              to="/#product"
              className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 px-8 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/45 transition-colors"
            >
              Download supplier overview
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-12">
            Data-driven distribution for veterinary products.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111811] mb-2">{c.title}</h3>
                  <p className="text-[15px] text-[#111811]/70 leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8 bg-[#F7F9F7] border-y border-black/[0.06]">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-8">
            Flexible ways to plug into the Wafrivet OS.
          </h2>
          <ul className="space-y-4 text-[#111811]/75 mb-10 list-disc pl-5">
            <li>Direct manufacturer partnerships with brand stores inside the marketplace.</li>
            <li>Regional distributor partnerships with shared SLAs.</li>
            <li>White-label options for co-branded programmes with governments and NGOs.</li>
          </ul>
          <div className="text-center">
            <a
              href="mailto:hello@wafrivet.com?subject=Partnerships"
              className="inline-flex rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Talk to our partnerships team
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center rounded-3xl border border-[#2D4D31]/15 bg-[#FAFBFA] px-6 py-12">
          <h2 className="text-xl md:text-2xl font-medium text-[#111811] mb-4">Pricing built around your volume and integrations.</h2>
          <p className="text-[#111811]/65 mb-8 leading-relaxed">
            Supplier pricing is based on volume, integrations, and support level — not a flat table. Tell us how you operate
            today and where you&apos;re headed; we&apos;ll share a clear proposal.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline underline-offset-4"
          >
            Discuss supplier pricing
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuppliersPage;
