import type { filteringOptions, postCategories } from "@/app/constants/posts";
import type { Post as DataBasePostType } from "@prisma/client";
import type { User } from "./users";
import type { Comment } from "./comments";
import type { Tag } from "./tags";
import type { Like } from "./likes";

export type Post = DataBasePostType & {
  category: PostCategories;
  comments?: Comment[];
  likes?: Like[];
  tags?: Tag[];
};

export type CardPost = Post & {
  author?: Pick<User, "name" | "image">;
  tags?: Tag[];
  likedAt?: Date;
};

export type PostCategories = (typeof postCategories)[number];

export type PostFilteringOptions = (typeof filteringOptions)[number];
