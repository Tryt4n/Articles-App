import React from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";

export default function SelectedText() {
  const { textOptions } = usePost();
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
