import type { AuthMeDto } from "@wafrivet/types";
import { isAllowedReturnTo, redirectByRole, extractRolesFromMe, hasAdminAccess } from "@wafrivet/auth";
import {
  clearStoredReturnTo,
  persistReturnTo,
  readStoredReturnTo,
} from "@/lib/authReturnTo";
import { pickPrimaryProductRole } from "@/lib/platformRoles";
import { needsOnboarding } from "@/lib/resolveAuthDestination";

function pickReturnTo(returnToFromQuery?: string | null): string | null {
  if (returnToFromQuery && isAllowedReturnTo(returnToFromQuery)) {
    return returnToFromQuery;
  }
  return readStoredReturnTo();
}

/** Post-login / verify / onboarding destination; honors safe cross-app `returnTo`. */
export async function resolvePostAuthDestination(
  returnToFromQuery?: string | null,
): Promise<string> {
  const returnTo = pickReturnTo(returnToFromQuery);

  const res = await fetch("/api/auth/me", { credentials: "same-origin" });
  if (!res.ok) {
    return "/login";
  }
  const me = (await res.json()) as AuthMeDto;

  if (hasAdminAccess(extractRolesFromMe(me))) {
    clearStoredReturnTo();
    return returnTo && returnTo.startsWith("/admin") ? returnTo : "/admin";
  }

  if (needsOnboarding(me)) {
    if (returnTo) persistReturnTo(returnTo);
    return "/onboarding";
  }

  if (returnTo) {
    clearStoredReturnTo();
    return returnTo;
  }

  clearStoredReturnTo();

  const productRole = pickPrimaryProductRole(extractRolesFromMe(me));
  if (!productRole) {
    return "/onboarding";
  }

  return redirectByRole(productRole);
}
