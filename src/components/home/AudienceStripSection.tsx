import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Stethoscope, Factory } from "lucide-react";

const CARDS = [
  {
    title: "For Farmers & Herd Owners",
    subtitle: "Farmer OS & Smart Tags",
    body: "Reduce deaths, catch disease earlier, and stop losing money to guesswork.",
    cta: "See everything farmers get",
    to: "/farmers",
    icon: Sprout,
  },
  {
    title: "For Vets, Agro-vets & Animal-health workers",
    subtitle: "Vet Console & AI Assistant",
    body: "Spend less time on paperwork, more time practising medicine — with better tools and better clients.",
    cta: "See tools for vets",
    to: "/vets",
    icon: Stethoscope,
  },
  {
    title: "For Suppliers & Manufacturers",
    subtitle: "Supplier Hub & Marketplace",
    body: "Reach qualified demand, ship to farms with real data, and protect your brand from counterfeit risk.",
    cta: "See how we work with suppliers",
    to: "/suppliers",
    icon: Factory,
  },
] as const;

export const AudienceStripSection = () => {
  return (
    <section id="audience" className="w-full py-16 md:py-24 bg-[#F7F9F7] border-y border-black/[0.06] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#2D4D31]/90 mb-3">
          Tools for every side of livestock
        </p>
        <h2 className="text-center text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
          Built for everyone in the livestock chain.
        </h2>
        <p className="text-center text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans mb-12 md:mb-14">
          One platform with a tailored entry point whether you raise animals, treat them, or supply the industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm hover:shadow-md hover:border-[#2D4D31]/20 transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-[#111811] mb-1 leading-snug">{card.title}</h3>
                <p className="text-sm font-medium text-[#2D4D31]/90 mb-3">{card.subtitle}</p>
                <p className="text-sm text-[#111811]/65 leading-relaxed mb-6 flex-1">{card.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D4D31] group-hover:gap-2 transition-all">
                  {card.cta}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
