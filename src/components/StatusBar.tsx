import { useEffect, useState } from "react";
import { subscribeSound, toggleSound, isSoundEnabled } from "../utils/sounds";

interface StatusBarProps {
  cwd: string;
}

function useClock(): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function useMuted(): boolean {
  const [muted, setMuted] = useState(!isSoundEnabled());
  useEffect(() => subscribeSound((enabled) => setMuted(!enabled)), []);
  return muted;
}

/**
 * Powerline-style status footer: `❯ help · ⬢ abhishek@portfolio · path ·
 * git:main · clock · open_to_work · [snd]`.
 */
export function StatusBar({ cwd }: StatusBarProps) {
  const clock = useClock();
  const muted = useMuted();

  return (
    <footer className="status-bar">
      <span className="pb-seg pb-seg-cyan">❯ type help</span>
      <span className="pb-seg pb-seg-green">⬢ abhishek@portfolio</span>
      <span className="pb-seg pb-seg-white">{cwd}</span>
      <span className="pb-seg pb-seg-dim">git:main</span>

      <span className="pb-spacer" />

      <span className="pb-seg pb-seg-glow">{clock}</span>
      <span className="pb-seg pb-seg-green">open_to_work</span>
      <span>
        <button
          type="button"
          className="pb-btn"
          aria-label={muted ? "Enable key sounds" : "Mute key sounds"}
          onClick={() => toggleSound()}
        >
          snd:{muted ? <span className="off">off</span> : "on"}
        </button>
      </span>
    </footer>
  );
}