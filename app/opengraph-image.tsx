import { ImageResponse } from "next/og";

export const alt = "T&T Labs: developer tools, software and games built by an independent team.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 40"><defs><radialGradient id="l" cx="0.74" cy="0.3" r="0.9"><stop offset="0" stop-color="#EFE1D5"/><stop offset="0.45" stop-color="#BBAAA2"/><stop offset="1" stop-color="#4E4648"/></radialGradient><radialGradient id="r" cx="0.7" cy="0.6" r="0.85"><stop offset="0" stop-color="#F7924A"/><stop offset="0.5" stop-color="#E2692B"/><stop offset="1" stop-color="#8E3A1B"/></radialGradient><clipPath id="c"><circle cx="22" cy="20" r="16"/></clipPath></defs><circle cx="22" cy="20" r="16" fill="url(#l)"/><circle cx="42" cy="20" r="16" fill="url(#r)"/><circle cx="42" cy="20" r="16" fill="#211B1C" clip-path="url(#c)"/></svg>`,
  );

// Social preview: the mark resting on its horizon, plus the name.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(180deg, #F2E7DE 0%, #F2D6C2 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 420,
            top: 380,
            width: 1800,
            height: 1800,
            borderRadius: 900,
            background: "radial-gradient(circle at 25% 6%, #8A3A17 0%, #2A1712 16%, #151214 40%)",
            boxShadow: "0 0 60px 12px rgba(226,105,43,0.55)",
          }}
        />
        <img src={MARK} width={380} height={230} alt="" style={{ position: "absolute", left: 730, top: 140 }} />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 210,
            display: "flex",
            flexDirection: "column",
            color: "#231F1C",
          }}
        >
          <div style={{ fontSize: 120, fontFamily: "serif", letterSpacing: -3 }}>T&amp;T Labs</div>
          <div style={{ fontSize: 34, marginTop: 18, maxWidth: 560, lineHeight: 1.3 }}>
            Developer tools, software and games built by an independent team.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
