import { Wallet } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~~/config/database";

type ResponseData =
  | {
      data: Wallet[];
      message: string;
    }
  | {
      data: null;
      message: string;
    };

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === "POST") {
    const addresses = req.body.addresses as string[];
    // seperate addresses into those to be created

    // and those to be updated
    const existingWallets = await prisma.wallet.findMany({
      where: {
        address: { in: addresses },
      },
    });
    const nonExistingWalletAddresses = addresses.filter(
      address => !existingWallets.some(wallet => wallet.address === address),
    );
    // Process a POST request
    await prisma.wallet.createMany({
      data: nonExistingWalletAddresses.map(address => ({
        name: "",
        userId: req.body.userId,
        walletCategoryId: req.body.categoryId,
        address,
      })),
    });
    await prisma.wallet.updateMany({
      where: {
        address: { in: existingWallets.map(item => item.address) },
      },
      data: {
        walletCategoryId: req.body.categoryId,
      },
    });
    res.status(200).json({ data: [], message: "Action carried out!" });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data: null, message: "Unaccepted" });
  }
};

export default handler;
