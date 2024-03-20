import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function usePostForm() {
  const post = useContext(PostContext);

  if (post == null) {
    throw new Error("usePost must be used within a PostContextProvider");
  }

  return post;
}
