import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Intensity = "sm" | "md" | "lg";

type LiquidGlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glowIntensity?: Intensity;
  shadowIntensity?: Intensity;
  blurIntensity?: Intensity;
  borderRadius?: string;
};

const glowMap: Record<Intensity, string> = {
  sm: "before:opacity-30",
  md: "before:opacity-45",
  lg: "before:opacity-60",
};

const shadowMap: Record<Intensity, string> = {
  sm: "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
  md: "shadow-[0_28px_90px_rgba(0,0,0,0.24)]",
  lg: "shadow-[0_36px_120px_rgba(0,0,0,0.32)]",
};

const blurMap: Record<Intensity, string> = {
  sm: "backdrop-blur-md",
  md: "backdrop-blur-xl",
  lg: "backdrop-blur-2xl",
};

export function LiquidGlassCard({
  children,
  className,
  glowIntensity = "md",
  shadowIntensity = "md",
  blurIntensity = "md",
  borderRadius = "24px",
  style,
  ...props
}: LiquidGlassCardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border border-white/25 bg-white/[0.13] text-white",
        "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.5),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06))]",
        "after:absolute after:inset-px after:-z-10 after:bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_42%,rgba(255,255,255,0.1))]",
        blurMap[blurIntensity],
        glowMap[glowIntensity],
        shadowMap[shadowIntensity],
        className,
      )}
      style={
        {
          borderRadius,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
