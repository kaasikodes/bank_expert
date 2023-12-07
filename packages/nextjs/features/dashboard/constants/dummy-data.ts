import { TWalletChainData } from "../types";

export const DUMMY_WALLET_CHAIN_DATA: TWalletChainData[] = [
  {
    key: 1,
    name: "Wallet1",
    // address: "0x2b54FaAD30691E6fE5757cCc786E849D5063D4A0",
    address: "0xE061c2678fb3505888fa8aE89d8e809bf3C256a5",
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
    address: "0x7447e3AEc61b740f97fa685eD59CEF80A87Cd077",
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
  {
    total: 350,
    name: "Wallet3",
    address: "0xc6b17Af051145A79824d9e7b155Fc4C1D96B2EE5",
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
    key: 3,
  },
  {
    total: 350,
    name: "Wallet4",
    address: "0xA476Aa3f01c5100CFFb29F53A08874A37bEE6555",
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
    key: 4,
  },
  // Add more wallet data objects as needed
];
