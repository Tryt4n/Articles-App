import React from "react";
import QueryInput from "./components/QueryInput";
import FilterBySelect from "./components/FilterBySelect";
import FilterByCategorySelect from "./components/FilterByCategorySelect";
import ResetButton from "./components/ResetButton";
import FilterButton from "./components/FilterButton";
import type { SearchProps } from "../../page";
import "./style.css";

export default function SearchingForm({ searchParams }: SearchProps) {
  const { query, filterBy, category } = searchParams;

  return (
    <form className="searching-form">
      <fieldset>
        <legend>Filtering Options</legend>

        <div className="main-inputs-container">
          <QueryInput value={query} />
          <FilterBySelect filterBy={filterBy} />
        </div>

        <FilterByCategorySelect category={category} />

        <div className="btns-container">
          <FilterButton />

          <ResetButton
            params={searchParams}
            className="btn"
          />
        </div>
      </fieldset>
    </form>
  );
}
