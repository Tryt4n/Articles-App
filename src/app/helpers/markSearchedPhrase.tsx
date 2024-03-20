import type { SearchProps } from "../page";

export function markSearchedPhrase(text: string, query: SearchProps["searchParams"]["query"]) {
  return text
    .split(new RegExp(`(${query})`, "gi"))
    .map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
}
