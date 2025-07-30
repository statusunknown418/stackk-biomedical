import { prefetch, trpc } from "~/trpc/server";
import { HistoryTab } from "./History";

export const HistoryTabWrapper = ({ deviceId }: { deviceId: string }) => {
  prefetch(trpc.equipments.queries.getDetails.queryOptions(deviceId));

  return <HistoryTab deviceId={deviceId} />;
};
