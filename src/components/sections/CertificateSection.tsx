import { pdfs } from "../../data/contact";

export default function CertificateSection() {
  return (
    <>
      <div className="heading">INTERNSHIP_CERTIFICATE.PDF</div>

      <div className="certificate-terminal-card">
        <div className="certificate-status">
          <span className="green">●</span>
          <span className="green">FILE PRESENT</span>
          <span className="dim">/Internship_Certificate.pdf</span>
        </div>

        <h3>Ratxen Solutions Private Limited</h3>

        <div className="certificate-meta">
          <div>
            <span className="green">type</span> = "Internship Completion Certificate"
          </div>
          <div>
            <span className="green">intern</span> = "Abhishek J"
          </div>
          <div>
            <span className="green">duration</span> = "Feb 2026 → May 2026 (90 Days)"
          </div>
          <div>
            <span className="green">role</span> = "Full Stack &amp; WordPress Development Intern"
          </div>
          <div>
            <span className="green">rating</span> = "Excellent · 6.0 / 6.0"
          </div>
        </div>

        <div className="certificate-actions">
          <a
            className="certificate-view-btn"
            href={pdfs.certificate}
            target="_blank"
            rel="noopener"
          >
            ./view_certificate
          </a>

          <a
            className="certificate-download-btn"
            href={pdfs.certificate}
            download
          >
            ./download_certificate
          </a>
        </div>
      </div>

      <div className="dim">
        Certificate is hosted in the portfolio repo at{" "}
        <span className="cyan">public/Internship_Certificate.pdf</span>{" "}
        and served with the site.
      </div>
    </>
  );
}
