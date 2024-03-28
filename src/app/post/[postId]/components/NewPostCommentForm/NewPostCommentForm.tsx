"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import useComments from "@/app/post/hooks/useComments";
import { postCommentAction } from "@/app/actions/comments";
import TextareaAutosize from "react-textarea-autosize";
import type { Post } from "@/types/posts";
import type { User } from "@/types/users";

type NewPostCommentFormProps = {
  postId: Post["id"];
  user: User["id"];
} & ComponentPropsWithoutRef<"form">;

export default function NewPostCommentForm({ postId, user, ...props }: NewPostCommentFormProps) {
  const { formCommentStatus } = useComments();

  return (
    <>
      {formCommentStatus === "new" && (
        <form
          action={postCommentAction}
          {...props}
        >
          <input
            type="hidden"
            name="post-id"
            value={postId}
          />

          <input
            type="hidden"
            name="author-id"
            value={user}
          />

          <label>
            <TextareaAutosize
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
            <PostCommentBtn />

            <button
              type="reset"
              className="btn"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function PostCommentBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn--accent"
      disabled={pending}
    >
      {pending ? "Commenting" : "Comment"}
    </button>
  );
}
