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

      <div>
        <div>
          <ColorPicker />
          <FontSizeInput />
        </div>

        <ChangeTextBtn aria-controls="post-content" />

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
