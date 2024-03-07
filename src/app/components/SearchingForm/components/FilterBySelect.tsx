import React from "react";
import { filteringOptions } from "@/app/constants/posts";
import type { SearchProps } from "@/app/page";

export default function FilterBySelect({
  filterBy,
}: {
  filterBy: SearchProps["searchParams"]["filterBy"];
}) {
  return (
    <div className="input-container">
      <label htmlFor="filterBy">Filter By:</label>
      &nbsp;
      <select
        name="filterBy"
        id="filterBy"
        defaultValue={filterBy}
      >
        {filteringOptions.map((filteringOption) => (
          <option
            key={filteringOption}
            value={filteringOption}
          >
            {filteringOption}
          </option>
        ))}
      </select>
    </div>
  );
}
