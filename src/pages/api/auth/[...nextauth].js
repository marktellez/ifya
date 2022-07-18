import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      return {
        photo: session.user.image,
        name: token.name,
        email: token.email,
        jwt: {
          jti: token.jti,
          iat: token.iat,
          exp: token.exp,
        },
      };
    },
  },
});
