import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import prisma from "@/db/db";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email:", type: "email", placeholder: "Type your email here" },
        password: { label: "Password:", type: "password", placeholder: "Type your password here" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.username },
        });

        if (
          user &&
          credentials?.username === user.email &&
          credentials?.password === user.password
        ) {
          return { id: user.id, name: user.name, email: user.email, image: user.avatar };
        } else {
          return null;
        }
      },
    }),
  ],
};
