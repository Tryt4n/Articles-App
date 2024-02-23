"use server";

import { isNewUserEmailUnique, isNewUserUsernameUnique } from "@/db/users";
import { revalidatePath } from "next/cache";

export async function validateCreationOfNewUser(
  email: string,
  username: string,
  password: string,
  passwordConfirmation: string
) {
  let error: string | null = null;

  const isEmailUnique = await isNewUserEmailUnique(email);
  const isUsernameUnique = await isNewUserUsernameUnique(username);

  if (email === "") {
    error = "Email is required";
  }
  if (username === "") {
    error = "Username is required";
  }
  if (password === "") {
    error = "Password is required";
  }
  if (passwordConfirmation === "") {
    error = "Password confirmation is required";
  }
  if (!email.includes("@") || email.length < 5 || email.length > 50) {
    error = "Email is invalid";
  }
  if (!isEmailUnique) {
    error = "Email is already taken";
  }
  if (!isUsernameUnique) {
    error = "Username is already taken";
  }
  if (password.length < 8) {
    error = "Password must be at least 8 characters";
  }
  if (password.length > 50) {
    error = "Password must be at most 50 characters";
  }
  if (password !== passwordConfirmation) {
    error = "Passwords do not match";
  }

  revalidatePath("/signup");
  return { isValid: error === null, error };
}
