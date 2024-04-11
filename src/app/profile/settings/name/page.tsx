import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import { getServerSession } from "next-auth/next";
import EditProfileForm from "@/app/profile/components/EditProfileForm";
import EditProfileBtn from "@/app/profile/components/EditProfileBtn";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile - edit name",
};

export default async function ProfileEditNamePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser(session.user.id));

  return (
    <>
      {user && (
        <>
          <EditProfileForm
            userId={user.id}
            name={user.name}
          />

          <EditProfileBtn
            email={user.email}
            editable
          />

          <EditProfileBtn
            password
            editable
          />
        </>
      )}
    </>
  );
}
