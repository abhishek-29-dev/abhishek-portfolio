import type { ComponentType, ReactNode } from "react";

/** A section rendered for a terminal command, plus the data it needs. */
export type SectionComponent = ComponentType;

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
  /** Every typed form that resolves to this command, e.g. ["about", "whoami", "cat about.txt"]. */
  match: string[];
  /** If set, this command also appears as a sidebar button with this label. */
  sidebarLabel?: string;
  /** One-line description shown in the `help` section. */
  help: string;
  /** The React component that renders the section content. */
  Component: SectionComponent;
  /** Prompt path that this command leaves the shell in (e.g. "~/skills"). Defaults to "~". */
  cwd?: string;
  /** Set for builtins resolved inside useTerminal (arg-takers like echo). */
  dynamic?: boolean;
}

/** A link action on a project card or certificate card. */
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
  /** Optional screenshot thumbnail path (relative to public/), e.g. "projects/recipe-finder.png". */
  screenshot?: string;
}

/** A folder node in the skills tree, with its file children. */
export interface SkillGroup {
  /** Folder name including trailing slash, e.g. "frontend/". */
  name: string;
  /** File labels under that folder. */
  items: string[];
}