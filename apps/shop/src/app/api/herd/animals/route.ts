import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await gatewayFetch("/herd/animals");
  const data = await res.json().catch(() => []);
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const rows = Array.isArray(data) ? data : (data as { items?: unknown[] }).items ?? [];
  const mapped = rows.map((row) => {
    const item = row as Record<string, unknown>;
    return {
      animalUid: String(item.animalUid ?? item.animal_uid ?? ""),
      name: (item.name as string | null | undefined) ?? null,
      breed: (item.breed as string | null | undefined) ?? null,
      species: String(item.species ?? ""),
    };
  });

  return NextResponse.json(mapped.filter((row) => row.animalUid));
}
