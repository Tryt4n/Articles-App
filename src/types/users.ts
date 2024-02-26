import type { Comment, Follow, Like, Post, SavedPost, User as dbUser } from "@prisma/client";

export type User = Omit<dbUser, "role"> & {
  role: UserRole;
  posts?: Post[];
  comments?: Comment[];
  receivedLikes?: Like[];
  followers?: Follow[];
  followings?: Follow[];
  savedPosts?: SavedPost[];
};

export type UserRole = "user" | "moderator" | "admin";
