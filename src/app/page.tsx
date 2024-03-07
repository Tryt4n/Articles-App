import SearchingForm from "./components/SearchingForm/SearchingForm";
import CardsList from "./components/CardsList/CardsList";
import type { Metadata } from "next/types";
import type { filteringOptions, postCategories } from "./constants/posts";
import "@/app/style.css";

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
        <h2 className="visually-hidden">Articles</h2>

        <SearchingForm searchParams={searchParams} />

        <CardsList searchParams={searchParams} />
      </main>
    </>
  );
}
