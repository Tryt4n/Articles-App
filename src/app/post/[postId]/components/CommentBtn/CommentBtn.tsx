"use client";

import { useFormStatus } from "react-dom";
import type { ComponentPropsWithoutRef } from "react";

type CommentBtnProps = {
  text: string;
} & ComponentPropsWithoutRef<"button">;

export default function CommentBtn({ text, ...props }: CommentBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
    >
      {pending ? `${text}ing` : text}
    </button>
  );
}
