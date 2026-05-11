import { TeamShowcase } from "@/components/home/TeamShowcase";

const TeamPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-[1280px] mx-auto text-center mb-12 md:mb-14">
          <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Our team
          </h1>
          <p className="text-[#111811]/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the founders and the unofficial team members who visit the office every day.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto">
          <TeamShowcase showBios nameHeadingLevel={2} />
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
