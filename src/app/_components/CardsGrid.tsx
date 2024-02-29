import React, { Suspense } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import type { SearchProps } from "../page";
import { fetchPostsBySearchParams } from "@/db/posts";

export default async function CardsGrid({
  searchParams,
}: {
  searchParams: SearchProps["searchParams"];
}) {
  const posts = await fetchPostsBySearchParams({ searchParams });

  return (
    <>
      {posts && posts.length === 0 ? (
        <div className="not-found-text">
          <strong>No posts found</strong>
        </div>
      ) : (
        <ul className="cards-list">
          <Suspense fallback={<SkeletonCards />}>
            {posts.map((post, index) => (
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
