import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { scrollToHash } from "@/lib/scrollToHash";
import { Seo } from "@/components/seo/Seo";

const pillClass =
  "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#2D4D31]/20 bg-white px-5 py-3 text-sm font-semibold text-[#2D4D31] hover:bg-[#F7F9F7] transition-colors active:scale-[0.98]";

const ToolsOverviewPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToHash(hash);
  }, [hash]);

  return (
    <div className="flex-1 flex flex-col">
      <Seo
        title="Wafrivet platform tools — Herd, Shop and Wafrivet App"
        description="See how Wafrivet's tools work together for farmers, vets, agro-vets, and suppliers — NFC animal records, AI diagnostics, a verified veterinary marketplace, and multi-channel access."
        keywords={[
          "Wafrivet tools",
          "Wafrivet Herd",
          "Wafrivet Shop",
          "livestock OS",
          "NFC livestock platform",
          "veterinary tools",
          "agritech platform",
        ]}
        path="/tools"
      />
      <section className="relative w-full py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#2D4D31]/90 mb-4">Platform overview</p>
          <h1 className="text-center font-sans font-medium text-3xl md:text-[2.5rem] text-[#111811] leading-[1.1] mb-5 max-w-3xl mx-auto">
            One OS — three ways to work with livestock health.
          </h1>
          <p className="text-center text-base md:text-lg text-[#111811]/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Farmers, vets, and suppliers each get focused tools on Wafrivet. Everything ties back to tagged animals, verified
            records, and a marketplace built for real farms — not generic e‑commerce.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <Link to="/tools#farmers" className={pillClass}>
              Farmers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/tools#vets" className={pillClass}>
              Vets
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/tools#suppliers" className={pillClass}>
              Suppliers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="farmers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-[1.75rem] font-sans font-medium text-[#111811] mb-4">For farmers</h2>
          <p className="text-[15px] md:text-[17px] text-[#111811]/60 leading-relaxed mb-8 max-w-3xl">
            Catch problems earlier, keep trustworthy health history per animal, and order medicines from verified agro‑vet
            partners — with tools that work on smartphones, USSD, WhatsApp, or voice where coverage allows.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 mb-8">
            <p className="text-sm font-semibold text-[#111811] mb-4">What you use on Wafrivet</p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-[#111811]/70 leading-relaxed">
              <li>
                <span className="font-semibold text-[#111811]">Herd — </span>
                Operational hub: animal registry, vitals and health history, prioritized alerts, NFC scan flows at the animal,
                and farm-level views.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Shop — </span>
                Browse and order vaccines and medicines from verified sellers; delivery coordinated with logistics partners
                that understand rural routes.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Wafrivet App — </span>
                Sign in, welcome hub, and account dashboard for settings, wallet, and cross-product shortcuts.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Channels — </span>
                Smartphone PWA, plus pathways like USSD and calls so essential actions stay reachable on simpler phones.
              </li>
            </ul>
          </div>
          <Link
            to="/farmers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D4D31] hover:gap-3 transition-all"
          >
            Read the full farmer overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section id="vets" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8 bg-[#F7F9F7]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-[1.75rem] font-sans font-medium text-[#111811] mb-4">
            For vets, agro‑vets &amp; animal‑health workers
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111811]/60 leading-relaxed mb-8 max-w-3xl">
            Tap NFC for instant history at the animal, lean on AI-assisted notes from voice and photos, and manage
            prescriptions and stock through the same verified network farmers trust — with scope-appropriate flows for
            licensed vets and paravets.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 mb-8">
            <p className="text-sm font-semibold text-[#111811] mb-4">What you use on Wafrivet</p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-[#111811]/70 leading-relaxed">
              <li>
                <span className="font-semibold text-[#111811]">Herd — </span>
                Clinical and field workflows: animal detail, health records, alerts, AI-assisted capture, and herd-level
                context before you examine.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Shop — </span>
                Demand-aware ordering from verified manufacturers and distributors; better alignment between what farms need
                and what you stock.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Wafrivet App — </span>
                Authentication, welcome launcher, and account area for admin tasks across Herd and Shop.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Identity layer — </span>
                NFC-tagged animals so history follows the animal across visits, farms, and providers.
              </li>
            </ul>
          </div>
          <Link
            to="/vets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D4D31] hover:gap-3 transition-all"
          >
            Read the full vet &amp; agro‑vet overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section id="suppliers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-[1.75rem] font-sans font-medium text-[#111811] mb-4">
            For suppliers &amp; distributors
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111811]/60 leading-relaxed mb-8 max-w-3xl">
            Reach verified farms, clinics, and agro‑vet outlets with demand and disease-context signals — not anonymous
            carts — and protect your brand with traceability from batch to animal where the network supports it.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 mb-8">
            <p className="text-sm font-semibold text-[#111811] mb-4">What you use on Wafrivet</p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-[#111811]/70 leading-relaxed">
              <li>
                <span className="font-semibold text-[#111811]">Shop — </span>
                Marketplace presence, chemist and branch console patterns for inventory and orders, and distributor-style
                network views where your programme uses them.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Demand intelligence — </span>
                Regional and species-level signals from alerts and ordering patterns to steer stock and campaigns.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Wafrivet App — </span>
                Partner and account surfaces for teams that manage multiple outlets or roles.
              </li>
              <li>
                <span className="font-semibold text-[#111811]">Logistics — </span>
                Collaboration with rider and last-mile partners oriented to farm and clinic delivery.
              </li>
            </ul>
          </div>
          <Link
            to="/suppliers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D4D31] hover:gap-3 transition-all"
          >
            Read the full supplier overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto text-center rounded-3xl border border-[#2D4D31]/15 bg-[#FAFBFA] px-6 py-12 md:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2D4D31]/80 mb-3">Next step</p>
          <h2 className="text-xl md:text-2xl font-sans font-medium text-[#111811] mb-4">
            Ready to pick a plan or book a walkthrough?
          </h2>
          <p className="text-[15px] text-[#111811]/60 mb-8 leading-relaxed">
            Compare pricing for your segment on the homepage or talk to the team for pilots and partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#243f28] transition-colors"
            >
              View pricing
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full border-2 border-black/[0.08] bg-white px-8 py-3.5 text-sm font-semibold text-[#111811] hover:border-[#2D4D31]/30 transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsOverviewPage;
