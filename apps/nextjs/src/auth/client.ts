import { cache } from "react";
import {
  emailOTPClient,
  inferAdditionalFields,
  organizationClient,
  passkeyClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { Auth } from "@stackk/auth";
import { appAc, appRoles } from "@stackk/auth/access-control";

export const authClient = createAuthClient({
  plugins: [
    passkeyClient(),
    emailOTPClient(),
    organizationClient({
      ac: appAc,
      roles: appRoles,
      teams: {
        enabled: true,
      },
    }),
    inferAdditionalFields<Auth>(),
  ],
});

export const useActiveOrganization = cache(() => {
  return authClient.useActiveOrganization();
});
