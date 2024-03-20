import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import UserData from "../../../components/UserData";
import EditProfileForm from "../../../components/EditProfileForm";
import EditProfileBtn from "../../../components/EditProfileBtn";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile - edit email",
};

export default async function ProfileEditEmailPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  // Redirect only if the user is logged in through an external auth provider
  if (session?.user.name == null) redirect("/profile");

  return (
    <>
      {user && (
        <UserData user={user}>
          <EditProfileBtn name={user.name} />

          <EditProfileForm
            userId={user.id}
            email={user.email}
          />

          <EditProfileBtn password />
        </UserData>
      )}
    </>
  );
}
