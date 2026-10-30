"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import DecryptedText from "@/components/ui/decrypted-text";
import BorderGlow from "@/components/ui/border-glow";
import { motion } from "motion/react";

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [heroContentReady, setHeroContentReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", listener);

    const fallbackTimer = setTimeout(() => {
      setHeroContentReady(true);
    }, 2800);

    return () => {
      media.removeEventListener("change", listener);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const isReady = isDesktop === false || (isDesktop === true && heroContentReady);

  return (
    <section id="home" className="min-h-[calc(100vh-7rem)] flex flex-col justify-center py-8 lg:py-12">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3.5 py-1 text-xs font-mono text-zinc-300"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-glow" />
            <span>{SITE_CONFIG.status}</span>
          </motion.div>

          <div className="space-y-3">
            <div className="flex items-center gap-3.5 sm:gap-6">
              {/* Mobile Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: easeCurve }}
                className="lg:hidden shrink-0"
              >
                <div className="relative w-20 sm:w-28 aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/avatar.webp"
                    alt={SITE_CONFIG.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent pointer-events-none" />
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/70" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/70" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-white/70" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/70" />
                </div>
              </motion.div>

              <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                <motion.h1
                  initial={{ opacity: 0, x: -35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: easeCurve, delay: 0.05 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                >
                  Hi, I&apos;m{" "}
                  <span className="text-white lg:hidden">
                    {SITE_CONFIG.name}.
                  </span>
                  <span className="hidden lg:inline">
                    <DecryptedText
                      text={SITE_CONFIG.name}
                      speed={90}
                      maxIterations={25}
                      sequential={true}
                      revealDirection="start"
                      animateOn="view"
                      onAnimationComplete={() => setHeroContentReady(true)}
                      className="text-white"
                      encryptedClassName="text-zinc-500 font-mono"
                      parentClassName="inline-block"
                    />
                    .
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={isReady ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.65, ease: easeCurve, delay: isDesktop ? 0.1 : 0.15 }}
                  className="text-sm sm:text-base lg:text-2xl text-zinc-300 font-medium leading-snug"
                >
                  {SITE_CONFIG.role}
                </motion.p>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -25 }}
              animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
              transition={{ duration: 0.65, ease: easeCurve, delay: isDesktop ? 0.25 : 0.25 }}
              className="text-base text-zinc-400 leading-relaxed pt-2 max-w-2xl"
            >
              {SITE_CONFIG.bio}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.65, ease: easeCurve, delay: isDesktop ? 0.4 : 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link href="/projects">
              <Button variant="primary" size="lg">
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Profile Photo Frame */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={isReady ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.75, ease: easeCurve, delay: isDesktop ? 0.3 : 0.25 }}
          className="hidden lg:flex lg:col-span-5 justify-end"
        >
          <BorderGlow
            edgeSensitivity={40}
            glowColor="0 0 100"
            backgroundColor="#09090b"
            borderRadius={24}
            glowRadius={35}
            glowIntensity={1.0}
            coneSpread={35}
            animated={false}
            colors={["#ffffff", "#e4e4e7", "#71717a"]}
            className="w-full max-w-xs sm:max-w-sm aspect-[4/5] p-2 shadow-2xl"
          >
            <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-zinc-900 border border-zinc-800/80 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.webp"
                alt={SITE_CONFIG.name}
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

              {/* Tech Corner Brackets */}
              <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-white/70" />
              <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-white/70" />
              <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-white/70" />
              <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-white/70" />

              {/* Info Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-mono text-white font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-[11px] font-mono text-zinc-400">{SITE_CONFIG.role}</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  );
}
