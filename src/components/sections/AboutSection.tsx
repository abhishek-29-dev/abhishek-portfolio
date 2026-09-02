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
        <span className="green">focus</span> = "Web Development / UI / WordPress"
      </div>

      <br />

      <div className="dim">
        I'm a BCA graduate interested in building practical, responsive
        and user-friendly web experiences.

        <br />
        <br />

        During my internship at Ratxen Solutions, I worked on Nexa Styles
        and production WordPress websites.

        <br />
        <br />

        I've also been building out a set of React projects — a recipe
        search app, an expense tracker — to go deeper on component
        architecture, state, and TypeScript. See{" "}
        <span className="cyan">projects</span> for links.
      </div>

      <br />

      <div>
        <span className="cyan">currently</span> = "open to full-time frontend opportunities"
      </div>
    </>
  );
}