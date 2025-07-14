import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@stackk/ui/breadcrumb";
import { Separator } from "@stackk/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@stackk/ui/sidebar";

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
        <header className="bg-sidebar flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 !size-10" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">StackkBiomedical</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <section className="p-8">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
