"use client";

import React from "react";
import { updateUserAction } from "@/app/_actions/users";
import { useFormState } from "react-dom";

type EditProfileForm = { userId: string } & (
  | {
      name: string;
      email?: undefined;
      password?: undefined;
    }
  | {
      name?: undefined;
      email: string;
      password?: undefined;
    }
  | {
      name?: undefined;
      email?: undefined;
      password: true | null;
    }
);

export default function EditProfileForm({ userId, name, email, password }: EditProfileForm) {
  let type: "name" | "email" | "password";
  let oldValue: string;
  let placeholder: string;

  if (typeof name === "string") {
    type = "name";
    oldValue = name;
    placeholder = "Enter new name";
  } else if (typeof email === "string") {
    type = "email";
    oldValue = email;
    placeholder = "Enter new email";
  } else {
    type = "password";
    oldValue = "";
    placeholder = "Enter new password";
  }

  const formAction = updateUserAction.bind(null, { id: userId, type, oldValue });
  const [errors, action] = useFormState(formAction, []);

  return (
    <form action={action}>
      <label htmlFor="edit-profile">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
      <input
        type={type === "password" ? "password" : type === "email" ? "email" : "text"}
        name="edit-profile"
        id="edit-profile"
        defaultValue={oldValue}
        minLength={type === "password" ? 8 : 3}
        maxLength={50}
        placeholder={placeholder}
      />
      {type === "password" && (
        <input
          type="password"
          name="edit-profile-password-confirmation"
          id="edit-profile-password-confirmation"
          placeholder="Confirm password"
          minLength={8}
          maxLength={50}
        />
      )}
      <button
        type="submit"
        className="btn"
      >
        Save
      </button>

      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </form>
  );
}
