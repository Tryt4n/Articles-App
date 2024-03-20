import React from "react";
import Link from "next/link";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AuthorCardsList from "../components/AuthorCardsList/AuthorCardsList";
import type { Metadata } from "next/types";
import "./style.css";

export const metadata: Metadata = {
  title: "Your Posts",
};

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <main className="drafts">
      <h1 className="drafts-heading">Your Posts</h1>

      <Link
        href="/drafts/new"
        className="btn drafts-new-post-btn"
      >
        Create new post
      </Link>

      {user && user.posts && user.posts.length > 0 ? (
        <>
          {user.posts.some((post) => !post.published) && (
            <article>
              <h2 className="drafts-subheading">Drafts:</h2>
              <AuthorCardsList
                posts={user.posts.filter((post) => !post.published)}
                isAuthor
              />
            </article>
          )}

          {user.posts.some((post) => post.published) && (
            <article>
              <h2 className="drafts-subheading">Published Posts:</h2>
              <AuthorCardsList
                posts={user.posts.filter((post) => post.published)}
                isAuthor
              />
            </article>
          )}
        </>
      ) : (
        <strong className="drafts-no-posts-text">You haven&apos;t written any posts yet.</strong>
      )}
    </main>
  );
}
