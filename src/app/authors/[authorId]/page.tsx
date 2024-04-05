import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import Image from "next/image";
import AuthorCardsList from "@/app/components/AuthorCardsList/AuthorCardsList";
import FollowAuthorBtn from "@/app/components/FollowAuthorBtn/FollowAuthorBtn";
import type { Metadata } from "next";
import "./style.css";
import type { User } from "@/types/users";

export async function generateMetadata({
  params,
}: {
  params: { authorId: User["id"] };
}): Promise<Metadata> {
  const author = await fetchUser({ id: params.authorId });

  return { title: author.name };
}

export default async function AuthorPage({ params }: { params: { authorId: User["id"] } }) {
  const author = await fetchUser({ id: params.authorId });
  const session = await getServerSession(authOptions);

  const authorPublishedPosts = author.posts?.filter((post) => post.published);

  return (
    <main className="author-page">
      <div className="author-avatar-wrapper">
        <h1>{author?.name}</h1>
        <Image
          src={author?.image || ""}
          alt={`${author?.name} avatar`}
          width={60}
          height={60}
          priority
        />
      </div>
      <div className="author-contact-mail-wrapper">
        <span>Author contact email:</span>
        &nbsp;
        <a href={`mailto:${author?.email}`}>{author?.email}</a>
      </div>

      {session?.user && session.user.id !== params.authorId && (
        <FollowAuthorBtn
          userId={session.user.id}
          authorId={author.id}
          alreadyFollowed={
            session.user.followings &&
            session.user.followings.length > 0 &&
            session.user.followings.includes(author.id)
              ? true
              : false
          }
          className="author-page-follow-btn"
        />
      )}

      {authorPublishedPosts && authorPublishedPosts.length > 0 && (
        <article>
          <h2 className="articles-header">Articles written:</h2>

          <AuthorCardsList
            posts={authorPublishedPosts}
            isAuthor={author.id === session?.user.id}
          />
        </article>
      )}
    </main>
  );
}
