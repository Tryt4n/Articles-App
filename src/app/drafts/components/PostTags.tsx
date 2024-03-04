import React from "react";
import type { PostFormProps } from "./PostForm";

export default function PostTags({ tags }: { tags: PostFormProps["postTags"] }) {
  return (
    <div>
      <label htmlFor="post-tags">Add Tags:</label>
      <input
        type="text"
        name="post-tags"
        id="post-tags"
        defaultValue={`${tags
          .map((tag) => {
            return tag.name;
          })
          .join(" ")} `}
      />
    </div>
  );
}
