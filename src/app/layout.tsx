import { SpeedInsights } from "@vercel/speed-insights/next";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import ModalContextProvider from "./context/ModalContext";
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
    <>
      {process.env.NODE_ENV === "production" && <SpeedInsights />}

      <html lang="en">
        <body className="container">
          <AuthProvider>
            <ModalContextProvider>
              <Navbar />

              {children}
            </ModalContextProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
