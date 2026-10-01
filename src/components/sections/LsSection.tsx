type Kind = "dir" | "doc" | "exe" | "log";

/** One row of the fake `ls -la` output. `run` makes the name clickable. */
interface LsRow {
  perms: string;
  links: string;
  owner: string;
  group: string;
  size: string;
  date: string;
  name: string;
  kind: Kind;
  run?: string;
}

const ROWS: LsRow[] = [
  { perms: "drwxr-xr-x", links: "3", owner: "abhishek", group: "abhishek", size: "4096", date: "Sep 01 18:20", name: ".", kind: "dir", run: "home" },
  { perms: "drwxr-xr-x", links: "5", owner: "abhishek", group: "abhishek", size: "4096", date: "Sep 01 18:20", name: "..", kind: "dir", run: "home" },
  { perms: "drwxr-xr-x", links: "3", owner: "abhishek", group: "abhishek", size: "2048", date: "Sep 02 09:41", name: "src/", kind: "dir" },
  { perms: "drwxr-xr-x", links: "1", owner: "abhishek", group: "abhishek", size: "1024", date: "Sep 02 09:40", name: "public/", kind: "dir" },
  { perms: "drwxr-xr-x", links: "2", owner: "abhishek", group: "abhishek", size: "512", date: "Sep 01 18:20", name: "projects/", kind: "dir", run: "ls projects/" },
  { perms: "drwxr-xr-x", links: "2", owner: "abhishek", group: "abhishek", size: "512", date: "Sep 01 18:20", name: "skills/", kind: "dir", run: "ls skills/" },
  { perms: "drwxr-xr-x", links: "1", owner: "abhishek", group: "abhishek", size: "512", date: "Sep 01 18:20", name: ".git/", kind: "dir" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", group: "abhishek", size: "214", date: "Sep 01 18:20", name: "about.txt", kind: "doc", run: "cat about.txt" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", group: "abhishek", size: "1024", date: "Sep 01 18:20", name: "experience.log", kind: "log", run: "cat experience.log" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", group: "abhishek", size: "4821", date: "Sep 01 18:21", name: "README.md", kind: "doc" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", group: "abhishek", size: "128704", date: "Sep 01 18:21", name: "certificate.pdf", kind: "exe", run: "cat certificate.pdf" },
  { perms: "-rw-r--r--", links: "1", owner: "abhishek", group: "abhishek", size: "49286", date: "Oct 01 15:33", name: "resume.pdf", kind: "exe", run: "./download_resume" },
  { perms: "-rwxr-xr-x", links: "1", owner: "abhishek", group: "abhishek", size: "2048", date: "Sep 02 09:41", name: "./contact", kind: "exe", run: "./contact" },
  { perms: "-rwxr-xr-x", links: "1", owner: "abhishek", group: "abhishek", size: "2048", date: "Sep 02 09:41", name: "./download_resume", kind: "exe", run: "./download_resume" },
];

/** Filename colour, by what the file is. */
const KIND_CLASS: Record<Kind, string> = {
  dir: "ls-dir",
  doc: "ls-doc",
  exe: "ls-exe",
  log: "ls-log",
};

/** One pre-formatted `ls -la` line: aligned columns, coloured, clickable name. */
function LsLine({ row }: { row: LsRow }) {
  return (
    <div>
      <span className="ls-meta">
        {row.perms.padEnd(11)}
        {row.links.padEnd(4)}
        {row.owner.padEnd(9)}
        {row.group.padEnd(9)}
        {row.size.padStart(7)} {row.date} {"  "}
      </span>

      <span
        className={`${KIND_CLASS[row.kind]}${row.run ? " clickable" : ""}`}
        data-run={row.run}
      >
        {row.name}
      </span>
    </div>
  );
}

/** `ls -la` — a coloured, navigable listing of the portfolio directory. */
export default function LsSection() {
  return (
    <>
      <div className="heading">PORTFOLIO</div>

      <div className="ls-list">
        {ROWS.map((row) => (
          <LsLine key={row.name} row={row} />
        ))}
      </div>

      <div className="dim ls-meta">
        click a name to open it — dirs are <span className="cyan">cyan</span>,{" "}
        executables <span className="green">green</span>
      </div>
    </>
  );
}
