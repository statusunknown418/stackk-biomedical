import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { cn } from "../utils";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  delay = 0,
}: FloatingElementProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        "transition-transform duration-200 hover:-translate-y-1 hover:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );
}
