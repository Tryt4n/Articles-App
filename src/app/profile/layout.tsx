import React from "react";
import "./profilePage.css";

export default function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="profile-page">
      <h1>Profile</h1>

      {children}
    </main>
  );
}
