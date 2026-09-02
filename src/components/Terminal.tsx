import { useEffect, useRef } from "react";
import type { OutputBlock as OutputBlockModel } from "../types";
import { OutputBlock } from "./OutputBlock";
import { CommandInput } from "./CommandInput";
import { StatusBar } from "./StatusBar";

interface TerminalProps {
  blocks: OutputBlockModel[];
  history: string[];
  ready: boolean;
  cwd: string;
  flashKey: number;
  onCommand: (command: string) => void;
}

export function Terminal({ blocks, history, ready, cwd, flashKey, onCommand }: TerminalProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Keep scrolled to the newest output block, like a real terminal.
  useEffect(() => {
    const element = outputRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [blocks]);

  // Event delegation: clicking any element with data-run triggers that command.
  const handleBodyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const runEl = target.closest<HTMLElement>("[data-run]");
    if (runEl) {
      onCommand(runEl.dataset.run!);
    }
  };

  return (
    <main className="terminal">
      {flashKey > 0 && <div key={flashKey} className="error-flash" />}

      <div className="terminal-body" ref={outputRef} aria-live="polite" onClick={handleBodyClick}>
        {blocks.map((block) => (
          <OutputBlock key={block.id} command={block.command} cwd={block.cwd}>
            {block.content}
          </OutputBlock>
        ))}
      </div>

      <CommandInput history={history} ready={ready} cwd={cwd} onCommand={onCommand} />

      <StatusBar cwd={cwd} />
    </main>
  );
}