import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      primary:
        "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-semibold border border-zinc-200",
      secondary:
        "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-800",
      outline:
        "border border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-white",
      ghost:
        "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
      danger:
        "bg-red-950 text-red-200 hover:bg-red-900 border border-red-900/60",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
