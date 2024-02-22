import prisma from "./db";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { wait } from "@/app/_helpers/helpers";
import type { UserRole } from "@/types/users";

export const fetchUser = unstable_cache(
  cache(async ({ id }: { id: string }) => {
    // await wait(1000);
    return prisma.user.findUnique({ where: { id } });
  }),
  ["user"]
);

export const fetchAllAuthors = unstable_cache(
  // await wait(1000);
  cache(async () => {
    const authors = await prisma.user.findMany({
      where: {
        role: "moderator",
      },
    });

    return authors.map((author) => ({
      ...author,
      role: author.role as UserRole,
    }));
  }),
  ["authors"]
);
