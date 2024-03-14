import React, { forwardRef, type ForwardedRef } from "react";
import useModal from "@/app/hooks/useModal";
import ModalMarkdownInfo from "./ModalMarkdownInfo/ModalMarkdownInfo";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";
import InfoIcon from "@/app/Icons/InfoIcon";

export const ContentTextArea = forwardRef(InnerComponent);

type ContentTextAreaProps = {
  error?: string;
} & TextareaAutosizeProps;

function InnerComponent(
  { error, ...props }: ContentTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const { showModal } = useModal();

  return (
    <fieldset>
      <div className="post-content-form-inner-wrapper">
        <legend>Fully supported markdown</legend>
        <button
          type="button"
          className="post-content-info-btn"
          aria-controls="modal"
          aria-haspopup="dialog"
          onClick={showModal}
        >
          How it works?
          <InfoIcon />
        </button>
      </div>

      <label htmlFor="post-content">Content:</label>
      <TextareaAutosize
        required
        minLength={100}
        placeholder="Write your post here..."
        {...props}
        id="post-content"
        name="post-content"
        ref={ref}
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

      <ModalMarkdownInfo id="modal" />
    </fieldset>
  );
}
