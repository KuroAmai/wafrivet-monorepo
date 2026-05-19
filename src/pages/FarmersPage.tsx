import { Link } from "react-router-dom";
import { Sprout, Pill, Scan, Smartphone } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const BENEFITS = [
  {
    icon: Sprout,
    title: "Early warning for sick animals",
    body: "Smart tags track temperature and movement 24/7 and flag animals that look unwell — often days before obvious symptoms.",
  },
  {
    icon: Pill,
    title: "Fast access to real medicines",
    body: "Order verified drugs and vaccines from trusted agro-vet partners, with riders that understand how to reach your farm.",
  },
  {
    icon: Scan,
    title: "One simple health history per animal",
    body: "Scan the tag with a phone to see every vaccine, treatment, and illness — even if you changed vets or moved farms.",
  },
  {
    icon: Smartphone,
    title: "Tools for every type of phone",
    body: "Use a smartphone app, WhatsApp, USSD, or normal calls. Even a basic feature phone can still fully use Wafrivet.",
  },
] as const;

const FarmersPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Seo
        title="Wafrivet for farmers — Early disease alerts and real medicines"
        description="Wafrivet helps livestock farmers in Africa catch disease early, order genuine vaccines and medicines, and keep one trusted health history per animal — even on a basic phone."
        keywords={[
          "Wafrivet for farmers",
          "livestock farming Africa",
          "early disease detection",
          "animal health alerts",
          "veterinary medicines delivery",
          "smart livestock tags",
          "feature phone farming",
          "USSD farm tools",
        ]}
        path="/farmers"
      />
      <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-[2.75rem] font-sans font-medium text-[#111811] leading-[1.1] mb-6">
            Stop losing animals — and money — to problems you never saw coming.
          </h1>
          <p className="text-lg text-[#111811]/70 mb-10 leading-relaxed">
            Wafrivet gives you early disease alerts, faster access to medicines, and simple tools that work on any phone. No
            jargon. No extra stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Get Started as a Farmer
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 px-8 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/45 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-12">
            What farmers get with the Wafrivet OS.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111811] mb-2">{b.title}</h3>
                  <p className="text-[15px] text-[#111811]/70 leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8 bg-[#F7F9F7] border-y border-black/[0.06]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-12">
            Designed for your real daily routine.
          </h2>
          <ul className="space-y-8">
            <li>
              <h3 className="font-semibold text-[#111811] mb-2">Morning checks</h3>
              <p className="text-[#111811]/70 leading-relaxed">
                Glance at your herd overview. No alerts — you move on. When there is an issue, you already know which
                animals to isolate.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-[#111811] mb-2">During an outbreak</h3>
              <p className="text-[#111811]/70 leading-relaxed">
                Wafrivet tells you which paddock, which animals, and which disease is most likely. You act early instead of
                waiting until half the herd is down.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-[#111811] mb-2">When drugs run low</h3>
              <p className="text-[#111811]/70 leading-relaxed">
                Reminders before vaccines or key medicines finish, and reorder from trusted suppliers in a few taps or via
                USSD.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center rounded-3xl border border-[#2D4D31]/15 bg-[#FAFBFA] px-6 py-12 md:px-10">
          <h2 className="text-xl md:text-2xl font-medium text-[#111811] mb-4">Start small. Grow as your herd grows.</h2>
          <p className="text-[#111811]/65 mb-8 leading-relaxed">
            Begin with a basic tag package for 10–50 animals, then upgrade to full farm intelligence when you&apos;re
            ready. Our team and local partners handle installation, training, and support.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline underline-offset-4"
          >
            See farmer pricing
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FarmersPage;
