import type { AuthMeDto } from "@wafrivet/types";
import { isAllowedReturnTo, redirectByRole } from "@wafrivet/auth";
import {
  clearStoredReturnTo,
  persistReturnTo,
  readStoredReturnTo,
} from "@/lib/authReturnTo";
import {
  normalizePlatformRoles,
  pickPrimaryProductRole,
} from "@/lib/platformRoles";
import { needsOnboarding } from "@/lib/resolveAuthDestination";

function extractRoles(me: AuthMeDto): string[] {
  const fromUser = me.user?.roles ?? [];
  const top = me.roles ?? [];
  const single = me.role ? [me.role] : [];
  return [...top, ...fromUser, ...single];
}

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

  if (needsOnboarding(me)) {
    if (returnTo) persistReturnTo(returnTo);
    return "/onboarding";
  }

  if (returnTo) {
    clearStoredReturnTo();
    return returnTo;
  }

  clearStoredReturnTo();

  const productRole = pickPrimaryProductRole(extractRoles(me));
  if (!productRole) {
    return "/onboarding";
  }

  return redirectByRole(productRole);
}
