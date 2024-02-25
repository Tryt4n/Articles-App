import React from "react";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Drafts",
};

export default async function DraftsPage() {
  return (
    <main>
      <h1>Your Drafts</h1>
    </main>
  );
}
