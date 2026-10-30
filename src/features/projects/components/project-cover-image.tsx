"use client";

import { useState, useRef, useEffect } from "react";
import { Images } from "lucide-react";

interface ProjectCoverImageProps {
  src: string;
  alt: string;
  totalImages?: number;
}

export function ProjectCoverImage({
  src,
  alt,
  totalImages = 0,
}: ProjectCoverImageProps) {
  const [isPortrait, setIsPortrait] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalHeight > imgRef.current.naturalWidth) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    }
  }, [src]);

  return (
    <div className="h-52 sm:h-56 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800 relative flex items-center justify-center">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-125 pointer-events-none"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={(e) => {
          const img = e.currentTarget;
          setIsPortrait(img.naturalHeight > img.naturalWidth);
        }}
        className={`relative z-10 transition-transform duration-500 group-hover:scale-105 ${
          isPortrait
            ? "h-[88%] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            : "h-full w-full object-cover"
        }`}
      />

      {totalImages > 1 && (
        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-xs">
          <Images className="h-3 w-3" />
          {totalImages}
        </div>
      )}
    </div>
  );
}
