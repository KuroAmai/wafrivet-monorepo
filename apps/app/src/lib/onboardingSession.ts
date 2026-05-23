/** Set after successful POST /roles/select (until auth/me exposes a server flag). */
export const ROLES_CONFIRMED_STORAGE_KEY = "wafrivet_roles_confirmed";

export function markRolesConfirmed(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(ROLES_CONFIRMED_STORAGE_KEY, "1");
}

export function clearRolesConfirmed(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(ROLES_CONFIRMED_STORAGE_KEY);
}

export function hasRolesConfirmed(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(ROLES_CONFIRMED_STORAGE_KEY) === "1";
}
