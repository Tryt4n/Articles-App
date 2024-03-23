"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import useComments from "../../hooks/useComments";

export default function PostCommentBtn() {
  const { pending } = useFormStatus();
  const { commentReply } = useComments();

  return (
    <button
      type="submit"
      className="btn btn--accent"
    >
      {commentReply ? (pending ? "Replying" : "Reply") : pending ? "Commenting" : "Comment"}
    </button>
  );
}
