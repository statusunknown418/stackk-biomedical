import { Skeleton } from "@stackk/ui/skeleton";

export default function LoadingSpacesPage() {
  return (
    <section className="grid w-full gap-4">
      <p>Loading /spaces page</p>

      <Skeleton className="h-10 w-1/2" />
    </section>
  );
}
