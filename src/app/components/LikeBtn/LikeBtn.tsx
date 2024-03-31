import React, { type ComponentPropsWithoutRef } from "react";
import { likeAction } from "@/app/actions/likes";
import ActionBtn from "./Btn";
import type { Comment } from "@/types/comments";
import type { Post } from "@/types/posts";
import type { User } from "@/types/users";

type LikeCommentBtnProps = {
  postId: Post["id"];
  userId: User["id"];
  alreadyLiked: boolean;
  commentId?: Comment["id"];
} & ComponentPropsWithoutRef<"button">;

export default async function LikeBtn({
  postId,
  commentId,
  userId,
  alreadyLiked,
  ...props
}: LikeCommentBtnProps) {
  return (
    <form
      action={likeAction}
      className={props.className}
    >
      {commentId && (
        <input
          type="hidden"
          name="comment-id"
          value={commentId}
        />
      )}
      <input
        type="hidden"
        name="post-id"
        value={postId}
      />
      <input
        type="hidden"
        name="user-id"
        value={userId}
      />

      <ActionBtn
        alreadyLiked={alreadyLiked}
        isComment={commentId ? true : false}
        {...props}
      />
    </form>
  );
}
