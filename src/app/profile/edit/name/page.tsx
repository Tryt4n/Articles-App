import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import UserData from "../../components/UserData";
import EditProfileForm from "../../components/EditProfileForm";
import EditProfileBtn from "../../components/EditProfileBtn";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile - edit name",
};

export default async function ProfileEditNamePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <>
      {user && (
        <UserData user={user}>
          <EditProfileForm
            userId={user.id}
            name={user.name}
          />

          <EditProfileBtn email={user.email} />
        </UserData>
      )}
    </>
  );
}
