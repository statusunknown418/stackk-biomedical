import { redirect } from "next/navigation";

import { getSession } from "~/lib/auth/server";

export default async function NewSpacePage() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  return redirect("/spaces/new/start");
}
