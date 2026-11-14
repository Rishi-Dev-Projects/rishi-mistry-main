import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "accent";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({
  href,
  variant = "primary",
  icon,
  children,
  className,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] w-fit cursor-pointer select-none";

  const variantClasses = {
    primary:
      "bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] border border-transparent",
    secondary:
      "bg-white/[0.04] text-zinc-200 border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/[0.08] hover:border-white/[0.16] hover:text-white",
    accent:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-zinc-950 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]",
  };

  const iconClasses = {
    primary:
      "w-8 h-8 rounded-full bg-zinc-950 text-zinc-100 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    secondary:
      "w-8 h-8 rounded-full bg-white/[0.06] text-zinc-400 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    accent:
      "w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:bg-zinc-950 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className={iconClasses[variant]}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, variantClasses[variant], className)}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}

