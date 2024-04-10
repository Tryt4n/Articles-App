import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CustomComponent } from "./types";
import type { Options } from "react-markdown";

const customComponent: CustomComponent = {
  custom: ({ node, children }) => {
    return (
      <span
        style={{
          color: node.properties?.color,
          fontSize: node.properties?.fontSize,
        }}
      >
        {children}
      </span>
    );
  },
};

export const markdownComponents: Options["components"] = {
  ...customComponent,
  a: ({ node, ...props }) => (
    <a
      {...props}
      href={
        props.href && props.href.startsWith("tel")
          ? `tel:${props.href.replace("tel", "")}`
          : props.href
      }
      target={
        props.href && (props.href.startsWith("http") || props.href.startsWith("www"))
          ? "_blank"
          : undefined
      }
      rel="noopener noreferrer"
    />
  ),
  input: ({ node, ...props }) => (
    <input
      {...props}
      role="presentation"
    />
  ),
  code(props) {
    const { children, className, node, ref, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        style={vscDarkPlus}
        className="language-code-block"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        {...rest}
        className={className}
      >
        {children}
      </code>
    );
  },
};
