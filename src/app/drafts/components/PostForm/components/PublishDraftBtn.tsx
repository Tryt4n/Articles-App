import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export default function PublishDraftBtn({ ...props }: ComponentPropsWithoutRef<"button">) {
  const { pending, action } = useFormStatus();
  const isCurrentAction = action === props.formAction;

  return (
    <button
      type="submit"
      className="btn btn--accent"
      disabled={pending}
      {...props}
    >
      {pending && isCurrentAction ? "Publishing..." : "Publish"}
    </button>
  );
}
