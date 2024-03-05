import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export default function DeletePostBtn({ ...props }: ComponentPropsWithoutRef<"button">) {
  const { pending, action } = useFormStatus();
  const isCurrentAction = action === props.formAction;

  return (
    <button
      type="submit"
      className="btn"
      disabled={pending}
      {...props}
    >
      {pending && isCurrentAction ? "Deleting..." : "Delete"}
    </button>
  );
}
