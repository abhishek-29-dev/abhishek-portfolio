export default function AboutSection() {
  return (
    <>
      <div className="heading">ABOUT.TXT</div>

      <div style={{ marginTop: 15 }}>
        <span className="green">name</span> = "Abhishek J"
      </div>

      <div>
        <span className="green">role</span> = "Frontend Developer"
      </div>

      <div>
        <span className="green">education</span> = "Bachelor of Computer Applications"
      </div>

      <div>
        <span className="green">university</span> = "PES University"
      </div>

      <div>
        <span className="green">focus</span> = "React &amp; TypeScript / Frontend"
      </div>

      <br />

      <div className="dim">
        Frontend developer who likes building fast, clean interfaces in React
        and TypeScript. Spent a 3-month internship keeping two live WordPress
        client sites running, and built and deployed several projects that work
        with real APIs.

        <br />
        <br />

        Looking for a frontend or React role where I can keep learning and ship
        things people actually use. See <span className="cyan">projects</span>{" "}
        for links.
      </div>

      <br />

      <div>
        <span className="cyan">currently</span> = "open to full-time frontend opportunities"
      </div>
    </>
  );
}