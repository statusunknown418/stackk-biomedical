import { Suspense } from "react";

import { ScrollArea } from "@stackk/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@stackk/ui/tabs";

import { DeviceDetails } from "~/components/inventory/[single-device]/DeviceDetails";
import { CalendarTab } from "~/components/inventory/[single-device]/tabs/calendar-tab";
import { DocumentsTab } from "~/components/inventory/[single-device]/tabs/documents";
import { GeneralTab } from "~/components/inventory/[single-device]/tabs/general";
import { HistoryTab } from "~/components/inventory/[single-device]/tabs/history";
import { MaintenanceTab } from "~/components/inventory/[single-device]/tabs/maintenance";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

export default async function DevicePage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;

  prefetch(trpc.equipments.queries.getDetails.queryOptions(deviceId));
  prefetch(trpc.equipments.queries.getHistory.queryOptions(deviceId));
  prefetch(trpc.equipments.queries.getDocuments.queryOptions(deviceId));
  prefetch(trpc.auth.getMembers.queryOptions());

  return (
    <HydrateClient>
      <DeviceDetails>
        <Tabs defaultValue="general" className="w-full gap-4">
          <TabsList className="h-max">
            <ScrollArea className="w-full">
              <TabsTrigger value="general">Información general</TabsTrigger>
              <TabsTrigger value="history">Historial (hoja de vida)</TabsTrigger>
              <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
              <TabsTrigger value="docs">Documentos</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
            </ScrollArea>
          </TabsList>

          <Suspense>
            <GeneralTab deviceId={deviceId} />
          </Suspense>

          <Suspense fallback={<div>Loading history...</div>}>
            <HistoryTab deviceId={deviceId} />
          </Suspense>

          <Suspense>
            <MaintenanceTab />
          </Suspense>

          <Suspense>
            <DocumentsTab deviceId={deviceId} />
          </Suspense>

          <Suspense>
            <CalendarTab />
          </Suspense>
        </Tabs>
      </DeviceDetails>
    </HydrateClient>
  );
}
