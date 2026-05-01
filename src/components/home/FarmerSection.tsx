import { useState, useEffect, useRef } from "react";

const STEP_DURATION = 5000; // ms per step

const STEPS = [
  {
    image: "/farmers/1.jpg",
    label: "Diagnose",
    heading: "Farmer notices a sick goat.",
    body: "Opens Wafrivet, points camera at the animal. AI spots the symptoms, asks two questions, and returns a diagnosis with a treatment plan. In plain English. Or Pidgin.",
  },
  {
    image: "/farmers/2.jpg",
    label: "Order",
    heading: "Prescription becomes a cart.",
    body: "The AI recommends the right drug and finds the nearest chemist with it in stock. Farmer orders in one tap. Pays with Paystack, USSD, or splits it with BNPL.",
  },
  {
    image: "/farmers/3.jpg",
    label: "Treat",
    heading: "Medicine arrives. Animal is treated.",
    body: "Record is saved. Chemist gets the order, rider picks up. Farmer tracks delivery live. Treatment is logged to the animal's profile automatically.",
  },
];

export const FarmerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number>(0);

  // Animate progress bar with rAF for smoothness
  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      pausedProgressRef.current = progress;
      return;
    }

    // Reset start time accounting for already-elapsed progress
    const elapsed = pausedProgressRef.current * STEP_DURATION;
    startTimeRef.current = Date.now() - elapsed;

    const tick = () => {
      const now = Date.now();
      const pct = Math.min((now - startTimeRef.current) / STEP_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveIndex((prev) => (prev + 1) % STEPS.length);
        startTimeRef.current = Date.now();
        pausedProgressRef.current = 0;
        setProgress(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, activeIndex]);

  const handleStepClick = (index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setActiveIndex(index);
    setProgress(0);
    pausedProgressRef.current = 0;
    startTimeRef.current = Date.now();
    setIsPaused(false);
  };

  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight">
            Simple for farmers.<br />
            Powerful for everyone else.
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

          {/* Left — Steps Cards */}
          <div
            className="w-full lg:w-2/5 flex flex-col gap-3 md:gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={`relative p-5 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ${isActive ? "bg-[#2D4D31]/10" : "bg-[#2D4D31]/10 hover:bg-[#2D4D31]/10"
                    }`}
                  onClick={() => handleStepClick(index)}
                >
                  <p className="text-[0.9375rem] md:text-[1rem] font-sans text-[#111811]/80 leading-[1.5]">
                    <span className="font-medium text-[#111811]">{step.heading}</span> {step.body}
                  </p>

                  {/* Progress Line */}
                  <div className={`mt-4 h-[2px] w-full rounded-full overflow-hidden transition-opacity duration-300 ${isActive ? 'bg-black/10 opacity-100' : 'opacity-0'}`}>
                    <div
                      className="h-full bg-[#2D4D31] rounded-full transition-none"
                      style={{
                        width: isActive ? `${progress * 100}%` : index < activeIndex ? "100%" : "0%",
                        transition: isActive ? "none" : "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — Image */}
          <div className="w-full lg:w-3/5 relative rounded-[28px] md:rounded-[40px] overflow-hidden min-h-[320px] lg:min-h-0 bg-[#F2F4F2]">
            {STEPS.map((step, index) => (
              <img
                key={index}
                src={step.image}
                alt={step.label}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${index === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-[1.03]"
                  }`}
              />
            ))}

            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

            {/* Label at bottom left */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
              <span className="text-white text-3xl md:text-5xl font-medium tracking-tight">
                {STEPS[activeIndex].label}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
