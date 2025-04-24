import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function createUser(data: { name: string; email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
}
