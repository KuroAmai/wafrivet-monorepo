import { Link } from "react-router-dom";
import { footerLinkGroups } from "@/content/footerLinks";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="w-full mt-auto bg-background border-t border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center mb-6" aria-label="Home">
              <img src="/logo.svg" alt="Wafrivet" className="h-8 md:h-10 w-auto" />
            </Link>
            <p className="text-[#111811]/60 text-[15px] leading-relaxed max-w-[280px] mb-8">
              The OS for Livestock Agriculture. Connecting farmers, vets, and suppliers into one seamless ecosystem.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-black/[0.06] flex items-center justify-center text-[#111811]/60 hover:text-[#111811] hover:bg-black/[0.03] transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-black/[0.06] flex items-center justify-center text-[#111811]/60 hover:text-[#111811] hover:bg-black/[0.03] transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-black/[0.06] flex items-center justify-center text-[#111811]/60 hover:text-[#111811] hover:bg-black/[0.03] transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-black/[0.06] flex items-center justify-center text-[#111811]/60 hover:text-[#111811] hover:bg-black/[0.03] transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#111811]">Product</h3>
            <ul className="flex flex-col gap-4">
              {footerLinkGroups.product.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-[#111811]/60 hover:text-[#111811] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#111811]">Solutions</h3>
            <ul className="flex flex-col gap-4">
              {footerLinkGroups.solutions.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-[#111811]/60 hover:text-[#111811] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#111811]">Company</h3>
            <ul className="flex flex-col gap-4">
              {footerLinkGroups.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-[#111811]/60 hover:text-[#111811] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#111811]">Legal</h3>
            <ul className="flex flex-col gap-4">
              {footerLinkGroups.legal.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-[#111811]/60 hover:text-[#111811] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              {footerLinkGroups.investors.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-[#111811]/60 hover:text-[#111811] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[13px] text-[#111811]/45">
            © {new Date().getFullYear()} Wafrivet. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[13px] text-[#111811]/45 hover:text-[#111811] transition-colors">
              English (NG)
            </button>
            <button className="text-[13px] text-[#111811]/45 hover:text-[#111811] transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
