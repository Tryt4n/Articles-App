import React from "react";
import { AuthorsArticlesListCard } from "../AuthorArticleCard/AuthorArticleCard";
import type { Post } from "@/types/posts";
import "./style.css";

export default function AuthorArticlesList({
  posts,
  type = "published",
}: {
  posts: Post[];
  type?: "all" | "published" | "drafts";
}) {
  let displayedPosts = posts;

  if (type === "published") {
    displayedPosts = posts.filter((post) => post.published);
  }

  if (type === "drafts") {
    displayedPosts = posts.filter((post) => !post.published);
  }

  return (
    <ul className="author-articles-list">
      {displayedPosts.map((post, index) => (
        <AuthorsArticlesListCard
          key={post.id}
          post={post}
          priority={index < 3}
        />
      ))}
    </ul>
  );
}
