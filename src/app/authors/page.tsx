import React from "react";
import { fetchAllAuthors } from "@/db/users";
import "./authorsPage.css";
import AuthorCard from "./AuthorCard";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Authors",
};

export default async function AuthorsPage() {
  const authors = await fetchAllAuthors();

  return (
    <main className="authors-page">
      <h2>Our Authors</h2>
      <ul>
        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
          />
        ))}
      </ul>
    </main>
  );
}
