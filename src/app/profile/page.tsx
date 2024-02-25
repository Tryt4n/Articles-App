import React from "react";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserData from "./components/UserData";
import type { Metadata } from "next/types";
import "./profilePage.css";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <main className="profile-page">
      <h1>Profile</h1>

      {user && <UserData user={user} />}
    </main>
  );
}
