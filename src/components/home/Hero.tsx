import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full pt-16 md:pt-24 pb-0 min-h-screen flex flex-col items-center justify-start bg-background overflow-hidden">
      {/* Text Content */}
      <div className="text-black relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full">
        <h1 className="text-5xl font-geist font-medium tracking-tight leading-[1.05] mb-7">
          Everything your livestock business<br className="hidden sm:block" />
          needs. Finally in one place.
        </h1>
        <p className="text-xl md:text-[22px] font-quicksand font-medium  mb-10 max-w-2xl leading-[1.05]">
          No more juggling tools. No more delays.<br className="hidden sm:block" />
          Just clarity, speed, and control.
        </p>

        <button className="font-quicksand group flex items-center bg-primary text-primary-foreground rounded-full pl-7 pr-2.5 py-1.5 text-[1.1rem] font-medium hover:bg-primary/95 transition-all active:scale-[0.98] gap-3">
          Get Started
          <div className="bg-[#E5EBE5] text-primary rounded-full p-2 group-hover:scale-105 transition-transform flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </div>
        </button>
      </div>

      {/* Hero Image Container */}
      <div className="relative w-full mt-10 md:mt-16 flex-1 flex flex-col items-center justify-end z-0 pb-2 lg:pb-4 max-h-[60vh] md:max-h-none h-full min-h-[400px]">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-[30px] md:rounded-b-[50px] overflow-hidden">
          {/* White blend: hide the very top of the image */}
          <div
            className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none"
            style={{ backgroundColor: "hsl(var(--background))" }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-64 z-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 45%, rgba(0,0,0,0) 100%)",
            }}
          />

          <img
            src="/heroimage.png"
            alt="Herd of healthy cattle grazing in a green African pasture — Wafrivet livestock health platform"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
