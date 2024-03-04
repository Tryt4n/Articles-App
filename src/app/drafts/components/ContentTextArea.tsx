import React, { forwardRef, type ForwardedRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const ContentTextArea = forwardRef(InnerComponent);

type ContentTextAreaProps = {
  value: string;
  setValue: (value: string) => void;
};

function InnerComponent(
  { value, setValue }: ContentTextAreaProps,
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
      />
    </div>
  );
}
