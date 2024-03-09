import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchPost, fetchPostTags } from "@/db/posts";
import { format } from "date-fns/format";
import PostForm from "../../components/PostForm/PostForm";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { draftId: string };
}): Promise<Metadata> {
  const post = await fetchPost({ id: params.draftId });

  return { title: `Edit Post - ${post.title}` };
}

export default async function DraftPage({ params }: { params: { draftId: string } }) {
  const post = await fetchPost({ id: params.draftId });
  const postTags = await fetchPostTags({ postId: post.id });
  const session = await getServerSession(authOptions);

  if (session?.user.id !== post.authorId) {
    redirect("/drafts");
  }

  return (
    <>
      <h1 aria-label="Post title">Current Post: {post.title}</h1>

      <div className="post-times-container">
        <time dateTime={post.createdAt.toString()}>
          Post created at:&nbsp;
          <span className="post-inner-time-text">{format(post.createdAt, "H:mm, dd.MM.yyyy")}</span>
        </time>

        {post.publishedAt && (
          <time dateTime={post.publishedAt.toString()}>
            Post published at:&nbsp;
            <span className="post-inner-time-text">
              {format(post.publishedAt, "H:mm, dd.MM.yyyy")}
            </span>
          </time>
        )}

        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <time dateTime={post.updatedAt.toString()}>
            Last edit at:&nbsp;
            <span className="post-inner-time-text">
              {format(post.updatedAt, "H:mm, dd.MM.yyyy")}
            </span>
          </time>
        )}
      </div>

      {session?.user && (
        <PostForm
          key={params.draftId}
          post={post}
          postTags={postTags}
          authorId={session.user.id}
        />
      )}
    </>
  );
}
