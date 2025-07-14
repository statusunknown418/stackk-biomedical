import { getActiveMember, getSession } from "~/auth/server";
import { CalendarTest } from "../_ui/CalendarTest";

export default async function SpacePage(props: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const params = await props.params;

  const member = await getActiveMember();
  const session = await getSession();

  return (
    <section>
      <h1>Space: {params.spaceSlug}</h1>

      <p>Member: {JSON.stringify(member)}</p>

      <p>Session: {JSON.stringify(session)}</p>

      <h1 className="text-2xl">TODO: Main dashboard with metrics</h1>

      <CalendarTest />
    </section>
  );
}
