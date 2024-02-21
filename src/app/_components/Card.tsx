import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchUser } from "@/db/users";
import { format } from "date-fns/format";
import type { Post } from "@prisma/client";
import type { SearchProps } from "../page";

export default async function Card({
  post,
  priority,
  searchParams,
}: {
  post: Post;
  priority: boolean;
  searchParams: SearchProps["searchParams"];
}) {
  const author = await fetchUser({ id: post.authorId });

  const postPublishedDate = new Date(post.publishedAt!);

  function markSearchedPhrase(text: string) {
    return text
      .split(new RegExp(`(${searchParams.query})`, "gi"))
      .map((part, index) =>
        part.toLowerCase() === searchParams.query.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      );
  }

  return (
    <li className="card-container">
      <section>
        <Link href={`/posts/${post.id}`}>
          <div className="card-image-wrapper card-image-placeholder">
            <Image
              src={post.image}
              width={400}
              height={200}
              alt={`${post.title} image`}
              className="card-image"
              priority={priority}
            />
          </div>

          <div className="card-content-wrapper">
            <h2 className="card-header">
              {searchParams.filterBy === "title" && searchParams.query !== ""
                ? markSearchedPhrase(post.title)
                : post.title}
            </h2>
            <p className="card-subheader">{post.firstWords}</p>

            <div className="card-content-inner-wrapper">
              <div className="card-details">
                {author ? (
                  <>
                    <Image
                      src={author.avatar}
                      alt={`${author.name} avatar`}
                      width={40}
                      height={40}
                      className="card-avatar-image card-image-placeholder "
                    />
                    <div className="card-details-inner">
                      <span
                        title="Author"
                        itemProp="author"
                      >
                        {searchParams.filterBy === "author" && searchParams.query !== ""
                          ? //TODO Change delete `as` casting after reloading database
                            markSearchedPhrase(author.name as string)
                          : author!.name}
                      </span>
                      <time
                        dateTime={postPublishedDate.toLocaleDateString()}
                        className="card-details-time"
                      >
                        {format(postPublishedDate, "d MMM yyyy")}
                      </time>
                    </div>
                  </>
                ) : null}
              </div>

              <p
                title="Category"
                className="card-category-badge"
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
