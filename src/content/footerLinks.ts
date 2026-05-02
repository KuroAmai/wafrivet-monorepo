export type FooterLink = {
  label: string;
  to: string;
};

export const footerPrimaryLinks: FooterLink[] = [
  { label: "Overview", to: "/#product" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Careers", to: "/careers" },
];

export const footerLinkGroups = {
  product: [
    { label: "Overview", to: "/#product" },
    { label: "How it Works", to: "/#how-it-works" },
    { label: "Hardware", to: "/#product" },
    { label: "AI", to: "/#product" },
    { label: "Marketplace", to: "/#product" },
  ],
  solutions: [
    { label: "Farmers", to: "/farmers" },
    { label: "Vets & Agro-vets", to: "/vets" },
    { label: "Suppliers & Manufacturers", to: "/suppliers" },
  ],
  company: [
    { label: "About", to: "/#proof" },
    { label: "Careers", to: "/careers" },
    { label: "Referral & Creator Program", to: "/referral" },
    { label: "Rider & Logistics Partners", to: "/riders" },
  ],
  investors: [
    { label: "Investor Relations", to: "/investors" },
  ],
  legal: [
    { label: "Terms", to: "/terms" },
    { label: "Privacy", to: "/privacy" },
    { label: "Cookies", to: "/cookies" },
  ],
} satisfies Record<string, FooterLink[]>;

