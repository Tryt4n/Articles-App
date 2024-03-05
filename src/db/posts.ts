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

export const fetchPostTags = unstable_cache(
  cache(async ({ postId }: { postId: string }) => {
    // await wait(1000);

    return prisma.tag.findMany({ where: { posts: { some: { postId } } } });
  }),
  ["tags"]
);

export const createPost = async (
  post: Omit<Post, "id" | "published" | "publishedAt" | "createdAt" | "updatedAt">,
  postTags?: (Omit<Tag, "id"> & { id: null })[]
) => {
  const tagIds: string[] = [];

  if (postTags && postTags.length > 0) {
    for (const tag of postTags) {
      const createdTag = await prisma.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: { name: tag.name },
      });

      tagIds.push(createdTag.id);
    }
  }

  await prisma.post.create({
    data: {
      authorId: post.authorId,
      title: post.title,
      content: post.content,
      category: post.category,
      image: post.image,
      tags: {
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });
};

export const publishPost = async (postId: string) => {
  await prisma.post.update({
    where: { id: postId },
    data: {
      published: true,
      publishedAt: new Date(),
    },
  });
};

export const createAndPublishPost = async (
  post: Omit<Post, "id" | "published" | "publishedAt" | "createdAt" | "updatedAt">,
  authorId: Post["authorId"],
  postTags?: (Omit<Tag, "id"> & { id: null })[]
) => {
  await createPost(post, postTags);

  const createdPost = await prisma.post.findFirst({
    where: {
      authorId,
      title: post.title,
      content: post.content,
    },
    select: {
      id: true,
    },
  });

  if (createdPost) {
    await publishPost(createdPost.id);
  }
};

export const deletePost = async (postId: string, postTags?: Tag[]) => {
  const postComments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });

  // Delete all comments related to the post
  if (postComments.length > 0) {
    for (const comment of postComments) {
      await prisma.comment.delete({
        where: {
          id: comment.id,
        },
      });
    }
  }

  // Delete all relationships with tags related to the post
  if (postTags && postTags.length > 0) {
    for (const tag of postTags) {
      const postTag = await prisma.postTag.findUnique({
        where: {
          postId_tagId: {
            postId: postId,
            tagId: tag.id,
          },
        },
      });

      if (postTag) {
        await prisma.postTag.delete({
          where: {
            postId_tagId: {
              postId: postId,
              tagId: tag.id,
            },
          },
        });
      }
    }
  }

  await prisma.post.delete({ where: { id: postId } });
};

/**
 * Edits a post and updates its relationships with tags.
 *
 * @param post - The post to be edited. It should include the ID, title, content, and category of the post.
 * @param tags - The tags related to the post. It should include the old tags, new tags to be added, and tags to be removed (optional).
 *
 * @returns A promise that resolves when the post has been edited and its relationships with tags have been updated.
 *
 * @async
 * @function
 */
export const editPost = async (
  post: Pick<Post, "id" | "title" | "content" | "category">,
  tags: { oldTags: Tag[]; newTags: (Omit<Tag, "id"> & { id: null })[]; tagsToRemove?: Tag[] }
) => {
  const tagIds: string[] = [];

  // Create new tags
  for (const tag of tags.newTags) {
    const createdTag = await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: { name: tag.name },
    });

    tagIds.push(createdTag.id);
  }

  // Delete relationships with tags to remove if it exists
  if (tags.tagsToRemove && tags.tagsToRemove.length > 0) {
    for (const tag of tags.tagsToRemove) {
      await prisma.postTag.deleteMany({
        where: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    }
  }

  // Create relationships with new tags
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
