"use server";

import { createNewUser, isNewUserEmailUnique, isNewUserUsernameUnique } from "@/db/users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SignupSchema } from "@/zod/userSchema";
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

  if (!isEmailUnique || !isUsernameUnique) {
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
