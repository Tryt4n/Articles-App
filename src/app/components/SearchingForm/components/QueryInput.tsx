import React from "react";

export default function QueryInput({ value }: { value: string }) {
  return (
    <div className="input-container">
      <label htmlFor="query">Searching phrase:</label>
      &nbsp;
      <input
        type="text"
        name="query"
        id="query"
        defaultValue={value}
      />
    </div>
  );
}
