import React from "react";
import { fetchAllAuthors } from "@/db/users";
import AuthorCard from "./components/AuthorCard";
import type { Metadata } from "next/types";
import "./style.css";

export const metadata: Metadata = {
  title: "Authors",
};

export default async function AuthorsPage() {
  const authors = await fetchAllAuthors();

  return (
    <main className="authors-page">
      <h1>Our Authors</h1>
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
