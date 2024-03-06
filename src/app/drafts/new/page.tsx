import React from "react";
import PostForm from "../components/PostForm/PostForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Create New Post",
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>New Post</h1>

      {session?.user && <PostForm authorId={session.user.id} />}
    </main>
  );
}
