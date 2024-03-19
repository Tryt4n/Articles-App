import React from "react";
import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";

export default function SelectedText() {
  const { textOptions } = usePostForm();
  const { selectedText } = textOptions;

  return (
    <>
      {selectedText && (
        <p>
          <strong>Currently selected text: </strong>
          {selectedText}
        </p>
      )}
    </>
  );
}
