import React from "react";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Post Live Preview",
};

export default function PostPreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
