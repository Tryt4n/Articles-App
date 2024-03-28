import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { fetchPost } from "@/db/posts";
import CommentsContextProvider from "../context/CommentsContext";
import Post from "@/app/components/Post/Post";
import PostComments from "@/app/post/[postId]/components/PostComments/PostComments";
import NewPostCommentForm from "./components/NewPostCommentForm/NewPostCommentForm";
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
  const session = await getServerSession(authOptions);

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

        {session?.user && (
          <NewPostCommentForm
            postId={post.id}
            user={session.user.id}
          />
        )}

        {children}
      </Post>
    </CommentsContextProvider>
  );
}
