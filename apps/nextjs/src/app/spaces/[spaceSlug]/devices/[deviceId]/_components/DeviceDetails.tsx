"use client";

import type { PropsWithChildren } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowSquareOutIcon, BuildingIcon, CalendarDotIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CogIcon } from "lucide-react";

import { Button } from "@stackk/ui/button";
import { Skeleton } from "@stackk/ui/skeleton";

import { useTRPC } from "~/trpc/react";

export const DeviceDetails = ({ children }: PropsWithChildren) => {
  const params = useParams<{ deviceId: string; spaceSlug: string }>();
  const api = useTRPC();

  const { data } = useSuspenseQuery(
    api.equipments.queries.getDetails.queryOptions(params.deviceId, {
      enabled: !!params.deviceId,
    }),
  );

  if (!data)
    return (
      <article className="grid gap-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-24 w-full" />
      </article>
    );

  return (
    <section className="grid gap-8">
      <header className="flex flex-col items-start justify-between lg:flex-row">
        <section className="flex flex-col gap-5 md:flex-row">
          <Image
            src={data.logo ?? "/landing/equipments.png"}
            alt={data.model}
            width={120}
            height={120}
            className="aspect-square rounded-lg border object-cover"
          />

          <article className="grid grid-cols-1">
            <code className="bg-secondary text-primary w-fit rounded-full px-3 py-1 font-mono text-base">
              RP: {data.patrimonialRegistry ?? "N/A"}
            </code>

            <h1 className="text-3xl font-medium tracking-tight capitalize">
              {data.name}
            </h1>

            <p className="text-muted-foreground text-base">
              {data.brand} - {data.model}
            </p>

            <div>
              <Button size="sm" variant="link">
                <BuildingIcon /> UPSS {data.upss.name} <ArrowSquareOutIcon />
              </Button>
            </div>
          </article>
        </section>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button size="sm" variant="outline">
            <CogIcon />
            Configurar
          </Button>

          <Button size="sm">
            <CalendarDotIcon />
            Agendar mantenimiento
          </Button>
        </div>
      </header>

      {children}
    </section>
  );
};
