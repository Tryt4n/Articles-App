"use server";

import {
  createNewUser,
  isNewUserEmailUnique,
  isNewUserUsernameUnique,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "@/db/users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ChangeEmailSchema,
  ChangePasswordSchema,
  ChangeUsernameSchema,
  SignupSchema,
} from "@/zod/userSchema";
import type { User } from "@/types/users";
import type { ErrorKeys } from "./types";

export async function signupUserAction(prevState: unknown, formData: FormData) {
  const email = formData.get("signup-email") as string;
  const username = formData.get("signup-username") as string;
  const password = formData.get("signup-password") as string;
  const passwordConfirmation = formData.get("signup-password-confirmation") as string;

  let customErrors: Record<ErrorKeys, string[]> = {
    email: [],
    username: [],
    password: [],
    passwordConfirmation: [],
  };

  const isEmailUnique = await isNewUserEmailUnique(email);
  const isUsernameUnique = await isNewUserUsernameUnique(username);

  if (!isEmailUnique) customErrors.email.push("Email is already taken.");
  if (!isUsernameUnique) customErrors.username.push("Username is already taken.");

  const validationData = {
    email,
    username,
    password,
    passwordConfirmation,
  };

  const results = SignupSchema.safeParse(validationData);

  if (
    !isEmailUnique ||
    !isUsernameUnique ||
    email === "" ||
    username === "" ||
    password === "" ||
    passwordConfirmation === "" ||
    password !== passwordConfirmation
  ) {
    if (!results.success) {
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as ErrorKeys;
        if (field in customErrors) {
          customErrors[field].push(issue.message);
        }
      });

      return customErrors;
    }
  } else {
    // Database will generate the id
    const newUser: Omit<User, "id"> = {
      email,
      name: username,
      password,
      image: "https://source.unsplash.com/random/60x60",
      role: "user",
    };

    await createNewUser(newUser as User); // Type assertion to satisfy TypeScript

    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/profile/settings");
    revalidatePath("/signup");
    redirect("/api/auth/signin");
  }
}

export async function updateUserAction(
  options: { id: string; type: "name" | "email" | "password"; oldValue: string },
  prevState: string[],
  formData: FormData
) {
  const value = formData.get("edit-profile") as string;
  const passwordConfirmation = formData.get("edit-profile-password-confirmation") as string;

  const { id, type, oldValue } = options;

  if (type === "name" && value === oldValue) {
    return ["Username is the same."];
  }

  if (type === "email" && value === oldValue) {
    return ["Email is the same."];
  }

  if (type === "password" && passwordConfirmation !== value) {
    return ["Passwords do not match."];
  }

  const isValueUnique =
    type === "name" ? await isNewUserUsernameUnique(value) : await isNewUserEmailUnique(value);

  if ((type === "name" || type === "email") && !isValueUnique) {
    return [`${type.charAt(0).toUpperCase() + type.slice(1)} is already taken.`];
  }

  let results:
    | ReturnType<typeof ChangeUsernameSchema.safeParse>
    | ReturnType<typeof ChangeEmailSchema.safeParse>
    | ReturnType<typeof ChangePasswordSchema.safeParse>
    | undefined;

  switch (type) {
    case "name":
      results = ChangeUsernameSchema.safeParse({ username: value });
      break;
    case "email":
      results = ChangeEmailSchema.safeParse({ email: value });
      break;
    case "password":
      results = ChangePasswordSchema.safeParse({ password: value, passwordConfirmation });
      break;
  }

  if (results && !results.success) {
    return results.error.issues.map((issue) => issue.message);
  }

  if (type === "name") updateUserName(id, value);
  if (type === "email") updateUserEmail(id, value);
  if (type === "password") updateUserPassword(id, value);

  revalidatePath(`/profile`);
  revalidatePath(`/authors`);
  revalidatePath(`/profile/settings`);
  redirect(`/profile/settings`);
}
