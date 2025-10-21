import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }: any) {
      const p = profile as typeof profile & { login?: string };
      const allowedUsers = ["enkhhus1en"]; // your username
      if (!p || !allowedUsers.includes(p.login!)) return false;

      await prisma.loginLog.create({
        data: {
          username: p.login!,
          timestamp: new Date(),
        },
      });

      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// 👇 export your configured handler for Next.js routing
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
