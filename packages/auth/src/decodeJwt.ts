export type JwtPayload = {
  sub?: string;
  role?: string;
  roles?: string[];
  email?: string;
  exp?: number;
};

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    let json: string;
    if (typeof atob !== "undefined") {
      json = atob(base64);
    } else {
      json = Buffer.from(base64, "base64").toString("utf8");
    }
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}
