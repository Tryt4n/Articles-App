import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/authors">Authors</NavLink>
        </li>
      </ul>

      <div className="auth-container">
        <Link
          href="/login"
          className="btn btn--accent"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="btn"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
