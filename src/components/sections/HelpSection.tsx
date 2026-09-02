import { COMMANDS } from "../../data/commands";

const SYSTEM_NAMES = ["pwd", "whoami", "uname", "date", "echo", "history", "ls -la"];

export default function HelpSection() {
  const navCommands = COMMANDS.filter((c) => !SYSTEM_NAMES.includes(c.name));
  const systemCommands = COMMANDS.filter((c) => SYSTEM_NAMES.includes(c.name));

  const aliases = COMMANDS.flatMap((command) =>
    command.match.filter((form) => form !== command.name)
  );

  return (
    <>
      <div className="heading">AVAILABLE COMMANDS</div>

      <div style={{ marginTop: 15 }}>
        {navCommands.map((command) => (
          <div key={command.name}>
            <span className="cyan">{command.name}</span> — {command.help}
          </div>
        ))}

        <div>
          <span className="cyan">clear</span> — clear terminal
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="dim system-divider">── system ──</div>

        {systemCommands.map((command) => (
          <div key={command.name}>
            <span className="green">{command.name}</span> — {command.help}
          </div>
        ))}
      </div>

      <br />

      <div className="dim">
        aliases: {aliases.join(" · ")}
      </div>
    </>
  );
}