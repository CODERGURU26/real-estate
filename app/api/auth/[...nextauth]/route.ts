import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"; // ✅ for jwt typing
import { Session, User } from "next-auth"; // ✅ for session typing
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import UserModel from "@/lib/models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials.password) return null;

        // ✅ Hardcoded Admin
        const adminEmail = "shreekrishnaproperties46@gmail.com";
        const adminPassword = "Krishna@123";

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin-1",
            name: "Admin",
            email: adminEmail,
            role: "admin",
          } as User;
        }

        // ✅ Normal User from DB
        await connectToDatabase();
        const user = await UserModel.findOne({ email: credentials.email }).lean();
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        );
        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT & { role?: string };
      user?: User & { role?: string };
    }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session & { user: { role?: string } };
      token: JWT & { role?: string };
    }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
