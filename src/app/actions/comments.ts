"use server";

import { createComment } from "@/db/comments";
import { revalidatePath } from "next/cache";

export async function postComment(formData: FormData) {
  const comment = formData.get("new-comment") as string;
  const postId = formData.get("post-id") as string;
  const authorId = formData.get("author-id") as string;
  const replyToId = formData.get("reply-to") as string | undefined;

  const newComment = {
    content: comment,
    postId,
    authorId,
    replyToId: replyToId || null,
  };

  await createComment(newComment);

  revalidatePath(`/post/${postId}`);
}
