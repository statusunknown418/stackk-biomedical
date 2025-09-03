import { ArrowRightIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@stackk/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { Progress } from "@stackk/ui/progress";

import { getSession } from "~/lib/auth/server";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";
import { TeamsTabsList } from "./_comps/TeamsTabsList";

export default async function InvitePeoplePage() {
  void prefetch(trpc.spaces.listTeams.queryOptions());
  const data = await getSession();

  console.log({ data });

  return (
    <HydrateClient>
      <section className="grid h-full items-center justify-center">
        <article className="grid w-full max-w-3xl gap-4">
          <div className="mt-10 mb-4">
            <p className="text-muted-foreground text-sm">Paso 2 de 3</p>
            <Progress value={66} className="mt-1" />
          </div>

          <Card>
            <CardHeader className="border-b-0">
              <UsersIcon className="text-brand-primary size-10" weight="duotone" />
              <CardTitle className="text-xl">
                Define los equipos de tu organización
              </CardTitle>
              <CardDescription>
                Desde aquí puedes asignar roles y permisos para cada persona que decidas
                invitar a tu organización, hemos creado algunos equipos por ti
              </CardDescription>
            </CardHeader>
          </Card>

          <TeamsTabsList />

          <Button>
            Continuar <ArrowRightIcon />
          </Button>
        </article>
      </section>
    </HydrateClient>
  );
}
