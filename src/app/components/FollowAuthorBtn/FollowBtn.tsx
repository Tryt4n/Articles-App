"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import FollowIcon from "@/app/Icons/FollowIcon";
import FollowedIcon from "@/app/Icons/FollowedIcon";

type FollowBtnProps = { alreadyFollowed: boolean } & ComponentPropsWithoutRef<"button">;

export default function FollowBtn({ alreadyFollowed, ...props }: FollowBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      {...props}
    >
      <span className="visually-hidden">{`${alreadyFollowed ? "Unfollow" : "Follow"}${
        pending ? "ing" : ""
      } author`}</span>

      {alreadyFollowed ? <FollowedIcon /> : <FollowIcon />}
    </button>
  );
}
