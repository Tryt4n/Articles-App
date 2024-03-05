import React, { forwardRef, type ForwardedRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const ContentTextArea = forwardRef(InnerComponent);

type ContentTextAreaProps = {
  value: string;
  setValue: (value: string) => void;
  error?: string;
};

function InnerComponent(
  { value, setValue, error }: ContentTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div>
      <label htmlFor="post-content">Content:</label>
      <TextareaAutosize
        id="post-content"
        name="post-content"
        required
        minLength={100}
        ref={ref}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        aria-errormessage={error ? "content-error" : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <strong
          id="content-error"
          aria-live="polite"
        >
          {error}
        </strong>
      )}
    </div>
  );
}
