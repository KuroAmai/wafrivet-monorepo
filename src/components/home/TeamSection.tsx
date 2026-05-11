import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TeamShowcase } from "@/components/home/TeamShowcase";

export const TeamSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-[#F7F9F7] border-t border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Our team
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans mb-6">
            The people behind Wafrivet.
          </p>
          <Link
            to="/team"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D4D31] hover:gap-2 transition-all"
          >
            Team page
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <TeamShowcase />
      </div>
    </section>
  );
};
