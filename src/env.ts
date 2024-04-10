import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  GITHUB_ID: z.string().min(1),
});

export const parsedEnv = envSchema.parse(process.env);
