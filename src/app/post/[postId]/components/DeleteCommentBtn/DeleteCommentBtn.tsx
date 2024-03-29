"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import useComments from "@/app/post/hooks/useComments";
import { deleteCommentAction } from "@/app/actions/comments";
import CommentBtn from "../CommentBtn/CommentBtn";
import type { Post } from "@/types/posts";
import type { Comment } from "@/types/comments";

type DeleteCommentBtnProps = {
  postId: Post["id"];
  commentId: Comment["id"];
} & ComponentPropsWithoutRef<"button">;

export default function DeleteCommentBtn({ postId, commentId, ...props }: DeleteCommentBtnProps) {
  const { formCommentStatus, setFormCommentStatus, setCurrentComment, contentRef } = useComments();

  function resetCommentFormStatus() {
    if (formCommentStatus === "edit") {
      setFormCommentStatus("new");
      setCurrentComment(null);
    }
  }

  return (
    <form
      action={deleteCommentAction}
      onSubmit={resetCommentFormStatus}
    >
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

      <CommentBtn
        text="Delete"
        aria-label="Click to delete comment"
        {...props}
      />
    </form>
  );
}
