import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // get user
      const user = await getServerSession(req, res, authOptions);
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
      // get orders
      const prisma = new PrismaClient();
      const orders = await prisma.order.findMany({
        where: { userId: user?.user?.id },
        include: { products: true },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: "Method not allowed" });
  }
}
