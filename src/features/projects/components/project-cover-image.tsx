import Image from "next/image";
import { Images } from "lucide-react";

interface ProjectCoverImageProps {
  src: string;
  alt: string;
  totalImages?: number;
}

// ponytail: responsive next/image with fill & sizes to eliminate layout shifts and auto-compress 1.4MB to 30KB
export function ProjectCoverImage({
  src,
  alt,
  totalImages = 0,
}: ProjectCoverImageProps) {
  return (
    <div className="h-52 sm:h-56 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800 relative flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
