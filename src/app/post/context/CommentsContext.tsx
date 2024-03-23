"use client";

import { createContext, useRef, useState } from "react";
import type { Comment } from "@/types/comments";
import type { User } from "@/types/users";

type CommentsContextType = {
  commentReply: CommentReply | null;
  setCommentReply: React.Dispatch<React.SetStateAction<CommentReply | null>>;
  commentRef: React.RefObject<HTMLTextAreaElement>;
};

export type CommentReply = {
  repliedCommentId: Comment["id"];
  replyAuthor: {
    id: User["id"];
    name: User["name"];
  };
  //!
  originalComment?: Comment["content"];
  //!
};

export const CommentsContext = createContext<CommentsContextType | null>(null);

export default function CommentsContextProvider({ children }: { children: React.ReactNode }) {
  const [commentReply, setCommentReply] = useState<CommentReply | null>(null);
  const commentTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const contextValues = {
    commentReply,
    setCommentReply,
    commentRef: commentTextAreaRef,
  };

  return <CommentsContext.Provider value={contextValues}>{children}</CommentsContext.Provider>;
}
