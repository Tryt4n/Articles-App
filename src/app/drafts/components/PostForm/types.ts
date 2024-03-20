import type { Post } from "@/types/posts";
import type { Tag } from "@/types/tags";

export type PostFormProps =
  | {
      post: Post;
      postTags: Tag[];
      authorId: string;
    }
  | {
      post?: undefined;
      postTags?: undefined;
      authorId: string;
    };
