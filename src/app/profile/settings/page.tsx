import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchUser } from "@/db/users";
import EditProfileBtn from "../components/EditProfileBtn";

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user && (await fetchUser({ id: session.user.id }));

  return (
    <>
      {user && (
        <>
          <EditProfileBtn
            name={user.name}
            editable
          />

          {session.user.name !== null && (
            <>
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
      )}
    </>
  );
}
