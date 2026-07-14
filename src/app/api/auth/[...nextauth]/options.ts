/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { config } from "@/config";

export const authOptions: NextAuthOptions = {
  secret: config.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent", // Forces the consent screen to show every time
      //   },
      // },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("credentials from credentials provider", credentials);
        const res = await fetch(
          config.API_BASE_URL + "/auth/next/signin-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const user = await res.json();
        // console.log("user", user);
        if (!res.ok) {
          // console.log("error");
          throw new Error(JSON.stringify({ ...user, statusCode: res.status }));
        }
        return user?.data || null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const res = await fetch(
          `${config.API_BASE_URL}/auth/next/signin-google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile?.email,
              avatar: (profile as any)?.picture,
              name: profile?.name,
              idToken: account.id_token,
            }),
          }
        );
        const { data = {} } = await res.json();
        if (!data.accessToken) {
          return false;
        }
        (user as any).user = data.user;
        (user as any).accessToken = data.accessToken;
        (user as any).exp = data.exp;
        // console.log("google account", account, profile, data, user);
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        // console.log("trigger", token);
        token.user = session.user;
        return token;
      }
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.user = (user as any).user;
        token.tokenExp = (user as any).exp;
      }
      // console.log("user from jwt", user, token);
      return token;
    },
    async session({ session, token }) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (token.tokenExp && (token.tokenExp as number) < currentTime) {
        throw new Error("Token expired");
      }
      // console.log("session", session);
      (session as any).accessToken = token.accessToken;
      (session as any).user = token.user;
      // console.log("token session", token.tokenExp);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
