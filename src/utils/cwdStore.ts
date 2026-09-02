/**
 * Tiny external store for the shell's current working directory.
 * Kept outside React state so the live prompt, the powerline status bar
 * and the `pwd` builtin all read the same source of truth without
 * prop-drilling.
 */
let cwd = "~";

const listeners = new Set<(next: string) => void>();

export function getCwd(): string {
  return cwd;
}

export function setCwd(next: string): void {
  if (next === cwd) return;
  cwd = next;
  for (const listener of listeners) listener(cwd);
}

export function subscribeCwd(listener: (next: string) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Map the shorthand prompt path (`~`, `~/skills`) onto an absolute path. */
export function absoluteCwd(): string {
  return cwd === "~" ? "/home/abhishek" : `/home/abhishek${cwd.slice(1)}`;
}