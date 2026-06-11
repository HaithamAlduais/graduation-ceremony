"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-2 sm:py-3 min-w-[52px] sm:min-w-[60px] md:min-w-[70px] text-center border border-white/20">
        <span className="text-xl sm:text-2xl md:text-4xl font-bold text-white font-display">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm text-white/70 mt-1 sm:mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <TimeUnit value={timeLeft.days} label="يوم" />
      <span className="text-xl sm:text-2xl md:text-3xl text-ksu-gold font-bold">:</span>
      <TimeUnit value={timeLeft.hours} label="ساعة" />
      <span className="text-xl sm:text-2xl md:text-3xl text-ksu-gold font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="دقيقة" />
      <span className="text-xl sm:text-2xl md:text-3xl text-ksu-gold font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="ثانية" />
    </div>
  );
}
