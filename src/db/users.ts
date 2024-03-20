import prisma from "./db";
import { Prisma } from "@prisma/client";
import { cache as ReactCache } from "react";
import { unstable_cache as NextCache } from "next/cache";
import { wait } from "@/app/helpers/helpers";
import type { User, UserRole } from "@/types/users";

export const fetchUser = NextCache(
  ReactCache(async ({ id }: { id: string }) => {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            author: true,
            authorId: true,
            category: true,
            comments: true,
            likes: true,
            savedBy: true,
            title: true,
            content: true,
            image: true,
            published: true,
            publishedAt: true,
            createdAt: true,
            updatedAt: true,
            tags: {
              select: {
                tag: true,
              },
            },
          },
        },
        comments: true,
        followers: true,
        followings: true,
        receivedLikes: true,
        savedPosts: true,
      },
    });

    return {
      ...user,
      posts: user?.posts.map((post) => ({
        ...post,
        tags: post.tags.map((postTag) => postTag.tag),
      })),
    } as User;
  }),
  ["user"]
);

export const fetchAllAuthors = NextCache(
  ReactCache(async () => {
    // await wait(1000);

    const authors = await prisma.user.findMany({
      where: {
        role: "moderator" || "admin",
      },
    });

    return authors.map((author) => ({
      ...author,
      role: author.role as UserRole,
    })) as User[];
  }),
  ["authors"]
);

export async function createNewUser(
  user: Pick<User, "id" | "email" | "name" | "image" | "role" | "password">
) {
  // await wait(1000);
  return await prisma.user.create({ data: user });
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
  return await prisma.user.update({ where: { id }, data: { password } });
}
