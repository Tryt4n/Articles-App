import React from "react";
import { fetchPost } from "@/db/posts";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.postId });

  return { title: post.title };
}

export default async function page({ params }: { params: { postId: string } }) {
  const post = await fetchPost({ id: params.postId });
  return <h2>Post title: {post.title}</h2>;
}
