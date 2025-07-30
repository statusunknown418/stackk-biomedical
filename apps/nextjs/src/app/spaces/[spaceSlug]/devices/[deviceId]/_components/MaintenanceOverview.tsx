"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { Pie, PieChart } from "recharts";

import type { ChartConfig } from "@stackk/ui/chart";
import { Button } from "@stackk/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@stackk/ui/chart";
import { TabsContent } from "@stackk/ui/tabs";

export const description = "A donut chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function MaintenanceOverview() {
  return (
    <TabsContent value="maintenance" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter>
          <Button className="ml-auto" size="sm" variant="outline">
            Ver más detalles
            <ArrowSquareOutIcon />
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
