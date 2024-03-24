import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Time from "../../../../components/Time/Time";
import ReplyBtn from "@/app/post/[postId]/components/ReplyBtn";
import DeleteCommentBtn from "../DeleteCommentBtn/DeleteCommentBtn";
import type { Comment } from "@/types/comments";

export default function PostComment({ comment }: { comment: Comment }) {
  return (
    <Comment comment={comment}>
      {comment.replies && comment.replies.length > 0 && (
        <ul style={{ border: "3px solid #666", margin: "1em" }}>
          {comment.replies.map((reply) => (
            <li
              key={reply.id}
              style={{ borderBottom: "1px solid black" }}
            >
              <p>{reply.content}</p>
              <strong>{reply.author.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </Comment>
  );
}

async function Comment({ comment, children }: { comment: Comment; children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const user = comment.author.name === session?.user?.name ? "You" : comment.author.name;
  const userAvatar = comment.author.image;
  const imageAlt =
    comment.author.name === session?.user?.name ? "Your avatar." : `${user}'s avatar.`;

  return (
    <li
      key={comment.id}
      style={{ backgroundColor: "#99999980", marginBlock: "2em" }}
    >
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
        </div>

        <Time
          time={
            JSON.stringify(comment.createdAt) === JSON.stringify(comment.updatedAt)
              ? comment.createdAt
              : comment.updatedAt
          }
          timeFormat="HH:mm, d MMM yyyy"
        />
      </div>

      {session && comment.author.name !== session.user.name && (
        <ReplyBtn
          reply={{
            repliedCommentId: comment.id,
            replyAuthor: { id: comment.authorId, name: comment.author.name },
          }}
        />
      )}

      {session && comment.author.name === session.user.name && (
        <DeleteCommentBtn
          postId={comment.postId}
          commentId={comment.id}
        />
      )}

      <p>{comment.content}</p>

      {children}
    </li>
  );
}
