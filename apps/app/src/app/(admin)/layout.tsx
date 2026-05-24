import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { hasAdminAccess } from "@wafrivet/auth";
import { getServerAuth } from "@wafrivet/auth/server";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const auth = await getServerAuth();

  if (!auth.authenticated) {
    redirect("/login?returnTo=/admin");
  }

  const roles =
    (auth as { roles?: string[] }).roles ??
    ((auth as { role?: string }).role ? [(auth as { role?: string }).role!] : []);

  if (!hasAdminAccess(roles)) {
    redirect("/welcome");
  }

  return <AdminShell>{children}</AdminShell>;
}
