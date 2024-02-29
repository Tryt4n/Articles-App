import React from "react";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserData from "./components/UserData";
import EditProfileBtn from "./components/EditProfileBtn";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <>
      {user && (
        <UserData user={user}>
          <EditProfileBtn name={user.name} />

          {session.user.name !== null && (
            <>
              <EditProfileBtn email={user.email} />

              <EditProfileBtn password />
            </>
          )}
        </UserData>
      )}
    </>
  );
}
