import { UsersIcon } from "@phosphor-icons/react";

import { Card, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { Progress } from "@stackk/ui/progress";

export default function InvitePeoplePage() {
  return (
    <section className="grid h-full place-items-center">
      <article className="grid w-full max-w-2xl gap-4">
        <div className="mt-10 mb-4">
          <p className="text-muted-foreground text-sm">Paso 2 de 3</p>
          <Progress value={66} className="mt-1" />
        </div>

        <Card>
          <CardHeader>
            <UsersIcon className="text-brand-primary size-10" weight="duotone" />
            <CardTitle className="text-xl">Invita a los miembros de tu equipo</CardTitle>
            <CardDescription>
              Desde aquí puedes asignar roles y permisos para cada persona que decidas
              invitar a tu organización
            </CardDescription>
          </CardHeader>
        </Card>
      </article>
    </section>
  );
}
