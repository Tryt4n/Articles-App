import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { postCommentAction } from "@/app/actions/comments";
import CommentTextarea from "./CommentTextarea";
import PostCommentBtn from "./PostCommentBtn";
import ReplyToInput from "./ReplyToInput";
import type { Post } from "@/types/posts";

type CommentFormProps = {
  postId: Post["id"];
};

export default async function CommentForm({ postId }: CommentFormProps) {
  const session = await getServerSession(authOptions);

  return (
    <form action={postCommentAction}>
      <input
        type="hidden"
        name="post-id"
        value={postId}
      />

      <input
        type="hidden"
        name="author-id"
        value={session?.user?.id}
      />

      <ReplyToInput />

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

      <PostCommentBtn />
    </form>
  );
}
