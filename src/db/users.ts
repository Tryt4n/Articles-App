import prisma from "./db";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { wait } from "@/app/_helpers/helpers";
import type { User, UserRole } from "@/types/users";

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
        role: "moderator" || "admin",
      },
    });

    return authors.map((author) => ({
      ...author,
      role: author.role as UserRole,
    }));
  }),
  ["authors"]
);

// export async function createNewUser(user: any) {
export async function createNewUser(user: User) {
  // await wait(1000);
  return prisma.user.create({ data: user });
}

export async function isNewUserEmailUnique(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user === null;
}

export async function isNewUserUsernameUnique(username: string) {
  const user = await prisma.user.findUnique({ where: { name: username } });
  return user === null;
}
