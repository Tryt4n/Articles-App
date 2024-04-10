import type { Post } from "@/app/lib/types/posts";
import type { Tag } from "@/app/lib/types/tags";

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
