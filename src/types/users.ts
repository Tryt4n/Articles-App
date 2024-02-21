import type { Post } from "./posts";

export type Author = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  posts?: Post[] | null;
};
