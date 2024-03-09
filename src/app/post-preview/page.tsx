"use client";

import React, { useEffect, useState } from "react";
import PostPreview, {
  type PostPreviewProps,
} from "@/app/drafts/components/PostPreview/PostPreview";

export default function PostPreviewPage() {
  const [parsedData, setParsedData] = useState<PostPreviewProps | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("live-preview-data");
      if (data) {
        setParsedData(JSON.parse(data));
      }
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

  return (
    <>
      {parsedData && (
        <PostPreview
          title={parsedData.title}
          imageSrc={parsedData.imageSrc}
          tags={parsedData.tags}
          category={parsedData.category}
          markdownText={parsedData.markdownText}
        />
      )}
    </>
  );
}
