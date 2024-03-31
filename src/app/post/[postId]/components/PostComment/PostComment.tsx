import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Time from "../../../../components/Time/Time";
import NavigateToComment from "../NavigateToComment/NavigateToComment";
import CommentActionBtn from "../CommentActionBtn/CommentActionBtn";
import DeleteCommentBtn from "../DeleteCommentBtn/DeleteCommentBtn";
import LikeBtn from "../../../../components/LikeBtn/LikeBtn";
import CommentForm from "../CommentForm/CommentForm";
import type { Comment } from "@/types/comments";

export default function PostComment({ comment }: { comment: Comment }) {
  return (
    <Comment comment={comment}>
      {comment.replies && comment.replies.length > 0 && (
        <ul style={{ border: "3px solid #666", margin: "1em" }}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
            />
          ))}
        </ul>
      )}
    </Comment>
  );
}

async function Comment({ comment, children }: { comment: Comment; children?: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const user = comment.author.name === session?.user?.name ? "You" : comment.author.name;
  const userAvatar = comment.author.image;
  const imageAlt =
    comment.author.name === session?.user?.name ? "Your avatar." : `${user}'s avatar.`;

  return (
    <li
      key={comment.id}
      id={comment.id}
      style={{ backgroundColor: "#99999980", marginBlock: "2em" }}
    >
      <NavigateToComment commentId={comment.id} />

      <div>
        <div>
          <Image
            src={userAvatar}
            alt={imageAlt}
            width={50}
            height={50}
          />
          <strong title="Comment's author name">{user}</strong>
          <span className="visually-hidden">&apos;s comment</span>

          {comment.likes.length > 0 && (
            <span>
              <strong>Received likes:</strong>
              {comment.likes.length}
            </span>
          )}
        </div>

        <Time
          time={
            JSON.stringify(comment.createdAt) === JSON.stringify(comment.updatedAt)
              ? comment.createdAt
              : comment.updatedAt
          }
          timeFormat="HH:mm, d MMM yyyy"
        />
        {session?.user && (
          <LikeBtn
            commentId={comment.id}
            postId={comment.postId}
            userId={session.user.id}
            alreadyLiked={comment.likes.map((like) => like.userId).includes(session.user.id)}
          />
        )}
      </div>

      {session && comment.author.name !== session.user.name && comment.replyToId == null && (
        <CommentActionBtn
          status="reply"
          comment={comment}
        />
      )}

      {session && comment.author.name === session.user.name && (
        <>
          <DeleteCommentBtn
            postId={comment.postId}
            commentId={comment.id}
          />

          <CommentActionBtn
            status="edit"
            comment={comment}
          />
        </>
      )}

      <p>{comment.content}</p>

      {children}

      {session?.user && (
        <CommentForm
          status="reply"
          commentId={comment.id}
        >
          <input
            type="hidden"
            name="post-id"
            value={comment.postId}
          />
          <input
            type="hidden"
            name="author-id"
            value={session.user.id}
          />
        </CommentForm>
      )}

      {session && comment.author.name === session.user.name && (
        <CommentForm
          status="edit"
          commentId={comment.id}
        >
          <input
            type="hidden"
            name="post-id"
            value={comment.postId}
          />
        </CommentForm>
      )}
    </li>
  );
}
