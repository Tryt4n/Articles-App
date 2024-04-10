import React from "react";
import PostComment from "../PostComment/PostComment";
import type { Comment } from "@/app/lib/types/comments";
import "./style.css";

export default async function PostComments({ comments = [] }: { comments: Comment[] }) {
  return (
    <>
      <section className="post-comments">
        <h2>Comments:</h2>

        {comments.length > 0 ? (
          <ul className="post-comments-list">
            {comments.map((comment) => (
              <PostComment
                key={comment.id}
                comment={comment}
              />
            ))}
          </ul>
        ) : (
          <p className="post-comments-empty">
            <strong>This post has no comments yet.</strong>
          </p>
        )}
      </section>
    </>
  );
}
