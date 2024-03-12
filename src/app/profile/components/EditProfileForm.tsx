"use client";

import React from "react";
import { updateUserAction } from "@/app/actions/users";
import { useFormState } from "react-dom";
import { FormInput } from "@/app/components/FormInput/FormInput";
import SaveProfileBtn from "./SaveProfileBtn";

type EditProfileForm = { userId: string } & (
  | {
      name: string;
      email?: undefined;
    }
  | {
      name?: undefined;
      email: string;
    }
  | {
      name?: undefined;
      email?: undefined;
    }
);

export default function EditProfileForm({ userId, name, email }: EditProfileForm) {
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
    <form
      action={action}
      className="profile-edit-form"
    >
      <div className="profile-edit-form-inner-wrapper">
        <div className="profile-edit-inputs-wrapper">
          <FormInput
            className="profile-content-wrapper"
            type={type === "name" ? "text" : type}
            label={`${type.charAt(0).toUpperCase() + type.slice(1)}:`}
            id="edit-profile"
            defaultValue={oldValue === "" ? undefined : oldValue}
            required
            minLength={type === "password" ? 8 : 3}
            maxLength={50}
            placeholder={placeholder}
            autoFocus
            aria-invalid={errors && errors.length > 0 ? true : false}
            aria-errormessage={errors && errors.length > 0 ? `${type}-errors` : undefined}
          />

          {type === "password" && (
            <FormInput
              className="profile-content-wrapper"
              type="password"
              label="Password confirmation:"
              id="edit-profile-password-confirmation"
              placeholder="Confirm password"
              required
              minLength={8}
              maxLength={50}
              aria-invalid={errors && errors.length > 0 ? true : false}
              aria-errormessage={errors && errors.length > 0 ? "password-errors" : undefined}
            />
          )}
        </div>
        <SaveProfileBtn />
      </div>

      <ul
        className="form-errors-list"
        id={`${type}-errors`}
      >
        {errors?.map((error) => (
          <li key={error}>
            <strong>{error}</strong>
          </li>
        ))}
      </ul>
    </form>
  );
}
