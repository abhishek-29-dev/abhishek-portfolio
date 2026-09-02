import { useEffect, useState } from "react";

/** BIOS POST staged script. Each line is revealed in sequence. */
const BIOS_LINES: Array<{ text: string; color?: "yellow" | "green" | "cyan" }> = [
  { text: "ABHISHEK DEV PORTFOLIO BIOS v6.00, An Energy Star Ally" },
  { text: "Copyright (C) 1984-2026, Portfolio Systems, Inc." },
  { text: "" },
  { text: "CPU : AMD Ryzen 7 7800X3D @ 4.20GHz", color: "yellow" },
  { text: "Memory Test : ", color: "yellow" },
  { text: "IDE Primary Master : NVMe Samsung 990 PRO 1TB", color: "yellow" },
  { text: "USB Device(s) : 1 Keyboard, 1 Mouse" },
  { text: "Checking modules...", color: "green" },
];

/** Lines shown once the memory test completes. */
const CLOSING_LINES = ["Detecting drives... OK", "Starting portfolio shell..."];

const MEMORY_INDEX = 4; // index of the "Memory Test : " line in BIOS_LINES
const STAGE_MS = 220; // per BIOS line
const COUNT_MAX = 262144; // K — classic 256 MiB warm-up count
const COUNT_MS = 1400;

interface BootScreenProps {
  hidden: boolean;
  onSkip: () => void;
}

export function BootScreen({ hidden, onSkip }: BootScreenProps) {
  const [stage, setStage] = useState(0); // number of BIOS_LINES revealed
  const [memory, setMemory] = useState(0);
  const [closing, setClosing] = useState(0);

  const countActive = stage > MEMORY_INDEX;

  // Reveal BIOS lines on a timer.
  useEffect(() => {
    if (hidden) return;
    const id = setInterval(() => {
      setStage((previous) => (previous >= BIOS_LINES.length ? previous : previous + 1));
    }, STAGE_MS);
    return () => clearInterval(id);
  }, [hidden]);

  // Memory count-up, starting only once its line is on screen.
  useEffect(() => {
    if (hidden || !countActive) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / COUNT_MS);
      const eased = 1 - Math.pow(1 - progress, 2); // fast start, slow finish
      setMemory(Math.round(COUNT_MAX * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, countActive]);

  // Closing lines pace out after the count ends.
  useEffect(() => {
    if (hidden || memory < COUNT_MAX) return;
    const timer = setTimeout(() => {
      setClosing((previous) =>
        previous >= CLOSING_LINES.length ? previous : previous + 1
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [hidden, memory, closing]);

  const done = stage >= BIOS_LINES.length && memory >= COUNT_MAX && closing >= CLOSING_LINES.length;

  return (
    <div
      className={`boot-screen ${hidden ? "hidden" : ""}`}
      onClick={onSkip}
    >
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
        {BIOS_LINES.slice(0, stage).map((line) => (
          <div
            key={line.text}
            className={line.color ? `boot-${line.color}` : undefined}
          >
            {line.text.startsWith("Memory Test")
              ? `${line.text}${String(memory).padStart(6, " ")}K${
                  memory >= COUNT_MAX ? " OK" : ""
                }`
              : line.text}
          </div>
        ))}

        {CLOSING_LINES.slice(0, closing).map((line) => (
          <div key={line} className="boot-green">
            {line}
          </div>
        ))}

        {!done && <span className="cursor-blink" />}
      </pre>

      <div className="boot-skip">press any key to skip</div>
    </div>
  );
}