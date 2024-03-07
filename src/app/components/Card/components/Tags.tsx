import React from "react";
import { fetchPostTags } from "@/db/posts";

export default async function Tags({ postId }: { postId: string }) {
  const postTags = await fetchPostTags({ postId });

  return (
    <>
      {postTags && postTags.length > 0 && (
        <ul className="post-card-tags-wrapper">
          {postTags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
