"use client";

import React, { useState } from "react";
import useComments from "../../../hooks/useComments";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

type CommentTextareaProps = { children?: React.ReactNode } & TextareaAutosizeProps;

export default function CommentTextarea({ children, ...props }: CommentTextareaProps) {
  const { currentComment, formCommentStatus, contentRef } = useComments();

  const [comment, setComment] = useState(
    currentComment?.content && formCommentStatus === "edit" ? currentComment.content : ""
  );

  return (
    <TextareaAutosize
      {...props}
      value={comment}
      ref={contentRef}
      onChange={(e) => setComment(e.target.value)}
    />
  );
}
