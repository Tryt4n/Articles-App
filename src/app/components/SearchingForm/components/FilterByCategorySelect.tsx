import React from "react";
import { postCategories } from "@/app/constants/posts";
import type { SearchProps } from "@/app/page";

export default function FilterByCategorySelect({
  category,
}: {
  category: SearchProps["searchParams"]["category"];
}) {
  return (
    <div className="input-container">
      <label htmlFor="category">Filter By Category:</label>
      &nbsp;
      <select
        name="category"
        id="category"
        defaultValue={category}
      >
        <option value="">All categories</option>
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
