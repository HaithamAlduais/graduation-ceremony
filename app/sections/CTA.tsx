"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";

export default function CTA() {
  const ceremonyDate = new Date("2026-06-29T18:00:00+03:00");

  return (
    <section
      id="cta"
      className="py-20 md:py-28 bg-gradient-to-br from-ksu-navy via-ksu-dark-green to-ksu-green relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ksu-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ksu-green/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-ksu-gold/20 text-ksu-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
          <CalendarCheck className="w-4 h-4" />
          29 يونيو 2026
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
          كن جزءاً من هذه
          <br />
          <span className="text-ksu-gold">اللحظة المميزة</span>
        </h2>

        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          سجل حضورك الآن وكن جزءاً من حفل تخرج كلية علوم الحاسب والمعلومات.
          مقاعد محدودة - لا تفوت الفرصة!
        </p>

        <div className="flex justify-center mb-10">
          <CountdownTimer targetDate={ceremonyDate} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-ksu-gold hover:bg-ksu-gold/90 text-white rounded-full px-10 py-7 text-lg font-bold shadow-lg shadow-ksu-gold/25"
          >
            <a
              href="http://localhost:5173/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE2NTI0OSwiZXhwIjoxODEyNzAxMjQ5LCJqdGkiOiJhZGJiMGFkYS0wMDA1LTQxZDQtYmQxMi0yOTdmNDE2NzMzMWYifQ.UTsuXBa1Ip7p1fKiZM4XQKibLFLEKX0W0hvfyaeQ8uI"
              data-buffer-register="true"
            >
              احجز مقعدك الآن
              <ArrowLeft className="w-5 h-5 mr-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg"
          >
            <a href="#about">تعرف على التفاصيل</a>
          </Button>
        </div>

        <p className="text-white/40 text-sm mt-8">
          التسجيل مفتوح حتى 25 يونيو 2026
        </p>
      </div>
    </section>
  );
}
