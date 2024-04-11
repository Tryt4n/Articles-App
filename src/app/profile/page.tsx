import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { fetchProfileInformations } from "@/db/profileInformations";
import { format } from "date-fns/format";
import Link from "next/link";
import EditProfileBtn from "./components/EditProfileBtn";
import AuthorCardsList from "../components/AuthorCardsList/AuthorCardsList";
import Card from "../components/Card/Card";
import AuthorCard from "../authors/components/AuthorCard";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userProfileInformations =
    session?.user &&
    session.user.followings &&
    (await fetchProfileInformations(session.user.id, session.user.followings));

  const formatDate = (date: Date) => format(date, "H:mm, dd.MM.yyyy");

  return (
    <>
      {userProfileInformations && (
        <>
          <article>
            <h2 className="profile-subheader">Your profile informations</h2>
            <EditProfileBtn name={userProfileInformations.user.name} />
            {session.user.name !== null && (
              <EditProfileBtn email={userProfileInformations.user.email} />
            )}

            {(session.user.role === "admin" || session.user.role === "moderator") &&
              session.user.id === userProfileInformations.user.id &&
              userProfileInformations.user.posts &&
              userProfileInformations.user.posts.length > 0 &&
              userProfileInformations.user.posts.some((post) => post.likes?.length !== 0) && (
                <p>
                  Total received likes for posts:&nbsp;
                  <strong>
                    {userProfileInformations.user.posts.reduce(
                      (totalLikes, post) => totalLikes + (post.likes?.length || 0),
                      0
                    )}
                  </strong>
                </p>
              )}

            {userProfileInformations.user.comments &&
              userProfileInformations.user.comments.length > 0 && (
                <p>
                  Total received likes for comments:&nbsp;
                  <strong>
                    {userProfileInformations.user.comments.reduce(
                      (totalLikes, comment) => totalLikes + (comment.likes?.length || 0),
                      0
                    )}
                  </strong>
                </p>
              )}
          </article>

          <article>
            <h2 className="profile-subheader">Your activity</h2>
            {userProfileInformations.savedPosts &&
              userProfileInformations.savedPosts.length > 0 && (
                <section>
                  <h3>Saved posts:</h3>
                  <AuthorCardsList posts={userProfileInformations.savedPosts} />
                </section>
              )}

            {userProfileInformations.user.comments &&
              userProfileInformations.user.comments.length > 0 && (
                <section>
                  <h3 className="profile-subheader">Your Comments</h3>
                  <ul>
                    {userProfileInformations.user.comments.map((comment) => {
                      const formattedCommentDate = formatDate(comment.createdAt);
                      const formattedUpdatedCommentDate = formatDate(comment.updatedAt);

                      const isUpdated = formattedCommentDate !== formattedUpdatedCommentDate;
                      const displayDate = isUpdated
                        ? formattedUpdatedCommentDate
                        : formattedCommentDate;
                      const displayText = isUpdated ? "Updated at: " : "Created at: ";

                      return (
                        <React.Fragment key={comment.id}>
                          <li>
                            <p aria-label="Comment content">
                              <strong>{comment.content}</strong>
                            </p>
                            {comment.likes && comment.likes.length > 0 && (
                              <p aria-label="Received likes for the comments">
                                Likes: <strong>{comment.likes.length}</strong>
                              </p>
                            )}
                            <time dateTime={displayDate}>
                              {displayText} {displayDate}
                            </time>
                            <Link
                              href={`/post/${comment.postId}#${comment.id}`}
                              className="btn"
                            >
                              Click to see
                            </Link>
                          </li>
                          <hr />
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </section>
              )}

            {(userProfileInformations.likedPosts || userProfileInformations.likedComments) && (
              <section>
                <h3 className="profile-subheader">Your given likes</h3>

                {userProfileInformations.likedPosts &&
                  userProfileInformations.likedPosts.length > 0 && (
                    <section>
                      <h4>For posts:</h4>

                      <ul>
                        {userProfileInformations.likedPosts.map((post) => (
                          <React.Fragment key={post.post.id}>
                            <Card
                              post={post.post}
                              headingLevel={5}
                            >
                              <p>{`Liked at: ${formatDate(post.likedAt)}`}</p>
                            </Card>
                          </React.Fragment>
                        ))}
                      </ul>
                    </section>
                  )}

                {userProfileInformations.likedComments &&
                  userProfileInformations.likedComments.length > 0 && (
                    <section>
                      <h4>For comments:</h4>

                      <ul>
                        {userProfileInformations.likedComments.map(({ comment, likedAt }) => {
                          const formattedLikedDate = formatDate(likedAt);

                          return (
                            <React.Fragment key={comment.id}>
                              <li>
                                <p aria-label="Comment content">
                                  <strong>{comment.content}</strong>
                                </p>
                                <time
                                  dateTime={formattedLikedDate}
                                >{`Liked at: ${formattedLikedDate}`}</time>
                                <Link
                                  href={`/post/${comment.postId}#${comment.id}`}
                                  className="btn"
                                >
                                  Click to see
                                </Link>
                              </li>
                              <hr />
                              <br />
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </section>
                  )}
              </section>
            )}
          </article>

          {userProfileInformations.followedAuthors &&
            userProfileInformations.followedAuthors.length > 0 && (
              <article>
                <h2 className="profile-subheader">Followed Authors:</h2>

                <ul>
                  {userProfileInformations.followedAuthors.map((author) => (
                    <AuthorCard
                      key={author.id}
                      author={author}
                    />
                  ))}
                </ul>
              </article>
            )}
        </>
      )}
    </>
  );
}
