import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import type { Post } from "@/types/posts";

export default function FirstWords({ content }: { content: Post["content"] }) {
  const specialChars = ["\\*\\*\\*", "\\*\\*", "\\*", "`", "``", "```", "~"]; // Special characters with regex escape
  let displayContent = content.substring(0, 200).trimEnd(); // Trim the content to 2000 characters

  // Reverse loop to close text with special characters from the deepest to the shallowest
  for (let i = specialChars.length - 1; i >= 0; i--) {
    let char = specialChars[i]; // Get the special character
    let count = (displayContent.match(new RegExp(char, "g")) || []).length; // Count the number of special characters
    // If the number of special characters is odd
    if (count % 2 !== 0) {
      displayContent += char.replace(/\\/g, ""); // Add the special character without the escape character
    }
  }

  return (
    <pre className="post-card-subheader">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Override the default 'a' component
          a: ({ node, ...props }) => (
            <span
              className="post-card-subheader-link"
              {...props}
            >
              link
            </span>
          ),
        }}
        allowedElements={[
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "a", // "a" is replaced with "span"
          "p",
          "em",
          "del",
          "strong",
          "ul",
          "ol",
          "li",
          "code",
          "pre",
          "blockquote",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "span",
          "input",
        ]}
      >
        {displayContent}
      </ReactMarkdown>
    </pre>
  );
}
