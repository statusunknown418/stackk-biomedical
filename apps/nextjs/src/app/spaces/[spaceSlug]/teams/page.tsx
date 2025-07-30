import { headers } from "next/headers";

import { auth } from "~/auth/server";

export default async function GroupsPage() {
  const teams = await auth.api.listUserTeams({ headers: await headers() });

  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-3xl">Usuarios</h1>
        <p className="text-muted-foreground text-sm">
          En esta sección podrás ver y manejar a todos los usuarios de la organización
        </p>
      </header>

      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </section>
  );
}
