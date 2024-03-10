import React from "react";
import Post, { type PostProps } from "@/app/components/Post/Post";
import "./style.css";

type PostPreviewProps = {
  postData: PostProps;
};

export default function PostPreview({ postData }: PostPreviewProps) {
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
