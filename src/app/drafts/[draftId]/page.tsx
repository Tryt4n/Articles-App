import React from "react";
import { fetchPost, fetchPostTags } from "@/db/posts";
import { format } from "date-fns/format";
import PostForm from "../components/PostForm/PostForm";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { draftId: string };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.draftId });

  return { title: post.title };
}

export default async function DraftPage({ params }: { params: { draftId: string } }) {
  const post = await fetchPost({ id: params.draftId });
  const postTags = await fetchPostTags({ postId: post.id });

  return (
    <>
      {post && (
        <main>
          <h1>{post.title}</h1>

          <time dateTime={post.createdAt.toString()}>
            Post created at: {format(post.createdAt, "H:mm, dd.MM.yyyy")}
          </time>

          <PostForm
            post={post}
            postTags={postTags}
          />
        </main>
      )}
    </>
  );
}
