"use client";

import React from "react";
import usePostForm from "../../hooks/usePostForm";
import Post from "@/app/components/Post/Post";
import "./style.css";

export default function PostPreview() {
  const { postData } = usePostForm();

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
