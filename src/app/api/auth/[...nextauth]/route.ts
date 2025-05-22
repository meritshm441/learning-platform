import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

// Extend the Session and User types to include id and accessToken
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string
      accessToken?: string
    }
  }
}

// Define auth options as a separate variable but don't export it directly
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
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

// Create the handler with the auth options
const handler = NextAuth(authOptions)

// Export the handler functions directly
export { handler as GET, handler as POST }
