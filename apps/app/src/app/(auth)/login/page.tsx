import { Suspense } from "react";
import { redirect } from "next/navigation";
import { hasAdminAccess } from "@wafrivet/auth";
import { getServerAuth } from "@wafrivet/auth/server";
import { LoginForm } from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Sign In | Wafrivet",
};

export default async function LoginPage() {
  const auth = await getServerAuth();
  if (auth.authenticated) {
    const roles =
      (auth as { roles?: string[] }).roles ??
      ((auth as { role?: string }).role ? [(auth as { role?: string }).role!] : []);
    if (hasAdminAccess(roles)) {
      redirect("/admin");
    }
  }

  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
      <LoginForm />
    </Suspense>
  );
}
