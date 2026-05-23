import { isAllowedReturnTo } from "@wafrivet/auth";

export const RETURN_TO_STORAGE_KEY = "wafrivet_auth_return_to";

export function persistReturnTo(url: string | null | undefined): void {
  if (typeof sessionStorage === "undefined") return;
  if (url && isAllowedReturnTo(url)) {
    sessionStorage.setItem(RETURN_TO_STORAGE_KEY, url);
  }
}

export function readStoredReturnTo(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  const stored = sessionStorage.getItem(RETURN_TO_STORAGE_KEY);
  return stored && isAllowedReturnTo(stored) ? stored : null;
}

export function clearStoredReturnTo(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(RETURN_TO_STORAGE_KEY);
}
