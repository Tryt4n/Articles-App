import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import { format } from "date-fns/format";
import Link from "next/link";
import EditProfileBtn from "./components/EditProfileBtn";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  const formatDate = (date: Date) => format(date, "H:mm, dd.MM.yyyy");

  return (
    <>
      {user && (
        <>
          <section>
            <h2 className="profile-subheader">Your profile informations</h2>
            <EditProfileBtn name={user.name} />
            {session.user.name !== null && <EditProfileBtn email={user.email} />}

            {session.user.role !== "user" &&
              session.user.id === user.id &&
              user.posts &&
              user.posts?.length > 0 &&
              user?.posts?.some((post) => post.likes.length !== 0) && (
                <p>
                  <strong>
                    Received likes for posts: &nbsp;
                    <span>
                      {user.posts.reduce((totalLikes, post) => totalLikes + post.likes.length, 0)}
                    </span>
                  </strong>
                </p>
              )}

            {user.receivedLikes && user.receivedLikes.length > 0 && (
              <p>
                <strong>Received likes for comments: </strong>
                {user.receivedLikes.length}
              </p>
            )}
          </section>

          {user.comments && user.comments.length > 0 && (
            <section>
              <h2 className="profile-subheader">Your activity</h2>
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
                      <Link href={`/post/${comment.postId}#${comment.id}`}>Click to see</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* {user.followings && user.followings.length > 0 && (
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
          )} */}
        </>
      )}
    </>
  );
}
