import React from "react";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile - Settings",
};

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h2 className="profile-subheader">Edit your data:</h2>
      {children}
    </section>
  );
}
