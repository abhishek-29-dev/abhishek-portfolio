import { useCallback, useEffect, useRef, useState } from "react";
import { useTerminal } from "./hooks/useTerminal";
import { BootScreen } from "./components/BootScreen";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Terminal } from "./components/Terminal";
import { BlockCursor } from "./components/BlockCursor";
import { SIDEBAR_COMMANDS } from "./data/commands";

export default function App() {
  const [theme, setTheme] = useState<"blue" | "green">(() => {
    return (sessionStorage.getItem("portfolio-theme") as "blue" | "green") ?? "blue";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "blue" ? "green" : "blue";
      sessionStorage.setItem("portfolio-theme", next);
      return next;
    });
  }, []);

  const { blocks, history, cwd, flashKey, activeCommand, runCommand } = useTerminal(toggleTheme);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const finishedRef = useRef(false);
  const homeShownRef = useRef(false);

  /** Skip the boot screen. Guarded so key + click + timers only fire once. */
  const finish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    const auto = setTimeout(finish, 3000);
    const fallback = setTimeout(finish, 4000); // identical to vanilla safety net
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(auto);
      clearTimeout(fallback);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  // Show the home screen exactly once, when boot finishes.
  useEffect(() => {
    if (ready && !homeShownRef.current) {
      homeShownRef.current = true;
      runCommand("home");
    }
  }, [ready, runCommand]);

  // Apply theme + terminal-size classes to body.
  useEffect(() => {
    document.body.classList.toggle("theme-green", theme === "green");
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("term-compact", compact);
  }, [compact]);

  return (
    <>
      <BootScreen hidden={ready} onSkip={finish} />

      <div className={`app ${ready ? "ready" : ""}`}>
        <TopBar compact={compact} onResize={() => setCompact((prev) => !prev)} />

        <div className="terminal-layout">
          <Sidebar
            commands={SIDEBAR_COMMANDS}
            activeCommand={activeCommand}
            onCommand={runCommand}
          />

          <Terminal
            blocks={blocks}
            history={history}
            ready={ready}
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