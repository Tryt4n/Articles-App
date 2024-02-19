import React from "react";

export default function page({ params }: { params: { postId: string } }) {
  return <div>Post id: {params.postId}</div>;
}
