"use client";

import type { ReactNode } from "react";

import { Badge } from "../ui/badge";
import { cn } from "../utils";

interface AnimatedBadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function AnimatedBadge({ children, className, icon }: AnimatedBadgeProps) {
  return (
    <Badge
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md",
        className,
      )}
    >
      {icon && (
        <span className="mr-2 inline-block transition-all duration-200 group-hover:scale-110 group-hover:rotate-12">
          {icon}
        </span>
      )}
      <span className="transition-all duration-200 group-hover:tracking-wide">
        {children}
      </span>
    </Badge>
  );
}
