"use client";

import React, { useState } from "react";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";
import useComments from "../../hooks/useComments";

type CommentTextareaProps = { children?: React.ReactNode } & TextareaAutosizeProps;

export default function CommentTextarea({ children, ...props }: CommentTextareaProps) {
  const { currentComment, formCommentStatus } = useComments();

  const [comment, setComment] = useState(
    currentComment?.content && formCommentStatus === "edit" ? currentComment.content : ""
  );

  return (
    <TextareaAutosize
      {...props}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
  );
}
