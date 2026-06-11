"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";

export default function Hero() {
  const ceremonyDate = new Date("2026-06-29T18:00:00+03:00");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ksu-navy">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ksu-green/40 via-ksu-navy to-ksu-dark-green/60" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-ksu-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-ksu-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right space-y-6">
            <Badge
              variant="gold"
              className="text-sm px-4 py-1.5 mb-4 inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              29 يونيو 2026
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-display">
              حفل تخرج
              <br />
              <span className="text-ksu-gold">كلية علوم الحاسب</span>
              <br />
              والمعلومات
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0">
              نحتفل معاً بإنجازات خريجي كلية علوم الحاسب والمعلومات بجامعة الملك
              سعود
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-white/70">
              <MapPin className="w-5 h-5 text-ksu-gold" />
              <span>قاعة حمد الجاسر - جامعة الملك سعود</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Button
                asChild
                size="lg"
                className="bg-ksu-gold hover:bg-ksu-gold/90 text-white rounded-full px-8 py-6 text-lg"
              >
                <a
                  href="http://localhost:5173/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE2NTI0OSwiZXhwIjoxODEyNzAxMjQ5LCJqdGkiOiJhZGJiMGFkYS0wMDA1LTQxZDQtYmQxMi0yOTdmNDE2NzMzMWYifQ.UTsuXBa1Ip7p1fKiZM4XQKibLFLEKX0W0hvfyaeQ8uI"
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
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
              >
                <a href="#about">تعرف على التفاصيل</a>
              </Button>
            </div>
          </div>

          {/* Gradient Card */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-ksu-green via-ksu-dark-green to-ksu-navy rounded-3xl p-8 md:p-10 glow-green overflow-hidden">
              {/* Decorative swirl */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-ksu-gold/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-center">
                  <div className="bg-white rounded-xl px-6 py-3">
                    <Image
                      src="/logos/ksu-master.png"
                      alt="جامعة الملك سعود"
                      width={200}
                      height={80}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-white/80 text-sm">العد التنازلي للحفل</p>
                  <div className="flex justify-center">
                    <CountdownTimer targetDate={ceremonyDate} />
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-2xl font-bold text-ksu-gold font-display">
                        500+
                      </p>
                      <p className="text-sm text-white/70">خريج وخريجة</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-2xl font-bold text-ksu-gold font-display">
                        29
                      </p>
                      <p className="text-sm text-white/70">يونيو 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
