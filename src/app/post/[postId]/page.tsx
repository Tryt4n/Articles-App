import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { fetchPost } from "@/db/posts";
import CommentsContextProvider from "./context/CommentsContext";
import Post from "@/app/components/Post/Post";
import PostComments from "@/app/post/[postId]/components/PostComments/PostComments";
import CommentForm from "./components/CommentForm/CommentForm";
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
          <CommentForm
            status="new"
            key={post.comments.length} // This is a hack to force the form to re-render and clear the textarea.
          >
            <input
              type="hidden"
              name="post-id"
              value={post.id}
            />

            <input
              type="hidden"
              name="author-id"
              value={session.user.id}
            />
          </CommentForm>
        )}
        {children}
      </Post>
    </CommentsContextProvider>
  );
}
