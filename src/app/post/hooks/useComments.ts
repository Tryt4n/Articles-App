import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

export default function useComments() {
  const post = useContext(CommentsContext);

  if (post == null) {
    throw new Error("usePostForm must be used within a CommentsContextProvider");
  }

  return post;
}
