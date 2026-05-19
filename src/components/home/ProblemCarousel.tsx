import { useState, useEffect } from "react";
import { ClipboardList, Stethoscope, Package, Users } from "lucide-react";

interface CardData {
  id: number;
  image: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  heading: string;
  body: string;
  closing: string;
}

const cardsData: CardData[] = [
  {
    id: 0,
    image: "/heroimage.png",
    label: "Herd Health",
    sublabel: "Proactive care to prevent livestock losses.",
    icon: <ClipboardList className="w-5 h-5" />,
    heading: "Livestock shouldn't be this hard to manage.",
    body: "Farmers lose animals to preventable diseases. Medicines take weeks to arrive. Records are scattered or lost. Stock runs out without warning. And everyone operates in silos.",
    closing: "The system is broken. So we rebuilt it.",
  },
  {
    id: 1,
    image: "/records.jpg",
    label: "Farm records",
    sublabel: "Track every detail for every animal.",
    icon: <Stethoscope className="w-5 h-5" />,
    heading: "Your animals deserve better care.",
    body: "Missed vaccinations, late diagnoses, and poor record-keeping cost farmers millions each year. Veterinarians struggle to access medical history when it matters most.",
    closing: "We built Wafrivet to change that.",
  },
  {
    id: 2,
    image: "/supply.jpg",
    label: "Supply chain",
    sublabel: "From pharmacy to farm, no delays.",
    icon: <Package className="w-5 h-5" />,
    heading: "Getting medicine shouldn't take weeks.",
    body: "Agro-vet chemists hold critical supplies but lack visibility into demand. Farmers can't find what they need, where they need it. Everyone loses.",
    closing: "One platform to connect them all.",
  },
  {
    id: 3,
    image: "/comms.jpg",
    label: "Community",
    sublabel: "Connecting farmers and vets everywhere.",
    icon: <Users className="w-5 h-5" />,
    heading: "We're stronger when connected.",
    body: "Isolated farming communities lack access to expert veterinary advice. Knowledge silos prevent best practices from spreading. Collaboration is almost non-existent.",
    closing: "Wafrivet bridges the gap.",
  },
];

export const ProblemCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleCardHover = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const activeCard = cardsData[activeIndex];

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
          {/* Left - Card Carousel */}
          <div
            className="flex gap-1.5 lg:w-[55%] h-[420px] md:h-[480px]"
            onMouseLeave={handleMouseLeave}
          >
            {cardsData.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={card.id}
                  className={`relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isActive ? "flex-[3]" : "flex-[0.6]"
                    }`}
                  onMouseEnter={() => handleCardHover(index)}
                  onClick={() => handleCardHover(index)}
                >
                  {/* Image */}
                  <img
                    src={card.image}
                    alt={`${card.label} — ${card.sublabel}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-100" : "scale-110"
                      }`}
                    style={{
                      objectPosition: `${25 + index * 20}% center`,
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Bottom content - only visible when active */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium font-quicksand text-[15px] leading-tight">
                          {card.label}
                        </p>
                        <p className="text-white/70 text-xs font-quicksand leading-tight">
                          {card.sublabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side icon when collapsed */}
                  <div
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-500 ${isActive
                      ? "opacity-0 scale-75"
                      : "opacity-100 scale-100"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      {card.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Text Content */}
          <div className="lg:w-[45%] flex flex-col justify-center">
            <div className="relative min-h-[280px]">
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  className={`transition-all duration-500 ease-out ${index === activeIndex
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-6 absolute inset-0 pointer-events-none"
                    }`}
                >
                  <h2 className="text-[2rem] md:text-[2.5rem] font-sans font-semibold text-black leading-[1.1] mb-6 tracking-tight">
                    {card.heading}
                  </h2>
                  <p className="text-[17px] font-quicksand font-medium text-black/80 leading-[1.6] mb-6">
                    {card.body}
                  </p>
                  <p className="text-[17px] font-quicksand font-medium text-black/90 leading-[1.6]">
                    {card.closing}
                  </p>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-1.5 mt-8 text-[15px] font-semibold text-[#2D4D31] hover:text-[#243f28] underline-offset-4 hover:underline"
                  >
                    See how Wafrivet works
                    <span aria-hidden>→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
