import type { Metadata } from "next/types";
import "@/app/homePage.css";
import type { filteringOptions, postCategories } from "./constants/posts";
import SearchingForm from "./_components/SearchingForm";
import CardsGrid from "./_components/CardsGrid";
import { fetchPostsBySearchParams } from "@/db/posts";

export const metadata: Metadata = {
  title: "Blog Posts",
};

export type SearchProps = {
  searchParams: {
    query: string;
    filterBy: (typeof filteringOptions)[number];
    category: (typeof postCategories)[number] | "";
  };
};

export default async function HomePage({ searchParams }: SearchProps) {
  const posts = await fetchPostsBySearchParams({ searchParams });

  return (
    <>
      <header className="home-page-header">
        <h1 className="home-page-heading">CodeHelp Blogs</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum voluptas tempora animi
          deserunt quia? Voluptas, accusantium quisquam. Fuga totam beatae eius quaerat animi, enim
          quasi.
        </p>
      </header>

      <main className="home-page-main">
        <SearchingForm searchParams={searchParams} />

        <CardsGrid posts={posts} />
      </main>
    </>
  );
}
