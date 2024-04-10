"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import useComments from "@/app/post/hooks/useComments";
import { startViewTransition } from "@/app/helpers/helpers";
import type { Comment } from "@/app/lib/types/comments";

type CommentActionBtnProps = {
  status: "edit" | "reply";
  comment: Comment;
} & ComponentPropsWithoutRef<"button">;

export default function CommentActionBtn({ status, comment, ...props }: CommentActionBtnProps) {
  const { formCommentStatus, setFormCommentStatus, currentComment, setCurrentComment } =
    useComments();

  function openCommentForm() {
    startViewTransition(() => {
      setFormCommentStatus(status);
      setCurrentComment(comment);
    });
  }

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={openCommentForm}
        disabled={formCommentStatus === status && currentComment?.id === comment.id}
      >
        {`${status.charAt(0).toUpperCase() + status.slice(1)}${
          formCommentStatus === status && currentComment?.id === comment.id ? "ing" : ""
        }`}
      </button>
    </>
  );
}
