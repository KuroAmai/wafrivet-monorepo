import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { uploadSupplierBrandAsset, isSupplierBrandStorageConfigured } from "@/lib/supplierBrandStorage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeImageMime(mimeType: string, fileName: string): string {
  const normalized = mimeType.trim().toLowerCase().split(";")[0];
  if (normalized === "image/jpg" || normalized === "image/pjpeg") {
    return "image/jpeg";
  }
  if (normalized === "image/jpeg" || normalized === "image/png" || normalized === "image/webp") {
    return normalized;
  }

  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "jpg" || extension === "jpeg") {
    return "image/jpeg";
  }
  if (extension === "png") {
    return "image/png";
  }
  if (extension === "webp") {
    return "image/webp";
  }

  return normalized || "application/octet-stream";
}

export async function POST(request: Request) {
  try {
    const token = await getGatewayToken();
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!isSupplierBrandStorageConfigured()) {
      return NextResponse.json(
        { message: "Brand image storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the shop deployment." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const kind = String(formData.get("kind") ?? "").trim().toLowerCase();
    if (kind !== "logo" && kind !== "banner") {
      return NextResponse.json({ message: "kind must be logo or banner" }, { status: 400 });
    }

    const rawFile = formData.get("file");
    if (!(rawFile instanceof Blob)) {
      return NextResponse.json({ message: "file is required" }, { status: 400 });
    }

    const fileName = rawFile instanceof File && rawFile.name ? rawFile.name : `${kind}.jpg`;
    const buffer = Buffer.from(await rawFile.arrayBuffer());
    if (buffer.length < 1) {
      return NextResponse.json({ message: "Uploaded file is empty" }, { status: 400 });
    }

    const maxSize = kind === "logo" ? 2 * 1024 * 1024 : 3 * 1024 * 1024;
    if (buffer.length > maxSize) {
      return NextResponse.json(
        { message: kind === "logo" ? "Logo must be 2MB or smaller" : "Banner must be 3MB or smaller" },
        { status: 400 },
      );
    }

    const mimeType = normalizeImageMime(rawFile.type, fileName);
    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
      return NextResponse.json({ message: "Only JPEG, PNG, and WebP images are allowed" }, { status: 400 });
    }

    const profileRes = await gatewayFetch("/supplier/profile");
    const profile = (await profileRes.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!profileRes.ok || !profile.id) {
      return NextResponse.json(
        { message: profile.message ?? "Could not load supplier profile" },
        { status: profileRes.status || 500 },
      );
    }

    const url = await uploadSupplierBrandAsset(buffer, mimeType, fileName, profile.id, kind);
    const patch = kind === "logo" ? { logoUrl: url } : { bannerUrl: url };
    const updateRes = await gatewayFetch("/supplier/profile", { method: "PATCH", json: patch });
    const updated = (await updateRes.json().catch(() => ({}))) as {
      logoUrl?: string | null;
      bannerUrl?: string | null;
      message?: string;
    };

    if (!updateRes.ok) {
      return NextResponse.json(
        { message: updated.message ?? "Failed to save brand image URL" },
        { status: updateRes.status },
      );
    }

    return NextResponse.json({
      kind,
      url,
      logoUrl: updated.logoUrl ?? null,
      bannerUrl: updated.bannerUrl ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Branding upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
