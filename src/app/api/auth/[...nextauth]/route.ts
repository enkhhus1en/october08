import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
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
          login: profile.login, // keep GitHub username
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      console.log("profileee::: ", profile);
      const p = profile as typeof profile & { login?: string };
      const allowedUsers = ["enkhhus1en"];
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
});

export { handler as GET, handler as POST };
