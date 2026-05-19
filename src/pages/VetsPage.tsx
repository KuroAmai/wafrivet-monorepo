import { Link } from "react-router-dom";
import { Radio, Mic2, Package, TrendingUp } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const CARDS = [
  {
    icon: Radio,
    title: "Instant history at the animal's ear",
    body: "Tap the NFC tag to see vaccines, treatments, previous diagnoses, and alerts before you even start your exam.",
  },
  {
    icon: Mic2,
    title: "An AI consultant in your pocket",
    body: "Talk through your exam; Wafrivet turns your voice and photos into structured clinical notes and a clean differential list.",
  },
  {
    icon: Package,
    title: "Better stock and ordering",
    body: "View demand from your own clients and nearby farms, and order directly from verified manufacturers and distributors.",
  },
  {
    icon: TrendingUp,
    title: "Higher-value services",
    body: "Offer herd-level health plans, remote monitoring, and outbreak response using Wafrivet data instead of guesswork.",
  },
] as const;

const VetsPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Seo
        title="Wafrivet for vets, paravets and agro-vets"
        description="A clinical OS for veterinarians, paravets, and agro-vet outlets across Africa — NFC animal records, AI-assisted notes, prescription tools, and a verified veterinary marketplace."
        keywords={[
          "Wafrivet for vets",
          "veterinary software Africa",
          "AI veterinary assistant",
          "NFC animal records",
          "paravet tools",
          "agro-vet platform",
          "veterinary prescription",
          "livestock clinical workflow",
        ]}
        path="/vets"
      />
      <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-[2.75rem] font-sans font-medium text-[#111811] leading-[1.1] mb-6">
            Do your best veterinary work — without drowning in paperwork.
          </h1>
          <p className="text-lg text-[#111811]/70 mb-10 leading-relaxed">
            Wafrivet gives vets, paravets, and agro-vets AI tools, NFC records, and a trusted marketplace so you can spend
            more time with animals and less time chasing notes and stock.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#product"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              See tools for vets
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 px-8 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/45 transition-colors"
            >
              Book a clinical workflow demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-12">
            One platform for field work, clinic work, and stock.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D4D31]/10 text-[#2D4D31]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111811] mb-2">{c.title}</h3>
                  <p className="text-[15px] text-[#111811]/70 leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8 bg-[#F7F9F7] border-y border-black/[0.06]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-10">
            Tools that respect your training and scope of work.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
              <h3 className="font-semibold text-[#111811] mb-3">For licensed veterinarians</h3>
              <p className="text-[15px] text-[#111811]/70 leading-relaxed">
                Full diagnostic support, prescription tools, and controlled drug ordering with complete audit trails.
              </p>
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
              <h3 className="font-semibold text-[#111811] mb-3">For paravets & community animal-health workers</h3>
              <p className="text-[15px] text-[#111811]/70 leading-relaxed">
                Guided checklists, risk flags, and referral workflows to partner vets when a case is beyond your scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] text-center mb-8">
            Grow your practice with Wafrivet.
          </h2>
          <ul className="space-y-4 text-[#111811]/75 mb-10 list-disc pl-5">
            <li>Join as an independent vet, clinic, or network.</li>
            <li>Get matched to farms that need on-ground support.</li>
            <li>Offer remote follow-ups via phone and WhatsApp.</li>
            <li>Build a longitudinal view of each client&apos;s herd over time.</li>
          </ul>
          <div className="text-center">
            <a
              href="mailto:hello@wafrivet.com?subject=Vet%20partner%20application"
              className="inline-flex rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Apply as a vet partner
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FAFBFA] border-t border-black/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-medium text-[#111811] mb-4">Simple plans for solo vets, clinics, and networks.</h2>
          <p className="text-[#111811]/65 mb-8 leading-relaxed">
            Whether you run a one-person mobile practice or a multi-branch clinic, choose a plan based on active farms and
            tools — from simple NFC records to full AI-assisted herd monitoring.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline underline-offset-4"
          >
            See vet & clinic pricing
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VetsPage;
