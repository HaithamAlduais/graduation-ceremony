"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const timeUnits: Array<{ key: keyof TimeLeft; label: string }> = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.13] px-1.5 py-2.5 text-center shadow-inner shadow-white/10 sm:rounded-2xl sm:px-3 sm:py-4">
        <div className="absolute inset-x-3 top-0 h-px bg-white/50" />
        <span className="block text-2xl font-bold leading-none text-white font-display tabular-nums sm:text-4xl md:text-5xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 block text-center text-[11px] font-medium text-white/75 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    const firstTick = window.setTimeout(tick, 0);
    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      window.clearTimeout(firstTick);
      clearInterval(timer);
    };
  }, [targetDate]);

  return (
    <div
      className={cn(
        "grid w-full grid-cols-4 items-start gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:gap-3",
        className,
      )}
    >
      {timeUnits.map((unit, index) => (
        <div key={unit.key} className="contents">
          <TimeUnit value={timeLeft[unit.key]} label={unit.label} />
          {index < timeUnits.length - 1 ? (
            <span className="hidden pt-3 text-xl font-bold leading-none text-ksu-gold sm:block sm:pt-5 sm:text-3xl">
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
