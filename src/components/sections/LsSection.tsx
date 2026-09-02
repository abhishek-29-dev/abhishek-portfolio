import type { ReactNode } from "react";

type Kind = "dir" | "doc" | "code" | "exe" | "log";

interface LsRow {
  perms: string;
  links: string;
  owner: string;
  size: string;
  date: string;
  label: string;
  kind: Kind;
  run?: string; // command triggered when clicked
}

const ROWS: LsRow[] = [
  { perms: "drwxr-xr-x", links: "3", owner: "abhishek", size: "4096", date: "Sep 01 18:20", label: ".", kind: "dir", run: "home" },
  { perms: "drwxr-xr-x", links: "5", owner: "abhishek", size: "4096", date: "Sep 01 18:20", label: "..", kind: "dir", run: "home" },
  { perms: "drwxr-xr-x", links: "3", owner: "abhishek", size: "2048", date: "Sep 02 09:41", label: "src/", kind: "dir" },
  { perms: "drwxr-xr-x", links: "1", owner: "abhishek", size: "1024", date: "Sep 02 09:40", label: "public/", kind: "dir" },
  { perms: "drwxr-xr-x", links: "2", owner: "abhishek", size: "512", date: "Sep 01 18:20", label: "projects/", kind: "dir", run: "ls projects/" },
  { perms: "drwxr-xr-x", links: "2", owner: "abhishek", size: "512", date: "Sep 01 18:20", label: "skills/", kind: "dir", run: "ls skills/" },
  { perms: "drwxr-xr-x", links: "1", owner: "abhishek", size: "512", date: "Sep 01 18:20", label: ".git/", kind: "dir" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", size: "214", date: "Sep 01 18:20", label: "about.txt", kind: "doc", run: "cat about.txt" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", size: "1024", date: "Sep 01 18:20", label: "experience.log", kind: "log", run: "cat experience.log" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", size: "4821", date: "Sep 01 18:21", label: "README.md", kind: "doc" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", size: "128704", date: "Sep 01 18:21", label: "certificate.pdf", kind: "exe", run: "cat certificate.pdf" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", size: "97290", date: "Sep 01 18:22", label: "resume.pdf", kind: "exe", run: "./download_resume" },
  { perms: "-rwxr-xr-x", links: "1", owner: "abhishek", size: "2048", date: "Sep 02 09:41", label: "./contact", kind: "exe", run: "./contact" },
  { perms: "-rwxr-xr-x", links: "1", owner: "abhishek", size: "2048", date: "Sep 02 09:41", label: "./download_resume", kind: "exe", run: "./download_resume" },
];

const KIND_CLASS: Record<Kind, string> = {
  dir: "ls-dir",
  doc: "ls-doc",
  code: "ls-code",
  exe: "ls-exe",
  log: "ls-log",
};

const padEnd = (value: string, width: number) => value.padEnd(width);
const padStart = (value: string, width: number) => value.padStart(width);

/** One pre-formatted `ls -la` line: aligned columns, colored, clickable name. */
function LsLine({ row }: { row: LsRow }) {
  const name: ReactNode = row.run ? (
    <span
      className={KIND_CLASS[row.kind]}
      data-run={row.run}
      style={{ cursor: "pointer" }}
    >
      {row.label}
    </span>
  ) : (
    <span className={KIND_CLASS[row.kind]}>{row.label}</span>
  );

  return (
    <div>
      <span className="ls-meta">
        {padEnd(row.perms, 11)}
        {padEnd(row.links, 3)}
        {padEnd(row.owner, 9)}
        {padEnd(row.owner, 9)}
        {padStart(row.size, 6)} {row.date}  {" "}
      </span>
      {name}
    </div>
  );
}

/** `ls -la` — a colored, navigable listing of the portfolio directory. */
export default function LsSection() {
  return (
    <>
      <div className="heading">PORTFOLIO</div>

      <div className="ls-list">
        {ROWS.map((row) => (
          <LsLine key={row.label} row={row} />
        ))}
      </div>

      <div className="dim ls-meta">
        total 8 · click a name to open it — dirs are <span className="cyan">cyan</span>,{" "}
        executables <span className="green">green</span>
      </div>
    </>
  );
}