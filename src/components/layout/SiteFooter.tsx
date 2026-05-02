import { Link } from "react-router-dom";
import { footerPrimaryLinks } from "@/content/footerLinks";

export const SiteFooter = () => {
  return (
    <footer className="w-full mt-auto bg-background border-t border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="py-9 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <nav
            aria-label="Footer"
            className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-x-8 md:gap-x-10 gap-y-3 md:gap-y-0"
          >
            {footerPrimaryLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[12px] tracking-[0.18em] uppercase font-semibold text-[#111811]/60 hover:text-[#111811] transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center">
            <Link to="/" className="inline-flex items-center" aria-label="Home">
              <img src="/logo.svg" alt="" aria-hidden className="h-5 md:h-6 w-auto opacity-100" />
            </Link>
          </div>

          <div className="text-center md:text-right text-[12px] text-[#111811]/45">
            © {new Date().getFullYear()} Wafrivet. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
