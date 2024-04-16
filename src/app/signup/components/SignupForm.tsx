"use client";

import React from "react";
import { useFormState } from "react-dom";
import { signupUserAction } from "../../actions/users";
import { FormInput } from "../../components/FormInput/FormInput";
import CreateButton from "./CreateButton";
import ErrorsLists from "./ErrorsLists";

export default function SignupForm() {
  const [errors, action] = useFormState(signupUserAction, {
    email: [],
    username: [],
    password: [],
    passwordConfirmation: [],
  });

  return (
    <form
      action={action}
      className="signup-form"
    >
      <FormInput
        label="Enter email:"
        id="signup-email"
        type="email"
        autoFocus
        autoComplete="off"
        placeholder="Enter your email"
        aria-invalid={errors && errors.email.length > 0 ? true : false}
        aria-errormessage={errors && errors.email.length > 0 ? "email-error" : undefined}
      />

      <FormInput
        label="Enter username:"
        id="signup-username"
        type="text"
        autoComplete="off"
        placeholder="Enter your username"
        minLength={3}
        maxLength={50}
        aria-invalid={errors && errors.username.length > 0 ? true : false}
        aria-errormessage={errors && errors.username.length > 0 ? "username-error" : undefined}
      />

      <FormInput
        label="Enter password:"
        id="signup-password"
        type="password"
        autoComplete="off"
        placeholder="Enter your password"
        minLength={8}
        maxLength={50}
        aria-invalid={errors && errors.password.length > 0 ? true : false}
        aria-errormessage={errors && errors.password.length > 0 ? "password-error" : undefined}
      />

      <FormInput
        label="Confirm your password:"
        id="signup-password-confirmation"
        type="password"
        autoComplete="off"
        placeholder="Confirm your password"
        minLength={8}
        maxLength={50}
        aria-invalid={errors && errors.passwordConfirmation.length > 0 ? true : false}
        aria-errormessage={
          errors && errors.passwordConfirmation.length > 0
            ? "passwordConfirmation-error"
            : undefined
        }
      />

      {errors && <ErrorsLists errors={errors} />}

      <CreateButton />
    </form>
  );
}
