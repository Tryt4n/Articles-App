"use client";

import React, { useEffect, useState } from "react";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";
import useComments from "../../hooks/useComments";

export default function CommentTextarea({ ...props }: TextareaAutosizeProps) {
  const { commentReply, commentRef } = useComments();

  const [comment, setComment] = useState(
    commentReply?.replyAuthor.name ? `@${commentReply?.replyAuthor.name} ` : ""
  );

  useEffect(() => {
    if (commentReply?.replyAuthor.name) {
      setComment(`@${commentReply.replyAuthor.name} `);
    } else {
      setComment("");
    }
  }, [commentReply?.replyAuthor.name]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value; // Get the new value from the textarea
    const replyPrefix = `@${commentReply?.replyAuthor.name} `; // Construct the reply prefix

    // If there is no commentReply?.replyAuthor.name, simply set the comment to the new value and return
    if (!commentReply?.replyAuthor.name) {
      setComment(newValue);
      return;
    }

    // If the new value starts with the reply prefix, set the comment to the new value and return
    if (newValue.startsWith(replyPrefix)) {
      setComment(newValue);
      return;
    }

    // If the user tried to delete part of the reply prefix or insert text within the reply prefix, ignore it and add the rest of the entered text to the reply prefix
    if (newValue.length < replyPrefix.length || newValue.length >= replyPrefix.length) {
      setComment(replyPrefix + comment.slice(replyPrefix.length));
      return;
    }

    // If the user added new text but removed the reply prefix, add it back
    setComment(replyPrefix + newValue);
  }

  return (
    <TextareaAutosize
      {...props}
      ref={commentRef}
      value={comment}
      onChange={handleChange}
    />
  );
}
