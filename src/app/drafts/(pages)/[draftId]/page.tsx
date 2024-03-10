import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchPost, fetchPostTags } from "@/db/posts";
import PostForm from "../../components/PostForm/PostForm";
import Time from "@/app/components/Time/Time";
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
        <Time
          time={post.createdAt}
          timeFormat="H:mm, dd.MM.yyyy"
          className="post-inner-time-text"
        >
          Post created at:&nbsp;
        </Time>

        {post.publishedAt && (
          <Time
            time={post.publishedAt}
            timeFormat="H:mm, dd.MM.yyyy"
            className="post-inner-time-text"
          >
            Post published at:&nbsp;
          </Time>
        )}

        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <Time
            time={post.updatedAt}
            timeFormat="H:mm, dd.MM.yyyy"
            className="post-inner-time-text"
          >
            Last edit at:&nbsp;
          </Time>
        )}

        {!post.published && <strong>The post is not published yet.</strong>}
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
