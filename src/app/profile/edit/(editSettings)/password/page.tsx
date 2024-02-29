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
  title: "Profile - edit password",
};

export default async function ProfileEditNamePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  if (session?.user.name == null) redirect("/profile");

  return (
    <>
      {user && (
        <UserData user={user}>
          <EditProfileBtn name={user.name} />

          <EditProfileBtn email={user.email} />

          <EditProfileForm
            userId={user.id}
            password={true}
          />
        </UserData>
      )}
    </>
  );
}
