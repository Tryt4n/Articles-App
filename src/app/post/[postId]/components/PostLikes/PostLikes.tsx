import React, { type ComponentProps } from "react";
import LikeBtn from "@/app/components/LikeBtn/LikeBtn";
import "./style.css";

type PostLikesProps = { receivedLikes: number; isCurrentUser?: boolean } & ComponentProps<
  typeof LikeBtn
>;

export default function PostLikes({
  receivedLikes,
  isCurrentUser = false,
  ...props
}: PostLikesProps) {
  return (
    <div
      className={`post-likes${props.className ? ` ${props.className}` : ""}`}
      style={props.style}
    >
      <span aria-label="Received likes.">
        Likes: <strong>{receivedLikes}</strong>
      </span>

      {!isCurrentUser && <LikeBtn {...props} />}
    </div>
  );
}
