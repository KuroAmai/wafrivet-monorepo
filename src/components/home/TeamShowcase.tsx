import type { ReactNode } from "react";
import { Linkedin } from "lucide-react";

const TEAM_PHOTO_FRAME =
  "relative w-full min-w-0 overflow-hidden rounded-2xl border border-black/[0.06] shadow-sm";

const quicksandNameStyle = {
  fontFamily: "'Quicksand', ui-sans-serif, system-ui, sans-serif",
} as const;

function TeamPhotoFrame({
  imageSrc,
  imageAlt,
  aspectClassName = "aspect-[4/5]",
  imgWidth = 800,
  imgHeight = 1000,
}: {
  imageSrc: string;
  imageAlt: string;
  aspectClassName?: string;
  imgWidth?: number;
  imgHeight?: number;
}) {
  return (
    <div className={`${TEAM_PHOTO_FRAME} ${aspectClassName}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        width={imgWidth}
        height={imgHeight}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function CardNameHeading({
  level,
  children,
}: {
  level: 2 | 3;
  children: React.ReactNode;
}) {
  const className =
    "text-center text-lg font-semibold text-[#111811] md:text-xl font-quicksand";
  if (level === 2) {
    return (
      <h2 className={className} style={quicksandNameStyle}>
        {children}
      </h2>
    );
  }
  return (
    <h3 className={className} style={quicksandNameStyle}>
      {children}
    </h3>
  );
}

function TeamShowcaseColumn({
  imageSrc,
  imageAlt,
  label,
  role,
  bio,
  showBios,
  aspectClassName,
  imgWidth,
  imgHeight,
  nameHeadingLevel,
  linkedinHref,
}: {
  imageSrc: string;
  imageAlt: string;
  label: string;
  role: string;
  bio?: string;
  showBios?: boolean;
  aspectClassName?: string;
  imgWidth?: number;
  imgHeight?: number;
  nameHeadingLevel: 2 | 3;
  linkedinHref?: string;
}) {
  return (
    <article className="flex min-w-0 flex-col items-center gap-3">
      <TeamPhotoFrame
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        aspectClassName={aspectClassName}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
      />
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardNameHeading level={nameHeadingLevel}>{label}</CardNameHeading>
        <p className="text-sm font-sans text-[#111811]/55">{role}</p>
        {linkedinHref ? (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] text-[#111811]/55 transition-colors hover:bg-black/[0.03] hover:text-[#2D4D31]"
            aria-label={`${label} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
        {showBios && bio ? (
          <p className="max-w-xs text-sm leading-relaxed text-[#111811]/65 font-sans">
            {bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export type TeamShowcaseProps = {
  /** One-line bios under role (team page). */
  showBios?: boolean;
  /** Use `2` when this block follows a page `h1` (e.g. team page); `3` when it follows a section `h2` (home). */
  nameHeadingLevel?: 2 | 3;
  founderLinkedIn?: {
    leslie?: string;
    giftAsor?: string;
  };
};

export function TeamShowcase({
  showBios = false,
  nameHeadingLevel = 3,
  founderLinkedIn,
}: TeamShowcaseProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[1fr_1.65fr_1fr] lg:items-start">
      <TeamShowcaseColumn
        imageSrc="/Leslie.png"
        imageAlt="Leslie, co-founder"
        label="Leslie"
        role="Co-founder"
        bio="Building tools farmers and vets can rely on."
        showBios={showBios}
        nameHeadingLevel={nameHeadingLevel}
        linkedinHref={founderLinkedIn?.leslie}
      />
      <TeamShowcaseColumn
        imageSrc="/mochi-mocha.jpg"
        imageAlt="Mochi and Mocha, company pets"
        label="Mochi and Mocha"
        role="Company pets"
        bio="Chief morale officers and professional sunbeam testers."
        showBios={showBios}
        aspectClassName="aspect-[4/3]"
        imgWidth={800}
        imgHeight={600}
        nameHeadingLevel={nameHeadingLevel}
      />
      <TeamShowcaseColumn
        imageSrc="/Tsukimi.png"
        imageAlt="Gift Asor, co-founder"
        label="Gift Asor"
        role="Co-founder"
        bio="Product and engineering with livestock and animal health in mind."
        showBios={showBios}
        nameHeadingLevel={nameHeadingLevel}
        linkedinHref={founderLinkedIn?.giftAsor}
      />
    </div>
  );
}
