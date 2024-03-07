import React from "react";
import Image from "next/image";
import { fetchUser } from "@/db/users";
import AuthorCardsList from "@/app/components/AuthorCardsList/AuthorCardsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import type { Metadata } from "next";
import "./authorPage.css";

export async function generateMetadata({
  params,
}: {
  params: { authorId: string };
}): Promise<Metadata> {
  const author = await fetchUser({ id: params.authorId });

  return { title: author.name };
}

export default async function AuthorPage({ params }: { params: { authorId: string } }) {
  const author = await fetchUser({ id: params.authorId });
  const session = await getServerSession(authOptions);

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

      {author.posts && author.posts.length > 0 && (
        <article>
          <h2 className="articles-header">Articles written:</h2>

          <AuthorCardsList
            posts={author.posts}
            isAuthor={author.id === session?.user.id}
          />
        </article>
      )}
    </main>
  );
}
