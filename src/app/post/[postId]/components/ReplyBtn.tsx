"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import useComments from "../../hooks/useComments";
import { startViewTransition } from "@/app/helpers/helpers";
import type { Comment } from "@/types/comments";

type ReplyBtnProps = { comment: Comment } & ComponentPropsWithoutRef<"button">;

export default function ReplyBtn({ comment, ...props }: ReplyBtnProps) {
  const { formCommentStatus, setFormCommentStatus, currentComment, setCurrentComment } =
    useComments();

  function openEditCommentForm() {
    startViewTransition(() => {
      setFormCommentStatus("reply");
      setCurrentComment(comment);
    });
  }

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={openEditCommentForm}
        disabled={formCommentStatus === "reply" && currentComment?.id === comment.id}
      >
        {formCommentStatus === "reply" && currentComment?.id === comment.id ? "Replying" : "Reply"}
      </button>
    </>
  );
}
