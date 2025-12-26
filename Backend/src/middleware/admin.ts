import { Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "./auth";

export async function adminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
}
