export function extractAccessToken(data: Record<string, unknown>): string | undefined {
  const roots: Record<string, unknown>[] = [data];
  const nested = data.data;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    roots.push(nested as Record<string, unknown>);
  }

  for (const root of roots) {
    for (const key of ["accessToken", "access_token", "token"] as const) {
      const value = root[key];
      if (typeof value === "string" && value.length > 0) return value;
    }
  }

  return undefined;
}
