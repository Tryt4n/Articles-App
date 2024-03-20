import React from "react";
import Link from "next/link";

type EditButton = { editable?: boolean } & (
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
    }
);

export default function EditProfileBtn({ email, name, password, editable = false }: EditButton) {
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
        <span className="profile-content-label">
          {type.charAt(0).toUpperCase() + type.slice(1)}
          {type !== "password" && ":"}
        </span>
        &nbsp;
        {value}
      </p>

      {editable && (
        <Link
          href={`/profile/settings/${type}`}
          className="btn"
        >
          Edit
        </Link>
      )}
    </div>
  );
}
