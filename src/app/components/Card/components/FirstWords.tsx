import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@/types/posts";

export default function FirstWords({ content }: { content: Post["content"] }) {
  const specialChars = ["\\*\\*\\*", "\\*\\*", "\\*", "`", "``", "```", "~"]; // Special characters with regex escape
  let displayContent = content.substring(0, 50).trimEnd(); // Trim the content to 50 characters

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
    <ReactMarkdown
      className="post-card-subheader"
      remarkPlugins={[remarkGfm]}
      allowedElements={[
        "p",
        "em",
        "del",
        "strong",
        "ul",
        "ol",
        "li",
        "img",
        "code",
        "pre",
        "blockquote",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ]}
    >
      {displayContent}
    </ReactMarkdown>
  );
}
