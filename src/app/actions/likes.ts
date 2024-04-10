"use server";

import { likeComment, likePost } from "@/db/likes";
import { revalidatePath } from "next/cache";
import type { Comment } from "@/app/lib/types/comments";
import type { Post } from "@/app/lib/types/posts";
import type { User } from "@/app/lib/types/users";

export async function likeAction(formData: FormData) {
  const commentId = formData.get("comment-id") as Comment["id"] | undefined;
  const postId = formData.get("post-id") as Post["id"];
  const userId = formData.get("user-id") as User["id"];

  commentId ? likeComment(userId, commentId) : likePost(userId, postId);
  revalidatePath(`/post/${postId}`);
  revalidatePath("/profile");
}
