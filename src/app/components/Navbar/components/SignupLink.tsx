"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export default function SignupLink({ ...props }: Omit<LinkProps, "href">) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/signup" ? (
        <Link
          {...props}
          href="/signup"
          className="btn"
        >
          Signup
        </Link>
      ) : null}
    </>
  );
}
