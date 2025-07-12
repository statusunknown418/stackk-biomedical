"use client";

import { useEffect, useState } from "react";

import { useIntersectionObserver } from "../hooks/use-intersection-observer";

interface CounterAnimationProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CounterAnimation({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  className,
}: CounterAnimationProps) {
  const [count, setCount] = useState(start);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isIntersecting, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
