import React from "react";
import Image from "next/image";
import MarkdownPreview from "@/app/components/MarkdownPreview/MarkdownPreview";
import type { Post } from "@/types/posts";
import type { PostTags } from "@/types/tags";
import "./style.css";

export type PostProps = {
  title: Post["title"];
  imageSrc: Post["image"];
  tags: PostTags;
  category: Post["category"];
  content: string;
};

export default function Post({ title, imageSrc, tags, category, content }: PostProps) {
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
    <main className="post-preview">
      <h1 className="post-preview-heading">{title}</h1>

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

      <MarkdownPreview
        markdownText={content}
        disallowedElements={["h1"]}
      />
    </main>
  );
}
