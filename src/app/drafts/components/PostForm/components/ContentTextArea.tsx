import React, { useState, useEffect, useDeferredValue, useMemo } from "react";
import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";
import { startViewTransition } from "@/app/helpers/helpers";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

type ContentTextAreaProps = { content: string; error?: string } & TextareaAutosizeProps;

export default function ContentTextArea({ content, error, ...props }: ContentTextAreaProps) {
  const { postData, setPostData, textOptions, setTextOptions, refs } = usePostForm();

  const [textareaContent, setTextareaContent] = useState(content);
  const [selectedText, setSelectedText] = useState(textOptions.selectedText);
  const [cursorPosition, setCursorPosition] = useState(textOptions.cursorPosition);

  const deferredContent = useDeferredValue(textareaContent);
  const deferredSelectedText = useDeferredValue(selectedText);
  const deferredCursorPosition = useDeferredValue(cursorPosition);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextareaContent(e.target.value);
  }

  function handleOnSelect(e: React.SyntheticEvent<HTMLTextAreaElement, Event>) {
    const target = e.target as HTMLTextAreaElement;
    startViewTransition(() => {
      setSelectedText(target.value.substring(target.selectionStart, target.selectionEnd));
    });
  }

  function handleOnClick(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) {
    const target = e.target as HTMLTextAreaElement;
    setCursorPosition(target.selectionStart);
  }

  // Update text options with deferred value to prevent lag
  useEffect(() => {
    setTextOptions((prevTextOptions) => ({
      ...prevTextOptions,
      selectedText: deferredSelectedText,
      cursorPosition: deferredCursorPosition,
    }));
  }, [deferredCursorPosition, deferredSelectedText, setTextOptions]);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, content: deferredContent }));
  }, [deferredContent, setPostData]);

  // Update local storage for post preview page
  const livePreviewData = useMemo(
    () => JSON.stringify({ ...postData, content: textareaContent }),
    [textareaContent, postData]
  );

  useEffect(() => {
    localStorage.setItem("live-preview-data", livePreviewData);
  }, [livePreviewData]);

  return (
    <>
      <label htmlFor="post-content">Content:</label>
      <TextareaAutosize
        {...props}
        className="post-content-form-textarea"
        ref={refs.textareaRef}
        defaultValue={textareaContent}
        placeholder="Write your post here..."
        minLength={100}
        required
        aria-errormessage={error ? "content-error" : undefined}
        aria-invalid={!!error}
        aria-describedby="modal"
        onChange={handleOnChange}
        onSelect={handleOnSelect}
        onClick={handleOnClick}
      />
      {error && (
        <strong
          id="content-error"
          aria-live="polite"
        >
          {error}
        </strong>
      )}
    </>
  );
}
