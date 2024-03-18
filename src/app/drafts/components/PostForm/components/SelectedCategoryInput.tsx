import React, { useState, useEffect, type ComponentProps } from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";
import { postCategories } from "@/app/constants/posts";
import type { Post } from "@/types/posts";

type SelectedCategoryInputProps = { category: Post["category"] } & ComponentProps<"select">;

export const SelectedCategoryInput = React.forwardRef<
  HTMLSelectElement,
  SelectedCategoryInputProps
>(({ category, ...props }, ref) => {
  const { postData, setPostData } = usePost();
  const [selectCategory, setSelectCategory] = useState(category);

  useEffect(() => {
    localStorage.setItem(
      "live-preview-data",
      JSON.stringify({ ...postData, category: selectCategory })
    );
  }, [selectCategory, postData]);

  return (
    <div>
      <label htmlFor="post-category">Selected category:</label>
      <select
        {...props}
        name="post-category"
        id="post-category"
        ref={ref}
        defaultValue={selectCategory}
        required
        onChange={(e) => {
          setSelectCategory(e.target.value as Post["category"]);
          setPostData((prevPostData) => ({
            ...prevPostData,
            category: e.target.value as Post["category"],
          }));
        }}
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
