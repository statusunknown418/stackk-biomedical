export default async function SpacePage(props: {
  params: Promise<{ spaceSlug: string }>;
}) {
  const params = await props.params;

  return (
    <section>
      <h1>Space: {params.spaceSlug}</h1>
    </section>
  );
}
