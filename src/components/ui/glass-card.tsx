import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const glassCardVariants = cva(
  "glass-card rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-glow",
  {
    variants: {
      variant: {
        default: "p-4 sm:p-6",
        music: "p-4 sm:p-6 bg-gradient-glass border-glass-border",
        gradient: "p-4 sm:p-6 bg-gradient-primary",
        secondary: "p-4 sm:p-6 bg-gradient-secondary",
        hero: "p-6 sm:p-8 bg-gradient-hero border-primary/20"
      },
      size: {
        sm: "p-3",
        default: "p-4 sm:p-6", 
        lg: "p-6 sm:p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };