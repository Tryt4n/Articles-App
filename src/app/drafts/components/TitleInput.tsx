import React from "react";
import type { Post } from "@/types/posts";

export default function TitleInput({ title }: { title: Post["title"] }) {
  return (
    <div>
      <label htmlFor="post-title">Title:</label>
      <input
        type="text"
        id="post-title"
        name="post-title"
        required
        minLength={1}
        maxLength={100}
        defaultValue={title}
      />
    </div>
  );
}
