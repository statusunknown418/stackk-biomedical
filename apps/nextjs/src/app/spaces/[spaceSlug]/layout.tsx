import { SidebarInset, SidebarProvider } from "@stackk/ui/sidebar";

import { AppHeader } from "~/components/layouts/app-header";
import { AppSidebar } from "~/components/layouts/app-sidebar";

export default async function SpaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ spaceSlug: string }>;
}) {
  const pageParams = await params;

  return (
    <SidebarProvider>
      <AppSidebar knownSlug={pageParams.spaceSlug} />

      <SidebarInset className="grid grid-rows-[3.5rem_auto]">
        <AppHeader />

        <section className="p-4 md:p-6 lg:p-12">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
