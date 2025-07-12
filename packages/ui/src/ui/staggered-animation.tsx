"use client";

import type { ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { cn } from "../utils";

interface StaggeredAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn";
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
}

interface ChildProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown; // Allow additional props
}

export function StaggeredAnimation({
  children,
  className,
  animation = "slideUp",
  staggerDelay = 100,
  duration = 600,
  threshold = 0.1,
}: StaggeredAnimationProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  const animationClasses = {
    fadeIn: { initial: "opacity-0", animate: "opacity-100" },
    slideUp: { initial: "opacity-0 translate-y-8", animate: "opacity-100 translate-y-0" },
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
    scaleIn: { initial: "opacity-0 scale-95", animate: "opacity-100 scale-100" },
  };

  const { initial, animate } = animationClasses[animation];

  return (
    <div ref={ref} className={cn("", className)}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const element = child as React.ReactElement<ChildProps>;
          return cloneElement(element, {
            className: cn(
              element.props.className,
              "transition-all ease-out",
              isIntersecting ? animate : initial,
            ),
            style: {
              ...element.props.style,
              transitionDuration: `${duration}ms`,
              transitionDelay: `${index * staggerDelay}ms`,
            },
          });
        }
        return child;
      })}
    </div>
  );
}
