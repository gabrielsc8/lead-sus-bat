import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Guarda de credenciais
          const email = credentials?.email?.trim().toLowerCase();
          const password = credentials?.password ?? "";

          if (!email || !password) return null;

          // Busca usuário (garanta emails salvos em minúsculas no DB)
          const user = await prisma.user.findUnique({
            where: { email },
          });

          // Bloqueia se não existir ou não for admin
          if (!user || user.role !== "admin") return null;

          // Compara hash
          const ok = await compare(password, user.password);
          if (!ok) return null;

          // Retorna objeto enxuto para o token
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("AUTH AUTHORIZE ERROR:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // 30 minutos
    maxAge: 30 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // Propaga role para o token quando loga
      if (user?.role) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Garante que session.user exista e adicione a role
      if (session.user) {
        (session.user as any).role = (token as any).role ?? undefined;
      }
      return session;
    },
  },

  // Mantendo hardcoded como você pediu
  secret: "DU923NDU9NWUSAONSD39USI",

  pages: {
    signIn: "/login",
  },
};
