"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import useComments from "@/app/post/hooks/useComments";
import { startViewTransition } from "@/app/helpers/helpers";
import { postCommentAction } from "@/app/actions/comments";
import CommentTextarea from "../CommentTextarea";
import type { Comment } from "@/types/comments";
import type { User } from "@/types/users";

type ReplyPostCommentFormProps = {
  commentId: Comment["id"];
  authorId: User["id"];
} & ComponentPropsWithoutRef<"form">;

export default function ReplyPostCommentForm({
  commentId,
  authorId,
  ...props
}: ReplyPostCommentFormProps) {
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
      {formCommentStatus === "reply" && currentComment?.id === commentId && (
        <form
          action={postCommentAction}
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
            name="author-id"
            value={authorId}
          />

          <input
            type="hidden"
            name="reply-to"
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
            <ReplyBtn />

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

function ReplyBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn--accent"
      disabled={pending}
    >
      {pending ? "Replying" : "Reply"}
    </button>
  );
}
