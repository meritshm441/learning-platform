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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
}

// Create the handler with the auth options
const handler = NextAuth(authOptions)

// Export the handler functions directly
export { handler as GET, handler as POST }
