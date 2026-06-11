"use client";

import { useState } from "react";

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

// Split into 3 rows
const row1Images = allImages.slice(0, 20);
const row2Images = allImages.slice(20, 40);
const row3Images = allImages.slice(40, 60);

interface MarqueeRowProps {
  images: string[];
  direction: "left" | "right";
  duration: number;
  stopScroll: boolean;
}

function MarqueeRow({ images, direction, duration, stopScroll }: MarqueeRowProps) {
  // Duplicate 4x to ensure screen is always fully covered — no gaps
  const duplicatedImages = [...images, ...images, ...images, ...images];

  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden w-full relative">
      {/* Strong edge vanish / fade gradients */}
      <div className="absolute right-0 top-0 h-full w-20 sm:w-32 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-20 sm:w-32 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" />

      <div
        className={`flex w-fit ${animationClass}`}
        style={{
          animationPlayState: stopScroll ? "paused" : "running",
          animationDuration: `${duration}ms`,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="w-44 sm:w-56 md:w-72 lg:w-80 mx-1.5 sm:mx-2 md:mx-3 h-32 sm:h-44 md:h-56 lg:h-64 relative group flex-shrink-0 rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={src}
              alt={`صورة من حفل التخرج ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="eager"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            لحظات من حفل التخرج
          </h2>
          <p className="text-lg text-ksu-navy/60 max-w-2xl mx-auto">
            صور تذكارية من احتفالات التخرج السابقة
          </p>
        </div>
      </div>

      <div
        className="space-y-6"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Row 1 — moves to the right */}
        <MarqueeRow
          images={row1Images}
          direction="right"
          duration={30000}
          stopScroll={stopScroll}
        />

        {/* Row 2 — moves to the left */}
        <MarqueeRow
          images={row2Images}
          direction="left"
          duration={25000}
          stopScroll={stopScroll}
        />

        {/* Row 3 — moves to the right */}
        <MarqueeRow
          images={row3Images}
          direction="right"
          duration={35000}
          stopScroll={stopScroll}
        />
      </div>
    </section>
  );
}
