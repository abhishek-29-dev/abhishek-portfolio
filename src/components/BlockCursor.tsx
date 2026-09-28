import { useEffect, useRef } from "react";

/** Anything the block cursor should light up when hovered. */
const INTERACTIVE = "a, button, [data-run], input";

/** Anywhere the block cursor should be visible at all. */
const IN_SHELL = ".terminal, .sidebar";

/**
 * Terminal-style block cursor that stands in for the OS pointer over the shell.
 * CSS hides the real cursor on fine pointers; this one follows the mouse and
 * flashes white over anything clickable.
 */
export function BlockCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const paintQueued = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /** Move the cursor and update its hover state from whatever is under it. */
    const paint = () => {
      paintQueued.current = false;
      const { x, y } = mouse.current;
      cursor.style.transform = `translate(${x + 6}px, ${y + 6}px)`;

      const under = document.elementFromPoint(x, y);
      const inShell = Boolean(under?.closest(IN_SHELL));
      const clickable = Boolean(under?.closest(INTERACTIVE));

      cursor.classList.toggle("on", inShell);
      cursor.classList.toggle("hot", inShell && clickable);
    };

    /**
     * Coalesce events into one paint per frame — mousemove fires far more
     * often than the screen refreshes.
     */
    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
      if (paintQueued.current) return;
      paintQueued.current = true;
      requestAnimationFrame(paint);
    };

    // mouseover/mouseout matter too: hovering a new element can change what
    // sits under a cursor that hasn't moved.
    const events = ["mousemove", "mouseover", "mouseout"] as const;
    for (const type of events) {
      document.addEventListener(type, onMove);
    }

    return () => {
      for (const type of events) {
        document.removeEventListener(type, onMove);
      }
    };
  }, []);

  return <div ref={cursorRef} className="block-cursor" />;
}
