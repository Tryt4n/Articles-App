"use client";

import React, { useEffect } from "react";
import SignupForm from "./SignupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./signupPage.css";

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
          <h1>Loading...</h1>
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
