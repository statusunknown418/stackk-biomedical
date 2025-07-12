import type { ReactNode } from "react";

import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { cn } from "../utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  cascade?: boolean;
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 800,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isIntersecting ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transform: isIntersecting ? "translate(0)" : getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
