import React from "react";
import "./style.css";

export default function CreatePostLayout({ children }: { children: React.ReactNode }) {
  return <main className="create-post-container">{children}</main>;
}
