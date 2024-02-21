import React from "react";

export default function AuthorPage({ params }: { params: { authorId: string } }) {
  return <h1>{params.authorId}</h1>;
}
