import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import { SERVER_BASE_URL } from "@/constants";
import NextAuth from "next-auth";


export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      type: "credentials",
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: "Email:",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials, req) {

        const { email, password } = credentials as any
        const res = await fetch(`${SERVER_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const user: any = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;

        // // if everything is fine
        // return {
        //   id: "1234",
        //   name: "John Doe",
        //   email: "john@gmail.com",
        //   role: "admin",
        // };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, //3hrs
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
      
      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: any }) {
      console.log({ session });

      return { ...session, user: token };
    },
  },

};

export default NextAuth(authOptions);

