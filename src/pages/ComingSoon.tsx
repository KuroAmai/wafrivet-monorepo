import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { CorporatePageLayout } from "@/components/layout/CorporatePageLayout";
import { Seo } from "@/components/seo/Seo";

type SeoMeta = {
  title: string;
  description: string;
  keywords: ReadonlyArray<string>;
};

type PageDef = {
  title: string;
  subtitle: string;
  sections: Array<{ id: string; label: string; content: ReactNode }>;
  primaryCta?: { label: string; href: string };
  heroImageUrl?: string;
  seo: SeoMeta;
};

const PAGES: Record<string, PageDef> = {
  "/referral": {
    title: "Referral & creator program",
    subtitle:
      "Help farmers and vets discover Wafrivet — earn as you do it. Whether you're a creator, community leader, vet, or agribusiness partner, our referral program rewards you for every farm, clinic, or supplier that joins through you.",
    sections: [
      {
        id: "how-it-works",
        label: "How the program works",
        content: (
          <ol className="space-y-3 list-decimal pl-5">
            <li>Sign up and get your unique link or code.</li>
            <li>Share Wafrivet with your network — content, events, or WhatsApp groups.</li>
            <li>Earn when they activate: tag animals, subscribe, or place marketplace orders.</li>
          </ol>
        ),
      },
      {
        id: "who-its-for",
        label: "Who it's for",
        content: (
          <ul className="space-y-2 list-disc pl-5">
            <li>Agricultural creators and influencers.</li>
            <li>Vets and paravets with strong client networks.</li>
            <li>Agro-dealer owners and managers.</li>
            <li>NGOs and programmes working with farmer groups.</li>
          </ul>
        ),
      },
      {
        id: "rewards",
        label: "Rewards & tiers",
        content: (
          <div className="space-y-3">
            <p>
              We keep rewards simple and transparent. Final numbers vary by channel and activation depth, but the structure
              looks like this:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#111811]">Tier 1:</strong> flat bonus per new paying farm.
              </li>
              <li>
                <strong className="text-[#111811]">Tier 2:</strong> higher bonus once you reach an activation threshold.
              </li>
              <li>
                <strong className="text-[#111811]">Tier 3:</strong> revenue share for large institutional or enterprise deals.
              </li>
            </ul>
            <p className="text-sm text-[#111811]/60 border-l-2 border-[#2D4D31]/30 pl-4">
              We’re finalising tiers and payouts — register interest and we’ll notify you when applications open.
            </p>
          </div>
        ),
      },
      {
        id: "apply",
        label: "Apply",
        content: (
          <div className="rounded-2xl border border-black/[0.08] bg-[#FAFBFA] p-6 md:p-8">
            <p className="mb-5">Want to be one of the first partners?</p>
            <a
              href="mailto:hello@wafrivet.com?subject=Referral%20program%20interest"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Join the referral program
            </a>
          </div>
        ),
      },
    ],
    primaryCta: { label: "Join the referral program", href: "mailto:hello@wafrivet.com?subject=Referral%20program%20interest" },
    heroImageUrl:
      "https://media.istockphoto.com/id/1297176679/photo/young-farmer-with-his-herd-of-livestock-in-the-field.jpg?s=612x612&w=0&k=20&c=Jni6qtAl9W5MLn-XU6-d5zFAQjxh3rzFzLAlsLjMmrs=",
    seo: {
      title: "Referral & creator program — Wafrivet",
      description:
        "Earn as you help farmers and vets discover Wafrivet. Join the referral and creator program for influencers, vets, agro-dealers, and partner organizations.",
      keywords: [
        "Wafrivet referral",
        "creator program",
        "agritech referral",
        "veterinary partner program",
        "farmer affiliate",
      ],
    },
  },
  "/riders": {
    title: "Riders & logistics partners",
    subtitle:
      "Deliver life-saving medicines to the last mile — and get paid reliably. Join the Wafrivet logistics network and move verified veterinary supplies from city warehouses to rural farms with clear routes and transparent payouts.",
    sections: [
      {
        id: "why-partner",
        label: "Why partner with Wafrivet",
        content: (
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-[#111811]">Steady, predictable routes</strong> — clustered orders so you’re not riding empty.
            </li>
            <li>
              <strong className="text-[#111811]">On-time, transparent payouts</strong> — clear rates per delivery and weekly settlements.
            </li>
            <li>
              <strong className="text-[#111811]">Support for rural navigation</strong> — maps, local guides, and farm contact details.
            </li>
            <li>
              <strong className="text-[#111811]">Impact that matters</strong> — you’re helping keep animals (and businesses) alive.
            </li>
          </ul>
        ),
      },
      {
        id: "requirements",
        label: "Requirements & onboarding",
        content: (
          <ul className="space-y-2 list-disc pl-5">
            <li>Valid ID and basic KYC.</li>
            <li>Motorcycle, tricycle, or van in good condition.</li>
            <li>Smartphone for route management and proof-of-delivery photos.</li>
            <li>Ability to handle cold-chain products where needed (we provide guidance for specialist routes).</li>
          </ul>
        ),
      },
      {
        id: "apply",
        label: "Apply",
        content: (
          <div className="rounded-2xl border border-black/[0.08] bg-[#FAFBFA] p-6 md:p-8">
            <p className="mb-5">Partner onboarding opens in phases by region.</p>
            <a
              href="mailto:hello@wafrivet.com?subject=Logistics%20partner%20interest"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Become a Wafrivet rider/partner
            </a>
          </div>
        ),
      },
    ],
    primaryCta: { label: "Become a partner", href: "mailto:hello@wafrivet.com?subject=Logistics%20partner%20interest" },
    heroImageUrl:
      "https://media.istockphoto.com/id/2165464510/photo/two-multiracial-men-in-lumberyard-with-clipboards-truck.jpg?s=612x612&w=0&k=20&c=ajxzEciAjau3XdocYruN0-mG8t0aI4T_H_F_axToySw=",
    seo: {
      title: "Riders & logistics partners — Wafrivet",
      description:
        "Deliver veterinary medicines to the last mile and get paid reliably. Join the Wafrivet logistics network with clustered routes, transparent payouts, and rural delivery support.",
      keywords: [
        "Wafrivet riders",
        "veterinary last mile",
        "rural delivery Africa",
        "logistics partner",
        "motorcycle delivery",
      ],
    },
  },
  "/careers": {
    title: "Careers",
    subtitle:
      "Help build the OS for livestock health across Africa. Wafrivet is a small, fast-moving team of engineers, vets, designers, and operators rethinking how livestock health works from the ground up.",
    sections: [
      {
        id: "why",
        label: "Why work at Wafrivet",
        content: (
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-[#111811]">Meaningful work</strong> — every feature and delivery reduces preventable animal deaths.
            </li>
            <li>
              <strong className="text-[#111811]">Serious problems, smart team</strong> — hardware, AI, and logistics challenges that matter.
            </li>
            <li>
              <strong className="text-[#111811]">Ownership from day one</strong> — small team, big responsibilities, room to grow fast.
            </li>
            <li>
              <strong className="text-[#111811]">Flexible, Africa-first culture</strong> — remote-friendly with on-ground time in key markets.
            </li>
          </ul>
        ),
      },
      {
        id: "values",
        label: "Values",
        content: (
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-[#111811]">Farm-first thinking.</strong> We start from realities on the ground.
            </li>
            <li>
              <strong className="text-[#111811]">Truth over comfort.</strong> Honest data and feedback beats feel-good stories.
            </li>
            <li>
              <strong className="text-[#111811]">Compassion and respect.</strong> For animals, farmers, partners, and each other.
            </li>
            <li>
              <strong className="text-[#111811]">Long-term ownership.</strong> We build systems that should matter in 10+ years.
            </li>
          </ul>
        ),
      },
      {
        id: "process",
        label: "How to join the team",
        content: (
          <div className="space-y-3">
            <p>
              Browse roles by team. If you don’t see a fit but feel strongly about our mission, send a general application —
              we review every one.
            </p>
            <p>
              Our process is straightforward: an intro conversation, a practical task or portfolio review, and a final
              discussion with the founders.
            </p>
          </div>
        ),
      },
      {
        id: "apply",
        label: "Apply",
        content: (
          <div className="rounded-2xl border border-black/[0.08] bg-[#FAFBFA] p-6 md:p-8">
            <p className="mb-5">We’re hiring selectively. Send a general application and we’ll reach out when there’s a fit.</p>
            <a
              href="mailto:hello@wafrivet.com?subject=General%20application"
              className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
            >
              Send a general application
            </a>
          </div>
        ),
      },
    ],
    primaryCta: { label: "View open roles", href: "mailto:hello@wafrivet.com?subject=Open%20roles" },
    heroImageUrl:
      "https://media.istockphoto.com/id/1297011397/photo/smiling-man-and-woman-standing-with-cow-at-farm.jpg?s=612x612&w=0&k=20&c=nCNMs-foOssMKorZc00XrOsbLCDwld-lSAtyxiIWy_k=",
    seo: {
      title: "Careers — Wafrivet",
      description:
        "Help build the OS for livestock health in Africa. Wafrivet is hiring engineers, vets, designers, and operators rethinking how animal health works from the ground up.",
      keywords: [
        "Wafrivet careers",
        "agritech jobs",
        "Africa startup jobs",
        "veterinary product roles",
        "remote agritech",
      ],
    },
  },
};

const ComingSoon = () => {
  const { pathname } = useLocation();
  const def = PAGES[pathname];

  if (!def) {
    return (
      <div className="flex-1 px-4 md:px-8 py-16 md:py-24 max-w-2xl mx-auto">
        <Seo
          title="Coming soon — Wafrivet"
          description="This Wafrivet page is on the way. In the meantime, explore the platform or get in touch with our team."
          path={pathname || "/coming-soon"}
          noindex
        />
        <h1 className="text-3xl font-medium text-[#111811] mb-6">Page</h1>
        <p className="text-[#111811]/70 leading-relaxed mb-8">This page is not available.</p>
        <Link to="/" className="text-[15px] font-semibold text-[#2D4D31] hover:underline underline-offset-4">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
    <Seo
      title={def.seo.title}
      description={def.seo.description}
      keywords={def.seo.keywords}
      path={pathname}
    />
    <CorporatePageLayout
      title={def.title}
      subtitle={def.subtitle}
      heroImageUrl={def.heroImageUrl}
      sections={[
        ...def.sections,
        {
          id: "contact",
          label: "Contact",
          content: (
            <div className="flex flex-col sm:flex-row gap-4">
              {def.primaryCta ? (
                <a
                  href={def.primaryCta.href}
                  className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
                >
                  {def.primaryCta.label}
                </a>
              ) : null}
              <a
                href="mailto:hello@wafrivet.com"
                className="inline-flex justify-center rounded-full border-2 border-[#2D4D31]/25 text-[#111811] px-6 py-2.5 text-[15px] font-semibold hover:border-[#2D4D31]/45 transition-colors"
              >
                Email us
              </a>
              <Link
                to="/"
                className="inline-flex justify-center rounded-full border-2 border-primary text-primary px-6 py-2.5 text-[15px] font-medium hover:bg-primary/5 transition-colors"
              >
                Back to home
              </Link>
            </div>
          ),
        },
      ]}
    />
    </>
  );
};

export default ComingSoon;
