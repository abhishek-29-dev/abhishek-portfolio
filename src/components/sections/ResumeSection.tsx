import { pdfs } from "../../data/contact";

export default function ResumeSection() {
  return (
    <>
      <div className="heading">RESUME.PDF</div>

      <div className="certificate-terminal-card">
        <div className="certificate-status">
          <span className="green">●</span>
          <span>FILE FOUND</span>
          <span className="dim">/resume/Abhishek_J_Resume.pdf</span>
        </div>

        <h3>Abhishek J — Frontend Developer</h3>

        <div className="certificate-meta">
          <div>
            <span className="green">type</span> = "Resume / CV"
          </div>
          <div>
            <span className="green">updated</span> = "2026"
          </div>
        </div>

        <div className="certificate-actions">
          <a
            className="certificate-view-btn"
            href={pdfs.resume}
            target="_blank"
            rel="noopener"
          >
            ./view_resume
          </a>

          <a
            className="certificate-download-btn"
            href={pdfs.resume}
            download
          >
            ./download_resume
          </a>
        </div>
      </div>

      <div className="dim">PDF viewer will open in a new tab.</div>
    </>
  );
}