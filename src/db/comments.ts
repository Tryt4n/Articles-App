import prisma from "./db";
import type { Comment } from "@/types/comments";

export async function createComment(
  comment: Pick<Comment, "content" | "postId" | "authorId" | "replyToId">
) {
  return await prisma.comment.create({
    data: comment,
  });
}

export async function deleteComment(commentId: string) {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}

export async function editComment(commentId: string, content: string) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
      updatedAt: new Date(),
    },
  });
}
