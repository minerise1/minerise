import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// 🔓 Public: list products
router.get("/", async (_req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// 🔐 Protected: create product
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description: description || "",
      price,
      image: image || ""
    }
  });

  res.json(product);
});

export default router;
