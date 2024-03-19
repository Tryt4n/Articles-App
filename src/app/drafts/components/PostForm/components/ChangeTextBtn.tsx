import React, { type ComponentPropsWithoutRef } from "react";
import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";

export default function ChangeTextBtn({ ...props }: ComponentPropsWithoutRef<"button">) {
  const { refs, textOptions, setTextOptions, setPostData } = usePostForm();

  function handleChangeText() {
    const defaultColor = "#000000";
    const defaultFontSize = "16px";

    const textArea = refs.textareaRef.current;
    const { textColor, textSize, cursorPosition, selectedText } = textOptions;

    if (!textArea) return;

    // Example `insertText` value: [selectedText[color: #000000, size: 16px]]
    const insertText = `[${selectedText}[color: ${
      textColor !== defaultColor ? textColor : defaultColor
    }, size: ${textSize !== defaultFontSize ? textSize : defaultFontSize}]]`;

    let newCursorPosition = cursorPosition;

    // If there is a selected text and the user changed the color or font size
    if (selectedText !== "" && (textColor !== defaultColor || textSize !== defaultFontSize)) {
      const start = textArea.selectionStart; // Start of the selected text
      const end = textArea.selectionEnd; // End of the selected text
      textArea.value =
        textArea.value.substring(0, start) + insertText + textArea.value.substring(end); // Replace the selected text with the new one
      setTextOptions((prevValue) => ({ ...prevValue, selectedText: insertText }));

      newCursorPosition = start + insertText.length;
    }

    if (selectedText === "" && (textColor !== defaultColor || textSize !== defaultFontSize)) {
      const updatedContent = `${textArea.value.slice(
        0,
        cursorPosition
      )} ${insertText} ${textArea.value.slice(cursorPosition)}`;

      textArea.value = updatedContent;

      // Focus will be directly where the user should start typing
      newCursorPosition = cursorPosition + insertText.indexOf("[") + 2;
    }

    // Update global state
    setPostData((prevValue) => ({ ...prevValue, content: textArea.value }));

    // Set focus on the textarea at the end of the inserted text
    textArea.focus();
    textArea.selectionStart = newCursorPosition;
    textArea.selectionEnd = newCursorPosition;
  }

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
