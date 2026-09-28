interface CommandNotFoundProps {
  command: string; // the text the user actually typed
  suggestion?: string; // closest matching command display, if any
}

/** Rendered when an entered command doesn't match anything in the registry. */
export function CommandNotFound({ command, suggestion }: CommandNotFoundProps) {
  return (
    <div className="command-not-found">
      <span className="yellow">command not found:</span> {command}
      <br />
      {suggestion ? (
        <span className="dim">
          Did you mean{" "}
          <span className="cyan clickable" data-run={suggestion}>
            {suggestion}
          </span>
          ?
        </span>
      ) : (
        <span className="dim">
          Type <span className="cyan">help</span> to see available commands.
        </span>
      )}
    </div>
  );
}