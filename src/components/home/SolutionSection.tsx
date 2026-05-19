import { useState, useEffect } from "react";

const TRACK_DURATION = 35; // 35 seconds for a full loop
const ICONS = [
  {
    src: "/solution/livestock.svg",
    title: "Livestock Management",
    description: "Monitor health, growth, and breeding cycles in one place."
  },
  {
    src: "/solution/nfc.svg",
    title: "Smart NFC Tags",
    description: "Instant identification and history tracking with a simple tap."
  },
  {
    src: "/solution/ai-diagonosis.svg",
    title: "AI Diagnosis",
    description: "Real-time health assessment and disease detection using AI."
  },
  {
    src: "/solution/marketplace.svg",
    title: "Marketplace",
    description: "Order genuine vet medicines. Track delivery in real time."
  },
  {
    src: "/solution/data-intelligence.svg",
    title: "Data Intelligence",
    description: "Actionable insights to optimize productivity and yield."
  },
  {
    src: "/solution/financial-services.svg",
    title: "Financial Services",
    description: "Access loans and insurance tailored for your livestock business."
  },
  {
    src: "/solution/ussd.svg",
    title: "USSD Access",
    description: "Manage your farm even without an internet connection."
  },
];

const TRACK_PATH = "M320 850 C450 150 950 550 1300 -100";

const isGeckoLike = () => {
  if (typeof navigator === "undefined") return false;
  return /Gecko\//.test(navigator.userAgent) && !/like Gecko/.test(navigator.userAgent);
};

const TrackIcon = ({
  item,
  index,
  isActive,
  isHovered,
  isPaused,
  onClick,
  onHover,
  onLeave
}: {
  item: typeof ICONS[0];
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isPaused: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const delay = -(TRACK_DURATION / ICONS.length) * index;
  const flatGlass = isGeckoLike();

  return (
    <foreignObject
      width="140"
      height="140"
      x="-70"
      y="-70"
      className="overflow-visible pointer-events-none"
      style={{
        offsetPath: `path('${TRACK_PATH}')`,
        offsetDistance: '0%',
        offsetRotate: '0deg',
        animation: `moveAlongPath ${TRACK_DURATION}s linear infinite`,
        animationDelay: `${delay}s`,
        animationPlayState: isPaused ? 'paused' : 'running',
        zIndex: (isActive || isHovered) ? 50 : 20
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="group relative flex items-center justify-center pointer-events-auto">
          {/* The glass bubble: Interactive trigger specifically on the icon shell */}
          <div
            className={`relative w-[84px] h-[84px] rounded-full p-2.5 
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center cursor-pointer
              ${(isActive || isHovered)
                ? 'scale-125 -translate-y-4 brightness-110 bg-transparent border-transparent shadow-none backdrop-blur-none'
                : 'backdrop-blur-[12px] bg-white/15 border-[0.5px] border-white/40 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          >
            <div className={`absolute top-[10%] left-[15%] w-[35%] h-[12%] bg-gradient-to-r from-white/60 to-transparent rounded-full blur-[1px] -rotate-[35deg] pointer-events-none transition-all duration-500 ${(isActive || isHovered) ? 'opacity-0 scale-125' : 'opacity-100'}`} />
            <div className={`absolute inset-[2px] rounded-full border-[1.5px] border-white/20 pointer-events-none transition-opacity duration-500 ${(isActive || isHovered) ? 'opacity-0' : 'opacity-100'}`} />
            <img src={item.src} alt={item.title} className={`w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] relative z-10 transition-transform duration-500 ${(isActive || isHovered) ? 'scale-150' : 'scale-100'}`} />
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none transition-opacity duration-500 ${(isActive || isHovered) ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D4D31]/10 via-transparent to-white/20 mix-blend-overlay pointer-events-none transition-opacity duration-500 ${(isActive || isHovered) ? 'opacity-0' : 'opacity-40'}`} />
          </div>
        </div>
      </div>
    </foreignObject>
  );
};

export const SolutionSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const flatGlass = isGeckoLike();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes moveAlongPath {
        from { offset-distance: 0%; }
        to { offset-distance: 100%; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const activeItem = activeIndex !== null ? ICONS[activeIndex] : hoveredIndex !== null ? ICONS[hoveredIndex] : null;

  return (
    <section
      id="product"
      className="w-full py-12 md:py-16 bg-background scroll-mt-24"
      onClick={() => setActiveIndex(null)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[480px] md:h-[500px] bg-[#E5EBE5] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col lg:flex-row shadow-sm">

          {/* Blur Background element from SVG */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img src="/solution/bg.svg" alt="" className="w-full h-full object-cover opacity-90" />
          </div>

          {/* Left side text */}
          <div className="w-full lg:w-[45%] h-[200px] lg:h-full flex flex-col justify-start px-8 md:px-16 lg:px-24 pt-8 md:pt-12 lg:pt-16 relative z-20 pointer-events-none">
            <h2 className="text-[1.75rem] sm:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.5rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-3">
              <span className="whitespace-nowrap">One platform. 7+ tools.</span><br />
              <span className="whitespace-nowrap">Every problem solved.</span>
            </h2>
            <span className="text-[0.9375rem] md:text-[1rem] font-semibold font-quicksand text-black/70 leading-[1.4] whitespace-nowrap max-w-[420px]">
              Think of it like Google, but built for West African<br className="hidden md:block" />
              livestock. Every tool works together, under one<br className="hidden md:block" />
              account.
            </span>
          </div>

          {/* Full-width track container */}
          <div className="absolute inset-0 z-10">
            <svg width="100%" height="100%" viewBox="0 0 1440 660" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 w-full h-full">
              {/* Outer glassy tube line */}
              <path
                d={TRACK_PATH}
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />

              {/* Inner detail line */}
              <path
                d={TRACK_PATH}
                stroke="#ffffff"
                strokeOpacity="0.2"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* The Animated Icons (inside SVG coordinate space for perfect alignment) */}
              {ICONS.map((item, index) => {
                const isPaused = activeIndex !== null || hoveredIndex !== null;
                return (
                  <TrackIcon
                    key={index}
                    item={item}
                    index={index}
                    isActive={activeIndex === index}
                    isHovered={hoveredIndex === index}
                    isPaused={isPaused}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Ultra-Reflective Global Corner Card */}
          <div className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 z-40 w-[300px] md:w-[380px] 
            transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${activeItem ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}
          `}>
            <div className="relative group overflow-hidden rounded-[32px] p-8 backdrop-blur-[24px] bg-white/25 border-[0.5px] border-white/45 shadow-[0_25px_50px_-18px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.12)]">
              {/* Specular Surface Reflection (Sharp Highlight) */}
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/20 to-white/40 mix-blend-overlay rotate-[35deg] pointer-events-none transition-transform duration-1000 group-hover:translate-x-4 group-hover:-translate-y-4" />

              {/* Secondary Refraction Sheen */}
              <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-50" />

              <div className="relative z-10">
                <h3 className="text-[1.5rem] font-sans font-semibold text-[#111811] mb-3 leading-tight tracking-tight">
                  {activeItem?.title}
                </h3>
                <p className="text-[1.0625rem] font-quicksand font-medium text-[#111811]/70 leading-relaxed">
                  {activeItem?.description}
                </p>
              </div>

              {/* Reactive internal glow layer */}
              <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

        </div>

        <div className="text-center mt-8 md:mt-10 pointer-events-auto">
          <a
            href="#audience"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2D4D31] hover:text-[#243f28] underline-offset-4 hover:underline"
          >
            See what each tool does for you
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
