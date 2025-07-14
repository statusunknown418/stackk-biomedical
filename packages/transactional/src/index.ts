import { Resend } from "resend";

import { emailsEnv } from "../env";

const env = emailsEnv();

export const resend = new Resend(env.RESEND_API_KEY);
