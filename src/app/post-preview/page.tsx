"use client";

import React, { useEffect, useState } from "react";
import Post, { type PostProps } from "../components/Post/Post";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "./style.css";

export default function PostPreviewPage() {
  const [parsedData, setParsedData] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("live-preview-data");
      if (data) {
        setParsedData(JSON.parse(data));
      }

      setLoading(false);
      localStorage.removeItem("live-preview-data");
    };

    // Check localStorage on first render
    handleStorageChange();

    // Add listener for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Remove listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {parsedData ? (
        <pre>
          <Post
            title={parsedData.title}
            imageSrc={parsedData.imageSrc}
            tags={parsedData.tags}
            category={parsedData.category}
            content={parsedData.content}
          />
        </pre>
      ) : (
        <h1>Here would show post preview when you start editing any of your post.</h1>
      )}
    </>
  );
}
