import type { Post } from "@/types/posts";

export type PostFormProps =
  | {
      post: Post;
      postTags: {
        id: string;
        name: string;
      }[];
      authorId: string;
    }
  | {
      post?: undefined;
      postTags?: undefined;
      authorId: string;
    };
