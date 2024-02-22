import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { User } from "next-auth";

export default function AuthorCard({ author }: { author: User }) {
  return (
    <li>
      <section className="author-container">
        <Link href={`/authors/${author.id}`}>
          <div className="author-img-wrapper card-image-placeholder">
            <Image
              src={author.image || ""}
              alt={`${author.name} profile picture`}
              priority
              width={60}
              height={60}
            />
          </div>
          <h3>{author.name}</h3>
        </Link>

        <address>
          <span>email: </span>
          <a href={`mailto:${author.email}`}>{author.email}</a>
        </address>
      </section>
    </li>
  );
}
