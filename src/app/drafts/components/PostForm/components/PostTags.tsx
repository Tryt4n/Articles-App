import React from "react";
import type { PostFormProps } from "../PostForm";

export default function PostTags({
  tags = [],
  error,
}: {
  tags?: PostFormProps["postTags"];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor="post-tags">Add Tags:</label>
      <input
        type="text"
        name="post-tags"
        id="post-tags"
        maxLength={100}
        defaultValue={`${tags
          .map((tag) => {
            return tag.name;
          })
          .join(" ")} `}
        aria-errormessage={error ? "tags-error" : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <strong
          id="tags-error"
          aria-live="polite"
        >
          {error}
        </strong>
      )}
    </div>
  );
}
