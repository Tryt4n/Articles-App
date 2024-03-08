import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ markdownText }: { markdownText: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      disallowedElements={["h1"]}
      className="markdown-preview"
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
}
