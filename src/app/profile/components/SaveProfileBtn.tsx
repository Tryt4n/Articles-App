"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SaveProfileBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
