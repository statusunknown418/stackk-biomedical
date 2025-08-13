import { Suspense } from "react";

import { Skeleton } from "@stackk/ui/skeleton";

import { SpacesListWrapper } from "~/components/spaces/SpacesListWrapper";

export default function DashPage() {
  return (
    <section className="grid h-full place-items-center">
      <section className="grid w-full max-w-xl gap-6">
        <h1 className="text-3xl">Selecciona tu organización</h1>

        <Suspense
          fallback={
            <div className="grid w-full gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          }
        >
          <SpacesListWrapper />
        </Suspense>
      </section>
    </section>
  );
}
