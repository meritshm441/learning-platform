// Create this file in the root of your project or in a lib directory
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Export auth options for use in other parts of your application
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider
      if (session.user) {
        session.user.id = token.sub
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
