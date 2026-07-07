import "next-auth";
import { DefaultSession } from "next-auth";
import { is } from "zod/locales";

declare module "next-auth" {
  // 1. Extend the User object (what comes from your MongoDB Model)
  interface User {
    _id?: string;
    isVerified?: boolean;
    isaccepting?: boolean;
    email?: string;
    username?: string;
    repoId?: string;
  }

  // 2. Extend the Session object (what you see in your Frontend)
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      email?: string;
      isAccepting?: boolean;
      username?: string;
      repoId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // 3. Extend the JWT (the encrypted cookie that stores the data)
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isaccepting?: boolean;
    email?: string;
    repoId?: string;
  }
}