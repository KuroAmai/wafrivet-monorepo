import { Suspense } from "react";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create Account | Wafrivet",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
      <SignupForm />
    </Suspense>
  );
}
