"use server";

import { followAuthor } from "@/db/users";
import { revalidatePath } from "next/cache";
import type { User } from "@/types/users";

export async function followAuthorAction(formData: FormData) {
  const userId = (formData.get("user-id") as User["id"])!;
  const authorId = (formData.get("author-id") as User["id"])!;

  await followAuthor(userId, authorId);
  revalidatePath("/authors");
  revalidatePath(`/authors/${authorId}`);
  revalidatePath("/profile");
}
