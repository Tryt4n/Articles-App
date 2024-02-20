"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({ href, children }: { href: string; children: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={pathname === href ? "active" : undefined}
    >
      {children}
    </Link>
  );
}
