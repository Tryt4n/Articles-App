import React from "react";
import prisma from "@/db/db";
import { fetchPost, fetchPostTags } from "@/db/posts";
import { format } from "date-fns/format";
import { postCategories } from "@/app/constants/posts";
import type { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { draftId: string };
}): Promise<Metadata> {
  const postTitle = await prisma.post.findUnique({
    where: { id: params.draftId },
    select: {
      title: true,
    },
  });

  return { title: postTitle?.title };
}

export default async function DraftPage({ params }: { params: { draftId: string } }) {
  const post = await fetchPost({ id: params.draftId });
  const postTags = await fetchPostTags({ postId: post.id });

  return (
    <>
      {post && (
        <main>
          <h1>{post.title}</h1>

          <time dateTime={post.createdAt.toString()}>
            Post created at: {format(post.createdAt, "H:mm, dd.MM.yyyy")}
          </time>

          <form action="">
            {postTags.length > 0 && (
              <ul>
                {postTags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            )}

            <div>
              <label htmlFor="draft-title">Title:</label>
              <input
                type="text"
                id="draft-title"
                name="draft-title"
                defaultValue={post.title}
              />
            </div>
            <div>
              {/*// TODO: Add markdown support */}
              <label htmlFor="draft-content">Content:</label>
              <textarea
                id="draft-content"
                name="draft-content"
                defaultValue={post.content}
              />
            </div>
            {/*// TODO: Add markdown preview */}

            <div>
              <label htmlFor="draft-category">Selected category:</label>
              <select
                name="draft-category"
                id="draft-category"
                defaultValue={post.category}
              >
                {postCategories.map((postCategory) => (
                  <option
                    key={postCategory}
                    value={postCategory}
                  >
                    {postCategory}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn--accent"
            >
              Publish
            </button>
          </form>
        </main>
      )}
    </>
  );
}
