import type { ReactNode } from "react";
import { Prompt } from "./Prompt";

interface OutputBlockProps {
  command: string;
  cwd: string;
  children: ReactNode;
}

/** One entry in the terminal: the typed command line + its section content. */
export function OutputBlock({ command, cwd, children }: OutputBlockProps) {
  return (
    <div className="output-block">
      <div className="output-command">
        <Prompt cwd={cwd} inline /> {command}
      </div>

      <div className="output-content">{children}</div>
    </div>
  );
}