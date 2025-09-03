"use client";

import { PlusCircleIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@stackk/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@stackk/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@stackk/ui/tooltip";

import { TeamInvites } from "~/components/onboarding/TeamInvites";
import { useTRPC } from "~/lib/trpc/react";

export const TeamsTabsList = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.spaces.listTeams.queryOptions());

  return (
    <section>
      <Tabs className="mt-4 max-w-full" defaultValue={data.at(0)?.id}>
        <div className="flex items-center justify-between gap-4">
          <TabsList className="max-w-[580px] grow justify-stretch overflow-x-scroll">
            {data.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled size="sm" variant="outline">
                <PlusCircleIcon className="text-emerald-400" /> Añadir equipo
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Los equipos te permiten organizar a las personas de tu organización, por
              ejemplo: UPSS, grupos de trabajo, etc.
            </TooltipContent>
          </Tooltip>
        </div>

        <TeamInvites />
      </Tabs>
    </section>
  );
};
