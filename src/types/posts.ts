import type { Post as DataBasePostType, User } from "@prisma/client";
import type { PostTags } from "./tags";

export type Post = DataBasePostType & {
  category: PostCategories;
};

export type CardPost = Post & {
  author?: Pick<User, "name" | "image">;
  tags?: PostTags;
};

export type PostCategories =
  | "general"
  | "technology"
  | "lifestyle"
  | "life"
  | "work"
  | "hobbies"
  | "gadgets"
  | "art"
  | "music"
  | "movies"
  | "books"
  | "food"
  | "travel"
  | "fitness"
  | "sports"
  | "games"
  | "education"
  | "science"
  | "politics"
  | "news"
  | "custom";
