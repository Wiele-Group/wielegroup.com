import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // OpenNext for Cloudflare Workers — generated bundle, not source.
    // Without this, `npm run lint` floods with 543 errors / 14k+ warnings
    // from `.open-next/worker.js` + `server-functions/default/*` that
    // are not ours to fix. Phase 9.1 fix.
    ".open-next/**",
  ]),
]);

export default eslintConfig;
