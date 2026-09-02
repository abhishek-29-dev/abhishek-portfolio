import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CommandDef, OutputBlock } from "../types";
import { resolveCommand, suggestCommand } from "../data/commands";
import { CommandNotFound } from "../components/CommandNotFound";
import { getCwd, setCwd, subscribeCwd } from "../utils/cwdStore";
import { playError } from "../utils/sounds";

const HISTORY_KEY = "portfolio-history";

export function useTerminal(onToggleTheme?: () => void) {
  const [blocks, setBlocks] = useState<OutputBlock[]>([]);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = sessionStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [activeCommand, setActiveCommand] = useState<string>("home");
  const [cwd, setCwdState] = useState<string>(() => getCwd());
  const [flashKey, setFlashKey] = useState(0);
  const idRef = useRef(0);

  // Keep the local cwd state in sync with the external store.
  useEffect(() => {
    const unsubscribe = subscribeCwd(setCwdState);
    return unsubscribe;
  }, []);

  // Persist history to sessionStorage whenever it changes.
  useEffect(() => {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  /** Append a command line + section content to the output, stamped with the cwd at execution. */
  const addBlock = (command: string, content: ReactNode, atCwd: string) => {
    idRef.current += 1;
    setBlocks((previous) => [
      ...previous,
      { id: idRef.current, command, content, cwd: atCwd },
    ]);
  };

  /** The cwd at the start of this dispatch (before a command moves us). */
  const currentCwd = getCwd();

  /**
   * Run a raw command string. Mirrors the vanilla shell: every entered
   * command joins history (even unknown ones), `clear` empties the output.
   */
  const runCommand = (raw: string): CommandDef | undefined => {
    const text = raw.trim();
    if (!text) {
      return undefined;
    }

    const key = text.toLowerCase();
    setHistory((previous) => [...previous, text]);

    if (key === "clear") {
      setBlocks([]);
      return undefined;
    }

    if (key === "theme") {
      onToggleTheme?.();
      return undefined;
    }

    // Dynamic builtins without a fixed section component.
    if (key === "history") {
      const list = history
        .map((entry, index) => `${String(index + 1).padStart(4, " ")}  ${entry}`)
        .join("\n");
      addBlock(
        "history",
        <pre className="history-output">
          {list.trim() ? list : "(no commands yet)"}
        </pre>,
        currentCwd
      );
      return undefined;
    }

    if (key === "echo") {
      addBlock("echo", <span>&nbsp;</span>, currentCwd);
      return undefined;
    }

    if (key.startsWith("echo ")) {
      const arg = key.slice(5);
      addBlock(`echo ${arg}`, <span>{arg}</span>, currentCwd);
      return undefined;
    }

    const command = resolveCommand(text);

    if (!command) {
      const suggestion = suggestCommand(key);
      playError();
      setFlashKey((previous) => previous + 1);
      addBlock(
        text,
        <CommandNotFound command={key} suggestion={suggestion} />,
        currentCwd
      );
      return undefined;
    }

    setActiveCommand(command.name);
    setCwd(command.cwd ?? "~");
    addBlock(command.display, <command.Component />, currentCwd);
    return command;
  };

  return { blocks, history, cwd, flashKey, activeCommand, runCommand };
}