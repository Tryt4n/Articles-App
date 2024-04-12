import React from "react";
import Link from "next/link";
import Time from "@/app/components/Time/Time";
import type { Comment } from "@/app/lib/types/comments";
import "./style.css";

type ProfileActivityCommentsProps =
  | {
      displayedDate?: "commentDate";
      comments: Comment[];
    }
  | {
      displayedDate: "likeDate";
      comments: (Comment & { likedAt: Date })[];
    };

export default function ProfileActivityComments({
  comments,
  displayedDate = "commentDate",
}: ProfileActivityCommentsProps) {
  return (
    <ul className="profile-comments-list">
      {comments.map((comment) => {
        let commentDate: Date | undefined;
        let displayText = "";

        const isUpdated = JSON.stringify(comment.createdAt) !== JSON.stringify(comment.updatedAt);

        if (displayedDate === "commentDate") {
          commentDate = isUpdated ? comment.updatedAt : comment.updatedAt;
          displayText = isUpdated ? "Updated at: " : "Created at: ";
        } else if (displayedDate === "likeDate" && "likedAt" in comment) {
          commentDate = comment.likedAt;
          displayText = "Liked at: ";
        }

        return (
          <li
            key={comment.id}
            className="profile-comment"
          >
            <section className="profile-comment-content">
              <h4>Content:</h4>
              <p>{comment.content}</p>
            </section>

            <div className="profile-comment-inner-wrapper">
              <Link
                href={`/post/${comment.postId}#${comment.id}`}
                className="btn"
              >
                Click to see
              </Link>

              {comment.likes && comment.likes.length > 0 && (
                <aside>
                  <p aria-label="Received likes for this comment">
                    Received likes: <strong>{comment.likes.length}</strong>
                  </p>
                </aside>
              )}

              {commentDate && (
                <Time
                  time={commentDate}
                  timeFormat="H:mm, dd.MM.yyyy"
                >
                  {displayText}
                </Time>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
