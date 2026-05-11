import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Briefcase, MessageCircle, Truck, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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

const CARD_CLASS =
  "group flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#2D4D31]/20 transition-all duration-300";

export const CommunitySection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    const refresh = () => {
      setSnapCount(api.scrollSnapList().length);
      sync();
    };

    refresh();
    api.on("select", sync);
    api.on("reInit", refresh);

    return () => {
      api.off("select", sync);
      api.off("reInit", refresh);
    };
  }, [api]);

  const showControls = snapCount > 1;

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

        <Carousel
          opts={{ align: "start", containScroll: "trimSnaps", loop: false }}
          setApi={setApi}
          className="relative"
          aria-label="Ways to join the Wafrivet ecosystem"
        >
          {showControls ? (
            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#111811] transition-colors hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canNext}
                aria-label="Next slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#111811] transition-colors hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : null}

          <CarouselContent className="-ml-4">
            {TILES.map((tile) => {
              const Icon = tile.icon;
              const inner = (
                <>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111811] mb-2">{tile.title}</h3>
                  <p className="text-sm text-[#111811]/65 leading-relaxed mb-6 flex-1">
                    {tile.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D4D31] group-hover:gap-2 transition-all">
                    {tile.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </>
              );

              return (
                <CarouselItem
                  key={tile.title}
                  className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3"
                >
                  {"href" in tile ? (
                    <a href={tile.href} className={CARD_CLASS}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={tile.to} className={CARD_CLASS}>
                      {inner}
                    </Link>
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {showControls ? (
            <div className="mt-6 flex justify-center gap-1.5">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selectedIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selectedIndex
                      ? "w-6 bg-[#2D4D31]"
                      : "w-1.5 bg-black/15 hover:bg-black/25"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </Carousel>
      </div>
    </section>
  );
};
