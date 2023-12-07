import { WalletCategory } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~~/config/database";

type ResponseData =
  | {
      data: WalletCategory[];
    }
  | {
      data: WalletCategory;
    };

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === "POST") {
    // Process a POST request
    const category = await prisma.walletCategory.create({
      data: {
        name: req.body.name,
        userId: req.body.userId,
      },
      include: {
        wallets: true,
      },
    });
    res.status(200).json({ data: category });
  } else {
    // Handle any other HTTP method
    const categories = await prisma.walletCategory.findMany({
      include: {
        wallets: true,
      },
    });
    res.status(200).json({ data: categories });
  }
};

export default handler;
