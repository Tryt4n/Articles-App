import type { Metadata } from "next/types";
import CardsList from "./_components/CardsList";
import "@/app/homePage.css";

export const metadata: Metadata = {
  title: "Blog Posts",
};

export default function HomePage() {
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
        <CardsList />
      </main>
    </>
  );
}
