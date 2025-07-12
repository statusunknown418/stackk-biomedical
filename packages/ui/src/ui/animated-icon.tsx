"use client";

import type { ReactNode } from "react";

import { cn } from "../utils";

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  hoverAnimation?: "scale" | "rotate" | "bounce" | "pulse";
  bgColor?: string;
  borderColor?: string;
}

export function AnimatedIcon({
  children,
  className,
  hoverAnimation = "scale",
  bgColor = "bg-indigo-100/80 dark:bg-indigo-900/30",
  borderColor = "border-indigo-200/60 dark:border-indigo-800/30",
}: AnimatedIconProps) {
  const animationClasses = {
    scale: "group-hover:scale-110 group-hover:rotate-6",
    rotate: "group-hover:rotate-12",
    bounce: "group-hover:animate-bounce",
    pulse: "group-hover:animate-pulse",
  };

  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300",
        bgColor,
        borderColor,
        animationClasses[hoverAnimation],
        className,
      )}
    >
      <span className="inline-block transition-transform duration-300 group-hover:scale-110">
        {children}
      </span>
    </div>
  );
}
