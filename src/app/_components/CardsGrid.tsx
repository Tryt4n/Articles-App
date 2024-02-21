import React, { Suspense } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import type { Post } from "@prisma/client";
import type { SearchProps } from "../page";

export default async function CardsGrid({
  posts,
  searchParams,
}: {
  posts: Post[];
  searchParams: SearchProps["searchParams"];
}) {
  return (
    <>
      {posts && posts.length === 0 ? (
        <div className="not-found-text">
          <strong>No posts found</strong>
        </div>
      ) : (
        <ul className="cards-list">
          <Suspense fallback={<SkeletonCards />}>
            {(posts as Post[]).map((post, index) => (
              <Card
                key={post.id}
                post={post}
                priority={index <= 4 ? true : false}
                searchParams={searchParams}
              />
            ))}
          </Suspense>
        </ul>
      )}
    </>
  );
}

function SkeletonCards() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
