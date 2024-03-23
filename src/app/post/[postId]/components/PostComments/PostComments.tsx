import React from "react";
import PostComment from "../PostComment/PostComment";
import type { Comment } from "@/types/comments";
import "./style.css";

export default async function PostComments({ comments = [] }: { comments: Comment[] }) {
  return (
    <>
      <section>
        <h2>Comments:</h2>

        {comments.length > 0 && (
          <ul>
            {comments.map((comment) => (
              <PostComment
                key={comment.id}
                comment={comment}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
