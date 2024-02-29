import React from "react";
import Link from "next/link";

export default function ProfileEditSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/profile"
        className="btn"
        style={{ maxWidth: "fit-content" }}
      >
        Go Back
      </Link>
      {children}
    </>
  );
}