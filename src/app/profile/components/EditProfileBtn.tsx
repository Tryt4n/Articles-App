import React from "react";
import Link from "next/link";

type EditButton =
  | {
      email: string;
      name?: undefined;
    }
  | {
      email?: undefined;
      name: string;
    };

export default function EditProfileBtn({ email, name }: EditButton) {
  return (
    <div className="profile-content-wrapper">
      {email ? <p>Email: {email}</p> : <p>Name: {name}</p>}
      <Link
        href={`/profile/edit/${email ? "email" : "name"}`}
        className="btn"
      >
        Edit
      </Link>
    </div>
  );
}
