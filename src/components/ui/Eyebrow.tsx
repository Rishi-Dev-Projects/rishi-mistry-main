import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export function Eyebrow({ children, showDot = false, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-[11px] font-semibold tracking-[0.14em] uppercase text-emerald-400 mb-4 w-fit",
        className
      )}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}

