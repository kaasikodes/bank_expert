import { TWalletChainData } from "../types";

export const DUMMY_WALLET_CHAIN_DATA: TWalletChainData[] = [
  {
    key: 1,
    name: "Wallet1",
    address: "0x123487654356789",
    createdAt: "2023-11-19",
    message: {
      total: 100,
      chains: ["ETH", "BSC"],
    },
    transactionCount: 50,
    chains: {
      ETH: 30,
      BSC: 20,
    },
    total: 200,
  },
  {
    total: 350,
    name: "Wallet2",
    address: "0x987654321",
    createdAt: "2023-11-18",
    message: {
      total: 150,
      chains: ["ETH", "Polygon"],
    },
    transactionCount: 75,
    chains: {
      ETH: 50,
      Polygon: 25,
    },
    key: 2,
  },
  // Add more wallet data objects as needed
];
