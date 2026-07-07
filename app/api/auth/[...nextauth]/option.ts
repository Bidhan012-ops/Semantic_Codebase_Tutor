import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { loginSchema } from "@/schema/loginSchema";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);

          if (!parsed.success) {
            throw new Error("Invalid credentials.");
          }

          const { email, password } = parsed.data;

          const dbconnect = await db();
          const usersCollection = dbconnect.collection("users");

          const user = await usersCollection.findOne({
            email,
          });

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          if (!user.isVerified) {
            throw new Error(
              "Please verify your email before logging in."
            );
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            isAccepting: user.isAccepting,
          };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger == "update" && session?.repoId) {
        token.repoId = session.repoId;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.isVerified = user.isVerified;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.repoId = token.repoId as string;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
});