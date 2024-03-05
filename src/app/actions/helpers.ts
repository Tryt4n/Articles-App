import { PostSchema } from "@/zod/postSchema";
import type { Post } from "@/types/posts";

type EdiPostState = Record<"title" | "content" | "tags", string | undefined>;

type RequiredPostProperties = {
  title: Post["title"];
  content: Post["content"];
  tags: string;
};

type PartialWithRequiredFields = RequiredPostProperties & Partial<Post>;

export function createUniqueTagsArray(tags: string) {
  return [
    ...new Set(
      tags
        .split(" ")
        .map((tag) => "#" + tag.replace(/#/g, "")) // Ensure all tags start with a '#' character and its only occurrence is at the beginning of the tag
        .filter((tag) => tag.trim().length > 1) // All tags must be at least 2 characters long because of the '#' character
    ),
  ];
}

export function validatePostForm(post: PartialWithRequiredFields) {
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
  }

  return null;
}
