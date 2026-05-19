import { ImageResponse } from "next/og";
import { SITE } from "../lib/seo/site";

export const runtime = "edge";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: SITE.brandColor,
          color: SITE.backgroundColor,
          padding: "80px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.02em",
            opacity: 0.9,
          }}
        >
          {SITE.name.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            Livestock health, finally in one place.
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.3,
              maxWidth: "900px",
              opacity: 0.85,
            }}
          >
            NFC-tagged animals, AI-assisted vet workflows, and a verified veterinary marketplace.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 48,
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
          <span>The Livestock OS</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
