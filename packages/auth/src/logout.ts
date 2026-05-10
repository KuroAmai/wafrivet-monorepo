function getAppLoginUrl(): string {
  let base = "https://app.wafrivet.com";
  try {
    if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_APP_URL) {
      base = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
    }
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: { NEXT_PUBLIC_APP_URL?: string } };
    const url = im.env?.NEXT_PUBLIC_APP_URL;
    if (url) {
      base = url.replace(/\/$/, "");
    }
  } catch {
    /* noop */
  }
  return `${base}/login`;
}

export function logoutClient(): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
  const names = ["jwt", "token"];
  const domains = [".wafrivet.com", "", window.location.hostname];
  for (const name of names) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; path=/; expires=${expire}; max-age=0${domainPart}`;
    }
  }
  window.location.href = getAppLoginUrl();
}
