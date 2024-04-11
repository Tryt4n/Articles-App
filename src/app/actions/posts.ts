"use server";

import { createAndPublishPost, createPost, deletePost, editPost, publishPost } from "@/db/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkIfPostHasChanged, createUniqueTagsArray, validatePostForm } from "./helpers";
import { savePost } from "@/db/posts";
import type { Post, PostCategories } from "@/app/lib/types/posts";
import type { User } from "@/app/lib/types/users";
import type { Tag } from "@/app/lib/types/tags";

export async function createPostAction(prevState: unknown, formData: FormData) {
  const authorId = formData.get("author-id") as User["id"];
  const title = (formData.get("post-title") as Post["title"]).trimEnd();
  const image = (formData.get("post-image") as Post["image"]).trimEnd();
  const content = (formData.get("post-content") as Post["content"]).trimEnd();
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
  const postId = formData.get("post-id") as Post["id"];
  const title = (formData.get("post-title") as Post["title"]).trimEnd();
  const originalTitle = formData.get("original-post-title") as Post["title"];
  const image = (formData.get("post-image") as Post["image"]).trimEnd();
  const content = (formData.get("post-content") as Post["content"]).trimEnd();
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
    const hasChanged = await checkIfPostHasChanged(post, tagsArray);

    if (hasChanged) {
      editPost(post, {
        oldTags: existingTags,
        newTags: uniqueTags,
        tagsToRemove: tagsToRemove.length > 0 ? tagsToRemove : undefined,
      });
      revalidatePath("/drafts");
      revalidatePath(`/drafts/${postId}`);
      revalidatePath(`/post/${postId}`);
      revalidatePath("/profile");
    }

    redirect("/drafts");
  }
}

export async function publishPostAction(formData: FormData) {
  const authorId = formData.get("author-id") as User["id"];
  const postId = formData.get("post-id") as Post["id"];

  await publishPost(postId);
  revalidatePath("/");
  revalidatePath("/drafts");
  revalidatePath(`/drafts/${postId}`);
  revalidatePath(`/post/${postId}`);
  revalidatePath("/post/published");
  revalidatePath(`/author/${authorId}`);
  redirect("/drafts");
}

export async function createAndPublishPostAction(formData: FormData) {
  const authorId = formData.get("author-id") as User["id"];
  const title = (formData.get("post-title") as Post["title"]).trimEnd();
  const image = (formData.get("post-image") as Post["image"]).trimEnd();
  const content = (formData.get("post-content") as Post["content"]).trimEnd();
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
  const postId = formData.get("post-id") as Post["id"];
  const existingTagsString = formData.get("existing-post-tags") as string;
  const existingTags = existingTagsString ? (JSON.parse(existingTagsString) as Tag[]) : [];

  await deletePost(postId, existingTags);
  revalidatePath("/");
  revalidatePath("/drafts");
  revalidatePath(`/post/${postId}`);
  revalidatePath("/post/published");
  revalidatePath("/profile");
  redirect("/drafts");
}

export async function savePostAction(formData: FormData) {
  const postId = formData.get("post-id") as Post["id"];
  const userId = formData.get("user-id") as User["id"];

  await savePost(userId, postId);
  revalidatePath("/");
  revalidatePath(`/post/${postId}`);
  revalidatePath(`/author/${userId}`);
  revalidatePath("/profile");
}
