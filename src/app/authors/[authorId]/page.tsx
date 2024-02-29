import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchUser } from "@/db/users";
import { format } from "date-fns/format";
import prisma from "@/db/db";
import type { Post } from "@prisma/client";
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
  const publishedPosts = author.posts && author.posts.filter((post) => post.published);

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

      {publishedPosts && publishedPosts.length > 0 && (
        <article>
          <h2 className="articles-header">Articles written:</h2>

          <ul className="author-articles-list">
            {publishedPosts.map((post, index) => (
              <AuthorsArticlesListCard
                key={post.id}
                post={post}
                priority={index < 3}
              />
            ))}
          </ul>
        </article>
      )}
    </main>
  );
}

async function AuthorsArticlesListCard({ post, priority }: { post: Post; priority: boolean }) {
  const articlePublishedDate = new Date(post.publishedAt!);

  return (
    <li>
      <section>
        <Link href={`/posts/${post.id}`}>
          <div className="article-image-wrapper card-image-placeholder">
            <Image
              src={post.image}
              width={400}
              height={200}
              alt={`${post.title} image`}
              className="card-image"
              priority={priority}
            />
          </div>

          <div className="article-content-wrapper">
            <h3 className="article-header">{post.title}</h3>
            <p className="card-subheader">{post.firstWords}</p>

            <div className="article-inner-content-wrapper">
              <time
                dateTime={articlePublishedDate.toLocaleDateString()}
                className="card-details-time"
              >
                {format(articlePublishedDate, "d MMM yyyy")}
              </time>
              <p
                title="Category"
                className="article-category-badge"
              >
                {post.category}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </li>
  );
}
