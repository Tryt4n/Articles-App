"use server";

import { createComment, deleteComment } from "@/db/comments";
import { revalidatePath } from "next/cache";
import type { Comment } from "@/types/comments";
import type { User } from "@/types/users";
import type { Post } from "@/types/posts";

export async function postCommentAction(formData: FormData) {
  const comment = formData.get("new-comment") as Comment["content"];
  const postId = formData.get("post-id") as Post["id"];
  const authorId = formData.get("author-id") as User["id"];
  const replyToId = formData.get("reply-to") as Comment["id"] | undefined;

  const newComment = {
    content: comment,
    postId,
    authorId,
    replyToId: replyToId || null,
  };

  await createComment(newComment);

  revalidatePath(`/post/${postId}`);
}

export async function deleteCommentAction(formData: FormData) {
  const commentId = formData.get("comment-id") as Comment["id"];
  const postId = formData.get("post-id") as Post["id"];

  await deleteComment(commentId);

  revalidatePath(`/post/${postId}`);
}
