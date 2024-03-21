"use client";

import React, { createContext, useRef, useState } from "react";
import type { PostProps } from "@/app/components/Post/Post";

type PostContextType = {
  postData: PostProps;
  setPostData: React.Dispatch<React.SetStateAction<PostProps>>;
  textOptions: TextOptions;
  setTextOptions: React.Dispatch<React.SetStateAction<TextOptions>>;
  refs: {
    titleRef: React.RefObject<HTMLInputElement>;
    imageRef: React.RefObject<HTMLInputElement>;
    tagsRef: React.RefObject<HTMLInputElement>;
    selectedCategoryRef: React.RefObject<HTMLSelectElement>;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    colorPickerRef: React.RefObject<HTMLInputElement>;
    fontSizeInputRef: React.RefObject<HTMLInputElement>;
  };
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
    image: "",
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

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const selectedCategoryRef = useRef<HTMLSelectElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const fontSizeInputRef = useRef<HTMLInputElement>(null);

  const contextValues = {
    postData,
    setPostData,
    textOptions,
    setTextOptions,
    refs: {
      titleRef,
      imageRef,
      tagsRef,
      selectedCategoryRef,
      textareaRef,
      colorPickerRef,
      fontSizeInputRef,
    },
  };

  return <PostContext.Provider value={contextValues}>{children}</PostContext.Provider>;
}
