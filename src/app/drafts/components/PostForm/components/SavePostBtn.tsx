import React from "react";
import { useFormStatus } from "react-dom";

export default function SavePostBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
