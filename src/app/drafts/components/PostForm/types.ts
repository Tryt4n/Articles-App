import type { Post } from "@/types/posts";
import type { PostTags } from "@/types/tags";

export type PostFormProps =
  | {
      post: Post;
      postTags: PostTags;
      authorId: string;
    }
  | {
      post?: undefined;
      postTags?: undefined;
      authorId: string;
    };
