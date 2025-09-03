import { Suspense } from "react";

import { getActiveMember, getSession } from "~/lib/auth/server";
import { HydrateClient } from "~/lib/trpc/server";
import { CalendarTest } from "../../../components/spaces/CalendarTest";

export default async function SpacePage(props: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const params = await props.params;

  const member = await getActiveMember();
  const session = await getSession();

  return (
    <HydrateClient>
      <section>
        <h1>Space: {params.spaceSlug}</h1>

        <p>Member: {JSON.stringify(member)}</p>

        <p>Session: {JSON.stringify(session)}</p>

        <h1 className="text-2xl">TODO: Main dashboard with metrics</h1>

        <Suspense>
          <CalendarTest />
        </Suspense>
      </section>
    </HydrateClient>
  );
}
