"use server";

import {
  createNewUser,
  isNewUserEmailUnique,
  isNewUserUsernameUnique,
  updateUserEmail,
  updateUserName,
} from "@/db/users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ChangeEmailSchema, ChangeUsernameSchema, SignupSchema } from "@/zod/userSchema";
import type { User } from "@/types/users";

export async function signupUserAction(prevState: unknown, formData: FormData) {
  const email = formData.get("signup-email") as string;
  const username = formData.get("signup-username") as string;
  const password = formData.get("signup-password") as string;
  const passwordConfirmation = formData.get("signup-password-confirmation") as string;

  let customErrors: string[] = [];
  const isEmailUnique = await isNewUserEmailUnique(email);
  const isUsernameUnique = await isNewUserUsernameUnique(username);

  if (!isEmailUnique) customErrors.push("Email is already taken.");
  if (!isUsernameUnique) customErrors.push("Username is already taken.");

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
      const errorMessages = [
        ...customErrors,
        ...results.error.issues.map((issue) => issue.message),
      ];

      return errorMessages;
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
    revalidatePath("/signup");
    redirect("/api/auth/signin");
  }
}

export async function updateUserAction(
  options: { id: string; isName: boolean; oldValue: string },
  prevState: string[],
  formData: FormData
) {
  const value = formData.get("edit-profile") as string;

  const { id, isName } = options;

  if (value === options.oldValue) {
    return [`${isName ? "Username" : "Email"} is the same.`];
  }

  const isValueUnique = isName
    ? await isNewUserUsernameUnique(value)
    : await isNewUserEmailUnique(value);

  if (!isValueUnique) {
    return [`${isName ? "Username" : "Email"} is already taken.`];
  }

  const results = isName
    ? ChangeUsernameSchema.safeParse({ username: value })
    : ChangeEmailSchema.safeParse({ email: value });

  if (!results.success) {
    return results.error.issues.map((issue) => issue.message);
  }

  if (isName) {
    updateUserName(id, value);
  } else {
    updateUserEmail(id, value);
  }
  revalidatePath(`/profile`);
  revalidatePath(`/authors`);
  redirect(`/profile`);
}
