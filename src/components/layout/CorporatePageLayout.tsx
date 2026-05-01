import { ReactNode, useEffect, useMemo, useState } from "react";

type CorporateSection = {
  id: string;
  label: string;
  content: ReactNode;
};

type Props = {
  title: string;
  subtitle?: string;
  sections: CorporateSection[];
  heroImageUrl?: string;
};

export const CorporatePageLayout = ({ title, subtitle, sections, heroImageUrl }: Props) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target) return;
        setActiveId((visible.target as HTMLElement).id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.15, 0.25, 0.35],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero banner */}
      <section className="relative overflow-hidden border-b border-black/[0.06] min-h-[50vh] flex items-center justify-center">
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : null}
        {/* Base + blend stack (keep text readable) */}
        <div className={`absolute inset-0 ${heroImageUrl ? "bg-[#0F1A12]/20" : "bg-[#0F1A12]"}`} />
        <div className="absolute inset-0 bg-[rgba(15,26,18,0.55)] mix-blend-multiply" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_30%_20%,rgba(45,77,49,0.55),transparent_55%),radial-gradient(circle_at_75%_30%,rgba(229,235,229,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_45%,rgba(15,26,18,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[6px] bg-[#2D4D31]" />

        <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-8 py-14 md:py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-sans font-medium tracking-tight leading-[1.05] mx-auto max-w-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-white/70 text-base md:text-lg max-w-3xl leading-relaxed mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>
      </section>

      {/* Content + TOC */}
      <section className="w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14">
          {/* Mobile TOC */}
          <div className="md:hidden mb-8">
            <div className="flex gap-2 overflow-auto pb-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    activeId === s.id
                      ? "bg-[#2D4D31] text-white border-[#2D4D31]"
                      : "bg-white text-[#111811]/70 border-black/10"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-14">
            {/* Desktop TOC */}
            <aside className="hidden md:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#111811]/45 mb-4">
                  Table of contents
                </p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                        activeId === s.id
                          ? "bg-[#E5EBE5] text-[#111811]"
                          : "text-[#111811]/65 hover:text-[#111811] hover:bg-black/[0.03]"
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="space-y-10">
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-xl md:text-2xl font-sans font-semibold text-[#111811] mb-4">
                      {s.label}
                    </h2>
                    <div className="text-[#111811]/75 leading-relaxed">{s.content}</div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

