import React from "react";
import { markSearchedPhrase } from "@/app/helpers/markSearchedPhrase";
import type { PostTags } from "@/types/tags";

type TagsProps = {
  tags: PostTags;
  searchedTag?: string;
};

export default async function Tags({ tags, searchedTag }: TagsProps) {
  return (
    <>
      {tags && tags.length > 0 && (
        <ul className="post-card-tags-wrapper">
          {tags.map((tag) => (
            <li key={tag.id}>
              {searchedTag ? markSearchedPhrase(tag.name, searchedTag) : tag.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
