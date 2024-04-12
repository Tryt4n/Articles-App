import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { fetchProfileInformations } from "@/db/profileInformations";
import EditProfileBtn from "./components/EditProfileBtn";
import AuthorCardsList from "../components/AuthorCardsList/AuthorCardsList";
import AuthorCard from "../authors/components/AuthorCard";
import ProfileActivityComments from "./components/ProfileActivityComments/ProfileActivityComments";
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

            <hr />

            {userProfileInformations.user.comments &&
              userProfileInformations.user.comments.length > 0 && (
                <section>
                  <h3>Your Comments:</h3>

                  <ProfileActivityComments comments={userProfileInformations.user.comments} />
                </section>
              )}

            <hr />

            {(userProfileInformations.likedPosts || userProfileInformations.likedComments) && (
              <section>
                <h3 className="profile-subheader">Your given likes</h3>

                {userProfileInformations.likedPosts &&
                  userProfileInformations.likedPosts.length > 0 && (
                    <section>
                      <h4>For posts:</h4>

                      <AuthorCardsList
                        posts={userProfileInformations.likedPosts.map((post) => post.post)}
                      />
                    </section>
                  )}

                {userProfileInformations.likedComments &&
                  userProfileInformations.likedComments.length > 0 && (
                    <section>
                      <h4>For comments:</h4>

                      <ProfileActivityComments
                        comments={userProfileInformations.likedComments.map(
                          (likedComment) => likedComment.comment
                        )}
                        displayedDate="likeDate"
                      />
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
