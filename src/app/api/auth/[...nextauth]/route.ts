import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      const allowedUsers = ["enkhhus1en"];
      if (!profile || !allowedUsers.includes(profile.sub!)) return false;

      await prisma.loginLog.create({
        data: {
          username: profile.sub!,
          timestamp: new Date(),
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
