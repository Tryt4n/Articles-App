import React from "react";
import MarkdownPreview from "../MarkdownPreview/MarkdownPreview";
import Image from "next/image";
import type { Post } from "@/types/posts";
import type { PostTags } from "@/types/tags";
import "./style.css";

type PostPreviewProps = {
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

  return (
    <section className="markdown-preview">
      <h2 className="markdown-preview-heading">Post Preview:</h2>

      <h3>{title}</h3>

      <div className="card-image-placeholder">
        <Image
          src={isValidUrl(imageSrc) ? imageSrc : "/placeholder-image.png"}
          alt="Post Image"
          width={400}
          height={200}
          priority
        />
      </div>

      {tags.length > 0 && (
        <ul>
          {tags.map((tag) => {
            const cleanedTag = tag.name[0] === "#" ? tag.name.slice(1) : tag.name;
            return <li key={tag.id}>{`#${cleanedTag.replace(/#/g, "")}`}</li>;
          })}
        </ul>
      )}

      <strong>Category: {category}</strong>

      <MarkdownPreview markdownText={markdownText} />
    </section>
  );
}
