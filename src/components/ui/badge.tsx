import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "active";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "border-zinc-800 bg-zinc-900/90 text-zinc-300",
    outline: "border-zinc-800 text-zinc-400 hover:text-zinc-200",
    active: "border-emerald-800/60 bg-emerald-950/40 text-emerald-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
