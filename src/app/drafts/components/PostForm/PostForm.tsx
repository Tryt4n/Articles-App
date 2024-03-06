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
import { ContentTextArea } from "./components/ContentTextArea";
import PostTags from "./components/PostTags";
import SelectedCategoryInput from "./components/SelectedCategoryInput";
import MarkdownPreview from "../MarkdownPreview/MarkdownPreview";
import TitleInput from "./components/TitleInput";
import ImageLinkInput from "./components/ImageLinkInput";
import SavePostBtn from "./components/SavePostBtn";
import PublishDraftBtn from "./components/PublishDraftBtn";
import DeletePostBtn from "./components/DeletePostBtn";
import type { Post } from "@/types/posts";

export type PostFormProps =
  | {
      post: Post;
      postTags: {
        id: string;
        name: string;
      }[];
      authorId: string;
    }
  | {
      post?: undefined;
      postTags?: undefined;
      authorId: string;
    };

export default function PostForm({ post, postTags, authorId }: PostFormProps) {
  const [errors, mainAction] = useFormState(post ? editPostAction : createPostAction, {
    title: undefined,
    content: undefined,
    tags: undefined,
  });
  const [textAreaValue, setTextAreaValue] = useState(post?.content || "");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

        <TitleInput
          title={post?.title || ""}
          error={errors?.title}
        />

        <ImageLinkInput link={post?.image || ""} />

        <PostTags
          tags={postTags}
          error={errors?.tags}
        />

        <ContentTextArea
          ref={textAreaRef}
          value={textAreaValue}
          setValue={setTextAreaValue}
          error={errors?.content}
        />

        <SelectedCategoryInput category={post?.category || "general"} />

        <div>
          <SavePostBtn formAction={mainAction} />

          {!post?.published && (
            <PublishDraftBtn formAction={post ? publishPostAction : createAndPublishPostAction} />
          )}

          {post && <DeletePostBtn formAction={deletePostAction} />}
        </div>
      </form>

      <MarkdownPreview markdownText={textAreaValue} />
    </>
  );
}
