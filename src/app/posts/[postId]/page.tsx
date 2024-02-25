import React from "react";
import prisma from "@/db/db";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const postName = await prisma.post.findUnique({
    where: { id: params.postId },
    select: {
      title: true,
    },
  });

  return { title: postName?.title };
}

export default function page({ params }: { params: { postId: string } }) {
  return <div>Post id: {params.postId}</div>;
}
