import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Factory, Sprout, Stethoscope } from "lucide-react";
import { useEffect } from "react";

const pillClass =
  "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-[#2D4D31] shadow-sm shadow-emerald-900/5 hover:bg-emerald-100 transition-all active:scale-[0.98]";

const microLabelClass = "text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6";

function ProductRows({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 md:p-5 transition-colors hover:border-[#2D4D31]/15"
        >
          <p className="text-[14px] font-black text-gray-900 mb-1.5">{item.title}</p>
          <p className="text-[14px] text-gray-600 leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

const PREVIEW_CARDS = [
  {
    icon: Sprout,
    title: "Farmers & herd owners",
    hook: "Early signals, one history per animal, orders that reach the farm.",
    hash: "farmers",
  },
  {
    icon: Stethoscope,
    title: "Vets & animal-health workers",
    hook: "NFC context at the ear, AI-assisted notes, smarter stock.",
    hash: "vets",
  },
  {
    icon: Factory,
    title: "Suppliers & manufacturers",
    hook: "Verified demand, traceability, logistics built for rural delivery.",
    hash: "suppliers",
  },
] as const;

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
    <div className="flex-1 flex flex-col bg-[#F9FAFB]">
      <section className="relative w-full py-16 md:py-20 px-4 md:px-8 border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-[12px] font-black uppercase tracking-[0.2em] text-[#2D4D31]/80 mb-4">Platform overview</p>
          <h1 className="text-center text-3xl md:text-[2.5rem] font-black text-gray-900 tracking-tight leading-[1.1] mb-5 max-w-3xl mx-auto">
            One OS — three ways to work with livestock health.
          </h1>
          <p className="text-center text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Farmers, vets, and suppliers each get focused tools on Wafrivet. Everything ties back to tagged animals, verified
            records, and a marketplace built for real farms — not generic e‑commerce.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-14">
            <Link to="/tools#farmers" className={pillClass}>
              Farmers
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link to="/tools#vets" className={pillClass}>
              Vets
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link to="/tools#suppliers" className={pillClass}>
              Suppliers
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {PREVIEW_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.hash}
                  to={`/tools#${card.hash}`}
                  className="group flex flex-col rounded-[32px] border border-gray-100 bg-white p-6 md:p-7 shadow-sm hover:border-[#2D4D31]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#2D4D31]">
                    <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </div>
                  <h2 className="text-[15px] font-black text-gray-900 tracking-tight mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{card.hook}</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#2D4D31] group-hover:gap-2 transition-all">
                    Jump in
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="farmers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto rounded-[40px] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-[1.75rem] font-black text-gray-900 tracking-tight mb-4">For farmers</h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Catch problems earlier, keep trustworthy health history per animal, and order medicines from verified agro‑vet
            partners — with tools that work on smartphones, USSD, WhatsApp, or voice where coverage allows.
          </p>
          <p className={microLabelClass}>What you use on Wafrivet</p>
          <ProductRows
            items={[
              {
                title: "Herd",
                body: "Operational hub: animal registry, vitals and health history, prioritized alerts, NFC scan flows at the animal, and farm-level views.",
              },
              {
                title: "Shop",
                body: "Browse and order vaccines and medicines from verified sellers; delivery coordinated with logistics partners that understand rural routes.",
              },
              {
                title: "Wafrivet App",
                body: "Sign in, welcome hub, and account dashboard for settings, wallet, and cross-product shortcuts.",
              },
              {
                title: "Channels",
                body: "Smartphone PWA, plus pathways like USSD and calls so essential actions stay reachable on simpler phones.",
              },
            ]}
          />
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link
              to="/farmers"
              className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.08em] text-[#2D4D31] hover:gap-3 transition-all"
            >
              Read the full farmer overview
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="vets" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto rounded-[40px] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-[1.75rem] font-black text-gray-900 tracking-tight mb-4">
            For vets, agro‑vets &amp; animal‑health workers
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Tap NFC for instant history at the animal, lean on AI-assisted notes from voice and photos, and manage
            prescriptions and stock through the same verified network farmers trust — with scope-appropriate flows for
            licensed vets and paravets.
          </p>
          <p className={microLabelClass}>What you use on Wafrivet</p>
          <ProductRows
            items={[
              {
                title: "Herd",
                body: "Clinical and field workflows: animal detail, health records, alerts, AI-assisted capture, and herd-level context before you examine.",
              },
              {
                title: "Shop",
                body: "Demand-aware ordering from verified manufacturers and distributors; better alignment between what farms need and what you stock.",
              },
              {
                title: "Wafrivet App",
                body: "Authentication, welcome launcher, and account area for admin tasks across Herd and Shop.",
              },
              {
                title: "Identity layer",
                body: "NFC-tagged animals so history follows the animal across visits, farms, and providers.",
              },
            ]}
          />
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link
              to="/vets"
              className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.08em] text-[#2D4D31] hover:gap-3 transition-all"
            >
              Read the full vet &amp; agro‑vet overview
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="suppliers" className="scroll-mt-24 py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto rounded-[40px] border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-[1.75rem] font-black text-gray-900 tracking-tight mb-4">For suppliers &amp; distributors</h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Reach verified farms, clinics, and agro‑vet outlets with demand and disease-context signals — not anonymous
            carts — and protect your brand with traceability from batch to animal where the network supports it.
          </p>
          <p className={microLabelClass}>What you use on Wafrivet</p>
          <ProductRows
            items={[
              {
                title: "Shop",
                body: "Marketplace presence, chemist and branch console patterns for inventory and orders, and distributor-style network views where your programme uses them.",
              },
              {
                title: "Demand intelligence",
                body: "Regional and species-level signals from alerts and ordering patterns to steer stock and campaigns.",
              },
              {
                title: "Wafrivet App",
                body: "Partner and account surfaces for teams that manage multiple outlets or roles.",
              },
              {
                title: "Logistics",
                body: "Collaboration with rider and last-mile partners oriented to farm and clinic delivery.",
              },
            ]}
          />
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link
              to="/suppliers"
              className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.08em] text-[#2D4D31] hover:gap-3 transition-all"
            >
              Read the full supplier overview
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto text-center rounded-[40px] border border-gray-100 bg-white px-6 py-12 md:py-14 shadow-sm">
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Next step</p>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-4">
            Ready to pick a plan or book a walkthrough?
          </h2>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            Compare pricing for your segment on the homepage or talk to the team for pilots and partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-8 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] hover:bg-[#243f28] transition-colors"
            >
              View pricing
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex justify-center rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] text-gray-900 hover:border-[#2D4D31]/30 transition-colors"
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
