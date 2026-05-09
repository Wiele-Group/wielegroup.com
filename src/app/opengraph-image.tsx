import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Edge-rendered Open Graph image — ported from prototype, retuned to
 * canonical brand voice. Strings drawn from siteConfig (lib/metadata).
 *
 * Available at /opengraph-image. Static /og-image.png remains the
 * default referenced via metadata.ogImage; this dynamic version is
 * additive — accessible by clients that follow the Next 16 file
 * convention or by a future buildMetadata refactor that opts in.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "radial-gradient(ellipse at right bottom, rgba(91,171,255,0.18), #0C1220 65%)",
          color: "#E6EAF2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: 0.8,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          />
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Wiele · AI Growth Systems
          </span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 100,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          The premium agency engineered for compounding growth.
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              width: 60,
              height: 84,
              background:
                "linear-gradient(135deg, rgba(91,171,255,0.25), transparent), #0E1218",
              border: "1px solid rgba(91,171,255,0.5)",
            }}
          />
          <span style={{ fontSize: 20, opacity: 0.8 }}>
            wielegroup.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
