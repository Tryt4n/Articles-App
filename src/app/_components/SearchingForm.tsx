import React from "react";
import { filteringOptions, postCategories } from "../constants/posts";
import ResetButton from "./ResetButton";
import type { SearchProps } from "../page";

export default function SearchingForm({ searchParams }: SearchProps) {
  const { query, filterBy, category } = searchParams;

  return (
    <form className="searching-form">
      <fieldset>
        <legend>Filtering Options</legend>

        <div className="main-inputs-container">
          <div className="input-container">
            <label htmlFor="query">Searching phrase:</label>
            &nbsp;
            <input
              type="text"
              name="query"
              id="query"
              defaultValue={query}
            />
          </div>
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
        </div>

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

        <div className="btns-container">
          <button
            type="submit"
            className="btn"
          >
            Filter
          </button>

          <ResetButton
            params={searchParams}
            key={`${query}+${filterBy}+${category}`}
            className="btn"
          />
        </div>
      </fieldset>
    </form>
  );
}
