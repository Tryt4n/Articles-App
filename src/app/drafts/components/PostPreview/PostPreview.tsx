import React from "react";
import Image from "next/image";
import MarkdownPreview from "./components/MarkdownPreview/MarkdownPreview";
import type { Post } from "@/types/posts";
import type { PostTags } from "@/types/tags";
import "./style.css";

export type PostPreviewProps = {
  title: Post["title"];
  imageSrc: Post["image"];
  tags: PostTags;
  category: Post["category"];
  markdownText: string;
};

export default function PostPreview({
  title,
  imageSrc,
  tags,
  category,
  markdownText,
}: PostPreviewProps) {
  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const checkedImgSrc = isValidUrl(imageSrc);

  return (
    <pre className="post-preview">
      <h1 className="post-preview-inner-heading">{title}</h1>

      <div className="post-preview-description">
        {tags.length > 0 && (
          <ul className="post-preview-tags-list">
            {tags.map((tag) => {
              if (tag.name[0] !== "#" && tag.name.replace(/#/g, "") === "") return; // Skip empty tags

              const cleanedTag = tag.name[0] === "#" ? tag.name.slice(1) : tag.name;
              return <li key={tag.id}>{`#${cleanedTag.replace(/#/g, "")}`}</li>; // Remove any extra # characters
            })}
          </ul>
        )}
        <span
          title="Category"
          className="post-preview-category"
        >
          Category: {category}
        </span>
      </div>

      <div
        className="post-preview-image-wrapper card-image-placeholder"
        data-placeholder-text={
          checkedImgSrc
            ? undefined
            : "If the image path passed is correct, your image will be located here."
        }
      >
        <>
          {imageSrc && checkedImgSrc && (
            <Image
              className="post-preview-image"
              src={imageSrc}
              alt="Post Image"
              width={1168}
              height={400}
              priority
            />
          )}
        </>
      </div>

      <MarkdownPreview markdownText={markdownText} />
    </pre>
  );
}
