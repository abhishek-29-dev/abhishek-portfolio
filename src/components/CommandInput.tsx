import { useEffect, useRef, useState } from "react";
import { ALL_COMMAND_KEYS } from "../data/commands";
import { Prompt } from "./Prompt";
import { playEnter, playKeystroke } from "../utils/sounds";

interface CommandInputProps {
  history: string[];
  ready: boolean;
  cwd: string;
  onCommand: (command: string) => void;
}

export function CommandInput({ history, ready, cwd, onCommand }: CommandInputProps) {
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(0); // index into history; history.length = "new command"
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input as soon as the boot screen is dismissed (matches the vanilla flow).
  useEffect(() => {
    if (ready) {
      inputRef.current?.focus();
    }
  }, [ready]);

  // "/" focuses the input from anywhere unless you're already typing in it.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value.trim()) {
      inputRef.current?.focus();
      return;
    }

    playEnter();
    onCommand(value);
    setValue("");
    setCursor(history.length + 1); // back to the "new command" line
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (cursor > 0) {
        const next = cursor - 1;
        setCursor(next);
        setValue(history[next] ?? "");
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      if (cursor < history.length - 1) {
        const next = cursor + 1;
        setCursor(next);
        setValue(history[next]);
      } else {
        setCursor(history.length);
        setValue("");
      }
    } else if (event.key === "Tab") {
      event.preventDefault();

      const matches = ALL_COMMAND_KEYS.filter((form) =>
        form.startsWith(value.toLowerCase())
      );

      if (matches.length === 1) {
        setValue(matches[0]);
      }
    } else if (
      (event.key.length === 1 || event.key === "Backspace") &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      playKeystroke();
    }
  };

  return (
    <form className="terminal-input" onSubmit={handleSubmit}>
      <Prompt cwd={cwd} />

      <input
        ref={inputRef}
        className="command-input"
        type="text"
        autoComplete="off"
        spellCheck={false}
        aria-label="Terminal command"
        placeholder="type a command..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}