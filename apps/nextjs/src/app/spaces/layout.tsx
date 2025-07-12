import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { getSession } from "~/auth/server";

export default async function DashLayout(props: PropsWithChildren) {
  const t1 = performance.now();
  const auth = await getSession();
  const t2 = performance.now();

  console.log("[LOG] session took", t2 - t1, "ms", auth?.session);

  if (!auth?.user.id) {
    return redirect("/login");
  }

  return props.children;
}
