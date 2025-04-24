import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export const hashPasswordMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    const userData = params.args.data;
    if (userData?.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  }
  return next(params);
};
