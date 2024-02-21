import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/authors">Authors</NavLink>
        </li>
        {/*// TODO: add roles to users auth and display it only for admin and moderator */}
        {session && (
          <li>
            <NavLink href="/drafts">Drafts</NavLink>
          </li>
        )}
        {/*// TODO: add roles to users auth and display dashboard if user is admin */}
      </ul>

      <div className="auth-container">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="btn btn--accent"
        >
          {session ? "Logout" : "Login"}
        </Link>
        {!session ? (
          <Link
            href="/signup"
            className="btn"
          >
            Signup
          </Link>
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
