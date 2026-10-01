import { ImageResponse } from "next/og";

export const alt = "Lucas Cabral | Software Engineer & Creative UI/UX Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#09090b",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de fundo */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Topo do Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#18181b",
                border: "1.5px solid rgba(34, 197, 94, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22c55e",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              LB
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#f4f4f5",
                letterSpacing: "-0.5px",
              }}
            >
              Lucas Cabral
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(24, 24, 27, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "14px",
              color: "#34d399",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#34d399",
              }}
            />
            <span>Rio de Janeiro, BR • Disponível para Projetos</span>
          </div>
        </div>

        {/* Centro: Título & Proposta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Engenharia de Software &
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#22c55e",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Design Fluido & Alta Performance
          </div>
          <p
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              maxWidth: "850px",
              lineHeight: 1.4,
              marginTop: "8px",
            }}
          >
            Aplicações web de alta fidelidade, arquitetura reativa com GSAP e pipelines assíncronos. Da Automação Industrial ao Software Moderno.
          </p>
        </div>

        {/* Rodapé: Tags Técnicas */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js 16", "TypeScript", "GSAP Animations", "Tailwind CSS", "Node.js", "Docker"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(39, 39, 42, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "13px",
                    color: "#d4d4d8",
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
            lucasbezerracontact0@gmail.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
