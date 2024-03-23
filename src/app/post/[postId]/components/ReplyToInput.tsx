"use client";

import React from "react";
import useComments from "../../hooks/useComments";

export default function ReplyToInput() {
  const { commentReply } = useComments();

  return (
    <>
      {commentReply && (
        <input
          type="hidden"
          name="reply-to"
          value={commentReply.repliedCommentId}
        />
      )}
    </>
  );
}
