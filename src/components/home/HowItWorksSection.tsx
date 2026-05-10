import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    title: "Tag the animal at the ear.",
    caption: "Every animal becomes instantly identifiable — and its health record starts automatically.",
    kind: "image",
    src: "/cow-removebg-preview 1.png",
    alt: "Cow",
  },
  {
    title: "Connect via satellite & towers.",
    caption: "Coverage works beyond cities — your farm stays connected even in remote areas.",
    kind: "image",
    src: "/tower-removebg-preview.png",
    alt: "Connectivity tower",
  },
  {
    title: "AI helps you decide fast.",
    caption: "Signals become clear guidance — what’s wrong, who’s at risk, and what to do next.",
    kind: "image",
    src: "/phone2.png",
    alt: "Phone showing Wafrivet AI",
  },
  {
    title: "Farmers get clear alerts in the app.",
    caption: "Everything comes through one place — app, WhatsApp, or USSD when needed.",
    kind: "image",
    src: "/woman-removebg-preview 1.png",
    alt: "Farmer smiling at her phone",
  },
  {
    title: "Deliver the right treatment — with the full record.",
    caption: "From diagnosis to delivery, every action is logged and traceable across the farm timeline.",
    kind: "image",
    src: "/mockup.svg",
    alt: "Phone mockup",
  },
] as const;

export const HowItWorksSection = () => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"next" | "prev">("next");

  const goPrev = React.useCallback(() => {
    setDirection("prev");
    setActiveStepIndex((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  }, []);

  const goNext = React.useCallback(() => {
    setDirection("next");
    setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
  }, []);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-background scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            How Wafrivet works.
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans">
            Five steps from hardware on the ear to medicine at the gate.
          </p>
        </div>

        <div className="max-w-[980px] mx-auto mb-12 md:mb-14">
          <div className="relative">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous step"
              className="hidden sm:inline-flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center p-4 hover:opacity-70 transition-opacity"
            >
              <img src="/arrow.svg" alt="" aria-hidden className="h-16 w-16" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next step"
              className="hidden sm:inline-flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center p-4 hover:opacity-70 transition-opacity"
            >
              <img src="/arrow.svg" alt="" aria-hidden className="h-16 w-16 -scale-x-100" />
            </button>

            <div className="mx-auto w-[min(720px,100%)]">
              <div className="relative w-full">
                <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[500px]">
                  <div
                    key={activeStepIndex}
                    className={[
                      "relative",
                      "animate-in fade-in-0 duration-500 ease-out",
                      direction === "next" ? "slide-in-from-right-6" : "slide-in-from-left-6",
                    ].join(" ")}
                  >
                    {activeStep.kind === "image" ? (
                      <img
                        src={activeStep.src}
                        alt={activeStep.alt}
                        className="max-h-[360px] md:max-h-[440px] w-auto object-contain rounded-3xl"
                        loading="eager"
                      />
                    ) : (
                      <div className="relative aspect-[1440/2430] w-[min(320px,100%)] md:w-[min(380px,100%)]">
                        <div className="absolute left-[8%] right-[8%] top-[6%] bottom-[6%] overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-[#EAF1EB] via-white to-[#F3F6F3]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center px-6">
                              <div className="text-sm font-semibold text-[#111811]">App screen</div>
                              <div className="text-xs text-[#111811]/60 mt-1">Replace with a screenshot/video later</div>
                            </div>
                          </div>
                        </div>
                        <img
                          src="/mockup.svg"
                          alt=""
                          aria-hidden
                          className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none"
                        />
                      </div>
                    )}

                    <div
                      aria-hidden
                      className={[
                        "pointer-events-none absolute inset-y-0 -left-12 w-24",
                        "bg-gradient-to-r from-transparent via-white/35 to-transparent",
                        "blur-md",
                        "animate-in fade-in-0 duration-500 ease-out",
                        direction === "next" ? "slide-in-from-left-10" : "slide-in-from-right-10",
                      ].join(" ")}
                    />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <div className="text-xs font-semibold text-[#111811]/55 font-sans">
                    Step {activeStepIndex + 1} of {STEPS.length}
                  </div>
                  <h3 className="mt-2 text-[1.35rem] md:text-[1.6rem] leading-[1.1] font-sans font-medium text-[#111811] tracking-tight">
                    {activeStep.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] text-[#111811]/70 leading-relaxed font-sans max-w-[56ch] mx-auto">
                    {activeStep.caption}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2" aria-label="How it works progress">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "h-2 w-2 rounded-full transition-all motion-reduce:transition-none",
                        i === activeStepIndex ? "bg-[#2D4D31] ring-4 ring-[#2D4D31]/15" : "bg-[#111811]/12",
                      ].join(" ")}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center justify-center rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#111811]"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#111811]"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/tools#farmers"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#2D4D31]/20 bg-white px-6 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/40 transition-colors"
          >
            See what farmers get
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to="/tools#vets"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#2D4D31]/20 bg-white px-6 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/40 transition-colors"
          >
            See tools for vets
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to="/tools#suppliers"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#2D4D31]/20 bg-white px-6 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/40 transition-colors"
          >
            See options for suppliers
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};
