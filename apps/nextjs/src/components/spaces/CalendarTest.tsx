"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@stackk/ui/button";

import { useTRPC } from "~/lib/trpc/react";

export const CalendarTest = () => {
  const trpc = useTRPC();

  const mutation = useMutation(
    trpc.calendar.newCalendar.mutationOptions({
      onSuccess: () => {
        toast.success("Calendar created");
      },
    }),
  );

  return (
    <Button onClick={() => mutation.mutate()}>Do something with Google Calendar</Button>
  );
};
