import prisma from "./db";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { wait } from "@/app/_helpers/helpers";

export const fetchAllUsers = unstable_cache(
  cache(async () => {
    // await wait(1000);
    return prisma.user.findMany();
  }),
  ["users"]
);

export const fetchUser = unstable_cache(
  cache(async ({ id }: { id: string }) => {
    // await wait(1000);
    return prisma.user.findUnique({ where: { id } });
  }),
  ["user"]
);
