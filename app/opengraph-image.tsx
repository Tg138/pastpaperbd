import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "pastpaperbd — AQA A-level Biology, decoded";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #d2c39e 0%, #c9b88f 100%)",
          color: "#2f2618",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              background: "#5e4a2a",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            pastpaperbd
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Past papers, decoded.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6b5a3e",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            AQA A-level Biology — every mark scheme walked through, linked to the spec.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b5a3e",
            fontSize: 22,
          }}
        >
          <div>Free for students</div>
          <div>pastpaperbd.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
