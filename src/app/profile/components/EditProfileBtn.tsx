import React from "react";
import Link from "next/link";

type EditButton =
  | {
      email: string;
      name?: undefined;
      password?: undefined;
    }
  | {
      email?: undefined;
      name: string;
      password?: undefined;
    }
  | {
      email?: undefined;
      name?: undefined;
      password: true | null;
    };

export default function EditProfileBtn({ email, name, password }: EditButton) {
  let type: "email" | "name" | "password";
  let value: string | undefined;

  if (email) {
    type = "email";
    value = email;
  } else if (name) {
    type = "name";
    value = name;
  } else if (password) {
    type = "password";
    value = "";
  } else return null;

  return (
    <div className="profile-content-wrapper">
      <p>
        {type.charAt(0).toUpperCase() + type.slice(1)}: {value}
      </p>
      <Link
        href={`/profile/edit/${type}`}
        className="btn"
      >
        Edit
      </Link>
    </div>
  );
}
