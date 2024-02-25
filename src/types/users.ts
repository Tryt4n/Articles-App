import type { Comment, Follow, Like, Post, SavedPost, User as dbUser } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string | null;
  image: string;
  role: UserRole;
  posts?: Post[];
  comments?: Comment[];
  receivedLikes?: Like[];
  followers?: Follow[];
  followings?: Follow[];
  savedPosts?: SavedPost[];
};

export type UserRole = "user" | "moderator" | "admin";
