import { getCachedSpaces } from "~/auth/server";
import { SpacesList } from "./SpacesList";

export const SpacesListWrapper = async () => {
  const organizations = await getCachedSpaces();

  return <SpacesList organizations={organizations} />;
};
