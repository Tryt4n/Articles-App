import React, { type ComponentPropsWithoutRef } from "react";
import { followAuthorAction } from "@/app/actions/follows";
import FollowBtn from "./FollowBtn";
import type { User } from "@/types/users";
import "./style.css";

type FollowAuthorBtnProps = {
  userId: User["id"];
  authorId: User["id"];
  alreadyFollowed: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function FollowAuthorBtn({
  userId,
  authorId,
  alreadyFollowed,
  ...props
}: FollowAuthorBtnProps) {
  return (
    <form
      action={followAuthorAction}
      className={`follow-author-btn${props.className ? ` ${props.className}` : ""}`}
    >
      <input
        type="hidden"
        name="user-id"
        value={userId}
      />

      <input
        type="hidden"
        name="author-id"
        value={authorId}
      />

      <FollowBtn
        alreadyFollowed={alreadyFollowed}
        {...props}
        aria-label={`Click to ${
          alreadyFollowed ? "un" : ""
        }follow this author in your followed author's list.`}
      />
    </form>
  );
}
