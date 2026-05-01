import { Link } from "react-router-dom";
import { CorporatePageLayout } from "@/components/layout/CorporatePageLayout";

const CookiesPage = () => {
  return (
    <CorporatePageLayout
      title="Cookie Policy"
      subtitle="This policy explains how cookies and similar technologies are used on Wafrivet sites and services. Replace placeholders with final policy text before launch."
      heroImageUrl="https://media.istockphoto.com/id/956944426/photo/black-and-white-cows-in-green-grassy-meadow-under-blue-sky-near-amersfoort-in-holland.jpg?s=612x612&w=0&k=20&c=TaRru05qmnGUJkkoRKN7LgJbYu8Iig4y1FTisgziSWU="
      sections={[
        {
          id: "what-are-cookies",
          label: "What are cookies",
          content: (
            <p>
              Cookies are small text files stored on your device that help websites remember your preferences and improve
              your experience.
            </p>
          ),
        },
        {
          id: "how-we-use",
          label: "How we use cookies",
          content: (
            <ul className="space-y-2 list-disc pl-5">
              <li>Essential functionality (e.g., security, session management).</li>
              <li>Performance and analytics to understand how pages are used.</li>
              <li>Preferences such as language or display settings.</li>
            </ul>
          ),
        },
        {
          id: "third-parties",
          label: "Third-party cookies",
          content: (
            <p>
              Some cookies may be set by third-party services we use for analytics or embedded content. These providers
              may collect information according to their own policies.
            </p>
          ),
        },
        {
          id: "manage",
          label: "Managing cookies",
          content: (
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect the functionality of the
              site.
            </p>
          ),
        },
        {
          id: "contact",
          label: "Contact",
          content: (
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@wafrivet.com?subject=Cookies%20question"
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

export default CookiesPage;
