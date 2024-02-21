import type { Post } from "./posts";

export type Author = {
  id: string;
  // TODO delete null after database reupload
  name: string | null;
  avatar: string;
  email: string;
  posts?: Post[] | null;
};
