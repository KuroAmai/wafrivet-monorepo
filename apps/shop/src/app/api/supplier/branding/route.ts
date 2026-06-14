import { NextResponse } from "next/server";
import { GATEWAY_URL } from "@/lib/gateway";
import { getGatewayToken } from "@/lib/gatewayAuth";

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
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

  const mimeType = normalizeImageMime(rawFile.type, fileName);
  const res = await fetch(`${GATEWAY_URL}/supplier/profile/branding`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kind,
      file: {
        fileName,
        mimeType,
        size: buffer.length,
        base64: buffer.toString("base64"),
      },
    }),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
