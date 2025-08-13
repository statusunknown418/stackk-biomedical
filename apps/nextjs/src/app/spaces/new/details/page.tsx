import { getSession } from "~/lib/auth/server";

export default async function DetailsPage() {
  const session = await getSession();

  return (
    <section className="grid h-full place-items-center">
      {JSON.stringify(session, null, 2)}

      <p>if the above doesn't work review the console/logic</p>
    </section>
  );
}
