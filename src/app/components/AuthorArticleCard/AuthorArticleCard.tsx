import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns/format";
import type { Post } from "@/types/posts";
import "./style.css";
import { fetchPostTags } from "@/db/posts";

export async function AuthorsArticlesListCard({
  post,
  priority,
  type,
}: {
  post: Post;
  priority: boolean;
  type?: "all" | "published" | "drafts";
}) {
  const articlePublishedDate = new Date(post.publishedAt!);

  const postTags = await fetchPostTags({ postId: post.id });

  return (
    <li className="author-article-card">
      <Link
        href={`drafts/${post.id}`}
        className="btn author-article-card-edit-btn"
      >
        Edit
      </Link>
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
            {postTags && postTags.length > 0 && (
              <ul>
                {postTags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            )}

            <h3 className="article-header">{post.title}</h3>
            <p className="card-subheader">{post.content.substring(0, 50)}</p>

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
