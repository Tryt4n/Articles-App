import prisma from "./db";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { wait } from "@/app/helpers/helpers";
import type { User, UserRole } from "@/types/users";

export const fetchUser = unstable_cache(
  cache(async ({ id }: { id: string }) => {
    // await wait(1000);

    const user = prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        posts: true,
        comments: true,
        followers: true,
        followings: true,
        receivedLikes: true,
        savedPosts: true,
      },
    });

    return user as unknown as User;
  }),
  ["user"]
);

export const fetchAllAuthors = unstable_cache(
  cache(async () => {
    // await wait(1000);

    const authors = await prisma.user.findMany({
      where: {
        role: "moderator" || "admin",
      },
    });

    return authors.map((author) => ({
      ...author,
      role: author.role as UserRole,
    })) as unknown as User[];
  }),
  ["authors"]
);

export async function createNewUser(
  user: Pick<User, "id" | "email" | "name" | "image" | "role" | "password">
) {
  // await wait(1000);
  return prisma.user.create({ data: user });
}

export async function isNewUserEmailUnique(email: string) {
  // await wait(1000);

  const user = await prisma.user.findUnique({ where: { email } });
  return user === null;
}

export async function isNewUserUsernameUnique(username: string) {
  // await wait(1000);

  const user = await prisma.user.findUnique({ where: { name: username } });
  return user === null;
}

export async function updateUserName(id: string, name: string) {
  try {
    return await prisma.user.update({ where: { id }, data: { name } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("Username is already taken");
    } else {
      throw error;
    }
  }
}

export async function updateUserEmail(id: string, email: string) {
  try {
    return await prisma.user.update({ where: { id }, data: { email } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("User email is already taken");
    } else {
      throw error;
    }
  }
}

export async function updateUserPassword(id: string, password: string) {
  return prisma.user.update({ where: { id }, data: { password } });
}
