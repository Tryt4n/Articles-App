"use client";

import React from "react";
import usePost from "../../(pages)/hooks/usePost";
import Post from "@/app/components/Post/Post";
import "./style.css";

export default function PostPreview() {
  const { postData } = usePost();

  return (
    <article className="post-form-preview-container">
      <h2>Post Preview:</h2>

      <pre className="post-form-preview">
        <Post
          title={postData.title}
          imageSrc={postData.imageSrc}
          tags={postData.tags}
          category={postData.category}
          content={postData.content}
        />
      </pre>
    </article>
  );
}
