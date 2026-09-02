import { absoluteCwd } from "../../utils/cwdStore";

/**
 * Real Unix builtins. Each one is a trivial section whose output is computed
 * at mount time — the moment the command is executed.
 */

export function WhoamiSection() {
  return <span>abhishek</span>;
}

export function UnameSection() {
  return (
    <span>
      Linux portfolio 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC{" "}
      x86_64 GNU/Linux
    </span>
  );
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const FULL_TZ = /\((.*?)\)/.exec(new Date().toString())?.[1] ?? "";
const TZ_SHORT = FULL_TZ === "India Standard Time" ? "IST" : FULL_TZ;

/** Format a Date like GNU `date(1)`: `Tue Sep  2 09:41:22 IST 2026`. */
function linuxDate(date: Date): string {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dayOfMonth = String(date.getDate()).padStart(2, " ");
  const time = [
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0"),
  ].join(":");
  return `${day} ${month} ${dayOfMonth} ${time} ${TZ_SHORT} ${date.getFullYear()}`;
}

export function DateSection() {
  return <span>{linuxDate(new Date())}</span>;
}

export function PwdSection() {
  return <span>{absoluteCwd()}</span>;
}