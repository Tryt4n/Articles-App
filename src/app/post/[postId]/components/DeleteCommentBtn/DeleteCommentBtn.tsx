"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import { deleteCommentAction } from "@/app/actions/comments";
import type { Post } from "@/types/posts";
import type { Comment } from "@/types/comments";

type DeleteCommentBtnProps = {
  postId: Post["id"];
  commentId: Comment["id"];
} & ComponentPropsWithoutRef<"button">;

export default function DeleteCommentBtn({ postId, commentId, ...props }: DeleteCommentBtnProps) {
  return (
    <form action={deleteCommentAction}>
      <input
        type="hidden"
        name="post-id"
        value={postId}
      />

      <input
        type="hidden"
        name="comment-id"
        value={commentId}
      />

      <DeleteBtn {...props} />
    </form>
  );
}
function DeleteBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Click to delete comment."
    >
      {pending ? "Deleting" : "Delete"}
    </button>
  );
}
