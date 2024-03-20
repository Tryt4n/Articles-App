import React from "react";
import Link from "next/link";
import NavLink from "./components/NavLink";
import SignupLink from "./components/SignupLink";
import ProfileMenu from "./components/ProfileMenu";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import "./style.css";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="navbar">
      <h2 className="visually-hidden">Page Navigation</h2>

      <ul>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/authors">Authors</NavLink>
        </li>
        {session && (session.user.role === "moderator" || session.user.role === "admin") && (
          <li>
            <NavLink href="/drafts">Drafts</NavLink>
          </li>
        )}
        {session && session.user.role === "admin" && (
          <li>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </li>
        )}
      </ul>

      <div className="auth-container">
        {!session ? (
          <>
            <Link
              href="/api/auth/signin"
              className="btn btn--accent"
            >
              Login
            </Link>

            <SignupLink />
          </>
        ) : (
          <ProfileMenu imageSrc={session.user.image} />
        )}
      </div>
    </nav>
  );
}
