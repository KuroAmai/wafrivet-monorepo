import { Link } from "react-router-dom";
import { CorporatePageLayout } from "@/components/layout/CorporatePageLayout";

const PrivacyPage = () => {
  return (
    <CorporatePageLayout
      title="Privacy Policy"
      subtitle="This policy explains how Wafrivet collects, uses, and shares personal information. Replace placeholders with counsel-approved text before launch."
      heroImageUrl="https://media.istockphoto.com/id/956944426/photo/black-and-white-cows-in-green-grassy-meadow-under-blue-sky-near-amersfoort-in-holland.jpg?s=612x612&w=0&k=20&c=TaRru05qmnGUJkkoRKN7LgJbYu8Iig4y1FTisgziSWU="
      sections={[
        {
          id: "overview",
          label: "Overview",
          content: (
            <p>
              This Privacy Policy applies to our website and associated services. By using Wafrivet, you consent to the
              practices described here.
            </p>
          ),
        },
        {
          id: "information-we-collect",
          label: "Information we collect",
          content: (
            <ul className="space-y-2 list-disc pl-5">
              <li>Contact details (e.g., name, phone number, email) you submit through forms.</li>
              <li>Account and usage data (e.g., device information, feature usage, diagnostics logs).</li>
              <li>Operational data related to livestock management (where applicable).</li>
            </ul>
          ),
        },
        {
          id: "how-we-use",
          label: "How we use information",
          content: (
            <ul className="space-y-2 list-disc pl-5">
              <li>Provide, maintain, and improve our services.</li>
              <li>Communicate with you about pilots, onboarding, support, and updates.</li>
              <li>Prevent fraud, abuse, and security incidents.</li>
            </ul>
          ),
        },
        {
          id: "sharing",
          label: "Sharing & disclosures",
          content: (
            <p>
              We may share information with service providers (e.g., hosting, analytics) and partners only as needed to
              provide services, comply with legal obligations, or protect Wafrivet and users. We do not sell personal
              information.
            </p>
          ),
        },
        {
          id: "retention",
          label: "Retention",
          content: (
            <p>
              We retain information for as long as necessary to provide services and comply with legal requirements. The
              exact period depends on the type of data and your relationship with Wafrivet.
            </p>
          ),
        },
        {
          id: "your-rights",
          label: "Your rights",
          content: (
            <ul className="space-y-2 list-disc pl-5">
              <li>Request access, correction, or deletion of personal information (where applicable).</li>
              <li>Opt out of non-essential communications.</li>
              <li>Request information about how data is processed.</li>
            </ul>
          ),
        },
        {
          id: "contact",
          label: "Contact",
          content: (
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@wafrivet.com?subject=Privacy%20question"
                className="inline-flex justify-center rounded-full bg-[#2D4D31] text-white px-6 py-2.5 text-[15px] font-semibold hover:bg-[#243f28] transition-colors"
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
  );
};

export default PrivacyPage;
