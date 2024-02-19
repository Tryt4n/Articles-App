import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "./db";
import { wait } from "@/app/_helpers/helpers";

// export const fetchAllUsers = unstable_cache(
//   cache(async () => {
//     await wait(1000);
//     return prisma.user.findMany();
//   }),
//   ["users"]
// );

// export const fetchAllPosts = unstable_cache(
//   cache(async () => {
//     await wait(1000);
//     return prisma.post.findMany();
//   }),
//   ["posts"]
// );

export async function fetchAllUsers() {
  await wait(1000);
  return prisma.user.findMany();
}

export async function fetchAllPosts() {
  await wait(1000);
  return prisma.post.findMany();
}

export async function fetchPost({ id }: { id: string }) {
  await wait(1000);
  return prisma.post.findUnique({ where: { id } });
}

export async function fetchUser({ id }: { id: string }) {
  await wait(1000);
  return prisma.user.findUnique({ where: { id } });
}
