"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck } from "lucide-react";

import AnimatedDotWaveBackground from "../components/AnimatedDotWaveBackground";
import CountdownTimer from "../components/CountdownTimer";

export default function CTA() {
  const ceremonyDate = new Date("2026-06-29T18:00:00+03:00");

  return (
    <section id="cta" className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <AnimatedDotWaveBackground className="absolute inset-0 z-0 opacity-35" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(0,96,143,0.72),rgba(15,23,42,0.9)_62%,rgba(15,23,42,0.96)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-ksu-navy/65 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-ksu-navy/75 to-transparent pointer-events-none" />

      <div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        style={{ textShadow: "0 2px 22px rgba(15, 23, 42, 0.95)" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ksu-gold/20 bg-ksu-gold/20 px-4 py-2 text-sm font-medium text-ksu-gold sm:mb-6">
          <CalendarCheck className="w-4 h-4" />
          29 يونيو 2026
        </div>

        <h2 className="mb-5 text-3xl font-bold leading-tight text-white font-display sm:text-4xl md:mb-6 md:text-5xl">
          كن جزءا من هذه
          <br />
          <span className="text-ksu-gold">اللحظة المميزة</span>
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg md:mb-10 md:text-xl">
          سجل حضورك الآن وكن جزءا من حفل تخرج كلية علوم الحاسب والمعلومات.
          مقاعد محدودة - لا تفوت الفرصة!
        </p>

        <div className="mx-auto mb-8 flex max-w-md justify-center md:mb-10">
          <CountdownTimer targetDate={ceremonyDate} />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ksu-gold px-8 py-7 text-base font-bold text-white shadow-lg shadow-ksu-gold/25 hover:bg-ksu-gold/90 sm:px-10 sm:text-lg"
          >
            <a
              href="https://bufferco.com/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE5MDY2NSwiZXhwIjoxODEyNzI2NjY1LCJqdGkiOiI1MTRhZDNmOC05MTIzLTRlMTAtYjJiYy01YzllZDc5MDFjYTAifQ.kyaMbqkPkwobxQDrOGG6TxZ0DNRJZkckv-ApBBBv7qY"
              data-buffer-register="true"
            >
              احجز مقعدك الآن
              <ArrowLeft className="mr-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/30 px-8 py-7 text-base text-white hover:bg-white/10 sm:px-10 sm:text-lg"
          >
            <a href="#about">تعرف على التفاصيل</a>
          </Button>
        </div>

        <p className="mt-7 text-sm text-white/50 sm:mt-8">
          التسجيل مفتوح حتى 25 يونيو 2026
        </p>
      </div>
    </section>
  );
}
