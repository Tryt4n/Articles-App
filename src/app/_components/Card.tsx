import React from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchUser } from "@/db/users";
import { format } from "date-fns/format";
import type { Post } from "@/types/posts";

export default async function Card({ post }: { post: Post }) {
  const author = await fetchUser({ id: post.authorId });

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
            />
          </div>

          <div className="card-content-wrapper">
            <h2 className="card-header">{post.title}</h2>
            <p className="card-subheader">{post.firstWords}</p>

            <div className="card-content-inner-wrapper">
              <div className="card-details">
                <Image
                  src={author?.avatar || ""}
                  alt={`${author?.name} avatar`}
                  width={40}
                  height={40}
                  className="card-avatar-image card-image-placeholder "
                />
                <div className="card-details-inner">
                  <span
                    title="Author"
                    itemProp="author"
                  >
                    {author?.name}
                  </span>
                  <time
                    dateTime={post.publishedAt!.toLocaleDateString()}
                    className="card-details-time"
                  >
                    {format(post.publishedAt!, "d MMM yyyy")}
                  </time>
                </div>
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
