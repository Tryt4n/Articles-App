import React from "react";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user ? await fetchUser({ id: session.user.id }) : null;

  return (
    <main>
      <h1>Profile</h1>
      {user && (
        <>
          <div>Name: {user.name}</div>
          <div>User ID: {user.id}</div>
          <div>User Role: {user.role}</div>
        </>
      )}
    </main>
  );
}
