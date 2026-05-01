import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, MessageCircle, Truck, Users } from "lucide-react";

const TILES = [
  {
    icon: Users,
    title: "Creators & leaders",
    description:
      "Share Wafrivet with your network and earn when farms, clinics, or suppliers activate through you.",
    cta: "Join the referral program",
    to: "/referral",
  },
  {
    icon: Truck,
    title: "Riders & logistics",
    description:
      "Deliver verified vet supplies to the last mile with clear routes and transparent payouts.",
    cta: "Become a partner",
    to: "/riders",
  },
  {
    icon: Briefcase,
    title: "Team",
    description:
      "Help build the OS for livestock health—engineering, ops, design, and field roles.",
    cta: "View open roles",
    to: "/careers",
  },
  {
    icon: MessageCircle,
    title: "Stay in the loop",
    description:
      "Get product updates and pilot news by WhatsApp or email—no spam, just signal.",
    cta: "Get updates",
    href: "mailto:hello@wafrivet.com?subject=Wafrivet%20updates",
    external: true,
  },
] as const;

export const CommunitySection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-[#F7F9F7] border-t border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Join the people building better herds.
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans">
            Whether you&apos;re a creator, community leader, vet, or agribusiness partner—there&apos;s a
            place for you in the Wafrivet ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TILES.map((tile) => {
            const Icon = tile.icon;
            const inner = (
              <>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-[#111811] mb-2">{tile.title}</h3>
                <p className="text-sm text-[#111811]/65 leading-relaxed mb-6 flex-1">{tile.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D4D31] group-hover:gap-2 transition-all">
                  {tile.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </>
            );

            if ("href" in tile) {
              return (
                <a
                  key={tile.title}
                  href={tile.href}
                  className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#2D4D31]/20 transition-all duration-300"
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={tile.title}
                to={tile.to}
                className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#2D4D31]/20 transition-all duration-300"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
