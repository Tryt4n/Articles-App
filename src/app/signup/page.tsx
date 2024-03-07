"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignupForm from "./components/SignupForm";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "./style.css";


export default function SignupPage() {
  const { status } = useSession();
  const isUserLoggedIn = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/");
    }
  }, [isUserLoggedIn, router]);

  return (
    <>
      {status === "loading" && (
        <main className="container">
          <h1 className="visually-hidden">Loading page</h1>
          <LoadingSpinner />
        </main>
      )}
      {status !== "loading" && status !== "authenticated" ? (
        <main className="container">
          <h1 className="signup-header">Signup</h1>

          <SignupForm />
        </main>
      ) : null}
    </>
  );
}
