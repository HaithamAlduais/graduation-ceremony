"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

const allImages = [
  "/images/DSC00024.JPG",
  "/images/DSC00026.JPG",
  "/images/DSC00037.JPG",
  "/images/DSC00049.JPG",
  "/images/DSC00050.JPG",
  "/images/DSC00056.JPG",
  "/images/DSC00064.JPG",
  "/images/DSC00067.JPG",
  "/images/DSC00073.JPG",
  "/images/DSC00077.JPG",
  "/images/DSC00079.JPG",
  "/images/DSC00082.JPG",
  "/images/DSC00083.JPG",
  "/images/DSC00097.JPG",
  "/images/DSC00100.JPG",
  "/images/DSC00103.JPG",
  "/images/DSC00107.JPG",
  "/images/DSC00112.JPG",
  "/images/DSC00115.JPG",
  "/images/DSC00118.JPG",
  "/images/DSC00121.JPG",
  "/images/DSC00123.JPG",
  "/images/DSC00153.JPG",
  "/images/DSC00159.JPG",
  "/images/DSC00163.JPG",
  "/images/DSC00164.JPG",
  "/images/DSC00167.JPG",
  "/images/DSC00189.JPG",
  "/images/DSC00193.JPG",
  "/images/DSC00199.JPG",
  "/images/DSC00203.JPG",
  "/images/DSC00304.JPG",
  "/images/DSC00309.JPG",
  "/images/DSC00431.JPG",
  "/images/DSC00434.JPG",
  "/images/DSC00436.JPG",
  "/images/DSC00437.JPG",
  "/images/DSC00442.JPG",
  "/images/DSC00444.JPG",
  "/images/DSC00445.JPG",
  "/images/DSC00446.JPG",
  "/images/DSC00448.JPG",
  "/images/DSC00449.JPG",
  "/images/DSC00458.JPG",
  "/images/DSC00459.JPG",
  "/images/DSC00463.JPG",
  "/images/DSC00465.JPG",
  "/images/DSC00470.JPG",
  "/images/DSC00475.JPG",
  "/images/DSC00477.JPG",
  "/images/fifth image.JPG",
  "/images/first image.JPG",
  "/images/forth image.JPG",
  "/images/grad-1.jpg",
  "/images/grad-2.jpg",
  "/images/grad-3.jpg",
  "/images/grad-4.jpg",
  "/images/grad-5.jpg",
  "/images/second image.JPG",
  "/images/third image (our college).jpg",
];

const rows = [
  { images: allImages.slice(0, 20), direction: "left", duration: 70 },
  { images: allImages.slice(20, 40), direction: "right", duration: 82 },
  { images: allImages.slice(40, 60), direction: "left", duration: 94 },
] as const;

function GalleryImage({ src }: { src: string }) {
  return (
    <div className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl shadow-sm sm:h-44 sm:w-60 md:h-56 md:w-72 lg:h-64 lg:w-80">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, (min-width: 640px) 240px, 208px"
        className="object-cover"
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-transparent" />
    </div>
  );
}

function SeamlessMarqueeRow({
  images,
  direction,
  duration,
}: {
  images: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const style = {
    "--gallery-duration": `${duration}s`,
    animationName:
      direction === "left" ? "gallery-marquee-left" : "gallery-marquee-right",
  } as CSSProperties;

  return (
    <div className="relative w-full overflow-hidden group" dir="ltr">
      <div className="absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none sm:w-32 md:w-44" />
      <div className="absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none sm:w-32 md:w-44" />

      <div
        className="flex w-max animate-gallery-marquee will-change-transform group-hover:[animation-play-state:paused]"
        style={style}
      >
        {[0, 1, 2].map((copyIndex) => (
          <div
            key={copyIndex}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-6 md:pr-6"
            aria-hidden={copyIndex > 0}
          >
            {images.map((src) => (
              <GalleryImage key={`${copyIndex}-${src}`} src={src} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden bg-white py-16 sm:py-20 md:py-28">
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:mb-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-ksu-navy font-display md:text-4xl">
            لحظات من حفل التخرج
          </h2>
          <p className="mx-auto max-w-2xl text-base text-ksu-navy/60 sm:text-lg">
            صور تذكارية من احتفالات التخرج السابقة
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {rows.map((row, index) => (
          <SeamlessMarqueeRow
            key={index}
            images={row.images}
            direction={row.direction}
            duration={row.duration}
          />
        ))}
      </div>
    </section>
  );
}
