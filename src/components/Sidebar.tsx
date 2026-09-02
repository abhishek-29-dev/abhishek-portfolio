import type { CommandDef } from "../types";
import { pdfs } from "../data/contact";

interface SidebarProps {
  commands: CommandDef[];
  activeCommand: string;
  onCommand: (command: string) => void;
}

export function Sidebar({
  commands,
  activeCommand,
  onCommand,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="side-profile">
        <div className="avatar">AJ</div>

        <div>
          <strong>Abhishek J</strong>
          <small>BCA Graduate</small>
        </div>
      </div>

      <div className="side-label">COMMANDS</div>

      {commands.map((command) => (
        <button
          key={command.name}
          className={`command-btn ${activeCommand === command.name ? "active" : ""}`}
          onClick={() => onCommand(command.name)}
          type="button"
        >
          {command.sidebarLabel}
        </button>
      ))}

      <div className="sidebar-bottom">
        <span>STATUS</span>
        <strong>open_to_work=true</strong>

        <a href={pdfs.resume} download>
          ./download_resume
        </a>
      </div>
    </aside>
  );
}