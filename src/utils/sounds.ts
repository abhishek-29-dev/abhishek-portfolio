/**
 * Key-click sounds for the shell, synthesised with the Web Audio API so no
 * audio files are needed. Wrapped in a tiny external store so the status-bar
 * toggle and the input handlers stay in sync without prop-drilling.
 *
 * The AudioContext is created lazily on the first sound (autoplay policy:
 * a browser only lets audio start after a user gesture).
 */
type SoundKind = "key" | "enter" | "error";

const SOUND_KEY = "portfolio-sound";

let enabled = localStorage.getItem(SOUND_KEY) !== "off";
let ctx: AudioContext | null = null;

const listeners = new Set<(next: boolean) => void>();

export function isSoundEnabled(): boolean {
  return enabled;
}

export function toggleSound(): boolean {
  enabled = !enabled;
  localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
  for (const listener of listeners) listener(enabled);
  return enabled;
}

export function subscribeSound(listener: (next: boolean) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function audioContext(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(
  frequency: number,
  endFrequency: number,
  duration: number,
  volume: number,
  wave: OscillatorType
) {
  const ac = audioContext();
  if (!ac) return;

  const start = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = wave;
  osc.frequency.setValueAtTime(frequency, start);
  osc.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration);
}

/** Deciding factor for each sound's character. */
const TIMBRE: Record<SoundKind, { wave: OscillatorType }> = {
  key: { wave: "square" },
  enter: { wave: "sine" },
  error: { wave: "sawtooth" },
};

export function playSound(kind: SoundKind) {
  const wave = TIMBRE[kind].wave;
  switch (kind) {
    case "key":
      blip(1400, 1200, 0.035, 0.028, wave);
      break;
    case "enter":
      blip(320, 180, 0.08, 0.035, wave);
      break;
    case "error":
      blip(200, 90, 0.22, 0.06, wave);
      break;
  }
}

/** Convenience wrappers for the call sites. */
export const playKeystroke = () => playSound("key");
export const playEnter = () => playSound("enter");
export const playError = () => playSound("error");