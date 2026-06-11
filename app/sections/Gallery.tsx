"use client";

import { useRef, useEffect } from "react";

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
  speed: number; // pixels per second
  stopScroll: boolean;
}

function MarqueeRow({ images, direction, speed, stopScroll }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(direction === "left" ? 0 : -1);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for images to load before measuring
    const setup = () => {
      const trackWidth = track.scrollWidth / 2;
      if (trackWidth === 0) return;

      // For "right" direction, start at -trackWidth so first image is visible
      if (direction === "right" && posRef.current === -1) {
        posRef.current = -trackWidth;
      }

      const animate = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const delta = (timestamp - lastTimeRef.current) / 1000; // seconds
        lastTimeRef.current = timestamp;

        if (!stopScroll) {
          const move = speed * delta;

          if (direction === "left") {
            posRef.current -= move;
            if (posRef.current <= -trackWidth) {
              posRef.current += trackWidth;
            }
          } else {
            posRef.current += move;
            if (posRef.current >= 0) {
              posRef.current -= trackWidth;
            }
          }
        }

        track.style.transform = `translateX(${posRef.current}px)`;
        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    // Small delay to let images render before measuring
    const timer = setTimeout(setup, 100);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed, stopScroll]);

  return (
    <div className="overflow-hidden w-full relative">
      {/* Edge vanish gradients */}
      <div className="absolute right-0 top-0 h-full w-20 sm:w-32 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-20 sm:w-32 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" />

      <div
        ref={trackRef}
        className="flex"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {/* Track A — original images */}
        {images.map((src, index) => (
          <div
            key={`a-${index}`}
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

        {/* Track B — identical clone for seamless loop */}
        {images.map((src, index) => (
          <div
            key={`b-${index}`}
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
  const stopRef = useRef(false);

  const handleEnter = () => { stopRef.current = true; };
  const handleLeave = () => { stopRef.current = false; };

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
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Row 1 — moves left */}
        <MarqueeRow
          images={row1Images}
          direction="left"
          speed={60}
          stopScroll={stopRef.current}
        />

        {/* Row 2 — moves right */}
        <MarqueeRow
          images={row2Images}
          direction="right"
          speed={50}
          stopScroll={stopRef.current}
        />

        {/* Row 3 — moves left */}
        <MarqueeRow
          images={row3Images}
          direction="left"
          speed={40}
          stopScroll={stopRef.current}
        />
      </div>
    </section>
  );
}
