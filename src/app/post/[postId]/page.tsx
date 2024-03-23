import React from "react";
import { redirect } from "next/navigation";
import { fetchPost } from "@/db/posts";
import CommentsContextProvider from "../context/CommentsContext";
import Post from "@/app/components/Post/Post";
import PostComments from "@/app/post/[postId]/components/PostComments/PostComments";
import CommentForm from "./components/CommentForm";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.postId });

  return { title: post.title };
}

export default async function PostPage({
  params,
  children,
}: {
  params: { postId: string };
  children: React.ReactNode;
}) {
  const post = await fetchPost({ id: params.postId });

  if (!post || !post.id) redirect("/");

  return (
    <CommentsContextProvider>
      <Post
        title={post.title}
        category={post.category}
        image={post.image}
        tags={post.tags}
        content={post.content}
      >
        <PostComments comments={post.comments} />

        <CommentForm postId={post.id} />

        {children}
      </Post>
    </CommentsContextProvider>
  );
}
