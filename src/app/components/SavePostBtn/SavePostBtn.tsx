import React, { type ComponentPropsWithoutRef } from "react";
import { savePostAction } from "@/app/actions/posts";
import SaveBtn from "./SaveBtn";
import type { Post } from "@/app/lib/types/posts";
import type { User } from "@/app/lib/types/users";
import "./style.css";

type SavePostBtnProps = {
  postId: Post["id"];
  authorId: User["id"];
  alreadySaved: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function SavePostBtn({
  postId,
  authorId,
  alreadySaved = false,
  ...props
}: SavePostBtnProps) {
  return (
    <form action={savePostAction}>
      <input
        type="hidden"
        name="post-id"
        value={postId}
      />
      <input
        type="hidden"
        name="user-id"
        value={authorId}
      />

      <SaveBtn
        {...props}
        alreadySaved={alreadySaved}
        className={`save-post-btn${props.className ? ` ${props.className}` : ""}`}
        aria-label={`Click to ${alreadySaved ? "un" : ""}save this post in your saved posts list.`}
      />
    </form>
  );
}
