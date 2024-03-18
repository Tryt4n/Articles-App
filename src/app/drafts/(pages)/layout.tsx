import React from "react";
import PostContextProvider from "../context/PostContext";
import PostPreview from "../components/PostPreview/PostPreview";
import "./style.css";

export default function CreatePostLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostContextProvider>
      <main>
        {children}

        <PostPreview />
      </main>
    </PostContextProvider>
  );
}
