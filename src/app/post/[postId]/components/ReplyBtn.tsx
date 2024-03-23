"use client";

import React from "react";
import useComments from "../../hooks/useComments";
import type { CommentReply } from "../../context/CommentsContext";

type ReplyBtnProps = { reply: Omit<CommentReply, "originalComment"> };

export default function ReplyBtn({ reply }: ReplyBtnProps) {
  const { commentReply, setCommentReply, commentRef } = useComments();

  function replyToComment() {
    if (!commentRef.current) return;

    setCommentReply(reply);
    commentRef.current.focus();
  }

  return (
    <button
      type="button"
      disabled={commentReply?.repliedCommentId === reply.repliedCommentId}
      onClick={replyToComment}
    >
      {commentReply?.repliedCommentId === reply.repliedCommentId ? "Replying" : "Reply"}
    </button>
  );
}
