import { useEffect, useRef } from "react";

/**
 * Terminal-style block cursor that replaces the OS pointer over the shell.
 * The OS cursor is hidden with CSS (`cursor: none`) only on fine pointers;
 * this block follows the mouse via a RAF-throttled handler and flashes white
 * when hovering something clickable.
 */
const INTERACTIVE = "a, button, [data-run], input";

export function BlockCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef(false);
  const overShellRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const paint = () => {
      pendingRef.current = false;
      const { x, y } = mouseRef.current;
      cursor.style.transform = `translate(${x + 6}px, ${y + 6}px)`;

      const element = document.elementFromPoint(x, y) as HTMLElement | null;
      const inShell = !!element && Boolean(element.closest(".terminal, .sidebar"));
      const hot = !!element && Boolean(element.closest(INTERACTIVE));

      if (inShell && !overShellRef.current) {
        overShellRef.current = true;
        cursor.classList.add("on");
      } else if (!inShell && overShellRef.current) {
        overShellRef.current = false;
        cursor.classList.remove("on");
      }
      cursor.classList.toggle("hot", inShell && hot);
    };

    const onMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (!pendingRef.current) {
        pendingRef.current = true;
        requestAnimationFrame(paint);
      }
    };

    // Keep the hot state in sync on element boundary changes while idle.
    const onOver = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (!pendingRef.current) {
        pendingRef.current = true;
        requestAnimationFrame(paint);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOver);
    };
  }, []);

  return <div ref={cursorRef} className="block-cursor" />;
}