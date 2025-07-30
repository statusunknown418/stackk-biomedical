import type { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSession } from "~/auth/server";

export default async function DashLayout(props: PropsWithChildren) {
  const t1 = performance.now();
  const auth = await getSession();
  const t2 = performance.now();

  const headersStore = await headers();

  const pathnameRedirect = headersStore.get("x-pathname");

  console.log(`getSession took ${t2 - t1}ms`);

  if (!auth?.user.id) {
    return redirect(
      `/login?redirect=${encodeURIComponent(pathnameRedirect ?? "/spaces")}`,
    );
  }

  return props.children;
}
