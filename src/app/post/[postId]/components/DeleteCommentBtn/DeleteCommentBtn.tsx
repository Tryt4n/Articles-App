"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { deleteCommentAction } from "@/app/actions/comments";
import DeleteBtn from "./DeleteBtn";
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
