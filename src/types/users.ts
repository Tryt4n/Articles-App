export type User = {
  id: string;
  name: string;
  email: string;
  password: string | null;
  image: string;
  role: UserRole;
};

export type UserRole = "user" | "moderator" | "admin";
