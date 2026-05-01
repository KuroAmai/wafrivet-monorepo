export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    domain: ".wafrivet.com",
  };
}

