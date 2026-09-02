const ASCII = `    ██████╗  █████╗ ███████╗███╗   ██╗
    ██╔══██╗██╔══██╗██╔════╝████╗  ██║
    ██████╔╝███████║██████╗  ██╔██╗ ██║
    ██╔══██╗██╔══██║╚════██╗██║╚██╗██║
    ██████╔╝██║  ██║███████║██║ ╚████║
    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝`;

const INFO = [
  { label: "OS", value: "Windows 11 Home" },
  { label: "Shell", value: "PowerShell" },
  { label: "Editor", value: "VS Code" },
  { label: "Runtime", value: "Node.js 24" },
  { label: "Framework", value: "React 19 + TypeScript" },
  { label: "Build", value: "Vite 6.4" },
  { label: "Deploy", value: "Vercel" },
  { label: "Theme", value: "Blue Terminal" },
];

export default function NeofetchSection() {
  return (
    <>
      <div className="heading">NEOFETCH</div>

      <div
        style={{
          display: "flex",
          gap: 28,
          marginTop: 14,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <pre className="ascii">{ASCII}</pre>

        <div style={{ minWidth: 220 }}>
          {INFO.map((entry) => (
            <div key={entry.label}>
              <span className="green">{entry.label}</span>{" "}
              <span className="dim">=</span> {entry.value}
            </div>
          ))}

          <div style={{ marginTop: 12 }} className="dim">
            — abhishek@dev
          </div>
        </div>
      </div>
    </>
  );
}
