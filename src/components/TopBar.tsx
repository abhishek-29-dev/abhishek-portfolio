interface TopBarProps {
  compact: boolean;
  onResize: () => void;
}

export function TopBar({ compact, onResize }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="window-controls">
        <span className="control red" />
        <span className="control yellow" />
        <span className="control green" />
      </div>

      <div className="terminal-title">abhishek@portfolio: ~/portfolio</div>

      <div className="topbar-right">
        <button
          type="button"
          className="resize-btn"
          onClick={onResize}
          aria-label={compact ? "Return to full screen" : "Resize to 80x24 terminal"}
        >
          {compact ? "[full]" : "[80x24]"}
        </button>

        <div className="topbar-status">
          <span />
          online
        </div>
      </div>
    </header>
  );
}