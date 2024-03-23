import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Time from "../../../../components/Time/Time";
import ReplyBtn from "@/app/post/[postId]/components/ReplyBtn";
import type { Comment } from "@/types/comments";

export default async function PostComment({ comment }: { comment: Comment }) {
  const session = await getServerSession(authOptions);

  const user = comment.author.name === session?.user?.name ? "You" : comment.author.name;
  const userAvatar = comment.author.image;
  const imageAlt =
    comment.author.name === session?.user?.name ? "Your avatar." : `${user}'s avatar.`;

  return (
    <li key={comment.id}>
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

      <p>{comment.content}</p>
    </li>
  );
}
