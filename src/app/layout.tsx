import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
  title: "Blog Posts",
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
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
