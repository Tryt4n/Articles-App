import type { Comment as dbComment } from "@prisma/client";
import type { User } from "./users";

export type Comment = dbComment & {
  author: {
    name: User["name"];
    image: User["image"];
  };
};
