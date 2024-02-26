import React from "react";
import Link from "next/link";
import { fetchUser } from "@/db/users";
import { format } from "date-fns/format";
import type { User } from "@/types/users";

export default function UserData({ user, children }: { user: User; children: React.ReactNode }) {
  const formatDate = (date: Date) => format(date, "H:mm, dd.MM.yyyy");

  return (
    <>
      {user && (
        <>
          <section>
            <h2>Your profile informations</h2>
            {children}

            {user.receivedLikes && user.receivedLikes.length > 0 && (
              <div>
                <p>Likes: {user.receivedLikes.length}</p>
              </div>
            )}
          </section>

          {user.comments && user.comments.length > 0 && (
            <section>
              <h2>Your activity</h2>
              <ul>
                {user.comments.map((comment) => {
                  const formattedCommentDate = formatDate(comment.createdAt);
                  const formattedUpdatedCommentDate = formatDate(comment.updatedAt);

                  const isUpdated = formattedCommentDate !== formattedUpdatedCommentDate;
                  const displayDate = isUpdated
                    ? formattedUpdatedCommentDate
                    : formattedCommentDate;
                  const displayText = isUpdated ? "Updated at: " : "Created at: ";

                  return (
                    <li key={comment.id}>
                      <p>{comment.content}</p>
                      <time dateTime={displayDate}>
                        {displayText} {displayDate}
                      </time>
                      <Link href={`/posts/${comment.postId}#${comment.id}`}>Click to see</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {user.followings && user.followings.length > 0 && (
            <section>
              <h2>My Followings</h2>
              <ul>
                {user.followings.map(async (follow) => {
                  const followedUser = await fetchUser({ id: follow.followingUserId });
                  const formattedDate = formatDate(follow.createdAt);

                  return (
                    <li key={follow.id}>
                      <Link href={`/authors/${followedUser.id}`}>{followedUser.name}</Link>
                      <time dateTime={formattedDate}>Followed at: {formattedDate}</time>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
}
