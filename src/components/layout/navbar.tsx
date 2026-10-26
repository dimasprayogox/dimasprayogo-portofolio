"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV_ITEMS, SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md animate-navbar">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90 font-mono"
        >
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          {SITE_CONFIG.name.toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {PUBLIC_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white font-semibold" : "text-zinc-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-zinc-800" />
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-mono text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Contact Me
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-400 sm:hidden hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-black px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-3">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-1 text-sm font-medium",
                  pathname === item.href ? "text-white" : "text-zinc-400"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 p-2 text-xs font-mono text-zinc-300"
            >
              <ShieldCheck className="h-4 w-4" /> Contact Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
