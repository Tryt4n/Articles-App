"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn"
      disabled={pending}
    >
      {pending ? "Creating account" : "Signup"}
    </button>
  );
}
