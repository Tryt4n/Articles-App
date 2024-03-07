"use client";

import React, { useState, type ComponentProps } from "react";

export default function FilterButton({ ...props }: ComponentProps<"button">) {
  const [buttonText, setButtonText] = useState("Filter");

  return (
    <button
      type="submit"
      className="btn"
      onClick={() => setButtonText("Filtering...")}
      {...props}
    >
      {buttonText}
    </button>
  );
}
