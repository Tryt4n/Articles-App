import React from "react";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
