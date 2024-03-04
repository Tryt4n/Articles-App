"use client";

import React, { useState } from "react";

export default function FilterButton() {
  const [buttonText, setButtonText] = useState("Filter");

  return (
    <button
      type="submit"
      className="btn"
      onClick={() => setButtonText("Filtering...")}
    >
      {buttonText}
    </button>
  );
}
