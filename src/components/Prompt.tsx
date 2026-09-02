/**
 * The shell prompt: `abhishek@portfolio:~/skills$`.
 * Shared by the live input and each echoed output line so they always match.
 */
interface PromptProps {
  cwd: string;
  /** Set when rendered inside a span-level inline prompt (echoed command lines). */
  inline?: boolean;
}

export function Prompt({ cwd, inline }: PromptProps) {
  return (
    <span className={`prompt${inline ? " prompt-inline" : ""}`}>
      <span className="user">abhishek</span>
      <span className="host">@portfolio</span>
      <span className="separator">:</span>
      <span className="path">{cwd}</span>
      <span className="dollar">$</span>{" "}
    </span>
  );
}