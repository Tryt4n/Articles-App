import type { User as CustomUser } from "@/app/lib/types/users";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT, DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@/app/lib/types/users";

declare module "next-auth" {
  interface Session {
    user: Omit<CustomUser, "password"> & { id: string } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
