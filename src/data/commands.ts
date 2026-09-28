import type { CommandDef } from "../types";

import HelpSection from "../components/sections/HelpSection";
import HomeSection from "../components/sections/HomeSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import CertificateSection from "../components/sections/CertificateSection";
import ResumeSection from "../components/sections/ResumeSection";
import ContactSection from "../components/sections/ContactSection";
import NeofetchSection from "../components/sections/NeofetchSection";
import LsSection from "../components/sections/LsSection";
import {
  DateSection,
  PwdSection,
  UnameSection,
  WhoamiSection,
} from "../components/sections/SystemSections";

/**
 * Single source of truth for the shell. Sidebar buttons, the `help` list,
 * autocomplete and output labels all derive from here — no duplicates.
 *
 * `group` only decides which list a command lands in on the `help` screen.
 * Whether useTerminal renders `Component` or handles the command itself
 * depends on whether a `Component` is set.
 */
export const COMMANDS: CommandDef[] = [
  {
    name: "help",
    display: "help",
    match: ["help"],
    help: "show this list",
    group: "page",
    Component: HelpSection,
  },
  {
    name: "home",
    display: "./home",
    sidebarLabel: "./home",
    match: ["home", "./home"],
    help: "return to homepage",
    group: "page",
    Component: HomeSection,
  },
  {
    name: "about",
    display: "cat about.txt",
    sidebarLabel: "cat about.txt",
    match: ["about", "cat about.txt"],
    help: "about me",
    group: "page",
    Component: AboutSection,
  },
  {
    name: "skills",
    display: "ls skills/",
    sidebarLabel: "ls skills/",
    match: ["skills", "ls skills/", "tree"],
    help: "list technical skills",
    group: "page",
    Component: SkillsSection,
    cwd: "~/skills",
  },
  {
    name: "projects",
    display: "ls projects/",
    sidebarLabel: "ls projects/",
    match: ["projects", "ls", "ls projects/"],
    help: "view projects",
    group: "page",
    Component: ProjectsSection,
    cwd: "~/projects",
  },
  {
    name: "experience",
    display: "cat experience.log",
    sidebarLabel: "cat experience.log",
    match: ["experience", "cat experience.log"],
    help: "view experience",
    group: "page",
    Component: ExperienceSection,
  },
  {
    name: "certificate",
    display: "cat certificate.pdf",
    sidebarLabel: "cat certificate.pdf",
    match: ["certificate", "cat certificate.pdf"],
    help: "view internship certificate",
    group: "page",
    Component: CertificateSection,
  },
  {
    name: "resume",
    display: "./download_resume",
    match: ["resume", "./download_resume"],
    help: "view / download resume",
    group: "page",
    Component: ResumeSection,
  },
  {
    name: "contact",
    display: "./contact",
    sidebarLabel: "./contact",
    match: ["contact", "./contact"],
    help: "contact information",
    group: "page",
    Component: ContactSection,
  },
  {
    name: "neofetch",
    display: "neofetch",
    match: ["neofetch", "sysinfo", "system"],
    help: "show dev system info",
    group: "page",
    Component: NeofetchSection,
  },
  // System builtins. The first few render a one-liner section; the rest are
  // handled inside useTerminal because they print text or change shell state.
  {
    name: "ls -la",
    display: "ls -la",
    match: ["ls -la"],
    help: "detailed listing of the portfolio",
    group: "system",
    Component: LsSection,
  },
  {
    name: "theme",
    display: "theme",
    match: ["theme", "! theme"],
    help: "toggle blue / green terminal theme",
    group: "system",
  },
  {
    name: "pwd",
    display: "pwd",
    match: ["pwd"],
    help: "print the current working directory",
    group: "system",
    Component: PwdSection,
  },
  {
    name: "whoami",
    display: "whoami",
    match: ["whoami"],
    help: "print the current user",
    group: "system",
    Component: WhoamiSection,
  },
  {
    name: "uname",
    display: "uname -a",
    match: ["uname", "uname -a"],
    help: "print system information",
    group: "system",
    Component: UnameSection,
  },
  {
    name: "date",
    display: "date",
    match: ["date"],
    help: "print the current date and time",
    group: "system",
    Component: DateSection,
  },
  {
    name: "echo",
    display: "echo <text>",
    match: ["echo"],
    help: "print a line of text",
    group: "system",
  },
  {
    name: "history",
    display: "history",
    match: ["history"],
    help: "show the command history",
    group: "system",
  },
  {
    name: "clear",
    display: "clear",
    match: ["clear"],
    help: "clear the terminal",
    group: "system",
  },
];

/** Every string a user could type (canonical names + aliases). */
export const ALL_COMMAND_KEYS = COMMANDS.flatMap(
  (command) => command.match
);

/** Sidebar buttons, in display order. */
export const SIDEBAR_COMMANDS = COMMANDS.filter(
  (command) => command.sidebarLabel
);

/** Resolve a typed command to its definition, or undefined if unknown. */
export function resolveCommand(input: string): CommandDef | undefined {
  const key = input.trim().toLowerCase();
  return COMMANDS.find((command) => command.match.includes(key));
}

/** Levenshtein edit distance — how many single-character edits turn a into b. */
function levenshtein(a: string, b: string): number {
  // Walking the table one row at a time means only two rows are ever needed:
  // the one above and the one being filled in.
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    const current = [i, ...Array<number>(b.length).fill(0)];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1, // delete a[i-1]
        current[j - 1] + 1, // insert b[j-1]
        previous[j - 1] + cost // keep or replace
      );
    }

    previous = current;
  }

  return previous[b.length];
}

/**
 * Suggest a command for a mistyped input, for the "Did you mean" line.
 * First try to match the spelling (within 3 edits), then fall back to a
 * partial match. Returns the command's display string, or undefined.
 */
export function suggestCommand(input: string): string | undefined {
  const key = input.trim().toLowerCase();
  if (!key) return undefined;

  let closest: { display: string; distance: number } | undefined;

  for (const command of COMMANDS) {
    for (const form of command.match) {
      const distance = levenshtein(key, form);
      if (distance <= 3 && distance < (closest?.distance ?? Infinity)) {
        closest = { display: command.display, distance };
      }
    }
  }

  if (closest) return closest.display;

  // No close spelling, so accept a partial one: "proj" → "ls projects/".
  for (const command of COMMANDS) {
    if (command.match.some((form) => form.includes(key) || key.includes(form))) {
      return command.display;
    }
  }

  return undefined;
}
