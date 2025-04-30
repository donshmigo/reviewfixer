import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    isDemo?: boolean;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
  
  interface User {
    isDemo?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    isDemo?: boolean;
  }
} 