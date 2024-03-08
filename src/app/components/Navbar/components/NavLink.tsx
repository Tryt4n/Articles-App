"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  children: string;
} & LinkProps;

export default function NavLink({ children, ...props }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={pathname === props.href ? "active" : undefined}
    >
      {children}
    </Link>
  );
}
