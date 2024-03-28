"use client";

import { createContext, useState } from "react";
import type { Comment } from "@/types/comments";
import type { User } from "@/types/users";

type CommentsContextType = {
  formCommentStatus: FormStatus;
  setFormCommentStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  currentComment: Comment | null;
  setCurrentComment: React.Dispatch<React.SetStateAction<Comment | null>>;
};

export type CommentReply = {
  repliedCommentId: Comment["id"];
  replyAuthor: {
    id: User["id"];
    name: User["name"];
  };
  originalComment?: Comment["content"];
};

export type FormStatus = "new" | "edit" | "reply";

export const CommentsContext = createContext<CommentsContextType | null>(null);

export default function CommentsContextProvider({ children }: { children: React.ReactNode }) {
  const [formCommentStatus, setFormCommentStatus] = useState<FormStatus>("new");
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);

  const contextValues = {
    formCommentStatus,
    setFormCommentStatus,
    currentComment,
    setCurrentComment,
  };

  return <CommentsContext.Provider value={contextValues}>{children}</CommentsContext.Provider>;
}
