import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (token && token !== "mock-token") {
    try {
      await fetch(`${GATEWAY_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
    } catch {
      /* best effort */
    }
  }

  cookieStore.delete("jwt");
  cookieStore.delete("access_token");
  cookieStore.delete("token");

  return NextResponse.json({ ok: true });
}
