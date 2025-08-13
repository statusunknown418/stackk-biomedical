"use client";

import { Calendar } from "@stackk/ui/calendar";
import { CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { TabsContent } from "@stackk/ui/tabs";

export const CalendarTab = () => {
  return (
    <TabsContent value="calendar" className="grid grid-cols-1 gap-8">
      <CardHeader className="py-5">
        <CardTitle>Calendario de actividades</CardTitle>
        <CardDescription>
          Aquí puedes observar lo que sucederá con el equipo
        </CardDescription>
      </CardHeader>

      <div>
        <Calendar className="w-full" mode="single" />
      </div>
    </TabsContent>
  );
};
