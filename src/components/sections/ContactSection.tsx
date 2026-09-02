import { contact, pdfs } from "../../data/contact";

export default function ContactSection() {
  return (
    <>
      <div className="heading">CONTACT</div>

      <div style={{ marginTop: 18 }}>
        <span className="green">email</span> →{" "}
        <a className="cyan" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>

      <div>
        <span className="green">linkedin</span> →{" "}
        <a
          className="cyan"
          href={contact.linkedin}
          target="_blank"
          rel="noopener"
        >
          linkedin.com/in/abhishek-j-dev
        </a>
      </div>

      <div>
        <span className="green">github</span> →{" "}
        <a
          className="cyan"
          href={contact.github}
          target="_blank"
          rel="noopener"
        >
          github.com/abhishek-29-dev
        </a>
      </div>

      <div>
        <span className="green">phone</span> →{" "}
        <a className="cyan" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
          {contact.phone}
        </a>
      </div>

      <div>
        <span className="green">resume</span> →{" "}
        <a className="cyan" href={pdfs.resume} download>
          download PDF
        </a>
      </div>

      <br />

      <div className="dim">
        ./send_message
        <br />
        Status: <span className="green">READY</span>
      </div>
    </>
  );
}