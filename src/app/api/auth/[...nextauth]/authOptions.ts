import GitHubProvider, { type GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/db";
import { createNewUser, isNewUserEmailUnique } from "@/db/users";
import type { NextAuthOptions } from "next-auth";
import type { User, UserRole } from "@/types/users";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      async profile(profile: GithubProfile) {
        const id = profile.id.toString();
        const email = profile.email;
        const username = profile.login;
        const image = profile.avatar_url;

        // Create new profile for user if it doesn't exist
        const isUnique = email ? await isNewUserEmailUnique(email) : null;

        if (isUnique && email) {
          const newUser: User = {
            id,
            name: username,
            email,
            password: null,
            image,
            role: "user",
          };

          await createNewUser(newUser);
        }

        return {
          ...profile,
          id,
          role: "user",
          image: image,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "Account",
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
          return { ...user, role: user.role as UserRole };
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

    async session({ session, token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
        select: {
          followings: true,
          savedPosts: { select: { postId: true } },
        },
      });

      session.user = {
        id: token.sub!,
        email: token.email!,
        name: token.name!,
        image: token.picture!,
        role: token.role,
        expires: session.expires,
        savedPosts: dbUser?.savedPosts.map((post) => post.postId),
        followings: dbUser?.followings,
      };
      return session;
    },
  },
};
