export function extractAccessToken(data: Record<string, unknown>): string | undefined {
  for (const key of ["accessToken", "access_token", "token"] as const) {
    const value = data[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}
