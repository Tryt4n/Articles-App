"use server";

import { editPost } from "@/db/posts";
import { PostSchema } from "@/zod/postSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PostCategories } from "@/types/posts";
import type { Tag } from "@prisma/client";

type EdiPostState = Record<"title" | "content", string | undefined>;

export async function editPostAction(prevState: unknown, formData: FormData) {
  const postId = formData.get("post-id") as string;
  const title = formData.get("post-title") as string;
  const content = formData.get("post-content") as string;
  const category = formData.get("post-category") as PostCategories;
  const tags = formData.get("post-tags") as string;
  const existingTags = JSON.parse(formData.get("existing-post-tags") as string) as Tag[];

  const tagsArray = tags.split(" ").map((tag) => (tag.startsWith("#") ? tag : "#" + tag));

  const uniqueTags = tagsArray
    .filter((tag) => !existingTags.some((existingTag) => existingTag.name === tag))
    .map((tag) => ({ id: null, name: tag }));

  // TODO: Prevent adding an empty tag.
  // TODO: Add the ability yo remove tags from a post.

  const post = {
    id: postId,
    title: title,
    content: content,
    category: category,
  };

  const results = PostSchema.safeParse(post);

  if (!results.success) {
    let errorMessages: EdiPostState = {
      title: undefined,
      content: undefined,
    };

    results.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof EdiPostState;
      errorMessages[path] = issue.message;
    });

    return errorMessages;
  } else {
    editPost(post, { oldTags: existingTags, newTags: uniqueTags });
    revalidatePath("/drafts");
    revalidatePath(`/drafts/${postId}`);
    redirect("/drafts");
  }
}
