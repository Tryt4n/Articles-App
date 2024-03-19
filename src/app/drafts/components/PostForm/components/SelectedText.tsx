import React from "react";
import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";

export default function SelectedText() {
  const { textOptions } = usePostForm();
  const { selectedText } = textOptions;

  return (
    <>
      <p
        className="post-content-selected-text"
        aria-label="Selected text"
        aria-hidden={!selectedText}
        aria-live="polite"
      >
        {selectedText && (
          <>
            <strong>Currently selected text: </strong>
            {selectedText}
          </>
        )}
      </p>
    </>
  );
}
