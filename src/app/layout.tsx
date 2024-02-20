import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Home page",
  description: "Blog posts project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
