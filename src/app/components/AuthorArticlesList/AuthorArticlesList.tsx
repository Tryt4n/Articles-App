import React from "react";
import { AuthorsArticlesListCard } from "../AuthorArticleCard/AuthorArticleCard";
import type { Post } from "@/types/posts";
import "./style.css";

export default function AuthorArticlesList({ posts }: { posts: Post[] }) {
  return (
    <ul className="author-articles-list">
      {posts.map((post, index) => (
        <AuthorsArticlesListCard
          key={post.id}
          post={post}
          priority={index < 3}
        />
      ))}
    </ul>
  );
}
