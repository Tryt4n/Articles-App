"use server";

import { createNewUser } from "@/db/users";
import { validateCreationOfNewUser } from "../helpers/validation";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signupUserAction(prevState: unknown, formData: FormData) {
  const email = formData.get("signup-email") as string;
  const username = formData.get("signup-username") as string;
  const password = formData.get("signup-password") as string;
  const passwordConfirmation = formData.get("signup-password-confirmation") as string;

  //   const isEmailUnique = await isNewUserEmailUnique(email);
  //   const isUsernameUnique = await isNewUserUsernameUnique(username);

  //   if (email === "") {
  //     return { errorMessage: "Email is required" };
  //   }
  //   if (username === "") {
  //     return { errorMessage: "Username is required" };
  //   }
  //   if (password === "") {
  //     return { errorMessage: "Password is required" };
  //   }
  //   if (passwordConfirmation === "") {
  //     return { errorMessage: "Password confirmation is required" };
  //   }
  //   if (!email.includes("@") || email.length < 5 || email.length > 50) {
  //     return { errorMessage: "Email is invalid" };
  //   }
  //   if (!isEmailUnique) {
  //     return { errorMessage: "Email is already taken" };
  //   }
  //   if (!isUsernameUnique) {
  //     return { errorMessage: "Username is already taken" };
  //   }
  //   if (password.length < 8) {
  //     return { errorMessage: "Password must be at least 8 characters" };
  //   }
  //   if (password.length > 50) {
  //     return { errorMessage: "Password must be at most 50 characters" };
  //   }
  //   if (password !== passwordConfirmation) {
  //     return { errorMessage: "Passwords do not match" };
  //   }

  // const isValidationPassed = await validateCreationOfNewUser(email,username,password,passwordConfirmation);

  //   await createNewUser(newUser);

  const { isValid, error } = await validateCreationOfNewUser(
    email,
    username,
    password,
    passwordConfirmation
  );

  const newUser = {
    name: username,
    email,
    password,
    image: "https://source.unsplash.com/random/60x60",
  };

  if (isValid) {
    await createNewUser(newUser);
    redirect("/api/auth/signin");
  } else {
    return { errorMessage: error };
  }
}
