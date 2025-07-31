import { Suspense } from "react";

import { ScrollArea } from "@stackk/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@stackk/ui/tabs";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { CalendarTab } from "./_components/calendar-tab";
import { DeviceDetails } from "./_components/DeviceDetails";
import { DocumentsTab } from "./_components/tabs/documents";
import { GeneralTab } from "./_components/tabs/general";
import { HistoryTab } from "./_components/tabs/history";
import { MaintenanceTab } from "./_components/tabs/maintenance";

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
