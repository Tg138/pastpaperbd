"use client";

import { useEffect, useState } from "react";
import { openSearchPalette } from "./SearchPalette";

export function SearchTrigger({ className = "" }: { className?: string }) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => openSearchPalette()}
      aria-label="Open search"
      title="Search (Ctrl/Cmd + K)"
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 text-[10px]">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
