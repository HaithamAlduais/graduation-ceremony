"use client";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import Image from "next/image";
import { Building2, Calendar, Clock, ExternalLink, MapPin, Navigation } from "lucide-react";

const hallLocation = {
  title: "المكان",
  description: "قاعة حمد الجاسر",
  subtext: "مبنى 26 - جامعة الملك سعود، الرياض",
  lat: 24.7173626,
  lng: 46.6203734,
  mapsUrl:
    "https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D8%A9+%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D8%AC%D8%A7%D8%B3%D8%B1+%D9%84%D9%84%D9%85%D8%A4%D8%AA%D9%85%D8%B1%D8%A7%D8%AA%E2%80%AD/data=!4m2!3m1!1s0x0:0x105970bde1f16b4c?sa=X&ved=1t:2428&ictx=111",
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const mapboxMapUrl = mapboxToken
  ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+008DC3(${hallLocation.lng},${hallLocation.lat})/${hallLocation.lng},${hallLocation.lat},15.6,0/900x520@2x?access_token=${mapboxToken}`
  : "";
const fallbackTileZoom = 16;
const fallbackTileSize = 256;
const fallbackTileRadius = 2;
const fallbackTileScale = 2 ** fallbackTileZoom;
const latRadians = (hallLocation.lat * Math.PI) / 180;
const fallbackTilePoint = {
  x: ((hallLocation.lng + 180) / 360) * fallbackTileScale,
  y:
    ((1 -
      Math.log(Math.tan(latRadians) + 1 / Math.cos(latRadians)) / Math.PI) /
      2) *
    fallbackTileScale,
};
const fallbackTileX = Math.floor(fallbackTilePoint.x);
const fallbackTileY = Math.floor(fallbackTilePoint.y);
const fallbackTileOffsetX =
  (fallbackTileRadius + fallbackTilePoint.x - fallbackTileX) * fallbackTileSize;
const fallbackTileOffsetY =
  (fallbackTileRadius + fallbackTilePoint.y - fallbackTileY) * fallbackTileSize;
const fallbackTileRange = Array.from(
  { length: fallbackTileRadius * 2 + 1 },
  (_, index) => index - fallbackTileRadius,
);
const fallbackTiles = fallbackTileRange.flatMap((row) =>
  fallbackTileRange.map((column) => ({
    key: `${row}-${column}`,
    src: `https://tile.openstreetmap.org/${fallbackTileZoom}/${fallbackTileX + column}/${fallbackTileY + row}.png`,
  })),
);

const details = [
  {
    icon: Calendar,
    title: "التاريخ",
    description: "29 يونيو 2026",
    subtext: "يوم الاثنين",
    tone: "text-ksu-gold",
    iconSurface: "bg-ksu-gold/14",
  },
  {
    icon: Building2,
    title: "الكلية",
    description: "علوم الحاسب والمعلومات",
    subtext: "جامعة الملك سعود",
    tone: "text-ksu-green",
    iconSurface: "bg-ksu-green/12",
  },
  {
    icon: Clock,
    title: "الوقت",
    description: "4:30",
    subtext: "",
    tone: "text-ksu-navy",
    iconSurface: "bg-ksu-navy/10",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_8%,rgba(0,141,195,0.16),transparent_30%),linear-gradient(180deg,#ffffff_0%,#eef8fb_54%,#ffffff_100%)] py-20 md:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-ksu-green/10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-ksu-navy font-display md:text-4xl">
            تفاصيل الحفل
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-ksu-navy/60">
            كل ما تحتاج معرفته عن حفل تخرج كلية علوم الحاسب والمعلومات
          </p>
        </div>

        <div className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
          <a
            href={hallLocation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="فتح موقع قاعة حمد الجاسر في الخرائط"
            className="group block focus:outline-none"
          >
            <LiquidGlassCard
              glowIntensity="md"
              shadowIntensity="md"
              blurIntensity="lg"
              borderRadius="22px"
              className="min-h-[350px] border-white/65 bg-white/50 p-0 text-ksu-navy transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-4 group-focus-visible:ring-ksu-gold/35"
            >
              <div className="relative min-h-[350px] overflow-hidden rounded-[22px]">
                {mapboxMapUrl ? (
                  <Image
                    src={mapboxMapUrl}
                    alt="خريطة موقع قاعة حمد الجاسر في جامعة الملك سعود"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 overflow-hidden bg-[#e7eef3]"
                    aria-hidden="true"
                  >
                    <div
                      className="absolute grid grid-cols-5 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        left: `calc(50% - ${fallbackTileOffsetX}px)`,
                        top: `calc(50% - ${fallbackTileOffsetY}px)`,
                        width: fallbackTileSize * (fallbackTileRadius * 2 + 1),
                        height: fallbackTileSize * (fallbackTileRadius * 2 + 1),
                      }}
                    >
                      {fallbackTiles.map((tile) => (
                        <Image
                          key={tile.key}
                          src={tile.src}
                          alt=""
                          width={fallbackTileSize}
                          height={fallbackTileSize}
                          unoptimized
                          className="h-64 w-64"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.08),rgba(15,23,42,0.32)),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.82))]" />
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-sm font-bold text-ksu-navy shadow-lg backdrop-blur-xl">
                  <MapPin className="h-4 w-4 text-ksu-gold" />
                  <span>{hallLocation.title}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ksu-gold text-white shadow-[0_18px_55px_rgba(200,164,21,0.38)] ring-8 ring-white/70">
                    <MapPin className="h-8 w-8 fill-current" />
                  </span>
                  <span className="mt-3 rounded-full bg-ksu-navy/85 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur">
                    {hallLocation.description}
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[18px] border border-white/70 bg-white/84 p-4 text-right shadow-xl backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ksu-navy font-display">
                        {hallLocation.description}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-ksu-navy/60">
                        {hallLocation.subtext}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 rounded-full bg-ksu-green px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(0,141,195,0.22)] transition-colors group-hover:bg-ksu-dark-green">
                      <Navigation className="h-4 w-4" />
                      افتح الخريطة
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </a>

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {details.map((detail) => (
              <LiquidGlassCard
                key={detail.title}
                glowIntensity="sm"
                shadowIntensity="sm"
                blurIntensity="md"
                borderRadius="18px"
                className="group min-h-[150px] border-white/60 bg-white/52 p-6 text-center text-ksu-navy"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${detail.iconSurface} ${detail.tone} transition-transform duration-300 group-hover:scale-110`}
                >
                  <detail.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{detail.title}</h3>
                <p className={`text-base font-semibold ${detail.tone}`}>
                  {detail.description}
                </p>
                {detail.subtext ? (
                  <p className="mt-1 text-sm text-ksu-navy/55">
                    {detail.subtext}
                  </p>
                ) : null}
              </LiquidGlassCard>
            ))}
          </div>
        </div>

        <LiquidGlassCard
          glowIntensity="md"
          shadowIntensity="md"
          blurIntensity="lg"
          borderRadius="22px"
          className="mx-auto mt-12 max-w-4xl border-white/25 bg-gradient-to-br from-ksu-green/90 to-ksu-dark-green/92 p-6 text-white sm:p-8"
        >
          <h3 className="mb-4 text-xl font-bold font-display sm:text-2xl">
            عن الكلية
          </h3>
          <p className="text-sm leading-relaxed text-white/86 sm:text-base">
            كلية علوم الحاسب والمعلومات بجامعة الملك سعود من أعرق الكليات
            المتخصصة في مجال التقنية بالمملكة. تخرجت منها أجيال من المبدعين
            والمبتكرين الذين أسهموا في بناء مستقبل رقمي مزدهر للوطن.
          </p>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
