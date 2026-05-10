import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

const pillClass =
  "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#2D4D31]/20 bg-white px-6 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/40 transition-colors";

const ToolsOverviewPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F7F9F7] to-background border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-[2.75rem] font-sans font-medium text-[#111811] leading-[1.1] mb-6">
            One OS — three ways to work with livestock health.
          </h1>
          <p className="text-lg text-[#111811]/70 mb-10 leading-relaxed">
            Farmers, vets, and suppliers each get focused tools on Wafrivet. Everything ties back to tagged animals, verified
            records, and a marketplace built for real farms — not generic e‑commerce.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/tools#farmers" className={pillClass}>
              See what farmers get
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/tools#vets" className={pillClass}>
              See tools for vets
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/tools#suppliers" className={pillClass}>
              See options for suppliers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="farmers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] mb-4">For farmers</h2>
          <p className="text-[17px] text-[#111811]/70 leading-relaxed mb-8 max-w-3xl">
            Catch problems earlier, keep trustworthy health history per animal, and order medicines from verified agro‑vet
            partners — with tools that work on smartphones, USSD, WhatsApp, or voice where coverage allows.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-[#2D4D31] uppercase tracking-wide mb-4">What you use on Wafrivet</h3>
            <ul className="space-y-3 text-[15px] text-[#111811]/80 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-[#111811]">Herd</strong> — operational hub: animal registry, vitals and health
                history, prioritized alerts, NFC scan flows at the animal, and farm-level views.
              </li>
              <li>
                <strong className="text-[#111811]">Shop</strong> — browse and order vaccines and medicines from verified
                sellers; delivery coordinated with logistics partners that understand rural routes.
              </li>
              <li>
                <strong className="text-[#111811]">Wafrivet App</strong> — sign in, welcome hub, and account dashboard for
                settings, wallet, and cross-product shortcuts.
              </li>
              <li>
                <strong className="text-[#111811]">Channels</strong> — smartphone PWA, plus pathways like USSD and calls so
                essential actions stay reachable on simpler phones.
              </li>
            </ul>
          </div>
          <Link
            to="/farmers"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline"
          >
            Read the full farmer overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section id="vets" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8 bg-[#F7F9F7] border-y border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] mb-4">For vets, agro‑vets &amp; animal‑health workers</h2>
          <p className="text-[17px] text-[#111811]/70 leading-relaxed mb-8 max-w-3xl">
            Tap NFC for instant history at the animal, lean on AI-assisted notes from voice and photos, and manage
            prescriptions and stock through the same verified network farmers trust — with scope-appropriate flows for
            licensed vets and paravets.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-[#2D4D31] uppercase tracking-wide mb-4">What you use on Wafrivet</h3>
            <ul className="space-y-3 text-[15px] text-[#111811]/80 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-[#111811]">Herd</strong> — clinical and field workflows: animal detail, health
                records, alerts, AI-assisted capture, and herd-level context before you examine.
              </li>
              <li>
                <strong className="text-[#111811]">Shop</strong> — demand-aware ordering from verified manufacturers and
                distributors; better alignment between what farms need and what you stock.
              </li>
              <li>
                <strong className="text-[#111811]">Wafrivet App</strong> — authentication, welcome launcher, and account
                area for admin tasks across Herd and Shop.
              </li>
              <li>
                <strong className="text-[#111811]">Identity layer</strong> — NFC-tagged animals so history follows the
                animal across visits, farms, and providers.
              </li>
            </ul>
          </div>
          <Link
            to="/vets"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline"
          >
            Read the full vet &amp; agro‑vet overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section id="suppliers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-[#111811] mb-4">For suppliers &amp; distributors</h2>
          <p className="text-[17px] text-[#111811]/70 leading-relaxed mb-8 max-w-3xl">
            Reach verified farms, clinics, and agro‑vet outlets with demand and disease-context signals — not anonymous
            carts — and protect your brand with traceability from batch to animal where the network supports it.
          </p>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8 shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-[#2D4D31] uppercase tracking-wide mb-4">What you use on Wafrivet</h3>
            <ul className="space-y-3 text-[15px] text-[#111811]/80 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-[#111811]">Shop</strong> — marketplace presence, chemist and branch console patterns
                for inventory and orders, and distributor-style network views where your programme uses them.
              </li>
              <li>
                <strong className="text-[#111811]">Demand intelligence</strong> — regional and species-level signals from
                alerts and ordering patterns to steer stock and campaigns.
              </li>
              <li>
                <strong className="text-[#111811]">Wafrivet App</strong> — partner and account surfaces for teams that
                manage multiple outlets or roles.
              </li>
              <li>
                <strong className="text-[#111811]">Logistics</strong> — collaboration with rider and last-mile partners
                oriented to farm and clinic delivery.
              </li>
            </ul>
          </div>
          <Link
            to="/suppliers"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2D4D31] hover:underline"
          >
            Read the full supplier overview
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#F7F9F7] border-t border-black/[0.06]">
        <div className="max-w-2xl mx-auto text-center rounded-3xl border border-[#2D4D31]/15 bg-[#FAFBFA] px-6 py-12">
          <h2 className="text-xl md:text-2xl font-medium text-[#111811] mb-4">Ready to pick a plan or book a walkthrough?</h2>
          <p className="text-[15px] text-[#111811]/70 mb-8 leading-relaxed">
            Compare pricing for your segment on the homepage or talk to the team for pilots and partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              View pricing
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 px-8 py-3 text-[15px] font-semibold text-[#111811] hover:border-[#2D4D31]/45 transition-colors"
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
