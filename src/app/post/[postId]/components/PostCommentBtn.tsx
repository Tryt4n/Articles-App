"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function PostCommentBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn--accent"
    >
      {pending ? "Posting" : "Post"}
    </button>
  );
}
