import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Stethoscope, Factory } from "lucide-react";

const CARDS = [
  {
    title: "For Farmers & Herd Owners",
    subtitle: "Farmer OS & Smart Tags",
    body: "Reduce deaths, catch disease earlier, and stop losing money to guesswork.",
    cta: "See everything farmers get",
    to: "/tools#farmers",
    icon: Sprout,
  },
  {
    title: "For Vets, Agro-vets & Animal-health workers",
    subtitle: "Vet Console & AI Assistant",
    body: "Spend less time on paperwork, more time practising medicine — with better tools and better clients.",
    cta: "See tools for vets",
    to: "/tools#vets",
    icon: Stethoscope,
  },
  {
    title: "For Suppliers & Manufacturers",
    subtitle: "Supplier Hub & Marketplace",
    body: "Reach qualified demand, ship to farms with real data, and protect your brand from counterfeit risk.",
    cta: "See how we work with suppliers",
    to: "/tools#suppliers",
    icon: Factory,
  },
] as const;

export const AudienceStripSection = () => {
  return (
    <section id="audience" className="w-full py-16 md:py-24 bg-[#F9FAFB] border-y border-gray-100 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <p className="text-center text-[12px] font-black uppercase tracking-[0.2em] text-[#2D4D31]/85 mb-3">
          Tools for every side of livestock
        </p>
        <h2 className="text-center text-[1.85rem] sm:text-[2.35rem] md:text-[2.75rem] font-black text-gray-900 leading-[1.08] tracking-tight mb-4">
          Built for everyone in the livestock chain.
        </h2>
        <p className="text-center text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-14 leading-relaxed">
          One platform with a tailored entry point whether you raise animals, treat them, or supply the industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group flex flex-col rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#2D4D31]/20 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#2D4D31]">
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-[17px] font-black text-gray-900 mb-2 leading-snug tracking-tight">{card.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{card.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{card.body}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-black text-[#2D4D31] group-hover:gap-2.5 transition-all">
                  {card.cta}
                  <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
