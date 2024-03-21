import prisma from "./db";
import type { Comment } from "@/types/comments";

export async function createComment(
  comment: Pick<Comment, "content" | "postId" | "authorId" | "replyToId">
) {
  return await prisma.comment.create({
    data: comment,
  });
}
