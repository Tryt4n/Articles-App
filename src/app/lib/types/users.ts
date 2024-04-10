import type { User as dbUser } from "@prisma/client";
import type { Post } from "./posts";
import type { Comment } from "./comments";
import type { Like } from "./likes";
import type { Follow } from "./follow";
import type { SavedPost } from "./savedPosts";

export type User = Omit<dbUser, "role"> & {
  role: UserRole;
  posts?: Post[];
  comments?: Comment[];
  receivedLikes?: Like[];
  followers?: Follow[];
  followings?: Follow["followingUserId"][];
  savedPosts?: SavedPost["postId"][];
};

export type UserRole = "user" | "moderator" | "admin";
