"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { startViewTransition } from "@/app/helpers/helpers";
import useComments from "@/app/post/hooks/useComments";
import type { Comment } from "@/types/comments";

type EditCommentBtnProps = { comment: Comment } & ComponentPropsWithoutRef<"button">;

export default function EditCommentBtn({ comment, ...props }: EditCommentBtnProps) {
  const { formCommentStatus, setFormCommentStatus, currentComment, setCurrentComment } =
    useComments();

  function openEditCommentForm() {
    startViewTransition(() => {
      setFormCommentStatus("edit");
      setCurrentComment(comment);
    });
  }

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={openEditCommentForm}
        disabled={formCommentStatus === "edit" && currentComment?.id === comment.id}
      >
        {formCommentStatus === "edit" && currentComment?.id === comment.id ? "Editing" : "Edit"}
      </button>
    </>
  );
}
