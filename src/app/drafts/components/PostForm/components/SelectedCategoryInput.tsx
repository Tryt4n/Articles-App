import React, { type ComponentProps } from "react";
import { postCategories } from "@/app/constants/posts";
import type { Post } from "@/types/posts";

type SelectedCategoryInputProps = { category: Post["category"] } & ComponentProps<"select">;

export const SelectedCategoryInput = React.forwardRef<
  HTMLSelectElement,
  SelectedCategoryInputProps
>((props, ref) => {
  return (
    <div>
      <label htmlFor="post-category">Selected category:</label>
      <select
        {...props}
        name="post-category"
        id="post-category"
        required
        defaultValue={props.category}
        ref={ref}
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
});

SelectedCategoryInput.displayName = "post form SelectedCategoryInput";
