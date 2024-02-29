import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns/format";
import type { Post } from "@/types/posts";
import "./style.css";

export async function AuthorsArticlesListCard({
  post,
  priority,
}: {
  post: Post;
  priority: boolean;
}) {
  const articlePublishedDate = new Date(post.publishedAt!);

  return (
    <li className="author-article-card">
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
