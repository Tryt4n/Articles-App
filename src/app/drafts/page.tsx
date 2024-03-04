import React from "react";
import Link from "next/link";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AuthorArticlesList from "../components/AuthorArticlesList/AuthorArticlesList";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Drafts",
};

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <main>
      <h1>Your Drafts</h1>

      <Link
        href="/drafts/new"
        className="btn"
      >
        Add new article
      </Link>

      {user?.posts && (
        <>
          <AuthorArticlesList
            posts={user.posts}
            type="drafts"
          />
        </>
      )}
    </main>
  );
}
