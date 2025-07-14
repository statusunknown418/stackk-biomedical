import { Skeleton } from "@stackk/ui/skeleton";

export default function LoadingEquipmentsPage() {
  return (
    <section className="grid grid-cols-[220px_auto]">
      <div>
        <h1 className="text-3xl">Inventario de equipos</h1>

        <p className="text-muted-foreground text-sm">
          En esta sección podrás ver todos los equipos dentro de todos los grupos de la
          organización
        </p>
      </div>

      <section className="grid w-full gap-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </section>
    </section>
  );
}
