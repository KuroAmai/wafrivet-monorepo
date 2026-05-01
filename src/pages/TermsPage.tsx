import { Link } from "react-router-dom";
import { CorporatePageLayout } from "@/components/layout/CorporatePageLayout";

const TermsPage = () => {
  return (
    <CorporatePageLayout
      title="Terms & Conditions"
      subtitle="These terms outline the rules and guidelines for using Wafrivet services. Replace the placeholders below with counsel-approved text before launch."
      heroImageUrl="https://media.istockphoto.com/id/956944426/photo/black-and-white-cows-in-green-grassy-meadow-under-blue-sky-near-amersfoort-in-holland.jpg?s=612x612&w=0&k=20&c=TaRru05qmnGUJkkoRKN7LgJbYu8Iig4y1FTisgziSWU="
      sections={[
        {
          id: "general-terms",
          label: "General terms",
          content: (
            <p>
              By accessing or using Wafrivet, you agree to follow these terms. These terms cover acceptable use, account
              responsibilities, and service availability.
            </p>
          ),
        },
        {
          id: "accounts",
          label: "Accounts",
          content: (
            <p>
              If you create an account, you’re responsible for safeguarding access credentials and for activity performed
              under your account.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          label: "Acceptable use",
          content: (
            <ul className="space-y-2 list-disc pl-5">
              <li>Do not misuse the service, attempt unauthorized access, or interfere with platform operations.</li>
              <li>Do not upload harmful, illegal, or infringing content.</li>
              <li>Comply with applicable laws and regulations.</li>
            </ul>
          ),
        },
        {
          id: "payments",
          label: "Payments & subscriptions",
          content: (
            <p>
              Where applicable, subscriptions and marketplace purchases may be subject to additional pricing, taxes, and
              third-party payment terms.
            </p>
          ),
        },
        {
          id: "disclaimers",
          label: "Disclaimers",
          content: (
            <p>
              Wafrivet provides tools to support animal-health decisions; it does not replace professional veterinary
              judgment. Service outputs may be limited by data availability and connectivity.
            </p>
          ),
        },
        {
          id: "limitation",
          label: "Limitation of liability",
          content: (
            <p>
              To the fullest extent permitted by law, Wafrivet is not liable for indirect, incidental, or consequential
              damages arising from use of the service.
            </p>
          ),
        },
        {
          id: "contact",
          label: "Contact",
          content: (
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@wafrivet.com?subject=Terms%20question"
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

export default TermsPage;
