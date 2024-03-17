import React from "react";
import { fetchUser } from "@/db/users";
import Link from "next/link";
import Image from "next/image";
import Tags from "./components/Tags";
import FirstWords from "./components/FirstWords";
import Time from "../Time/Time";
import type { SearchProps } from "@/app/page";
import type { Post } from "@/types/posts";
import type { CardAppearance } from "./types";
import "./style.css";

export default async function Card({
  post,
  priority,
  searchParams,
  appearance = "with-author-info",
  editAccess,
}: {
  post: Post;
  priority: boolean;
  searchParams?: SearchProps["searchParams"];
  appearance?: CardAppearance;
  editAccess?: boolean;
}) {
  const author = await fetchUser({ id: post.authorId });

  function markSearchedPhrase(text: string) {
    if (!searchParams) return;

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
    <li className="post-card">
      {editAccess && (
        <Link
          href={`/drafts/${post.id}`}
          className="btn post-card-edit-btn"
        >
          Edit
        </Link>
      )}

      <section>
        <Link href={`/post/${post.id}`}>
          <div className="post-card-image-wrapper card-image-placeholder">
            <Image
              src={post.image}
              width={400}
              height={200}
              alt={`${post.title} image`}
              className="post-card-image"
              priority={priority}
            />
          </div>

          <div className="post-card-content-wrapper">
            <Tags postId={post.id} />

            <h3 className="post-card-header">
              {searchParams && searchParams.filterBy === "title" && searchParams.query !== ""
                ? markSearchedPhrase(post.title)
                : post.title}
            </h3>

            <FirstWords content={post.content} />

            <div className="post-card-inner-content-wrapper">
              {appearance === "with-author-info" ? (
                <div className="post-card-details">
                  <Image
                    src={author.image}
                    alt={`${author.name} avatar`}
                    width={40}
                    height={40}
                    className="post-card-avatar-image card-image-placeholder"
                  />
                  <div className="post-card-details-inner-wrapper">
                    <span title="Author">
                      {searchParams &&
                      searchParams.filterBy === "author" &&
                      searchParams.query !== ""
                        ? markSearchedPhrase(author.name)
                        : author.name}
                    </span>

                    {post.publishedAt && (
                      <Time
                        time={post.publishedAt}
                        className="post-card-details-time"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <Time
                  time={post.publishedAt!}
                  className="post-card-details-time"
                />
              )}

              <p
                title="Category"
                className="post-card-category-badge"
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
