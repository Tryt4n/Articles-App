import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Time from "../../../../components/Time/Time";
import NavigateToComment from "../NavigateToComment/NavigateToComment";
import PostLikes from "../PostLikes/PostLikes";
import CommentActionBtn from "../CommentActionBtn/CommentActionBtn";
import DeleteCommentBtn from "../DeleteCommentBtn/DeleteCommentBtn";
import CommentForm from "../CommentForm/CommentForm";
import type { Comment } from "@/types/comments";
import "./style.css";

export default function PostComment({ comment }: { comment: Comment }) {
  return (
    <Comment comment={comment}>
      {comment.replies && comment.replies.length > 0 && (
        <section className="post-comment-replies-wrapper">
          <h3 className="post-comment-replies-heading">Replies:</h3>

          <ul className="post-comment-replies-list">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
              />
            ))}
          </ul>
        </section>
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
      className="post-comment"
    >
      <NavigateToComment commentId={comment.id} />

      <div className="post-comment-wrapper">
        <div className="post-comment-user-wrapper">
          <Image
            src={userAvatar}
            alt={imageAlt}
            width={50}
            height={50}
            className="post-comment-avatar"
          />
          <strong title="Comment's author name">{user}</strong>
          <span className="visually-hidden">&apos;s comment</span>
        </div>

        <div className="post-comment-btns-wrapper">
          {session?.user && (
            <PostLikes
              commentId={comment.id}
              postId={comment.postId}
              userId={session.user.id}
              alreadyLiked={comment.likes.map((like) => like.userId).includes(session.user.id)}
              receivedLikes={comment.likes.length}
              isCurrentUser={comment.author.name === session.user.name}
            />
          )}

          <div className="post-comment-btns-inner-wrapper">
            {session && comment.author.name !== session.user.name && comment.replyToId == null && (
              <CommentActionBtn
                status="reply"
                comment={comment}
                className="btn"
              />
            )}

            {session && comment.author.name === session.user.name && (
              <>
                <CommentActionBtn
                  status="edit"
                  comment={comment}
                  className="btn"
                />

                <DeleteCommentBtn
                  postId={comment.postId}
                  commentId={comment.id}
                  className="btn btn--accent"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <p className="post-comment-content">{comment.content}</p>

      <div className="post-comment-time">
        <Time
          time={
            JSON.stringify(comment.createdAt) === JSON.stringify(comment.updatedAt)
              ? comment.createdAt
              : comment.updatedAt
          }
          timeFormat="HH:mm, d MMM yyyy"
        >
          {`${
            JSON.stringify(comment.createdAt) === JSON.stringify(comment.updatedAt)
              ? "Created"
              : "Edited"
          } at: `}
        </Time>
      </div>

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
