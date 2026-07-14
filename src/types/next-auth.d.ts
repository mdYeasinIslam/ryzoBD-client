/* eslint-disable @typescript-eslint/no-unused-vars */
import { AUTH_PROVIDERS } from "@/constants";
import { Roles } from "@/redux/features/auth/auth-slice";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      roles: Roles;
      name: string;
      _id: string;
      email: string;
      avatar: string;
      authProvider: keyof typeof AUTH_PROVIDERS;
    };
    accessToken: string;
  }
}
