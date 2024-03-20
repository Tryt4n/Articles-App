import React from "react";
import Card from "../Card/Card";
import type { CardPost } from "@/types/posts";
import "./style.css";

export default function AuthorCardsList({
  posts,
  isAuthor = false,
}: {
  posts: CardPost[];
  isAuthor?: boolean;
}) {
  return (
    <ul className="author-articles-list">
      {posts.map((post, index) => (
        <Card
          key={post.id}
          post={post}
          priority={index < 3}
          appearance="with-author-info"
          editAccess={isAuthor}
        />
      ))}
    </ul>
  );
}
