import React, { type ComponentPropsWithoutRef } from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";

type ChangeTextBtnProps = {
  handleChangeText: () => void;
} & ComponentPropsWithoutRef<"button">;

export default function ChangeTextBtn({ handleChangeText, ...props }: ChangeTextBtnProps) {
  const { textOptions } = usePost();

  return (
    <button
      {...props}
      type="button"
      onClick={handleChangeText}
    >
      {textOptions.selectedText !== "" ? `Change selected text` : "Change writing font"} styles
    </button>
  );
}
