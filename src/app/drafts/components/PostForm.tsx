"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { editPostAction } from "@/app/actions/posts";
import { ContentTextArea } from "./ContentTextArea";
import PostTags from "./PostTags";
import SelectedCategoryInput from "./SelectedCategoryInput";
import MarkdownPreview from "./MarkdownPreview";
import TitleInput from "./TitleInput";
import SavePostBtn from "./SavePostBtn";
import PublishDraftBtn from "./PublishDraftBtn";
import type { Post } from "@/types/posts";

export type PostFormProps = {
  post: Post;
  postTags: {
    id: string;
    name: string;
  }[];
};

export default function PostForm({ post, postTags }: PostFormProps) {
  const [errors, action] = useFormState(editPostAction, {
    title: undefined,
    content: undefined,
  });
  const [textAreaValue, setTextAreaValue] = useState(post.content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <form action={action}>
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

        <TitleInput title={post.title} />
        {errors.title && <strong>{errors.title}</strong>}

        <PostTags tags={postTags} />

        <ContentTextArea
          ref={textAreaRef}
          value={textAreaValue}
          setValue={setTextAreaValue}
        />
        {errors.content && <strong>{errors.content}</strong>}

        <SelectedCategoryInput post={post} />

        <div>
          <SavePostBtn />
          {!post.published && <PublishDraftBtn />}
        </div>
      </form>

      <MarkdownPreview markdownText={textAreaValue} />
    </>
  );
}
