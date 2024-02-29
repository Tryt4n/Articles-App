import React from "react";
import Image from "next/image";
import prisma from "@/db/db";
import { fetchUser } from "@/db/users";
import AuthorArticlesList from "@/app/_components/AuthorArticlesList/AuthorArticlesList";
import type { Metadata } from "next";
import "./authorPage.css";

export async function generateMetadata({
  params,
}: {
  params: { authorId: string };
}): Promise<Metadata> {
  const authorName = await prisma.user.findUnique({
    where: { id: params.authorId },
    select: {
      name: true,
    },
  });

  return { title: authorName?.name };
}

export default async function AuthorPage({ params }: { params: { authorId: string } }) {
  const author = await fetchUser({ id: params.authorId });

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

          <AuthorArticlesList posts={author.posts} />
        </article>
      )}
    </main>
  );
}
