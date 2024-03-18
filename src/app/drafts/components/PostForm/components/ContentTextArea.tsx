import React, { useState, useEffect, useDeferredValue, forwardRef, type ForwardedRef } from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

export const ContentTextArea = forwardRef(InnerComponent);

type ContentTextAreaProps = { content: string; error?: string } & TextareaAutosizeProps;

export default function InnerComponent(
  { content, error, ...props }: ContentTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const { postData, setPostData } = usePost();
  const [textareaContent, setTextareaContent] = useState(content);
  const deferredContent = useDeferredValue(textareaContent);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, content: deferredContent }));
  }, [deferredContent, setPostData]);

  // Update local storage for post preview page
  useEffect(() => {
    localStorage.setItem(
      "live-preview-data",
      JSON.stringify({ ...postData, content: textareaContent })
    );
  }, [textareaContent, postData]);

  return (
    <>
      <label htmlFor="post-content">Content:</label>
      <TextareaAutosize
        {...props}
        ref={ref}
        defaultValue={textareaContent}
        placeholder="Write your post here..."
        minLength={100}
        required
        aria-errormessage={error ? "content-error" : undefined}
        aria-invalid={!!error}
        aria-describedby="modal"
        onChange={(e) => setTextareaContent(e.target.value)}
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
