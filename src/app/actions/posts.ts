"use server";

import { createAndPublishPost, createPost, deletePost, editPost, publishPost } from "@/db/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUniqueTagsArray, validatePostForm } from "./helpers";
import type { PostCategories } from "@/types/posts";
import type { Tag } from "@prisma/client";

export async function createPostAction(prevState: unknown, formData: FormData) {
  const authorId = formData.get("author-id") as string;
  const title = formData.get("post-title") as string;
  const image = formData.get("post-image") as string;
  const content = formData.get("post-content") as string;
  const category = formData.get("post-category") as PostCategories;
  const tags = formData.get("post-tags") as string;

  const tagsArray = createUniqueTagsArray(tags);

  const post = {
    authorId,
    title,
    content,
    category,
    image,
    tags,
  };

  const errorMessages = await validatePostForm(post);

  if (errorMessages) {
    return errorMessages;
  } else {
    createPost(
      post,
      tagsArray.map((tag) => ({ id: null, name: tag }))
    );
    revalidatePath("/drafts");
    redirect("/drafts");
  }
}

export async function editPostAction(prevState: unknown, formData: FormData) {
  const postId = formData.get("post-id") as string;
  const title = formData.get("post-title") as string;
  const originalTitle = formData.get("original-post-title") as string;
  const image = formData.get("post-image") as string;
  const content = formData.get("post-content") as string;
  const category = formData.get("post-category") as PostCategories;
  const tags = formData.get("post-tags") as string;
  const existingTags = JSON.parse(formData.get("existing-post-tags") as string) as Tag[];

  const tagsArray = createUniqueTagsArray(tags);

  const uniqueTags = tagsArray
    .filter((tag) => !existingTags.some((existingTag) => existingTag.name === tag))
    .map((tag) => ({ id: null, name: tag }));

  // Create a list of tags to remove that are not present in the new tags array
  const tagsToRemove = existingTags.filter((existingTag) => !tagsArray.includes(existingTag.name));

  const post = {
    id: postId,
    title,
    image,
    content,
    category,
    tags,
  };

  const errorMessages = await validatePostForm(post, originalTitle);

  if (errorMessages) {
    return errorMessages;
  } else {
    editPost(post, {
      oldTags: existingTags,
      newTags: uniqueTags,
      tagsToRemove: tagsToRemove.length > 0 ? tagsToRemove : undefined,
    });
    revalidatePath("/drafts");
    revalidatePath(`/drafts/${postId}`);
    revalidatePath(`/posts/${postId}`);
    redirect("/drafts");
  }
}

export async function publishPostAction(formData: FormData) {
  const authorId = formData.get("author-id") as string;
  const postId = formData.get("post-id") as string;

  await publishPost(postId);
  revalidatePath("/");
  revalidatePath("/drafts");
  revalidatePath(`/drafts/${postId}`);
  revalidatePath(`/posts/${postId}`);
  revalidatePath("/posts/published");
  revalidatePath(`/author/${authorId}`);
  redirect("/drafts");
}

export async function createAndPublishPostAction(formData: FormData) {
  const authorId = formData.get("author-id") as string;
  const title = formData.get("post-title") as string;
  const image = formData.get("post-image") as string;
  const content = formData.get("post-content") as string;
  const category = formData.get("post-category") as PostCategories;
  const tags = formData.get("post-tags") as string;

  const tagsArray = createUniqueTagsArray(tags);

  const post = {
    authorId,
    title,
    content,
    category,
    image,
    // image: "https://source.unsplash.com/random/400x200",
    tags,
  };

  const errorMessages = await validatePostForm(post);

  if (errorMessages) {
    return errorMessages;
  } else {
    createAndPublishPost(
      post,
      authorId,
      tagsArray.map((tag) => ({ id: null, name: tag }))
    );
    revalidatePath("/");
    revalidatePath("/drafts");
    revalidatePath(`/authors/${authorId}`);
    redirect("/drafts");
  }
}

export async function deletePostAction(formData: FormData) {
  const postId = formData.get("post-id") as string;
  const existingTagsString = formData.get("existing-post-tags") as string;
  const existingTags = existingTagsString ? (JSON.parse(existingTagsString) as Tag[]) : [];

  await deletePost(postId, existingTags);
  revalidatePath("/");
  revalidatePath("/drafts");
  revalidatePath(`/posts/${postId}`);
  revalidatePath("/posts/published");
  redirect("/drafts");
}
