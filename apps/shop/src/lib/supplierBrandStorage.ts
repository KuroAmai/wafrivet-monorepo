import { randomUUID } from "crypto";

const BRAND_BUCKET = "supplier-branding";

function getSupabaseConfig(): { url: string; serviceRoleKey: string } | null {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

function resolveExtension(mimeType: string, fileName: string): string {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";

  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "jpg" || extension === "jpeg") return "jpg";
  if (extension === "png") return "png";
  if (extension === "webp") return "webp";
  return "jpg";
}

export function isSupplierBrandStorageConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export async function uploadSupplierBrandAsset(
  buffer: Buffer,
  mimeType: string,
  fileName: string,
  supplierId: string,
  kind: "logo" | "banner",
): Promise<string> {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Brand image storage is not configured on the shop server");
  }

  const extension = resolveExtension(mimeType, fileName);
  const objectPath = `${supplierId}/${kind}/${randomUUID()}.${extension}`;
  const uploadUrl = `${config.url}/storage/v1/object/${BRAND_BUCKET}/${objectPath}`;

  const uploadRes = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": mimeType,
      "x-upsert": "false",
    },
    body: new Uint8Array(buffer),
  });

  if (!uploadRes.ok) {
    const detail = await uploadRes.text().catch(() => "");
    throw new Error(detail || `Storage upload failed (${uploadRes.status})`);
  }

  return `${config.url}/storage/v1/object/public/${BRAND_BUCKET}/${objectPath}`;
}
