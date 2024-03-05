import React from "react";
import { postCategories } from "@/app/constants/posts";
import type { Post } from "@/types/posts";

export default function SelectedCategoryInput({ post }: { post: Post }) {
  return (
    <div>
      <label htmlFor="post-category">Selected category:</label>
      <select
        name="post-category"
        id="post-category"
        required
        defaultValue={post.category}
      >
        {postCategories.map((postCategory) => (
          <option
            key={postCategory}
            value={postCategory}
          >
            {postCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
