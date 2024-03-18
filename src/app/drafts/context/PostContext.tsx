"use client";

import React, { createContext, useState } from "react";
import type { PostProps } from "@/app/components/Post/Post";

type PostContextType = {
  postData: PostProps;
  setPostData: React.Dispatch<React.SetStateAction<PostProps>>;
  textOptions: TextOptions;
  setTextOptions: React.Dispatch<React.SetStateAction<TextOptions>>;
};

type TextOptions = {
  textColor: string;
  textSize: string;
  selectedText: string;
  cursorPosition: number;
};

export const PostContext = createContext<PostContextType | null>(null);

export default function PostContextProvider({ children }: { children: React.ReactNode }) {
  const [postData, setPostData] = useState<PostProps>({
    title: "",
    imageSrc: "",
    tags: [],
    category: "general",
    content: "",
  });
  const [textOptions, setTextOptions] = useState({
    textColor: "#000000",
    textSize: "16px",
    selectedText: "",
    cursorPosition: 0,
  });

  const contextValues = {
    postData,
    setPostData,
    textOptions,
    setTextOptions,
  };

  return <PostContext.Provider value={contextValues}>{children}</PostContext.Provider>;
}
