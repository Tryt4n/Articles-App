"use client";

import React, { useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

type ProfileMenuBtnProps = {
  imageSrc: string;
} & ComponentPropsWithoutRef<"button">;

export default function ProfileMenu({ imageSrc }: ProfileMenuBtnProps) {
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
          <NavLink
            href="/profile"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }
            }}
          >
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            // href="/profile/settings"
            href="#"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }
            }}
          >
            Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            href="/api/auth/signout"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === "Enter") {
                setMenuOpen(false);
              }

              if (e.key === "Tab") {
                setMenuOpen(false);
              }
            }}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
