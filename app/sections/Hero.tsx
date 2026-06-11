"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import CountdownTimer from "../components/CountdownTimer";
import LiquidShaderTwist from "../components/LiquidShaderTwist";

export default function Hero() {
  const ceremonyDate = new Date("2026-06-29T18:00:00+03:00");

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <LiquidShaderTwist className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="text-center lg:text-right space-y-5 sm:space-y-6">
            <Badge
              variant="gold"
              className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 mb-2 sm:mb-4 inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              29 يونيو 2026
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] font-display">
              حفل تخرج
              <br />
              <span className="text-ksu-gold">كلية علوم الحاسب</span>
              <br />
              والمعلومات
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/82 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              نحتفل معا بإنجازات خريجي كلية علوم الحاسب والمعلومات بجامعة
              الملك سعود
            </p>

            <div className="flex items-start justify-center lg:justify-start gap-2 text-sm sm:text-base text-white/74">
              <MapPin className="w-5 h-5 text-ksu-gold shrink-0 mt-0.5" />
              <span>قاعة حمد الجاسر - جامعة الملك سعود</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <Button
                asChild
                size="lg"
                className="bg-ksu-gold hover:bg-ksu-gold/90 text-white rounded-full px-7 sm:px-8 py-6 text-base sm:text-lg"
              >
                <a
                  href="https://bufferco.com/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE5MDY2NSwiZXhwIjoxODEyNzI2NjY1LCJqdGkiOiI1MTRhZDNmOC05MTIzLTRlMTAtYjJiYy01YzllZDc5MDFjYTAifQ.kyaMbqkPkwobxQDrOGG6TxZ0DNRJZkckv-ApBBBv7qY"
                  data-buffer-register="true"
                >
                  احجز مقعدك
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-7 sm:px-8 py-6 text-base sm:text-lg"
              >
                <a href="#about">تعرف على التفاصيل</a>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-start">
            <LiquidGlassCard
              glowIntensity="lg"
              shadowIntensity="lg"
              borderRadius="24px"
              blurIntensity="lg"
              className="w-full max-w-md sm:max-w-xl p-4 sm:p-6 md:p-8"
            >
              <div className="space-y-4 sm:space-y-5 text-center">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/82">
                  العد التنازلي للحفل
                </div>
                <CountdownTimer targetDate={ceremonyDate} />
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
