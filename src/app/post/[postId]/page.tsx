import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { fetchPost } from "@/db/posts";
import CommentsContextProvider from "./context/CommentsContext";
import Post from "@/app/components/Post/Post";
import PostLikes from "./components/PostLikes/PostLikes";
import PostComments from "@/app/post/[postId]/components/PostComments/PostComments";
import SavePostBtn from "@/app/components/SavePostBtn/SavePostBtn";
import CommentForm from "./components/CommentForm/CommentForm";
import type { Metadata } from "next/types";
import type { Post as PostType } from "@/app/lib/types/posts";

export async function generateMetadata({
  params,
}: {
  params: { postId: PostType["id"] };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.postId });

  return { title: post.title };
}

export default async function PostPage({
  params,
  children,
}: {
  params: { postId: PostType["id"] };
  children: never; // type `never` to fix build error
}) {
  const post = await fetchPost({ id: params.postId });
  const session = await getServerSession(authOptions);

  if (!post || !post.id || !post.published) redirect("/");

  return (
    <CommentsContextProvider>
      <Post
        title={post.title}
        category={post.category}
        image={post.image}
        tags={post.tags || []}
        content={post.content}
      >
        <PostLikes
          userId={session?.user.id}
          postId={post.id}
          alreadyLiked={
            session &&
            post.likes &&
            post.likes.length > 0 &&
            post.likes.map((like) => like.userId).includes(session.user.id)
              ? true
              : false
          }
          receivedLikes={post.likes?.length || 0}
          style={{ marginBlock: "1em" }}
          isCurrentUser={session?.user.id === post.authorId}
        />

        <PostComments comments={post.comments || []} />

        {session?.user && (
          <>
            <CommentForm
              status="new"
              key={post.comments?.length} // This is a hack to force the form to re-render and clear the textarea.
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

            <SavePostBtn
              authorId={session.user.id}
              postId={post.id}
              alreadySaved={
                session.user.savedPosts &&
                session.user.savedPosts.length > 0 &&
                session.user.savedPosts.includes(post.id)
                  ? true
                  : false
              }
            />
          </>
        )}

        {children}
      </Post>
    </CommentsContextProvider>
  );
}
