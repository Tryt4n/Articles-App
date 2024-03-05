"use server";

import { editPost } from "@/db/posts";
import { PostSchema } from "@/zod/postSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PostCategories } from "@/types/posts";
import type { Tag } from "@prisma/client";

type EdiPostState = Record<"title" | "content" | "tags", string | undefined>;

export async function editPostAction(prevState: unknown, formData: FormData) {
  const postId = formData.get("post-id") as string;
  const title = formData.get("post-title") as string;
  const content = formData.get("post-content") as string;
  const category = formData.get("post-category") as PostCategories;
  const tags = formData.get("post-tags") as string;
  const existingTags = JSON.parse(formData.get("existing-post-tags") as string) as Tag[];

  const tagsArray = [
    ...new Set(
      tags
        .split(" ")
        .map((tag) => "#" + tag.replace(/#/g, "")) // Ensure all tags start with a '#' character and its only occurrence is at the beginning of the tag
        .filter((tag) => tag.trim().length > 1) // All tags must be at least 2 characters long because of the '#' character
    ),
  ];

  const uniqueTags = tagsArray
    .filter((tag) => !existingTags.some((existingTag) => existingTag.name === tag))
    .map((tag) => ({ id: null, name: tag }));

  // Create a list of tags to remove that are not present in the new tags array
  const tagsToRemove = existingTags.filter((existingTag) => !tagsArray.includes(existingTag.name));

  const post = {
    id: postId,
    title,
    content,
    category,
    tags,
  };

  const results = PostSchema.safeParse(post);

  if (!results.success) {
    let errorMessages: EdiPostState = {
      title: undefined,
      content: undefined,
      tags: undefined,
    };

    results.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof EdiPostState;
      errorMessages[path] = issue.message;
    });

    return errorMessages;
  } else {
    editPost(post, {
      oldTags: existingTags,
      newTags: uniqueTags,
      tagsToRemove: tagsToRemove.length > 0 ? tagsToRemove : undefined,
    });
    revalidatePath("/drafts");
    revalidatePath(`/drafts/${postId}`);
    revalidatePath("posts");
    revalidatePath(`/posts/${postId}`);
    redirect("/drafts");
  }
}
