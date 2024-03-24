import React from "react";
import { useFormStatus } from "react-dom";

export default function DeleteBtn({ ...props }) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      aria-label="Click to delete comment."
    >
      {pending ? "Deleting" : "Delete"}
    </button>
  );
}
