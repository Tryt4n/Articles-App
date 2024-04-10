"use client";

import React from "react";
import { useFormState } from "react-dom";
import {
  createAndPublishPostAction,
  createPostAction,
  deletePostAction,
  editPostAction,
  publishPostAction,
} from "@/app/actions/posts";
import Link from "next/link";
import TitleInput from "./components/TitleInput";
import ImageInput from "./components/ImageInput";
import TagsInput from "./components/TagsInput";
import SelectedCategoryInput from "./components/SelectedCategoryInput";
import ContentFieldset from "./components/ContentFieldset";
import SavePostBtn from "./components/SavePostBtn";
import PublishDraftBtn from "./components/PublishDraftBtn";
import DeletePostBtn from "./components/DeletePostBtn";
import type { Post } from "@/app/lib/types/posts";
import type { Tag } from "@/app/lib/types/tags";
import "./style.css";

type PostFormProps =
  | {
      post: Post;
      postTags: Tag[];
      authorId: string;
    }
  | {
      post?: undefined;
      postTags?: undefined;
      authorId: string;
    };

export default function PostForm({ post, postTags, authorId }: PostFormProps) {
  const [errors, mainAction] = useFormState(post ? editPostAction : createPostAction, null);

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
        title={post?.title || ""}
        error={errors?.title}
      />

      <ImageInput
        imageSrc={post?.image || ""}
        error={errors?.image}
      />

      <TagsInput
        tags={postTags || []}
        error={errors?.tags}
      />

      <SelectedCategoryInput category={post?.category || "general"} />

      <ContentFieldset
        content={post?.content || ""}
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
  );
}
