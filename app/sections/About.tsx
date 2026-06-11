"use client";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { Building2, Calendar, Clock, MapPin } from "lucide-react";

const details = [
  {
    icon: MapPin,
    title: "المكان",
    description: "قاعة حمد الجاسر",
    subtext: "جامعة الملك سعود - الرياض",
    tone: "text-ksu-green",
    iconSurface: "bg-ksu-green/12",
  },
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
    description: "يحدد لاحقا",
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

        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {details.map((detail) => (
            <LiquidGlassCard
              key={detail.title}
              glowIntensity="sm"
              shadowIntensity="sm"
              blurIntensity="md"
              borderRadius="18px"
              className="group min-h-[190px] border-white/60 bg-white/52 p-6 text-center text-ksu-navy"
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
