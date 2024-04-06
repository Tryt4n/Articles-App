import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { markSearchedPhrase } from "@/app/helpers/markSearchedPhrase";
import Link from "next/link";
import SavePostBtn from "../SavePostBtn/SavePostBtn";
import Image from "next/image";
import Tags from "./components/Tags";
import FirstWords from "./components/FirstWords";
import Time from "../Time/Time";
import type { SearchProps } from "@/app/page";
import type { CardPost } from "@/types/posts";
import type { CardAppearance } from "./types";
import "./style.css";

export default async function Card({
  post,
  priority,
  searchParams,
  appearance = "with-author-info",
  editAccess,
}: {
  post: CardPost;
  priority: boolean;
  searchParams?: SearchProps["searchParams"];
  appearance?: CardAppearance;
  editAccess?: boolean;
}) {
  const session = await getServerSession(authOptions);

  const LinkComponent = post.published ? "a" : "div";

  return (
    <li className="post-card">
      {editAccess ? (
        <Link
          href={`/drafts/${post.id}`}
          className="btn post-card-edit-btn"
        >
          Edit
        </Link>
      ) : (
        <>
          {session?.user && (
            <SavePostBtn
              authorId={session.user.id}
              postId={post.id}
              alreadySaved={
                session.user.savedPosts &&
                session.user.savedPosts.length > 0 &&
                session.user.savedPosts.includes(post.id)
                  ? true
                  : false
              }
              className="post-card-save-btn"
            />
          )}
        </>
      )}

      <section>
        <LinkComponent href={post.published ? `/post/${post.id}` : undefined}>
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
            <Tags
              tags={post.tags || []}
              searchedTag={
                searchParams && searchParams.filterBy === "tag" && searchParams.query !== ""
                  ? searchParams.query
                  : undefined
              }
            />

            <h3 className="post-card-header">
              {searchParams && searchParams.filterBy === "title" && searchParams.query !== ""
                ? markSearchedPhrase(post.title, searchParams.query)
                : post.title}
            </h3>

            <FirstWords content={post.content} />

            <div className="post-card-inner-content-wrapper">
              {appearance === "with-author-info" && post.author ? (
                <div className="post-card-details">
                  <Image
                    src={post.author.image || "/user-placeholder.svg"}
                    alt={`${post.author.name} avatar`}
                    width={40}
                    height={40}
                    className="post-card-avatar-image card-image-placeholder"
                  />
                  <div className="post-card-details-inner-wrapper">
                    <span title="Author">
                      {searchParams &&
                      searchParams.filterBy === "author" &&
                      searchParams.query !== ""
                        ? markSearchedPhrase(post.author.name, searchParams.query)
                        : post.author.name}
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
        </LinkComponent>
      </section>
    </li>
  );
}
