import { useEffect, useRef, useState, type ReactNode } from "react";
import type { OutputBlock } from "../types";
import { resolveCommand, suggestCommand } from "../data/commands";
import { CommandNotFound } from "../components/CommandNotFound";
import { getCwd, setCwd, subscribeCwd } from "../utils/cwdStore";
import { playError } from "../utils/sounds";

const HISTORY_KEY = "portfolio-history";

/** Read the up-arrow history saved earlier in this tab. */
function loadHistory(): string[] {
  try {
    const saved = sessionStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Owns everything about the shell's state: the printed output, the command
 * history, and which section is highlighted in the sidebar.
 */
export function useTerminal(onToggleTheme?: () => void) {
  const [blocks, setBlocks] = useState<OutputBlock[]>([]);
  const [history, setHistory] = useState<string[]>(loadHistory);
  const [activeCommand, setActiveCommand] = useState("home");
  const [cwd, setCwdState] = useState(getCwd);
  // Bumped on every bad command so the error flash can restart its animation.
  const [flashKey, setFlashKey] = useState(0);
  const lastId = useRef(0);

  // Mirror the shared cwd store so the prompt and status bar stay in sync.
  useEffect(() => subscribeCwd(setCwdState), []);

  // Keep history for this tab so up-arrow still works after a refresh.
  useEffect(() => {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  /**
   * Run one typed command and print it. Every command joins the history, even
   * unknown ones — same as a real shell.
   */
  const runCommand = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const key = text.toLowerCase();

    // Read the path *before* running, so the echoed prompt line shows where
    // the command was typed rather than where it left us.
    const fromCwd = getCwd();

    setHistory((previous) => [...previous, text]);

    /** Append a command line + its output to the terminal. */
    const print = (command: string, content: ReactNode) => {
      lastId.current += 1;
      setBlocks((previous) => [
        ...previous,
        { id: lastId.current, command, content, cwd: fromCwd },
      ]);
    };

    if (key === "clear") {
      setBlocks([]);
      return;
    }

    if (key === "theme") {
      onToggleTheme?.();
      return;
    }

    if (key === "echo" || key.startsWith("echo ")) {
      // Slice the original text, not the lowercased key, so `echo Hi` echoes
      // "Hi". The non-breaking space keeps bare `echo` on its own line.
      const message = text.slice(5).trim();
      print(`echo ${message}`, message || "\u00a0");
      return;
    }

    if (key === "history") {
      // `setHistory` above already queued this command, so add it by hand to
      // match what the user will see on the next keystroke.
      const list = [...history, text]
        .map((entry, index) => `${String(index + 1).padStart(4)}  ${entry}`)
        .join("\n");
      print("history", <pre className="history-output">{list}</pre>);
      return;
    }

    const command = resolveCommand(key);

    if (!command?.Component) {
      playError();
      setFlashKey((previous) => previous + 1);
      print(
        text,
        <CommandNotFound command={text} suggestion={suggestCommand(key)} />
      );
      return;
    }

    setActiveCommand(command.name);
    setCwd(command.cwd ?? "~");
    print(command.display, <command.Component />);
  };

  return { blocks, history, cwd, flashKey, activeCommand, runCommand };
}
