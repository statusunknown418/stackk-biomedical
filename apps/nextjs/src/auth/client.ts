import {
  inferAdditionalFields,
  organizationClient,
  passkeyClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { Auth } from "@stackk/auth";

export const authClient = createAuthClient({
  plugins: [passkeyClient(), organizationClient(), inferAdditionalFields<Auth>()],
});
