"use client";

import { EnvelopeIcon, TriangleDashedIcon } from "@phosphor-icons/react/dist/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Alert, AlertDescription } from "@stackk/ui/alert";
import { Button } from "@stackk/ui/button";

import { SignOut } from "~/components/layouts/SignOut";
import { useTRPC } from "~/lib/trpc/react";
import { SpacesList } from "./SpacesList";

export const SpacesListWrapper = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.spaces.list.queryOptions());

  if (!data.length) {
    return (
      <section className="grid gap-8">
        <Alert variant="destructive">
          <TriangleDashedIcon />

          <AlertDescription>No tienes organizaciones disponibles.</AlertDescription>

          <div className="mt-4">
            <SignOut className="text-foreground" />
          </div>
        </Alert>

        <p className="text-muted-foreground text-sm">
          Si crees que esto es un error o eres el administrador de tu organización, puedes
          <Button variant="link">
            <EnvelopeIcon />
            contactarnos aquí
          </Button>
        </p>
      </section>
    );
  }

  return <SpacesList organizations={data} />;
};
