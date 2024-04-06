import React, { type ComponentProps } from "react";
import LikeBtn from "@/app/components/LikeBtn/LikeBtn";
import "./style.css";

type PostLikesProps = {
  receivedLikes: number;
  isCurrentUser?: boolean;
  userId?: ComponentProps<typeof LikeBtn>["userId"];
} & Omit<ComponentProps<typeof LikeBtn>, "userId">;

export default function PostLikes({
  receivedLikes,
  isCurrentUser = false,
  ...props
}: PostLikesProps) {
  const { userId, ...restProps } = props;

  return (
    <div
      className={`post-likes${props.className ? ` ${props.className}` : ""}`}
      style={props.style}
    >
      <span aria-label="Received likes.">
        Likes: <strong>{receivedLikes}</strong>
      </span>

      {!isCurrentUser && userId && (
        <LikeBtn
          userId={userId}
          {...restProps}
        />
      )}
    </div>
  );
}
