import { redirect } from "next/navigation";
import { normalizeUserRole, redirectByRole } from "@wafrivet/auth";
import { getServerAuth } from "@wafrivet/auth/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const auth = await getServerAuth();

  if (!auth.authenticated) {
    redirect("/login");
  }

  const role = normalizeUserRole((auth as { role?: string }).role);
  if (role) {
    redirect(redirectByRole(role));
  }

  redirect("/welcome");
}
