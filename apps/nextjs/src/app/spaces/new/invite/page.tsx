import { PlusCircleIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@stackk/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { Progress } from "@stackk/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@stackk/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@stackk/ui/tooltip";

import { TeamInvites } from "~/components/onboarding/TeamInvites";

export default function InvitePeoplePage() {
  return (
    <section className="grid h-full items-center justify-center">
      <article className="grid w-full max-w-3xl gap-4">
        <div className="mt-10 mb-4">
          <p className="text-muted-foreground text-sm">Paso 2 de 3</p>
          <Progress value={66} className="mt-1" />
        </div>

        <Card>
          <CardHeader>
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

        <Tabs className="mt-4 max-w-full" defaultValue="external-consult">
          <div className="flex items-center justify-between gap-4">
            <TabsList className="max-w-[580px] grow justify-stretch overflow-x-scroll">
              <TabsTrigger value="external-consult">Consulta externa</TabsTrigger>
              <TabsTrigger value="infirmary">Enfermería</TabsTrigger>
              <TabsTrigger value="surgery-center">Centro quirúrgico</TabsTrigger>
              <TabsTrigger value="obstetrics">Obstetricia</TabsTrigger>
              <TabsTrigger value="uci">UCI</TabsTrigger>
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
      </article>
    </section>
  );
}
