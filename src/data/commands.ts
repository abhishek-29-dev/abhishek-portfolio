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
 */
export const COMMANDS: CommandDef[] = [
  {
    name: "help",
    display: "help",
    match: ["help"],
    help: "show this list",
    Component: HelpSection,
  },
  {
    name: "home",
    display: "./home",
    sidebarLabel: "./home",
    match: ["home", "./home"],
    help: "return to homepage",
    Component: HomeSection,
  },
  {
    name: "about",
    display: "cat about.txt",
    sidebarLabel: "cat about.txt",
    match: ["about", "cat about.txt"],
    help: "about me",
    Component: AboutSection,
  },
  {
    name: "skills",
    display: "ls skills/",
    sidebarLabel: "ls skills/",
    match: ["skills", "ls skills/", "tree"],
    help: "list technical skills",
    cwd: "~/skills",
    Component: SkillsSection,
  },
  {
    name: "projects",
    display: "ls projects/",
    sidebarLabel: "ls projects/",
    match: ["projects", "ls", "ls projects/"],
    help: "view projects",
    cwd: "~/projects",
    Component: ProjectsSection,
  },
  {
    name: "experience",
    display: "cat experience.log",
    sidebarLabel: "cat experience.log",
    match: ["experience", "cat experience.log"],
    help: "view experience",
    Component: ExperienceSection,
  },
  {
    name: "certificate",
    display: "cat certificate.pdf",
    sidebarLabel: "cat certificate.pdf",
    match: ["certificate", "cat certificate.pdf"],
    help: "view internship certificate",
    Component: CertificateSection,
  },
  {
    name: "resume",
    display: "./download_resume",
    match: ["resume", "./download_resume"],
    help: "view / download resume",
    Component: ResumeSection,
  },
  {
    name: "contact",
    display: "./contact",
    sidebarLabel: "./contact",
    match: ["contact", "./contact"],
    help: "contact information",
    Component: ContactSection,
  },
  {
    name: "neofetch",
    display: "neofetch",
    match: ["neofetch", "sysinfo", "system"],
    help: "show dev system info",
    Component: NeofetchSection,
  },
  {
    name: "theme",
    display: "theme",
    match: ["theme", "! theme"],
    help: "toggle blue / green terminal theme",
    Component: NeofetchSection, // placeholder — theme command is handled in useTerminal
  },
  {
    name: "pwd",
    display: "pwd",
    match: ["pwd"],
    help: "print the current working directory",
    Component: PwdSection,
  },
  {
    name: "whoami",
    display: "whoami",
    match: ["whoami"],
    help: "print the current user",
    Component: WhoamiSection,
  },
  {
    name: "uname",
    display: "uname -a",
    match: ["uname", "uname -a"],
    help: "print system information",
    Component: UnameSection,
  },
  {
    name: "date",
    display: "date",
    match: ["date"],
    help: "print the current date and time",
    Component: DateSection,
  },
  {
    name: "echo",
    display: "echo <text>",
    match: ["echo"],
    help: "print a line of text",
    dynamic: true,
    Component: NeofetchSection, // placeholder — echo is handled in useTerminal
  },
  {
    name: "history",
    display: "history",
    match: ["history"],
    help: "show the command history",
    dynamic: true,
    Component: NeofetchSection, // placeholder — history is handled in useTerminal
  },
  {
    name: "ls -la",
    display: "ls -la",
    match: ["ls -la"],
    help: "detailed listing of the portfolio",
    Component: LsSection,
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

/** Levenshtein edit distance between two strings. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

/**
 * Suggest a command for a mistyped input.
 * Priority: substring match → Levenshtein distance.
 * Returns the display string of the best match, or undefined.
 */
export function suggestCommand(input: string): string | undefined {
  const key = input.trim().toLowerCase();
  if (!key) return undefined;

  // 1. Substring match: input is contained in a match, or a match is contained in input
  const substringMatch = ALL_COMMAND_KEYS.find(
    (form) => key.includes(form) || form.includes(key)
  );
  if (substringMatch) {
    const cmd = COMMANDS.find((c) => c.match.includes(substringMatch));
    if (cmd) return cmd.display;
  }

  // 2. Levenshtein: find the closest match within edit distance 3
  let bestDistance = Infinity;
  let bestDisplay: string | undefined;
  for (const command of COMMANDS) {
    for (const form of command.match) {
      const distance = levenshtein(key, form);
      if (distance < bestDistance && distance <= 3) {
        bestDistance = distance;
        bestDisplay = command.display;
      }
    }
  }
  return bestDisplay;
}