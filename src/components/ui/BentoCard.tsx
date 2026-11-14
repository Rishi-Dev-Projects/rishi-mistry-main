import React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function BentoCard({
  children,
  className,
  innerClassName,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-[2rem] p-1.5 bg-white/[0.02] border border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.16] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full rounded-[calc(2rem-0.375rem)] bg-[#111115] border border-white/[0.06] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#15151a] group-hover:border-white/[0.1]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

