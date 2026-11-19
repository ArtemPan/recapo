import { ImageResponse } from "next/og";

export const alt = "Recapo turns meeting notes into decisions and action items";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSrc = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#8b7fff"/><path d="M9 11h14M9 16h10M9 21h6" stroke="#0b0b14" stroke-width="2.5" stroke-linecap="round"/><circle cx="22.5" cy="21" r="3" fill="#0b0b14"/></svg>',
)}`;

const tasks = [
  { task: "Write the release notes", meta: "Anna · Thursday", priority: "High", tone: "#b91c1c" },
  { task: "Run load testing", meta: "Tom · Wednesday", priority: "High", tone: "#b91c1c" },
  { task: "Update the status page", meta: "Unassigned · Not set", priority: "Low", tone: "#15803d" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0b1020 0%, #1d1a3a 100%)",
          color: "#eef0f6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 560, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
            <img src={logoSrc} width={56} height={56} alt="" />
            Recapo
          </div>
          <div style={{ marginTop: 40, fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Meeting notes in. Decisions and action items out.
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#9aa3b8" }}>
            AI recaps with owners and due dates, in seconds.
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: 440,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {tasks.map((item) => (
            <div
              key={item.task}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#121522",
                border: "1px solid #23283a",
                borderRadius: 20,
                padding: "22px 26px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 24, fontWeight: 600 }}>{item.task}</div>
                <div style={{ fontSize: 18, color: "#9aa3b8", marginTop: 6 }}>{item.meta}</div>
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: "#ffffff",
                  background: item.tone,
                  borderRadius: 999,
                  padding: "6px 14px",
                }}
              >
                {item.priority}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
