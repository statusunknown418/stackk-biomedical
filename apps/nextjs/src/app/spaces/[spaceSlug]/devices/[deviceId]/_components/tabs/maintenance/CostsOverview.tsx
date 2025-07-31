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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Reparaciones",
    color: "var(--chart-1)",
  },
  other: {
    label: "Compras",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function CostsOverview() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Costos</CardTitle>

        <CardDescription>Vista general de costos asociados a este equipo</CardDescription>
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
