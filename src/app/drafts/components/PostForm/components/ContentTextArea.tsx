import React, { forwardRef, type ForwardedRef } from "react";
import Modal from "@/app/components/Modal/Modal";
import useModal from "@/app/hooks/useModal";
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
  const { showModal } = useModal();

  return (
    <fieldset>
      <legend>Fully supported markdown</legend>
      <button
        type="button"
        aria-controls="modal"
        onClick={showModal}
      >
        How it works?
      </button>

      <label htmlFor="post-content">Content:</label>
      <TextareaAutosize
        id="post-content"
        name="post-content"
        placeholder="Write your post here..."
        required
        minLength={100}
        ref={ref}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        aria-errormessage={error ? "content-error" : undefined}
        aria-invalid={!!error}
        aria-describedby="modal"
      />
      {error && (
        <strong
          id="content-error"
          aria-live="polite"
        >
          {error}
        </strong>
      )}

      <Modal id="modal">some content</Modal>
    </fieldset>
  );
}
