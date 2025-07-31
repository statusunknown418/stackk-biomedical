"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@stackk/ui/avatar";
import { Button } from "@stackk/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { FormItem } from "@stackk/ui/form";
import { Label } from "@stackk/ui/label";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@stackk/ui/origin-ui/timeline";
import { Separator } from "@stackk/ui/separator";
import { TabsContent } from "@stackk/ui/tabs";
import { Textarea } from "@stackk/ui/textarea";

import { useTRPC } from "~/trpc/react";

const items = [
  {
    id: 1,
    date: "hace 2 días",
    title: "Alvaro Aquije",
    action: "mantenimiento agendado",
    description:
      "Este equipo necesita un mantenimiento preventivo - agendado para 30 julio de 2025",
    image: "/avatar-40-01.jpg",
  },
  {
    id: 2,
    date: "hace 1 día",
    title: "Chris Tompson",
    action: "comentario nuevo",
    description: "Deberíamos revisar los costos antes de realizar el mantenimiento",
    image: "/avatar-40-02.jpg",
  },
  {
    id: 3,
    date: "hace 30 minutos",
    title: "Emma Davis",
    action: "asignado a ti",
    description: "Este evento fue asignado a Emma Davis",
    image: "/avatar-40-03.jpg",
  },
  {
    id: 4,
    date: "hace 5 minutos",
    title: "Alex Morgan",
    action: "mantenimiento realizado",
    description: "Se realizó el mantenimiento",
    image: "/avatar-40-05.jpg",
  },
];

export const HistoryTab = ({ deviceId }: { deviceId: string }) => {
  const trpc = useTRPC();

  const { data: _history } = useSuspenseQuery(
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

      <CardContent className="mt-6 grid gap-6">
        <Timeline>
          {items.map((item) => (
            <TimelineItem
              key={item.id}
              step={item.id}
              className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
            >
              <TimelineHeader>
                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                <TimelineTitle className="mt-0.5">
                  {item.title}{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    {item.action}
                  </span>
                </TimelineTitle>

                <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                  <Avatar>
                    <AvatarFallback className="text-primary">
                      {item.title.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TimelineIndicator>
              </TimelineHeader>

              <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
                {item.description}
                <TimelineDate className="mt-1 mb-0">{item.date}</TimelineDate>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Separator />

        <FormItem>
          <Label>Nuevo comentario</Label>

          <Textarea placeholder="Escribe algo aquí..." />

          <Button size="sm" className="w-fit">
            Guardar
          </Button>
        </FormItem>
      </CardContent>
    </TabsContent>
  );
};
