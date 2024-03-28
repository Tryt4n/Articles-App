"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { startViewTransition } from "@/app/helpers/helpers";
import { useFormStatus } from "react-dom";
import useComments from "@/app/post/hooks/useComments";
import { editCommentAction } from "@/app/actions/comments";
import CommentTextarea from "../CommentTextarea";
import type { Comment } from "@/types/comments";

type EditPostCommentFormProps = {
  commentId: Comment["id"];
} & ComponentPropsWithoutRef<"form">;

export default function EditPostCommentForm({ commentId, ...props }: EditPostCommentFormProps) {
  const { formCommentStatus, setFormCommentStatus, currentComment, setCurrentComment } =
    useComments();

  function cancelEditing() {
    startViewTransition(() => {
      setFormCommentStatus("new");
      setCurrentComment(null);
    });
  }

  return (
    <>
      {formCommentStatus === "edit" && currentComment?.id === commentId && (
        <form
          action={editCommentAction}
          onSubmit={cancelEditing}
          {...props}
        >
          <input
            type="hidden"
            name="post-id"
            value={currentComment.postId}
          />

          <input
            type="hidden"
            name="comment-id"
            value={currentComment.id}
          />

          <label>
            <CommentTextarea
              name="new-comment"
              id="new-comment"
              cols={30}
              rows={10}
              minLength={1}
              maxLength={1000}
              required
              placeholder="Write your comment..."
              aria-label="Write your comment here."
            />
          </label>

          <div>
            <EditBtn />

            <button
              type="button"
              className="btn"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function EditBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn--accent"
      disabled={pending}
    >
      {pending ? "Editing" : "Edit"}
    </button>
  );
}
