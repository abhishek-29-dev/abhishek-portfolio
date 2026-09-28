import type { ComponentType, ReactNode } from "react";

/** One entry in the terminal output — a typed command line + its content. */
export interface OutputBlock {
  id: number;
  command: string;
  content: ReactNode;
  /** The shell prompt path shown before this command, e.g. "~/skills". */
  cwd: string;
}

/** A single command humans can type. Sidebar buttons and autocomplete derive from these. */
export interface CommandDef {
  /** Canonical identifier, e.g. "about". Drives the sidebar's active state. */
  name: string;
  /** The command line shown in the output block, e.g. "cat about.txt". */
  display: string;
  /** Every typed form that resolves to this command, e.g. ["about", "cat about.txt"]. */
  match: string[];
  /** One-line description shown in the `help` section. */
  help: string;
  /**
   * Which list this command lands in on the `help` screen. "page" commands
   * render a section; "system" ones are the plain shell builtins like `pwd`.
   */
  group: "page" | "system";
  /** The section to render. Absent for builtins that just print a line. */
  Component?: ComponentType;
  /** If set, this command also appears as a sidebar button with this label. */
  sidebarLabel?: string;
  /** Prompt path this command leaves the shell in (e.g. "~/skills"). Defaults to "~". */
  cwd?: string;
}

/** A link action on a project card. */
export interface ProjectLink {
  label: string;
  href: string;
  /** Open in a new tab; also used by the ↗ suffix. */
  external?: boolean;
}

/** A project shown in the `projects` section. */
export interface Project {
  id: string; // "01" … "05"
  name: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  /** Shown under a client project with no public repo. */
  privateNote?: string;
}

/** A folder node in the skills tree, with its file children. */
export interface SkillGroup {
  /** Folder name including trailing slash, e.g. "frontend/". */
  name: string;
  /** File labels under that folder. */
  items: string[];
}
