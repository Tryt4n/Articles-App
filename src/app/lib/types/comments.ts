import type { Comment as dbComment } from "@prisma/client";
import type { User } from "./users";
import type { Like } from "./likes";

export type Comment = dbComment & {
  author: {
    name: User["name"];
    image: User["image"];
  };
  replies?: Comment[];
  likes?: Like[];
};
