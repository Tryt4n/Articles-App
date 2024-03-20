import React from "react";
import { fetchPost } from "@/db/posts";
import Post from "@/app/components/Post/Post";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.postId });

  return { title: post.title };
}

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await fetchPost({ id: params.postId });

  return (
    <Post
      title={post.title}
      category={post.category}
      imageSrc={post.image}
      tags={post.tags}
      content={post.content}
    />
  );
}
