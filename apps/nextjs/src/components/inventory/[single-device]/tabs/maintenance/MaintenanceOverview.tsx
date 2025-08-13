"use client";

import { Pie, PieChart } from "recharts";

import type { ChartConfig } from "@stackk/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@stackk/ui/chart";

export const description = "A donut chart";

const chartData = [
  { browser: "chrome", visitors: 10, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 2, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 1, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 17, fill: "var(--color-edge)" },
  { browser: "other", visitors: 9, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Agendados",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Preventivos",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Correctivos",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Cancelados",
    color: "var(--chart-4)",
  },
  other: {
    label: "Otros",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function MaintenanceOverview() {
  return (
    <Card className="flex h-max flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mantenimientos</CardTitle>

        <CardDescription>Estadísticas de mantenimientos</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
