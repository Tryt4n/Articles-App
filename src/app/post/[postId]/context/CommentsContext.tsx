"use client";

import { createContext, useEffect, useRef, useState } from "react";
import type { Comment } from "@/app/lib/types/comments";
import type { FormStatus } from "../types/formTypes";

type CommentsContextType = {
  formCommentStatus: FormStatus;
  setFormCommentStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  currentComment: Comment | null;
  setCurrentComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
};

export const CommentsContext = createContext<CommentsContextType | null>(null);

export default function CommentsContextProvider({ children }: { children: React.ReactNode }) {
  const [formCommentStatus, setFormCommentStatus] = useState<FormStatus>("new");
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Focus at the end of the textarea when editing a comment
  useEffect(() => {
    if (formCommentStatus !== "new") {
      const textarea = contentRef.current;
      if (textarea) {
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
        textarea.focus();
      }
    }
  }, [contentRef, formCommentStatus]);

  const contextValues = {
    formCommentStatus,
    setFormCommentStatus,
    currentComment,
    setCurrentComment,
    contentRef,
  };

  return <CommentsContext.Provider value={contextValues}>{children}</CommentsContext.Provider>;
}
