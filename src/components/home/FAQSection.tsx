import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Do I need stable internet on my farm?",
    a: "No. Tags use LoRaWAN and satellite, and you can interact via USSD or a normal phone call if data is poor.",
  },
  {
    q: "Is Wafrivet only for big farms?",
    a: "No. We have tiers for smallholders (as low as 10 animals) up to commercial ranches with thousands of animals.",
  },
  {
    q: "Do I have to replace my existing records or apps?",
    a: "You can start with tags and alerts only, then gradually move records and orders into Wafrivet as it makes sense.",
  },
  {
    q: "Which countries do you support today?",
    a: "We're starting in Nigeria and expanding across Africa — reach out if you'd like to be a launch partner in your country.",
  },
] as const;

export const FAQSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Questions, answered.
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans">
            Straight answers about connectivity, farm size, your existing tools, and where we operate.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto mb-14 md:mb-16">
          <Accordion type="single" collapsible className="rounded-2xl overflow-hidden">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-b border-black/[0.06] last:border-b-0 px-1 data-[state=open]:bg-white data-[state=open]:shadow-[inset_3px_0_0_0_#2D4D31] transition-colors"
              >
                <AccordionTrigger className="px-5 md:px-6 py-4 md:py-5 text-left text-[15px] md:text-base font-semibold text-[#111811] hover:no-underline rounded-none data-[state=open]:hover:bg-transparent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 md:px-6 text-[#111811]/70 text-[15px] leading-relaxed pb-5 pt-0">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-w-[760px] mx-auto text-center rounded-3xl bg-gradient-to-b from-[#F2F4F2] to-[#E8EDE9]/90 border border-[#2D4D31]/10 px-6 py-10 md:px-10 md:py-12">
          <h3 className="text-xl md:text-2xl font-medium text-[#111811] mb-3 leading-snug whitespace-normal md:whitespace-nowrap">
            Ready to turn your herd into a smart, connected herd?
          </h3>
          <p className="text-[#111811]/65 text-sm md:text-base mb-8 max-w-md mx-auto">
            Book a live walkthrough and see how Wafrivet can fit your farm, clinic, or supply business in under 30
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="#"
              className="inline-flex w-full sm:w-auto justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold shadow-sm hover:bg-[#243f28] transition-colors"
            >
              Book a Demo
            </Link>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border-2 border-[#2D4D31]/25 bg-white/80 px-8 py-3 text-[15px] font-semibold text-[#2D4D31] hover:bg-white hover:border-[#2D4D31]/40 transition-colors"
            >
              Talk to our team on WhatsApp
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
