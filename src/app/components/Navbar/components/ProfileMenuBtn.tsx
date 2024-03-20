"use client";

import React, { useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";

type ProfileMenuBtnProps = {
  imageSrc: string;
} & ComponentPropsWithoutRef<"button">;

export default function ProfileMenuBtn({ imageSrc }: ProfileMenuBtnProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="navbar-profile-menu-container"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
        }
      }}
    >
      <button
        className="profile-icon-link card-image-placeholder"
        aria-label={`Click to ${menuOpen ? "close" : "open"} profile menu.`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <span className="visually-hidden">Profile Menu</span>
        <Image
          src={imageSrc}
          alt="your avatar"
          width={50}
          height={50}
        />
      </button>

      <ul
        id="profile-menu"
        className="navbar-profile-menu"
        aria-hidden={!menuOpen}
      >
        <li>
          <Link
            href="/profile"
            tabIndex={menuOpen ? 0 : -1}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }
            }}
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            // href="/profile/settings"
            href="#"
            tabIndex={menuOpen ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }
            }}
          >
            Settings
          </Link>
        </li>

        <li>
          <Link
            href="/api/auth/signout"
            tabIndex={menuOpen ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }

              if (e.key === "Tab") {
                setMenuOpen(false);
              }
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
