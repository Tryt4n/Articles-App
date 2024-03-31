import prisma from "./db";
import type { User } from "@/types/users";
import type { Comment } from "@/types/comments";
import type { Post } from "@/types/posts";

export async function likeComment(userId: User["id"], commentId: Comment["id"]) {
  return prisma.$transaction(async (prisma) => {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: userId,
          commentId: commentId,
        },
      },
    });

    if (existingLike) {
      return prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      return prisma.like.create({
        data: {
          commentId,
          userId: userId,
        },
      });
    }
  });
}

export async function likePost(userId: User["id"], postId: Post["id"]) {
  return prisma.$transaction(async (prisma) => {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      return prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      return prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  });
}
