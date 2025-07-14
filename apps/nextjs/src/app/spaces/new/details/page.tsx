import Link from "next/link";

import { Button } from "@stackk/ui/button";

import { getSession } from "~/auth/server";

export default async function DetailsPage() {
  const session = await getSession();

  return (
    <section className="grid h-full place-items-center">
      {JSON.stringify(session, null, 2)}

      <Button asChild size="lg">
        <Link href={`/spaces/${session?.session.activeOrganizationId}`}>
          Go to selected space
        </Link>
      </Button>

      <p>if the above doesn't work review the console/logic</p>
    </section>
  );
}
