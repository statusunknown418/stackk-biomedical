import type { ReactNode } from "react";

import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { cn } from "../utils";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleIn"
    | "rotateIn";
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

export function AnimateOnScroll({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimateOnScrollProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const animationClasses = {
    fadeIn: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    slideUp: {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    slideDown: {
      initial: "opacity-0 -translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    slideLeft: {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    slideRight: {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    scaleIn: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
    },
    rotateIn: {
      initial: "opacity-0 rotate-12 scale-95",
      animate: "opacity-100 rotate-0 scale-100",
    },
  };

  const { initial, animate } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isIntersecting ? animate : initial,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
