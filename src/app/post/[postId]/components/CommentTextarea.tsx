"use client";

import React from "react";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

export default function CommentTextarea({ ...props }: TextareaAutosizeProps) {
  return <TextareaAutosize {...props} />;
}
