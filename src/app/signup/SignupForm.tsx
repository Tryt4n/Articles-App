"use client";

import React from "react";
import { useFormState } from "react-dom";
import CreateButton from "./CreateButton";
import { signupUserAction } from "../_actions/users";

export default function SignupForm() {
  const [error, action] = useFormState(signupUserAction, { errorMessage: "" });

  return (
    <form action={action}>
      <div>
        <label htmlFor="signup-email">Enter email: </label>
        <input
          type="email"
          name="signup-email"
          id="signup-email"
          autoComplete="false"
          autoFocus
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="signup-username">Enter username: </label>
        <input
          type="text"
          name="signup-username"
          id="signup-username"
          autoComplete="false"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label htmlFor="signup-password">Enter password: </label>
        <input
          type="password"
          name="signup-password"
          id="signup-password"
          autoComplete="false"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label htmlFor="signup-password-confirmation">Confirm your password: </label>
        <input
          type="password"
          name="signup-password-confirmation"
          id="signup-password-confirmation"
          autoComplete="false"
          placeholder="Confirm your password"
        />
      </div>

      {error ? <strong>{error.errorMessage}</strong> : null}

      <CreateButton />
    </form>
  );
}
