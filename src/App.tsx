import { useCallback, useEffect, useRef, useState } from "react";
import { useTerminal } from "./hooks/useTerminal";
import { BootScreen } from "./components/BootScreen";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Terminal } from "./components/Terminal";
import { BlockCursor } from "./components/BlockCursor";
import { SIDEBAR_COMMANDS } from "./data/commands";

type Theme = "blue" | "green";

const THEME_KEY = "portfolio-theme";
const BOOT_MS = 3000;

/** Theme is per-tab, so a refresh keeps it without affecting other tabs. */
function loadTheme(): Theme {
  return sessionStorage.getItem(THEME_KEY) === "green" ? "green" : "blue";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [booted, setBooted] = useState(false);
  const [compact, setCompact] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === "blue" ? "green" : "blue";
      sessionStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  const { blocks, history, cwd, flashKey, activeCommand, runCommand } =
    useTerminal(toggleTheme);

  // The boot screen always ends: after 3 seconds, or the moment the visitor
  // clicks it or presses any key. The ref stops all three from firing twice.
  const bootedRef = useRef(false);

  const finishBoot = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    setBooted(true);
    runCommand("home"); // open straight onto the home screen
  }, [runCommand]);

  useEffect(() => {
    if (bootedRef.current) return; // already booted, nothing left to schedule

    const timer = setTimeout(finishBoot, BOOT_MS);
    window.addEventListener("keydown", finishBoot);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", finishBoot);
    };
  }, [finishBoot]);

  // Both of these are read by CSS, so they live on <body> as class names.
  useEffect(() => {
    document.body.classList.toggle("theme-green", theme === "green");
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("term-compact", compact);
  }, [compact]);

  return (
    <>
      <BootScreen hidden={booted} onSkip={finishBoot} />

      <div className={`app ${booted ? "ready" : ""}`}>
        <TopBar
          compact={compact}
          onResize={() => setCompact((previous) => !previous)}
        />

        <div className="terminal-layout">
          <Sidebar
            commands={SIDEBAR_COMMANDS}
            activeCommand={activeCommand}
            onCommand={runCommand}
          />

          <Terminal
            blocks={blocks}
            history={history}
            ready={booted}
            cwd={cwd}
            flashKey={flashKey}
            onCommand={runCommand}
          />
        </div>
      </div>

      <BlockCursor />
    </>
  );
}