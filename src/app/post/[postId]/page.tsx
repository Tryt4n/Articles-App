import React from "react";
import { redirect } from "next/navigation";
import { fetchPost } from "@/db/posts";
import Post from "@/app/components/Post/Post";
import PostComments from "@/app/components/PostComments/PostComments";
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

  if (!post || !post.id) redirect("/");

  return (
    <Post
      title={post.title}
      category={post.category}
      image={post.image}
      tags={post.tags}
      content={post.content}
    >
      <PostComments comments={post.comments} />
    </Post>
  );
}
