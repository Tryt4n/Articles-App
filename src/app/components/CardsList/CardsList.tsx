import React, { Suspense } from "react";
import { fetchPostsBySearchParams } from "@/db/posts";
import Card from "../Card/Card";
import CardSkeleton from "../Card/components/CardSkeleton";
import type { SearchProps } from "../../page";
import "./style.css";

export default async function CardsList({
  searchParams,
}: {
  searchParams: SearchProps["searchParams"];
}) {
  const posts = await fetchPostsBySearchParams({ searchParams });

  return (
    <>
      {posts && posts.length === 0 ? (
        <div className="cards-grid-not-found-text">
          <strong>No posts found</strong>
        </div>
      ) : (
        <ul className="cards-grid">
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
