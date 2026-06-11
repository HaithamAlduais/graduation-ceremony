import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ksu-green text-white hover:bg-ksu-dark-green",
        secondary:
          "border-transparent bg-ksu-light-green text-ksu-green hover:bg-ksu-green/20",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-ksu-green border-ksu-green",
        gold: "border-transparent bg-ksu-gold text-white hover:bg-ksu-gold/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
