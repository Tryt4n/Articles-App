import React from "react";
import Link from "next/link";
import NavLink from "./components/NavLink";
import SignupLink from "./components/SignupLink";
import Image from "next/image";
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
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="btn btn--accent"
        >
          {session ? "Logout" : "Login"}
        </Link>
        {!session ? (
          <SignupLink />
        ) : (
          <Link
            href={"/profile"}
            className="profile-icon-link card-image-placeholder"
          >
            <span className="visually-hidden">Profile</span>
            <Image
              src={session.user?.image || ""}
              alt="user image"
              width={50}
              height={50}
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
