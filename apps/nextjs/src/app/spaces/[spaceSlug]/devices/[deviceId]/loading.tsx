import { Skeleton } from "@stackk/ui/skeleton";

export default function LoadingEquipmentPage() {
  return (
    <section className="grid w-full gap-4">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </section>
  );
}
