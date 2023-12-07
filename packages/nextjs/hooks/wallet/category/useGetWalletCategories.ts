"use client";

import { Wallet, WalletCategory } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_WALLET_CATEGORIES = "key-subject-details";

type TResponse = { data: (WalletCategory & { wallets: Wallet[] })[] };
const getData = async (): Promise<TResponse> => {
  const url = `/api/auth/wallet/category`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const response = await axios.get(url, config);
  return response.data as TResponse;
};
export const useGetWalletCategories = () => {
  const queryData = useQuery([QUERY_KEY_FOR_WALLET_CATEGORIES], () => getData(), {
    //   enabled: props.keySubjectAddress !== undefined,
    //   onError: (err: any) => {},
    //   onSuccess: (data) => {},
  });

  return queryData;
};
