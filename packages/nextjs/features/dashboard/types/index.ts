export type TWalletData = {
  key: number;
  name: string;
  address: string;
  createdAt: string;
  message: {
    total: number;
    chains: string[]; //will be keys for k Default_Wallet_Chains
  };
  transactionCount: number;
  total: number;
};
export type TWalletChainData = TWalletData & {
  chains: { [key: string]: number };
};
export type TWalletCoinData = {
  ethereum: {
    icon: string;
    value: number;
  };
  avalanche: {
    icon: string;
    value: number;
  };
  polygon: {
    icon: string;
    value: number;
  };
  debankLink: {
    icon: string;
    value: number;
  };
};
