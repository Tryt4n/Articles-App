"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import {
  createAndPublishPostAction,
  createPostAction,
  deletePostAction,
  editPostAction,
  publishPostAction,
} from "@/app/actions/posts";
import { PostFormInput } from "./components/PostFormInput";
import { ContentTextArea } from "./components/ContentTextArea";
import { SelectedCategoryInput } from "./components/SelectedCategoryInput";
import SavePostBtn from "./components/SavePostBtn";
import PublishDraftBtn from "./components/PublishDraftBtn";
import DeletePostBtn from "./components/DeletePostBtn";
import PostPreview from "../PostPreview/PostPreview";
import type { PostFormProps } from "./types";
import type { Post } from "@/types/posts";

export default function PostForm({ post, postTags, authorId }: PostFormProps) {
  const [errors, mainAction] = useFormState(post ? editPostAction : createPostAction, {
    title: undefined,
    content: undefined,
    tags: undefined,
    image: undefined,
  });

  const [titleValue, setTitleValue] = useState(post?.title || "");
  const [imageValue, setImageValue] = useState(post?.image || "");
  const [tagsValue, setTagsValue] = useState(postTags || []);
  const [textAreaValue, setTextAreaValue] = useState(post?.content || "");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(post?.category || "general");

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const selectedCategoryRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <form action={mainAction}>
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

        <PostFormInput
          type="text"
          label="Title:"
          id="title"
          defaultValue={titleValue}
          error={errors.title}
          ref={titleRef}
          onChange={() => {
            if (!titleRef.current) return;
            setTitleValue(titleRef.current.value);
          }}
        />

        <PostFormInput
          type="text"
          label="Image Link:"
          id="image"
          defaultValue={imageValue}
          error={errors.image}
          ref={imageRef}
          onChange={() => {
            if (!imageRef.current) return;
            setImageValue(imageRef.current.value);
          }}
        />

        <PostFormInput
          type="text"
          label="Add Tags (optional):"
          id="tags"
          defaultValue={`${tagsValue
            .map((tag) => {
              return tag.name;
            })
            .join(" ")} `}
          error={errors.tags}
          ref={tagsRef}
          onChange={() => {
            if (!tagsRef.current) return;
            const newTagsValue = tagsRef.current.value
              .split(" ")
              .map((tag) => ({ id: tag, name: tag }));
            setTagsValue(newTagsValue);
          }}
        />

        <ContentTextArea
          ref={textAreaRef}
          value={textAreaValue}
          setValue={setTextAreaValue}
          error={errors?.content}
        />

        <SelectedCategoryInput
          category={selectedCategoryValue}
          ref={selectedCategoryRef}
          onChange={() => {
            if (!selectedCategoryRef.current) return;
            setSelectedCategoryValue(selectedCategoryRef.current.value as Post["category"]);
          }}
        />

        <div>
          <SavePostBtn formAction={mainAction} />

          {!post?.published && (
            <PublishDraftBtn formAction={post ? publishPostAction : createAndPublishPostAction} />
          )}

          {post && <DeletePostBtn formAction={deletePostAction} />}
        </div>
      </form>

      <PostPreview
        title={titleValue}
        imageSrc={imageValue}
        tags={tagsValue}
        category={selectedCategoryValue}
        markdownText={textAreaValue}
      />
    </>
  );
}
