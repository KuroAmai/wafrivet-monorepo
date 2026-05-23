import {
  getAccessToken,
  hydrateTokenFromSession,
  setAccessToken,
} from "@wafrivet/api";

export type LoginSessionPayload = {
  accessToken?: string;
  expiresIn?: number;
};

/** Ensures jwt cookie is available for same-origin BFF routes after login. */
export function persistLoginSession(data: LoginSessionPayload): void {
  hydrateTokenFromSession();
  const cookieToken = getAccessToken();
  const accessToken =
    typeof data.accessToken === "string" && data.accessToken.length > 0
      ? data.accessToken
      : cookieToken;
  if (accessToken && accessToken !== cookieToken) {
    setAccessToken(accessToken, data.expiresIn ?? 3600);
  }
}
