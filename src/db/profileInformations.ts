import prisma from "./db";
import { cache as ReactCache } from "react";
import { unstable_cache as NextCache } from "next/cache";
import type { User } from "@/app/lib/types/users";
import type { Post } from "@/app/lib/types/posts";
import type { Comment } from "@/app/lib/types/comments";

export const fetchProfileInformations = NextCache(
  ReactCache(async (userId: User["id"], authorsIds: User["id"][]) => {
    const [user, likes, savedPosts, follows] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: userId },
        include: {
          posts: { include: { likes: true }, orderBy: { createdAt: "desc" } },
          comments: { include: { likes: true }, orderBy: { updatedAt: "desc" } },
        },
      }),
      prisma.like.findMany({
        where: { userId: userId },
        include: { post: true, comment: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.findMany({
        where: { published: true, savedBy: { some: { userId: userId } } },
        orderBy: { publishedAt: "desc" },
      }),
      prisma.user.findMany({
        where: { id: { in: authorsIds } },
        orderBy: { name: "asc" },
      }),
    ]);

    return {
      user: user as User,
      likedPosts: likes
        .filter((like) => like.post !== null)
        .map((like) => ({
          post: {
            ...like.post,
            likedAt: like.createdAt,
          } as Post & { likedAt: Date },
        })),
      likedComments: likes
        .filter((like) => like.comment !== null)
        .map((like) => ({
          comment: {
            ...like.comment,
            likedAt: like.createdAt,
          } as Comment & { likedAt: Date },
        })),
      savedPosts: savedPosts as Post[],
      followedAuthors: follows as User[],
    };
  }),
  ["profileInformations"]
);
