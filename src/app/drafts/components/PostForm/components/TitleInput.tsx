import React from "react";
import type { Post } from "@/types/posts";

export default function TitleInput({ title, error }: { title: Post["title"]; error?: string }) {
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
        aria-errormessage={error ? "title-error" : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <strong
          id="title-error"
          aria-live="polite"
        >
          {error}
        </strong>
      )}
    </div>
  );
}
