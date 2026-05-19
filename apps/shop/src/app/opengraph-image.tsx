import { ImageResponse } from "next/og";

export const alt = "Wafrivet Shop — Buy Veterinary Products & Find Local Chemists";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #2D4D31 0%, #1B2F1E 60%, #0E1B11 100%)",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#ffffff",
            }}
          />
          Wafrivet Shop
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            Veterinary medicines, supplies, and local chemists.
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              opacity: 0.8,
              maxWidth: "880px",
            }}
          >
            The trusted marketplace for animal health across Africa.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: 600,
            opacity: 0.75,
          }}
        >
          <div>shop.wafrivet.com</div>
          <div>Built for Africa's farmers</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
