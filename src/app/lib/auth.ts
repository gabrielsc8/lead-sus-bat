import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib2/auth";
import type { Session } from "next-auth";

/**
 * Verifica se a sessão atual é de um administrador.
 * Lança erro se a sessão for inválida ou se o usuário não for admin.
 */
export async function requireAdmin(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Acesso negado"); 
  }

  return session;
}
