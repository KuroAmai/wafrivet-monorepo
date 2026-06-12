import { Suspense } from "react";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata = {
  title: "Set up your profile | Wafrivet",
};

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-[15px] text-gray-500">
          Loading…
        </div>
      }
    >
      <OnboardingWizard />
    </Suspense>
  );
}
