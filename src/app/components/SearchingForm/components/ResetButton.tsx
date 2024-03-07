"use client";

import React, { useTransition, type ComponentProps } from "react";
import { useRouter } from "next/navigation";
import type { SearchProps } from "../../../page";

type ResetButtonProps = {
  params: SearchProps["searchParams"];
} & ComponentProps<"button">;

export default function ResetButton({ params, ...props }: ResetButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function reset() {
    if (params.query === undefined || params.category === undefined) return;

    startTransition(() => {
      router.push("/");
    });
  }

  return (
    <button
      type="reset"
      onClick={reset}
      disabled={isPending || (params.query === "" && params.category === "")}
      {...props}
    >
      {isPending ? "Resetting..." : "Reset"}
    </button>
  );
}
