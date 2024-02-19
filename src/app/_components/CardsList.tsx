import React, { Suspense } from "react";
import Card from "./Card";
import { fetchAllPosts } from "@/db/users";
import type { Post } from "@/types/posts";
import CardSkeleton from "./CardSkeleton";

export default async function CardsList() {
  const posts = await fetchAllPosts();

  return (
    <>
      {posts && posts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        <Suspense fallback={<CardSkeleton />}>
          <ul className="cards-list">
            {(posts as Post[]).map((post) => {
              if (!post.published) return null;

              return (
                <Card
                  key={post.id}
                  post={post}
                />
              );
            })}
          </ul>
        </Suspense>
      )}
    </>
  );
}
