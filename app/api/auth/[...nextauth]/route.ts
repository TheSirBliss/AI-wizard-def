// FILE: /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

// Controlla che le variabili d'ambiente siano presenti
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Le variabili d'ambiente di Google non sono state definite");
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Qui in futuro potrà aggiungere altri provider (es. login con email/password)
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }
