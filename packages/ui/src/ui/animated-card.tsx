import type { ReactNode } from "react";

import { Card } from "../ui/card";
import { cn } from "../utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverColor?: "red" | "orange" | "yellow" | "indigo" | "emerald" | "purple" | "rose";
}

export function AnimatedCard({
  children,
  className,
  hoverColor = "indigo",
}: AnimatedCardProps) {
  const hoverColorClasses = {
    red: "hover:border-red-300/60 dark:hover:border-red-700/60",
    orange: "hover:border-orange-300/60 dark:hover:border-orange-700/60",
    yellow: "hover:border-yellow-300/60 dark:hover:border-yellow-700/60",
    indigo: "hover:border-indigo-300/60 dark:hover:border-indigo-700/60",
    emerald: "hover:border-emerald-300/60 dark:hover:border-emerald-700/60",
    purple: "hover:border-purple-300/60 dark:hover:border-purple-700/60",
    rose: "hover:border-rose-300/60 dark:hover:border-rose-700/60",
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl",
        hoverColorClasses[hoverColor],
        className,
      )}
    >
      {children}
    </Card>
  );
}
