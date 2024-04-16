import { redirect } from "next/navigation";

export default function RedirectSignInPage() {
  redirect("/api/auth/signin");
}
