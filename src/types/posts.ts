import type { Post as DataBasePostType, User } from "@prisma/client";
import type { Tag } from "./tags";
import type { filteringOptions, postCategories } from "@/app/constants/posts";

export type Post = DataBasePostType & {
  category: PostCategories;
};

export type CardPost = Post & {
  author?: Pick<User, "name" | "image">;
  tags?: Tag[];
};

export type PostCategories = (typeof postCategories)[number];

export type PostFilteringOptions = (typeof filteringOptions)[number];
