import { PrismaClient } from "@prisma/client";
import { hashPasswordMiddleware } from "./prismaMiddleware";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

prisma.$use(hashPasswordMiddleware);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
