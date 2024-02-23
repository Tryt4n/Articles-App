"use client";

import React from "react";
import { useFormState } from "react-dom";
import CreateButton from "./CreateButton";
import { signupUserAction } from "../_actions/users";

export default function SignupForm() {
  const [errors, action] = useFormState(signupUserAction, []);

  return (
    <form action={action}>
      <div>
        <label htmlFor="signup-email">Enter email: </label>
        <input
          type="email"
          name="signup-email"
          id="signup-email"
          autoComplete="off"
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
          autoComplete="off"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label htmlFor="signup-password">Enter password: </label>
        <input
          type="password"
          name="signup-password"
          id="signup-password"
          autoComplete="off"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label htmlFor="signup-password-confirmation">Confirm your password: </label>
        <input
          type="password"
          name="signup-password-confirmation"
          id="signup-password-confirmation"
          autoComplete="off"
          placeholder="Confirm your password"
        />
      </div>

      {errors && errors.length > 0 ? (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>
              <strong>{error}</strong>
            </li>
          ))}
        </ul>
      ) : null}

      <CreateButton />
    </form>
  );
}
