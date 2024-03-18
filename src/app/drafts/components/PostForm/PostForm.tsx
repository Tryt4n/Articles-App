"use client";

import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import useModal from "@/app/hooks/useModal";
import usePost from "../../(pages)/hooks/usePost";
import {
  createAndPublishPostAction,
  createPostAction,
  deletePostAction,
  editPostAction,
  publishPostAction,
} from "@/app/actions/posts";
import Link from "next/link";
import { TitleInput } from "./components/TitleInput";
import { ImageInput } from "./components/ImageInput";
import { TagsInput } from "./components/TagsInput";
import { SelectedCategoryInput } from "./components/SelectedCategoryInput";
import { ColorPicker } from "./components/ColorPicker";
import { FontSizeInput } from "./components/FontSizeInput";
import { ContentTextArea } from "./components/ContentTextArea";
import ChangeTextBtn from "./components/ChangeTextBtn";
import SelectedText from "./components/SelectedText";
import ModalMarkdownInfo from "./components/ModalMarkdownInfo/ModalMarkdownInfo";
import SavePostBtn from "./components/SavePostBtn";
import PublishDraftBtn from "./components/PublishDraftBtn";
import DeletePostBtn from "./components/DeletePostBtn";
import InfoIcon from "@/app/Icons/InfoIcon";
import type { PostFormProps } from "./types";
import "./style.css";

export default function PostForm({ post, postTags, authorId }: PostFormProps) {
  const [errors, mainAction] = useFormState(post ? editPostAction : createPostAction, null);

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const selectedCategoryRef = useRef<HTMLSelectElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const fontSizeInputRef = useRef<HTMLInputElement>(null);

  const { showModal } = useModal();
  const { setPostData, textOptions, setTextOptions } = usePost();

  function handleChangeText() {
    const defaultColor = "#000000";
    const defaultFontSize = "16px";

    const textArea = textareaRef.current;
    const { textColor, textSize, cursorPosition, selectedText } = textOptions;

    if (!textArea) return;

    // Example `insertText` value: [selectedText[color: #000000, size: 16px]]
    const insertText = `[${selectedText}[color: ${
      textColor !== defaultColor ? textColor : defaultColor
    }, size: ${textSize !== defaultFontSize ? textSize : defaultFontSize}]]`;

    // If there is a selected text and the user changed the color or font size
    if (selectedText !== "" && (textColor !== defaultColor || textSize !== defaultFontSize)) {
      const start = textArea.selectionStart; // Start of the selected text
      const end = textArea.selectionEnd; // End of the selected text
      textArea.value =
        textArea.value.substring(0, start) + insertText + textArea.value.substring(end); // Replace the selected text with the new one
      // setSelectedText(insertText); // Update the selected text
      setTextOptions((prevValue) => ({ ...prevValue, selectedText: insertText }));
    }

    if (selectedText === "" && (textColor !== defaultColor || textSize !== defaultFontSize)) {
      const updatedContent = `${textArea.value.slice(
        0,
        cursorPosition
      )} ${insertText} ${textArea.value.slice(cursorPosition)}`;

      textArea.value = updatedContent;

      // Focus will be directly where the user should start typing
      const newCursorPosition = cursorPosition + insertText.indexOf("[") + 2;

      // Set focus on the textarea
      textArea.selectionStart = newCursorPosition;
      textArea.selectionEnd = newCursorPosition;
    }

    setPostData((prevValue) => ({ ...prevValue, content: textArea.value }));
    textArea.focus();
  }

  return (
    <form
      action={mainAction}
      className="post-form"
    >
      {post && (
        <>
          <input
            type="hidden"
            name="post-id"
            value={post.id}
          />

          <input
            type="hidden"
            name="existing-post-tags"
            value={`[${postTags.map((tag) => {
              return JSON.stringify(tag);
            })}]`}
          />

          <input
            type="hidden"
            name="original-post-title"
            value={post.title}
          />
        </>
      )}

      <input
        type="hidden"
        name="author-id"
        value={authorId}
      />

      <Link
        className="btn post-form-preview-link"
        href={"/post-preview"}
        target="_blank"
      >
        Click to See Live Preview
      </Link>

      <TitleInput
        ref={titleRef}
        title={post?.title || ""}
        error={errors?.title}
      />

      <ImageInput
        ref={imageRef}
        imageSrc={post?.image || ""}
        error={errors?.image}
      />

      <TagsInput
        ref={tagsRef}
        tags={postTags || []}
        error={errors?.tags}
      />

      <SelectedCategoryInput
        ref={selectedCategoryRef}
        category={post?.category || "general"}
      />

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
            <ColorPicker ref={colorPickerRef} />
            <FontSizeInput ref={fontSizeInputRef} />
          </div>

          <ChangeTextBtn
            aria-controls="post-content"
            handleChangeText={handleChangeText}
          />

          <SelectedText />
        </div>

        <ContentTextArea
          id="post-content"
          name="post-content"
          ref={textareaRef}
          content={post?.content || ""}
          error={errors?.content}
          onSelect={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setTextOptions((prevValue) => ({
              ...prevValue,
              selectedText: target.value.substring(target.selectionStart, target.selectionEnd),
            }));
          }}
          onClick={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setTextOptions((prevValue) => ({
              ...prevValue,
              cursorPosition: target.selectionStart,
            }));
          }}
        />

        <ModalMarkdownInfo id="modal" />
      </fieldset>

      <div className="post-form-btns-container">
        <SavePostBtn formAction={mainAction} />

        {!post?.published && (
          <PublishDraftBtn formAction={post ? publishPostAction : createAndPublishPostAction} />
        )}

        {post && <DeletePostBtn formAction={deletePostAction} />}
      </div>
    </form>
  );
}
