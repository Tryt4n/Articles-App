"use server";

import { createComment, deleteComment, editComment } from "@/db/comments";
import { revalidatePath } from "next/cache";
import type { Comment } from "@/types/comments";
import type { User } from "@/types/users";
import type { Post } from "@/types/posts";

export async function postCommentAction(formData: FormData) {
  const comment = formData.get("new-comment") as Comment["content"];
  const postId = formData.get("post-id") as Post["id"];
  const authorId = formData.get("author-id") as User["id"];
  const replyToId = formData.get("comment-id") as Comment["id"] | undefined;

  const newComment = {
    content: comment,
    postId,
    authorId,
    replyToId: replyToId || null,
  };

  if (comment.trim() !== "") {
    await createComment(newComment);

    revalidatePath(`/post/${postId}`);
    revalidatePath("/profile");
  }
}

export async function deleteCommentAction(formData: FormData) {
  const commentId = formData.get("comment-id") as Comment["id"];
  const postId = formData.get("post-id") as Post["id"];

  await deleteComment(commentId);

  revalidatePath(`/post/${postId}`);
  revalidatePath("/profile");
}

export async function editCommentAction(originalContent: Comment["content"], formData: FormData) {
  const commentId = formData.get("comment-id") as Comment["id"];
  const content = formData.get("new-comment") as Comment["content"];
  const postId = formData.get("post-id") as Post["id"];

  if (content.trim() !== "" && content !== originalContent) {
    await editComment(commentId, content);

    revalidatePath(`/post/${postId}`);
    revalidatePath("/profile");
  }
}
