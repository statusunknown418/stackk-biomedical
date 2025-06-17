import baseConfig, { restrictEnvAccess } from "@stackk/eslint-config/base";
import nextjsConfig from "@stackk/eslint-config/nextjs";
import reactConfig from "@stackk/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
