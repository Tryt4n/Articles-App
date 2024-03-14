"use client";

import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import {
  createAndPublishPostAction,
  createPostAction,
  deletePostAction,
  editPostAction,
  publishPostAction,
} from "@/app/actions/posts";
import Link from "next/link";
import { PostFormInput } from "./components/PostFormInput";
import { ContentTextArea } from "./components/ContentTextArea";
import { SelectedCategoryInput } from "./components/SelectedCategoryInput";
import SavePostBtn from "./components/SavePostBtn";
import PublishDraftBtn from "./components/PublishDraftBtn";
import DeletePostBtn from "./components/DeletePostBtn";
import PostPreview from "../PostPreview/PostPreview";
import type { PostFormProps } from "./types";
import type { Post as PostType } from "@/types/posts";
import "./style.css";

export default function PostForm({ post, postTags, authorId }: PostFormProps) {
  const [errors, mainAction] = useFormState(post ? editPostAction : createPostAction, null);

  const [postData, setPostData] = useState({
    title: post?.title || "",
    imageSrc: post?.image || "",
    tags: postTags || [],
    category: post?.category || "general",
    content: post?.content || "",
  });

  const deferredPostData = useDeferredValue(postData);

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const selectedCategoryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    localStorage.setItem("live-preview-data", JSON.stringify(deferredPostData));
  }, [deferredPostData]);

  return (
    <>
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

        <PostFormInput
          type="text"
          label="Title:"
          id="title"
          defaultValue={deferredPostData.title}
          required
          error={errors?.title}
          ref={titleRef}
          onChange={() => {
            if (!titleRef.current) return;
            setPostData({ ...postData, title: titleRef.current.value });
          }}
        />

        <PostFormInput
          type="text"
          label="Image Link:"
          id="image"
          defaultValue={deferredPostData.imageSrc}
          required
          minLength={10}
          maxLength={200}
          error={errors?.image}
          ref={imageRef}
          onChange={() => {
            if (!imageRef.current) return;
            setPostData({ ...postData, imageSrc: imageRef.current.value });
          }}
        />

        <PostFormInput
          type="text"
          label="Add Tags (optional):"
          id="tags"
          defaultValue={`${deferredPostData.tags
            .map((tag) => {
              return tag.name;
            })
            .join(" ")}${deferredPostData.tags.length > 0 ? " " : ""}`} // Add space if there are tags
          error={errors?.tags}
          ref={tagsRef}
          onChange={() => {
            if (!tagsRef.current) return;
            const newTagsValue = tagsRef.current.value
              .split(" ")
              .filter((tag) => tag.trim() !== "") // Ignore empty tags
              .map((tag) => ({ id: tag, name: tag }));
            setPostData({ ...postData, tags: newTagsValue });
          }}
        />

        <SelectedCategoryInput
          category={deferredPostData.category}
          ref={selectedCategoryRef}
          onChange={() => {
            if (!selectedCategoryRef.current) return;
            setPostData({
              ...postData,
              category: selectedCategoryRef.current.value as PostType["category"],
            });
          }}
        />

        <ContentTextArea
          ref={textAreaRef}
          defaultValue={deferredPostData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          error={errors?.content}
        />

        <div className="post-form-btns-container">
          <SavePostBtn formAction={mainAction} />

          {!post?.published && (
            <PublishDraftBtn formAction={post ? publishPostAction : createAndPublishPostAction} />
          )}

          {post && <DeletePostBtn formAction={deletePostAction} />}
        </div>
      </form>

      <PostPreview postData={deferredPostData} />
    </>
  );
}
