import React from "react";
import useModal from "@/app/hooks/useModal";
import ColorPicker from "./ColorPicker";
import FontSizeInput from "./FontSizeInput";
import ContentTextArea from "./ContentTextArea";
import ChangeTextBtn from "./ChangeTextBtn";
import SelectedText from "./SelectedText";
import ModalMarkdownInfo from "./ModalMarkdownInfo/ModalMarkdownInfo";
import InfoIcon from "@/app/Icons/InfoIcon";

type ContentFieldsetType = {
  content: string;
  error?: string;
};

export default function ContentFieldset({ content, error }: ContentFieldsetType) {
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

      <div className="post-content-form-text-options-container">
        <div className="post-content-form-text-options-inner-wrapper">
          <div className="post-content-form-text-inputs-wrapper">
            <FontSizeInput />
            <ColorPicker />
          </div>

          <ChangeTextBtn
            className="btn post-content-change-text-btn"
            aria-controls="post-content"
          />
        </div>

        <SelectedText />
      </div>

      <ContentTextArea
        id="post-content"
        name="post-content"
        content={content}
        error={error}
      />

      <ModalMarkdownInfo id="modal" />
    </fieldset>
  );
}
