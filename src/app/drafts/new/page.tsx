import React from "react";
import PostForm from "../components/PostForm/PostForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function NewDraftPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>New Draft</h1>

      {session?.user && <PostForm authorId={session.user.id} />}
    </main>
  );
}
