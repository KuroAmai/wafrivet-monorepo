const TESTIMONIALS = [
  {
    quote:
      "Before Wafrivet, we only called the vet when half the herd was sick. Now we get alerts early enough to stop it from spreading.",
    attribution: "Pilot farmer",
    place: "Kaduna",
  },
  {
    quote:
      "The AI consultant means I never leave a farm without a clean, complete record. It's like having a digital assistant in my pocket.",
    attribution: "Field vet",
    place: "Plateau",
  },
  {
    quote:
      "Better data and faster logistics are saving animals — and money — for the operations we support.",
    attribution: "Agro-vet partner",
    place: "Nigeria",
  },
] as const;

const PARTNERS = [
  "Pilot cooperatives",
  "Regional agro-vet networks",
  "Field veterinary practices",
  "Verified suppliers",
];

export const SocialProofSection = () => {
  return (
    <section id="proof" className="w-full py-16 md:py-24 bg-white scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-medium text-[#111811] leading-[1.1] tracking-tight mb-4">
            Trusted by farmers, vets, and suppliers across Nigeria.
          </h2>
          <p className="text-[#111811]/60 text-lg max-w-2xl mx-auto font-sans">
            From smallholder goat farmers to commercial dairy operations, Wafrivet is already proving that better data
            and faster logistics save animals — and money.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-14">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded-full border border-black/[0.08] bg-[#F7F9F7] px-4 py-2 text-sm font-medium text-[#111811]/80"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.place + t.attribution}
              className="flex flex-col rounded-2xl border border-black/[0.06] bg-[#FAFBFA] p-6 md:p-8 shadow-sm"
            >
              <p className="text-[15px] md:text-base text-[#111811]/85 leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <footer className="text-sm text-[#111811]/55">
                <span className="font-semibold text-[#111811]/75">{t.attribution}</span>
                {t.place ? (
                  <>
                    {" "}
                    <span aria-hidden>·</span> <cite className="not-italic">{t.place}</cite>
                  </>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
