import Link from "next/link";

import { Button } from "@stackk/ui/button";

import { HydrateClient } from "~/lib/trpc/server";

export default function DetailsPage() {
  return (
    <HydrateClient>
      <section className="grid h-full place-items-center">
        <p>Testing for now</p>

        <Button>
          <Link href="/spaces/new/invite">Continuar</Link>
        </Button>
      </section>
    </HydrateClient>
  );
}
