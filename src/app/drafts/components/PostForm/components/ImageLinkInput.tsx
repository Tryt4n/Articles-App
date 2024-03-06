import React from "react";
import type { Post } from "@/types/posts";

export default function ImageLinkInput({ link }: { link: Post["image"] }) {
  return (
    <div>
      <label htmlFor="post-image">Image Link:</label>
      <input
        type="url"
        id="post-image"
        name="post-image"
        required
        minLength={1}
        maxLength={100}
        defaultValue={link}
      />
    </div>
  );
}
