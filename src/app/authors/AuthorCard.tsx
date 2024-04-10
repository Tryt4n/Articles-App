import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Link from "next/link";
import FollowAuthorBtn from "../components/FollowAuthorBtn/FollowAuthorBtn";
import type { User } from "@/app/lib/types/users";

export default async function AuthorCard({ author }: { author: User }) {
  const session = await getServerSession(authOptions);

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

        {session?.user && session.user.id !== author.id && (
          <FollowAuthorBtn
            userId={session.user.id}
            authorId={author.id}
            alreadyFollowed={
              session.user.followings &&
              session.user.followings.length > 0 &&
              session.user.followings.includes(author.id)
                ? true
                : false
            }
          />
        )}

        <address>
          <span>email: </span>
          <a href={`mailto:${author.email}`}>{author.email}</a>
        </address>
      </section>
    </li>
  );
}
