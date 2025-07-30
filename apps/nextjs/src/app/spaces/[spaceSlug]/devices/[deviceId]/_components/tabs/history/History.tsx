"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { Timeline, TimelineContent, TimelineItem } from "@stackk/ui/origin-ui/timeline";
import { TabsContent } from "@stackk/ui/tabs";

import { useTRPC } from "~/trpc/react";

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

export const HistoryTab = ({ deviceId }: { deviceId: string }) => {
  const trpc = useTRPC();

  const { data: history } = useSuspenseQuery(
    trpc.equipments.queries.getHistory.queryOptions(deviceId),
  );

  return (
    <TabsContent value="history">
      <CardHeader className="py-5">
        <CardTitle>Historial de actividades</CardTitle>
        <CardDescription>
          Este es un resumen de lo que ha sucedido con el equipo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Timeline className="pt-4">
          {history.map((item) => {
            return (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="m-0! flex-row items-center gap-3 py-2.5!"
              >
                {/* <ActionIcon className="text-muted-foreground/80" size={20} /> */}

                <TimelineContent className="text-foreground">
                  <a className="font-medium hover:underline" href="#">
                    {item.actor}
                  </a>{" "}
                  <span className="text-muted-foreground font-normal">
                    {item.change} - {item.reason} &rarr;
                  </span>{" "}
                  <span>{getRelativeTimeString(item.recordedAt)}</span>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </TabsContent>
  );
};
