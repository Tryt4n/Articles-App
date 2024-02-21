import React from "react";
import { fetchAllUsers } from "@/db/users";
import type { Metadata } from "next/types";
import "./authorsPage.css";
import AuthorCard from "./AuthorCard";

export const metadata: Metadata = {
  title: "Authors",
};

export default async function AuthorsPage() {
  const authors = await fetchAllUsers();

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
