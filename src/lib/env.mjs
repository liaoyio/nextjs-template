import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  server: {
    // add integrations using kirimase cli
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {},
  emptyStringAsUndefined: true,
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
  },
});
