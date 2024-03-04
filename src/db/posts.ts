import prisma from "./db";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { wait } from "@/app/helpers/helpers";
import type { Prisma, Tag } from "@prisma/client";
import type { SearchProps } from "@/app/page";
import type { Post } from "@/types/posts";

export const fetchPost = unstable_cache(
  cache(async ({ id }: { id: string }) => {
    await wait(1000);

    return prisma.post.findUnique({ where: { id } }) as unknown as Post;
  }),
  ["post"]
);

export const fetchPostsBySearchParams = unstable_cache(
  cache(async ({ searchParams }: SearchProps) => {
    // await wait(1000);

    const { query, filterBy, category } = searchParams;

    let whereClause: Prisma.PostWhereInput = {
      published: true,
      category: category !== "" ? category : undefined,
    };

    if (query !== "") {
      if (filterBy === "title") {
        whereClause = {
          ...whereClause,
          title: { contains: query },
        };
      } else if (filterBy === "author") {
        whereClause = {
          ...whereClause,
          author: {
            name: { contains: query },
          },
        };
      }
    }

    return prisma.post.findMany({
      where: whereClause,
    }) as unknown as Post[];
  }),
  ["post", "posts"]
);

export const fetchAllUserPosts = unstable_cache(
  cache(async ({ authorId }: { authorId: string }) => {
    // await wait(1000);

    return prisma.post.findMany({
      where: {
        authorId,
      },
    }) as unknown as Post[];
  }),
  ["posts"]
);

export const fetchPostTags = unstable_cache(
  cache(async ({ postId }: { postId: string }) => {
    // await wait(1000);

    return prisma.tag.findMany({ where: { posts: { some: { postId } } } });
  }),
  ["tags"]
);

export const editPost = async (
  post: Pick<Post, "id" | "title" | "content" | "category">,
  tags: { oldTags: Tag[]; newTags: (Omit<Tag, "id"> & { id: null })[] }
) => {
  const tagIds: string[] = [];

  for (const tag of tags.newTags) {
    const createdTag = await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: { name: tag.name },
    });

    tagIds.push(createdTag.id);
  }

  await prisma.post.update({
    where: { id: post.id },
    data: {
      title: post.title,
      content: post.content,
      category: post.category,
      tags: {
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });
};
