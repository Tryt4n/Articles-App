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

  return { title: `Edit - ${post.title}` };
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
      <h1 aria-label="Post title">{post.title}</h1>

      <div>
        <time dateTime={post.createdAt.toString()}>
          Post created at: {format(post.createdAt, "H:mm, dd.MM.yyyy")}
        </time>

        {post.publishedAt && (
          <time dateTime={post.publishedAt.toString()}>
            Post published at: {format(post.publishedAt, "H:mm, dd.MM.yyyy")}
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
