"use client";

import React from "react";
import { updateUserAction } from "@/app/_actions/users";
import { useFormState } from "react-dom";

type EditProfileForm = { userId: string } & (
  | {
      name: string;
      email?: undefined;
    }
  | {
      name?: undefined;
      email: string;
    }
);

export default function EditProfileForm({ userId, name, email }: EditProfileForm) {
  const isName = typeof name === "string" && typeof email !== "string";
  const oldValue = isName ? name : email!;

  const formAction = updateUserAction.bind(null, { id: userId, isName, oldValue });
  const [errors, action] = useFormState(formAction, []);

  return (
    <form action={action}>
      <label htmlFor="edit-profile">{isName ? "Name" : "Email"}</label>
      <input
        type={isName ? "text" : "email"}
        name="edit-profile"
        id="edit-profile"
        defaultValue={isName ? name : email}
        minLength={isName ? 3 : 5}
        maxLength={50}
      />
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
