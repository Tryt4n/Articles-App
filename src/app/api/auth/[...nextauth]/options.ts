import GitHubProvider, { type GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/db";
import { createNewUser, isNewUserEmailUnique } from "@/db/users";
import type { NextAuthOptions } from "next-auth";
import type { UserRole } from "@/types/users";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      async profile(profile: GithubProfile) {
        const email = profile.email;
        const username = profile.login;
        const image = profile.avatar_url;

        // Create new profile for user if it doesn't exist
        const isUnique = await isNewUserEmailUnique(email as string);

        if (isUnique) {
          const newUser = {
            name: username,
            email,
            image,
            role: "user",
          };

          await createNewUser(newUser);
        }

        return {
          ...profile,
          id: profile.id.toString(),
          role: "user",
          image: image,
        };
      },
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
          return { ...user, role: (user.role as UserRole) || "user" };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // Only for client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
