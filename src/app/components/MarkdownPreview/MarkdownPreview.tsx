import React from "react";
import ReactMarkdown, { type Options as ReactMarkdownOptions } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import customPlugin from "@/react-markdown/plugins";
import { markdownComponents } from "@/react-markdown/components";
import "katex/dist/katex.min.css";
import "./style.css";

export default function MarkdownPreview({
  markdownText,
  ...props
}: { markdownText: string } & ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, customPlugin]}
      className="markdown-preview"
      components={markdownComponents}
      {...props}
    >
      {markdownText}
    </ReactMarkdown>
  );
}
