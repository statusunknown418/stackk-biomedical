import { redirect } from "next/navigation";

export default async function DevicesPage({
  params,
}: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const spaceSlug = (await params).spaceSlug;

  return redirect(`/spaces/${spaceSlug}/devices/all`);
}
