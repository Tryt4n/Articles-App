import React from "react";
import Link from "next/link";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AuthorArticlesList from "../components/AuthorArticlesList/AuthorArticlesList";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Your Posts",
};

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <main>
      <h1>Your Posts</h1>

      <Link
        href="/drafts/new"
        className="btn"
      >
        Create new post
      </Link>

      {user && user.posts && user.posts.length > 0 && (
        <>
          {user.posts.some((post) => !post.published) && (
            <article>
              <h2>Your Drafts</h2>
              <AuthorArticlesList posts={user.posts.filter((post) => !post.published)} />
            </article>
          )}

          {user.posts.some((post) => post.published) && (
            <article>
              <h2>Your Published Posts</h2>
              <AuthorArticlesList posts={user.posts.filter((post) => post.published)} />
            </article>
          )}
        </>
      )}
    </main>
  );
}
