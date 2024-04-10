import type { Position } from "unist";

export type NodeType = {
  type: "text";
  value: string;
  position?: Position;
  properties?: {
    color?: string;
    fontSize?: string;
  };
};

export type CustomComponent = {
  custom: ({ node, children }: { node: NodeType; children: string }) => JSX.Element;
};
