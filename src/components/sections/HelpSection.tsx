import { COMMANDS } from "../../data/commands";

export default function HelpSection() {
  const pages = COMMANDS.filter((command) => command.group === "page");
  const system = COMMANDS.filter((command) => command.group === "system");

  // Every alias that isn't already listed by its canonical name above.
  const aliases = COMMANDS.flatMap((command) =>
    command.match.filter((form) => form !== command.name)
  );

  return (
    <>
      <div className="heading">AVAILABLE COMMANDS</div>

      <div style={{ marginTop: 15 }}>
        {pages.map((command) => (
          <div key={command.name}>
            <span className="cyan clickable" data-run={command.name}>
              {command.name}
            </span>{" "}
            — {command.help}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="dim system-divider">── system ──</div>

        {system.map((command) => (
          <div key={command.name}>
            <span className="green">{command.name}</span> — {command.help}
          </div>
        ))}
      </div>

      <br />

      <div className="dim">
        Try <span className="cyan">theme</span> to switch colours, or press Tab
        to autocomplete. Aliases: {aliases.join(" · ")}
      </div>
    </>
  );
}
