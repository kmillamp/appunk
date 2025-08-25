import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EqualizerProps {
  bars?: number;
  className?: string;
  animated?: boolean;
}

export function Equalizer({ bars = 12, className, animated = true }: EqualizerProps) {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  
  useEffect(() => {
    // Gerar alturas iniciais aleatórias
    const heights = Array.from({ length: bars }, () => Math.random() * 60 + 20);
    setBarHeights(heights);
    
    if (!animated) return;
    
    // Animar as barras
    const interval = setInterval(() => {
      setBarHeights(prev => 
        prev.map(height => 
          Math.min(80, Math.max(15, height + (Math.random() * 40 - 20)))
        )
      );
    }, 400);
    
    return () => clearInterval(interval);
  }, [bars, animated]);
  
  const colors = [
    "bg-equalizer-purple",
    "bg-equalizer-pink", 
    "bg-equalizer-cyan",
    "bg-equalizer-blue",
    "bg-equalizer-green",
    "bg-equalizer-yellow"
  ];
  
  return (
    <div className={cn("flex items-end justify-center space-x-1", className)}>
      {barHeights.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-2 rounded-t-sm transition-all duration-300",
            colors[index % colors.length]
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}