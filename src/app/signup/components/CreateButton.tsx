"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export default function CreateButton({ ...props }: ComponentPropsWithoutRef<"button">) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className="btn"
      disabled={pending}
    >
      {pending ? "Creating account..." : "Create new account"}
    </button>
  );
}
