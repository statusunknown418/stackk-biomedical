import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { AllEquipmentsDataTable } from "./_components/AllEquipmentsDataTable";

export default function AllEquipmentsPage() {
  prefetch(trpc.equipments.queries.listAll.queryOptions());

  return (
    <HydrateClient>
      <section className="grid grid-cols-1 gap-6">
        <header>
          <h1 className="text-3xl">Inventario de equipos</h1>
          <p className="text-muted-foreground text-sm">
            En esta sección podrás ver todos los equipos de los grupos de la organización
          </p>
        </header>

        <AllEquipmentsDataTable />
      </section>
    </HydrateClient>
  );
}
