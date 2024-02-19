import type { Post as DataBasePostType } from "@prisma/client";

export type Post = DataBasePostType & {
  category: PostCategories;
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
