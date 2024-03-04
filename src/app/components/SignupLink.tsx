"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignupLink() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/signup" ? (
        <Link
          href="/signup"
          className="btn"
        >
          Signup
        </Link>
      ) : null}
    </>
  );
}
