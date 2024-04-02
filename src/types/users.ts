import type { Comment, Follow, Like, SavedPost, User as dbUser } from "@prisma/client";
import type { Post } from "./posts";

export type User = Omit<dbUser, "role"> & {
  role: UserRole;
  posts?: Post[];
  comments?: Comment[];
  receivedLikes?: Like[];
  followers?: Follow[];
  followings?: Follow[];
  savedPosts?: SavedPost["postId"][];
};

export type UserRole = "user" | "moderator" | "admin";
