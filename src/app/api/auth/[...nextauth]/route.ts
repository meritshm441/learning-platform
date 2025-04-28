import NextAuth, { AuthOptions, Session, SessionOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
interface CustomSessionOptions extends SessionOptions {
  jwt: boolean;
}
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  // debug:true,
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      await fetch(
        `https://tmp-se-projectapi.azurewebsites.net/api/admin/auth/login`
      );

      /*   if (token) {
        const formData = {
          data: {
            name: `${token.name}`,
            email: `${token.email}`,
            profileUrl: `${token.picture}`,
            provider: `${account?.provider}`
          },
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/google/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.STRAPI_POST_API_TOKEN}`,
            },
            body: JSON.stringify(formData),
          }
        );
      } */
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
