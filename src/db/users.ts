import prisma from "./db";
import { Prisma } from "@prisma/client";
import { cache as ReactCache } from "react";
import { unstable_cache as NextCache } from "next/cache";
import type { User, UserRole } from "@/types/users";

export const fetchUser = NextCache(
  ReactCache(async ({ id }: { id: User["id"] }) => {
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
          orderBy: { createdAt: "desc" },
        },
        comments: { orderBy: { updatedAt: "desc" } },
        followers: { orderBy: { createdAt: "desc" } },
        followings: { orderBy: { createdAt: "desc" } },
        receivedLikes: { orderBy: { createdAt: "desc" } },
        savedPosts: { orderBy: { post: { publishedAt: "desc" } } },
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
    const authors = await prisma.user.findMany({
      where: {
        role: "moderator" || "admin",
      },
      orderBy: { name: "asc" },
    });

    return authors.map((author) => ({
      ...author,
      role: author.role as UserRole,
    })) as User[];
  }),
  ["authors"]
);

export async function createNewUser(
  user: Pick<User, "email" | "name" | "image" | "role" | "password">
) {
  return await prisma.user.create({ data: user });
}

export async function isNewUserEmailUnique(email: User["email"]) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user === null;
}

export async function isNewUserUsernameUnique(username: User["name"]) {
  const user = await prisma.user.findUnique({ where: { name: username } });
  return user === null;
}

export async function updateUserName(id: User["id"], name: User["name"]) {
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

export async function updateUserEmail(id: User["id"], email: User["email"]) {
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

export async function updateUserPassword(id: User["id"], password: User["password"]) {
  return await prisma.user.update({ where: { id }, data: { password } });
}

export async function followAuthor(userId: User["id"], authorId: User["id"]) {
  return prisma.$transaction(async (prisma) => {
    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingUserId: { followerId: userId, followingUserId: authorId } },
    });

    if (existingFollow) {
      return prisma.follow.delete({
        where: { id: existingFollow.id },
      });
    } else {
      return prisma.follow.create({
        data: {
          followerId: userId,
          followingUserId: authorId,
        },
      });
    }
  });
}
