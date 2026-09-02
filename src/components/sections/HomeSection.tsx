import { AsciiLogo } from "./shared/AsciiLogo";
import { pdfs } from "../../data/contact";

const SUGGESTED_COMMANDS = [
  "about",
  "skills",
  "projects",
  "experience",
  "certificate",
  "resume",
  "contact",
];

export default function HomeSection() {
  return (
    <>
      <div className="big">Hello, I'm Abhishek.</div>

      <div style={{ marginTop: 16 }}>
        <span className="green">BCA Graduate</span>
        {" · "}
        <span className="cyan">Frontend Developer</span>
        {" · "}
        <span className="yellow">WordPress Developer</span>
      </div>

      <div style={{ marginTop: 18 }} className="dim">
        I build responsive websites, e-commerce experiences and
        React-based user interfaces.
      </div>

      <div style={{ marginTop: 24 }}>
        <AsciiLogo />
      </div>

      <div style={{ marginTop: 22 }}>
        <span className="dim">Try:</span>{" "}
        {SUGGESTED_COMMANDS.map((command, index) => (
          <span key={command}>
            <span
              className="cyan"
              data-run={command}
              style={{ cursor: "pointer" }}
            >
              {command}
            </span>
            {index < SUGGESTED_COMMANDS.length - 1 && <>, </>}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 18 }} className="dim">
        ${" "}
        <a className="cyan" href={pdfs.resume} download>
          ./download_resume
        </a>{" "}
        — open resume PDF
      </div>
    </>
  );
}