"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  title: string;
  images: string[];
}

// ponytail: optimized gallery with explicit dimensions and WCAG AA contrast colors
export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
          <ImageIcon className="h-6 w-6" />
        </div>
        <p className="text-sm font-mono text-zinc-300">No screenshot provided</p>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Visit the live demo or source code links above to view the project in action.
        </p>
      </div>
    );
  }

  const currentImg = images[activeImageIndex] || images[0];

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex items-center justify-center min-h-[300px] max-h-[580px] p-2 sm:p-4">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${currentImg})` }}
        />
        <Image
          src={currentImg}
          alt={`${title} screenshot ${activeImageIndex + 1}`}
          width={800}
          height={520}
          className="relative z-10 max-h-[520px] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
          loading="lazy"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 right-3 z-20 rounded bg-black/80 px-2.5 py-1 text-xs font-mono text-zinc-300 backdrop-blur-xs">
              {activeImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border bg-zinc-900 transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                activeImageIndex === idx
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : "border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={96}
                height={64}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
