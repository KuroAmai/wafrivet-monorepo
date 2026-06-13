import { Link } from "react-router-dom";

const MONTHLY_RATE = process.env.NEXT_PUBLIC_SECURITY_MONTHLY_RATE_NGN ?? "2,500";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.wafrivet.com";

export default function SecurityLandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f9f7] px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2D4D31]/60">
            Security companies
          </p>
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            Every dog in your kennel. One digital record.
          </h1>
          <p className="text-gray-600 text-lg">
            Health history, vaccinations, treatments — tracked. Collar-tap access. Monthly per-dog billing.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Lost health records when handlers change",
            "Vets won't treat without history",
            "No audit trail if a dog is injured on duty",
          ].map((text) => (
            <div key={text} className="bg-white rounded-2xl border border-gray-100 p-5 text-sm font-medium text-gray-700">
              {text}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center space-y-4">
          <p className="text-gray-600">
            ₦{MONTHLY_RATE} per dog per month. 14-day free trial. Cancel anytime.
          </p>
          <a
            href={`${APP_URL}/signup?type=security_company`}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#2D4D31] text-white rounded-2xl font-black text-sm uppercase tracking-widest"
          >
            Register your company
          </a>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already registered? <Link to="/login" className="text-[#2D4D31] font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
