"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LikeIcon from "@/app/Icons/LikeIcon";
import LikeFilledIcon from "@/app/Icons/LikeFilledIcon";

type ActionBtnProps = {
  alreadyLiked: boolean;
  isComment: boolean;
} & React.ComponentPropsWithoutRef<"button">;

export default function ActionBtn({ alreadyLiked, isComment, ...props }: ActionBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label={`${alreadyLiked ? "Unlike" : "Like"} this ${isComment ? "comment" : "post"}`}
      disabled={pending}
      {...props}
    >
      <span className="visually-hidden">
        {pending ? (alreadyLiked ? "Unliking" : "Liking") : alreadyLiked ? "Unlike" : "Like"}
      </span>
      {alreadyLiked ? <LikeFilledIcon /> : <LikeIcon />}
    </button>
  );
}
